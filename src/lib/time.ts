import type { DayHours, WeekHours, Weekday } from "../types";

// The pub is in Germany, so "now" always means Berlin time,
// even if a tourist's phone is still set to another time zone.
const TZ = "Europe/Berlin";

/** Before this hour, it still counts as the previous pub day (Friday night at 01:30 is still "Friday"). */
const DAY_ROLLOVER_HOUR = 5;

export type Now = {
  /** 0 = Sunday ... 6 = Saturday */
  weekday: Weekday;
  /** Minutes since midnight, e.g. 20:30 -> 1230 */
  minutes: number;
  /** Calendar date as "YYYY-MM-DD" */
  ymd: string;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function berlinNow(date = new Date()): Now {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  return {
    weekday: WEEKDAYS.indexOf(get("weekday")) as Weekday,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
    ymd: `${get("year")}-${get("month")}-${get("day")}`,
  };
}

/** Adds (or subtracts) whole days to a "YYYY-MM-DD" date. */
export function addDays(ymd: string, days: number): string {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** The "pub day": after midnight but before 05:00 it is still yesterday. */
export function pubDay(now: Now): { weekday: Weekday; ymd: string } {
  if (now.minutes >= DAY_ROLLOVER_HOUR * 60)
    return { weekday: now.weekday, ymd: now.ymd };
  return {
    weekday: ((now.weekday + 6) % 7) as Weekday,
    ymd: addDays(now.ymd, -1),
  };
}

/** "17:30" -> 1050 */
export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Start and end in minutes after that day's midnight. A closing time after midnight ends up > 1440. */
function interval(hours: NonNullable<DayHours>): [number, number] {
  const start = toMinutes(hours.open);
  let end = toMinutes(hours.close);
  if (end <= start) end += 24 * 60;
  return [start, end];
}

export type OpenStatus =
  | { open: true; closesAt: string }
  | {
      open: false;
      next: { weekday: Weekday; time: string; inDays: number } | null;
    };

export function openStatus(hours: WeekHours, now: Now): OpenStatus {
  const today = hours[now.weekday];
  if (today) {
    const [start, end] = interval(today);
    if (now.minutes >= start && now.minutes < end)
      return { open: true, closesAt: today.close };
  }

  // Still open from yesterday's late night?
  const yesterday = hours[(now.weekday + 6) % 7];
  if (yesterday) {
    const [, end] = interval(yesterday);
    if (now.minutes + 24 * 60 < end)
      return { open: true, closesAt: yesterday.close };
  }

  // Closed: find the next opening time.
  if (today && now.minutes < interval(today)[0]) {
    return {
      open: false,
      next: { weekday: now.weekday, time: today.open, inDays: 0 },
    };
  }
  for (let i = 1; i <= 7; i++) {
    const weekday = ((now.weekday + i) % 7) as Weekday;
    const day = hours[weekday];
    if (day)
      return { open: false, next: { weekday, time: day.open, inDays: i } };
  }
  return { open: false, next: null };
}
