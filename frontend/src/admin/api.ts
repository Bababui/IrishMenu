import type {
  AdminCategory,
  AdminEvent,
  AdminItem,
  AdminOffer,
  AdminServing,
  EventInput,
  ItemInput,
  OfferInput,
} from "./types";

// Talks to the backend's /api/admin endpoints with the login token.

const TOKEN_KEY = "irish-pub-admin-token";

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // Private window: he just has to log in again next time.
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // nothing stored, nothing to remove
  }
}

/** Fired when the backend says the login has run out, so the app can show the login screen. */
export const LOGGED_OUT_EVENT = "admin-logged-out";

/** A problem the boss can fix. `fields` maps a field name to a message shown under that field. */
export class ApiError extends Error {
  status: number;
  fields: Record<string, string>;

  constructor(status: number, message: string, fields: Record<string, string> = {}) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

type ValidationProblem = { loc: (string | number)[]; msg: string; type: string };

/** Turns FastAPI's validation answer into plain English, per field where possible. */
function toApiError(status: number, detail: unknown): ApiError {
  if (typeof detail === "string") return new ApiError(status, detail);
  if (!Array.isArray(detail)) return new ApiError(status, "Something went wrong. Please try again.");

  const fields: Record<string, string> = {};
  const general: string[] = [];
  for (const problem of detail as ValidationProblem[]) {
    // ["body", "servings", 0, "price"] -> "servings.0.price"
    const field = problem.loc.slice(1).join(".");
    const message = friendly(problem);
    if (field) fields[field] ??= message;
    else general.push(message);
  }
  const summary = general[0] ?? "Please check the fields marked below.";
  return new ApiError(status, summary, fields);
}

function friendly(problem: ValidationProblem): string {
  if (problem.type === "string_too_short" || problem.type === "missing") return "Please fill this in.";
  if (problem.type === "string_too_long") return "This is too long. Please keep it shorter.";
  if (problem.type.startsWith("decimal") || problem.type === "greater_than" || problem.type === "less_than_equal")
    return "Please enter a price like 5,50.";
  if (problem.type.startsWith("date")) return "Please pick a real date.";
  if (problem.type.startsWith("time")) return "Please enter a time like 20:00.";
  return problem.msg.replace(/^Value error, /, "");
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken() ?? ""}`,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "Can't reach the server. Check the internet connection and try again.");
  }

  // Our backend always answers with JSON. Anything else (an HTML page from the web host,
  // e.g. when the backend isn't online) means we didn't reach it at all.
  const isJson = (response.headers.get("content-type") ?? "").includes("application/json");
  if (!isJson && response.status !== 204) {
    throw new ApiError(0, "Can't reach the server. Please try again in a moment.");
  }

  if (response.status === 401 && path !== "/api/admin/login") {
    clearToken();
    window.dispatchEvent(new Event(LOGGED_OUT_EVENT));
    throw new ApiError(401, "Please log in again.");
  }
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw toApiError(response.status, data.detail);
  }
  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}

export async function logIn(password: string) {
  const { token } = await request<{ token: string }>("POST", "/api/admin/login", { password });
  setToken(token);
}

export const api = {
  offers: () => request<AdminOffer[]>("GET", "/api/admin/offers"),
  createOffer: (offer: OfferInput) => request<AdminOffer>("POST", "/api/admin/offers", offer),
  updateOffer: (id: number, offer: OfferInput) => request<AdminOffer>("PUT", `/api/admin/offers/${id}`, offer),
  deleteOffer: (id: number) => request<void>("DELETE", `/api/admin/offers/${id}`),
  copyDay: (fromDate: string, toDate: string) =>
    request<AdminOffer[]>("POST", "/api/admin/offers/copy-day", { from_date: fromDate, to_date: toDate }),

  events: () => request<AdminEvent[]>("GET", "/api/admin/events"),
  createEvent: (event: EventInput) => request<AdminEvent>("POST", "/api/admin/events", event),
  updateEvent: (id: number, event: EventInput) => request<AdminEvent>("PUT", `/api/admin/events/${id}`, event),
  deleteEvent: (id: number) => request<void>("DELETE", `/api/admin/events/${id}`),

  categories: () => request<AdminCategory[]>("GET", "/api/admin/categories"),
  items: () => request<AdminItem[]>("GET", "/api/admin/items"),
  createItem: (item: ItemInput) => request<AdminItem>("POST", "/api/admin/items", item),
  updateItem: (id: number, item: ItemInput) => request<AdminItem>("PUT", `/api/admin/items/${id}`, item),
  deleteItem: (id: number) => request<void>("DELETE", `/api/admin/items/${id}`),
  /** Changes one price. The price may be typed as "6,90". */
  changePrice: (servingId: number, price: string | number) =>
    request<AdminServing>("PATCH", `/api/admin/servings/${servingId}`, { price }),
};
