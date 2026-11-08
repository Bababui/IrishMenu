import { addDays, berlinNow } from "../lib/time";
import type { AdminEvent, AdminOffer } from "./types";

// Dates are "YYYY-MM-DD" strings everywhere, like the backend sends them.

export { addDays };

export function today(): string {
  return berlinNow().ymd;
}

/** 0 = Sunday ... 6 = Saturday */
export function weekdayOf(ymd: string): number {
  return new Date(`${ymd}T12:00:00Z`).getUTCDay();
}

const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function weekdayName(weekday: number): string {
  return WEEKDAY_NAMES[weekday];
}

function format(ymd: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...options }).format(new Date(`${ymd}T12:00:00Z`));
}

/** "Monday 9 November" */
export function longDate(ymd: string): string {
  return format(ymd, { weekday: "long", day: "numeric", month: "long" });
}

/** "Mon" */
export function shortWeekday(ymd: string): string {
  return format(ymd, { weekday: "short" });
}

/** "Nov" */
export function shortMonth(ymd: string): string {
  return format(ymd, { month: "short" });
}

export function dayNumber(ymd: string): number {
  return Number(ymd.slice(8, 10));
}

/** The Monday of the week that contains this day. */
export function mondayOf(ymd: string): string {
  return addDays(ymd, -((weekdayOf(ymd) + 6) % 7));
}

/** "Today", "Tomorrow", "Yesterday" or null */
export function relativeName(ymd: string): string | null {
  const now = today();
  if (ymd === now) return "Today";
  if (ymd === addDays(now, 1)) return "Tomorrow";
  if (ymd === addDays(now, -1)) return "Yesterday";
  return null;
}

/** Specials shown on that day: one-off ones dated that day, plus weekly ones for that weekday. */
export function offersOn(offers: AdminOffer[], ymd: string): AdminOffer[] {
  const weekday = weekdayOf(ymd);
  return offers.filter((offer) => offer.date === ymd || (offer.date === null && offer.weekdays.includes(weekday)));
}

export function eventsOn(events: AdminEvent[], ymd: string): AdminEvent[] {
  return events
    .filter((event) => event.date === ymd)
    .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
}

/** 5.5 -> "5,50 €" */
export function euros(value: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}

/** 5.5 -> "5,50" for a price field the boss can edit */
export function priceField(value: number | null): string {
  return value === null ? "" : value.toFixed(2).replace(".", ",");
}

/** "Every Tuesday" or "Every Friday and Saturday" */
export function weeklyLabel(weekdays: number[]): string {
  const ordered = [1, 2, 3, 4, 5, 6, 0].filter((day) => weekdays.includes(day)).map(weekdayName);
  if (ordered.length === 7) return "Every day";
  if (ordered.length <= 1) return `Every ${ordered[0] ?? ""}`;
  return `Every ${ordered.slice(0, -1).join(", ")} and ${ordered[ordered.length - 1]}`;
}
