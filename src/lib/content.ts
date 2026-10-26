import type { Offer, PubEvent, Weekday } from "../types";

/** Offers that apply on the given pub day (by date or by weekday). */
export function offersForDay(
  offers: Offer[],
  day: { weekday: Weekday; ymd: string },
): Offer[] {
  return offers.filter(
    (offer) =>
      offer.dates?.includes(day.ymd) || offer.weekdays?.includes(day.weekday),
  );
}

/** Events from today onwards, soonest first. */
export function upcomingEvents(
  events: PubEvent[],
  todayYmd: string,
  limit = 6,
): PubEvent[] {
  return events
    .filter((event) => event.date >= todayYmd) // "YYYY-MM-DD" strings sort like dates
    .sort((a, b) =>
      (a.date + (a.time ?? "")).localeCompare(b.date + (b.time ?? "")),
    )
    .slice(0, limit);
}
