import type { Lang, Translatable } from "../types";

const LOCALE: Record<Lang, string> = { de: "de-DE", en: "en-IE" };

/** Picks the right language: "Guinness" stays "Guinness", { de, en } gives de or en. */
export function localize(text: Translatable, lang: Lang): string {
  return typeof text === "string" ? text : text[lang];
}

/** 6.5 -> "6,50 €" (German) or "€6.50" (English) */
export function formatPrice(value: number, lang: Lang): string {
  return value.toLocaleString(LOCALE[lang], {
    style: "currency",
    currency: "EUR",
  });
}

/** "2026-10-29" -> parts for the event date tile, e.g. { weekday: "Do.", day: "29", month: "Okt." } */
export function dateParts(ymd: string, lang: Lang) {
  // Noon UTC so the date never shifts by a day because of time zones.
  const d = new Date(`${ymd}T12:00:00Z`);
  const fmt = (options: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString(LOCALE[lang], { timeZone: "UTC", ...options });
  return {
    weekday: fmt({ weekday: "short" }),
    day: fmt({ day: "numeric" }),
    month: fmt({ month: "short" }),
  };
}

/** "2026-10-26" -> "Montag, 26. Oktober" / "Monday 26 October" */
export function longDate(ymd: string, lang: Lang): string {
  const d = new Date(`${ymd}T12:00:00Z`);
  return d.toLocaleDateString(LOCALE[lang], {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** Weekday name for 0 = Sunday ... 6 = Saturday. */
export function weekdayName(
  weekday: number,
  lang: Lang,
  style: "long" | "short" = "long",
): string {
  // 2026-10-25 was a Sunday, so adding `weekday` days gives the right name.
  const d = new Date(Date.UTC(2026, 9, 25 + weekday, 12));
  return d.toLocaleDateString(LOCALE[lang], {
    timeZone: "UTC",
    weekday: style,
  });
}

/** "20:00" -> "20:00 Uhr" in German, unchanged in English. */
export function formatTime(hhmm: string, lang: Lang): string {
  return lang === "de" ? `${hhmm} Uhr` : hhmm;
}
