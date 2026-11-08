import type { PubEvent } from "../types";

// Regular events. Past dates hide themselves automatically.
// One-off events will come from the admin panel later.

/**
 * The nth weekday of a month as "YYYY-MM-DD",
 * e.g. nthWeekday(2026, 10, 4, 2) = 2nd Thursday of November 2026.
 * month: 0 = January (may run past 11, then it rolls into the next year).
 * weekday: 0 = Sunday ... 6 = Saturday, same numbering as JavaScript's Date.
 */
function nthWeekday(
  year: number,
  month: number,
  weekday: number,
  n: number,
): string {
  const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const day = 1 + ((weekday - firstDay + 7) % 7) + (n - 1) * 7;
  return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
}

/** Karaoke on the 2nd Thursday of this month and the next ones. */
function karaokeNights(months: number): PubEvent[] {
  const today = new Date();
  return Array.from({ length: months }, (_, i) => {
    const date = nthWeekday(today.getFullYear(), today.getMonth() + i, 4, 2);
    return {
      id: `karaoke-${date}`,
      date,
      time: "19:00",
      title: { de: "Karaoke", en: "Karaoke" },
      description: {
        de: "Jeden 2. Donnerstag im Monat",
        en: "Every 2nd Thursday of the month",
      },
    };
  });
}

export const events: PubEvent[] = [...karaokeNights(4)];
