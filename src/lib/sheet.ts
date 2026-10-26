import type { Offer, PubEvent, Weekday } from "../types";

// Reads today's specials and events from the pub's Google Sheet.
// The sheet is fetched through our own server function (/api/sheet, see netlify/functions),
// so guests' phones never talk to Google directly.

/** Turns CSV text into rows of cells. Handles quotes, commas and line breaks inside quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

/** First row = column names. Returns one object per row, keyed by lower-case column name. */
function toRecords(rows: string[][]): Record<string, string>[] {
  const [header, ...body] = rows;
  if (!header) return [];
  const keys = header.map((h) => h.trim().toLowerCase());
  return body.map((cells) =>
    Object.fromEntries(keys.map((key, i) => [key, (cells[i] ?? "").trim()])),
  );
}

/** Accepts "27.10.2026", "27.10.26" or "2026-10-27". Returns "YYYY-MM-DD" or null. */
export function parseDate(value: string): string | null {
  const iso = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso)
    return `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;
  const de = value.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2}|\d{4})$/);
  if (de) {
    const year = de[3].length === 2 ? `20${de[3]}` : de[3];
    return `${year}-${de[2].padStart(2, "0")}-${de[1].padStart(2, "0")}`;
  }
  return null;
}

const DAY_CODES: Record<string, Weekday> = {
  so: 0,
  su: 0,
  mo: 1,
  di: 2,
  tu: 2,
  mi: 3,
  we: 3,
  do: 4,
  th: 4,
  fr: 5,
  sa: 6,
};

/** "Di, Do" or "Dienstag" or "täglich" -> weekday numbers. */
export function parseWeekdays(value: string): Weekday[] {
  const v = value.toLowerCase();
  if (!v) return [];
  if (v.includes("täglich") || v.includes("jeden tag") || v.includes("daily")) {
    return [0, 1, 2, 3, 4, 5, 6];
  }
  return v
    .split(/[,;/ ]+/)
    .map((part) => DAY_CODES[part.slice(0, 2)])
    .filter((d): d is Weekday => d !== undefined);
}

/** "5", "5,50", "5,50 €" -> 5.5. Empty or invalid -> undefined. */
export function parsePrice(value: string): number | undefined {
  const cleaned = value.replace(/[^\d,.]/g, "").replace(",", ".");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

// Column names in the sheet (case doesn't matter). English columns are optional:
// if empty, the German text is used for both languages.
export function toOffers(csv: string): Offer[] {
  return toRecords(parseCsv(csv))
    .filter((r) => r["titel"])
    .map((r, i) => {
      const date = parseDate(r["datum"] ?? "");
      return {
        id: `sheet-offer-${i}`,
        title: { de: r["titel"], en: r["title (en)"] || r["titel"] },
        note: r["info"]
          ? { de: r["info"], en: r["info (en)"] || r["info"] }
          : undefined,
        price: parsePrice(r["preis"] ?? ""),
        regularPrice: parsePrice(r["statt"] ?? ""),
        dates: date ? [date] : undefined,
        weekdays: parseWeekdays(r["wochentage"] ?? ""),
      };
    });
}

export function toEvents(csv: string): PubEvent[] {
  return toRecords(parseCsv(csv))
    .map((r, i) => ({ r, i, date: parseDate(r["datum"] ?? "") }))
    .filter(({ r, date }) => r["titel"] && date)
    .map(({ r, i, date }) => ({
      id: `sheet-event-${i}`,
      date: date as string,
      time: /^\d{1,2}:\d{2}$/.test(r["uhrzeit"] ?? "")
        ? r["uhrzeit"].padStart(5, "0")
        : undefined,
      title: { de: r["titel"], en: r["title (en)"] || r["titel"] },
      description: r["info"]
        ? { de: r["info"], en: r["info (en)"] || r["info"] }
        : undefined,
    }));
}

/** Fetches one tab as CSV. Returns null if the sheet isn't set up or can't be reached. */
export async function fetchSheet(
  tab: "offers" | "events",
): Promise<string | null> {
  try {
    const res = await fetch(`/api/sheet?tab=${tab}`);
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.includes("text/csv")) return null;
    return await res.text();
  } catch {
    return null;
  }
}
