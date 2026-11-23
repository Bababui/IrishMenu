import type { Offer, PubEvent, Weekday, WeekHours } from "../types";

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

/**
 * True for a special that is on every day the pub is open, like the Tasting-Brett.
 * Those don't earn a day its clover: the clover marks days with something extra.
 */
export function isEverydayOffer(offer: Offer, hours: WeekHours): boolean {
  const openDays = hours.flatMap((h, weekday) => (h ? [weekday as Weekday] : []));
  return openDays.length > 0 && openDays.every((d) => offer.weekdays?.includes(d));
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
