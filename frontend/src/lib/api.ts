import type { MenuItem, Offer, PubEvent } from "../types";

// Reads the live menu, specials and events from our Python backend.
// In development Vite forwards /api to localhost:8000 (see vite.config.ts).

/** Fetches one endpoint. Returns null if the backend can't be reached or answers with an error. */
async function getJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(path);
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null; // offline, backend down, ...
  }
}

export type LiveContent = {
  items?: MenuItem[];
  offers?: Offer[];
  events?: PubEvent[];
};

/** Everything at once. A part that fails stays undefined, so the page can use its built-in copy. */
export async function fetchLiveContent(): Promise<LiveContent> {
  const [menu, offers, events] = await Promise.all([
    getJson<{ items: MenuItem[] }>("/api/menu"),
    getJson<Offer[]>("/api/offers"),
    getJson<PubEvent[]>("/api/events"),
  ]);
  return {
    items: menu?.items,
    offers: offers ?? undefined,
    events: events ?? undefined,
  };
}
