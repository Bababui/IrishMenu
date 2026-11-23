import { useEffect, useState } from "react";
import type { Lang } from "./types";

// All fixed interface texts in both languages.
// Content texts (drinks, offers, events) live in src/content.
export const ui = {
  de: {
    navToday: "Heute",
    navMenu: "Karte",
    navEvents: "Events",
    navHours: "Zeiten",
    todayTitle: "Angebote",
    recommendTitle: "Beliebteste Produkte",
    menuTitle: "Karte",
    eventsTitle: "Events",
    hoursTitle: "Öffnungszeiten",
    visitTitle: "Besuch uns",
    filterLabel: "Kategorie wählen",
    openNow: "Jetzt geöffnet",
    closedNow: "Geschlossen",
    until: "bis",
    opensToday: "öffnet heute um",
    opensTomorrow: "öffnet morgen um",
    opensOn: "öffnet",
    at: "um",
    regularPrice: "statt",
    noOffers:
      "Heute gibt es keine Specials. Frag an der Bar nach dem Tipp des Tages.",
    noEvents:
      "Gerade sind keine Events geplant. Neuigkeiten gibt's auf Instagram.",
    today: "Heute",
    pickDay: "Tag wählen",
    noOffersYet: "Noch keine Specials angekündigt – schau am Tag nochmal rein.",
    closedDayNote: "Ruhetag – an diesem Tag haben wir geschlossen.",
    special: "Special",
    specials: "Specials",
    tomorrow: "Morgen",
    closedDay: "Ruhetag",
    instagramCta: "Folge uns auf Instagram",
    directions: "Route planen",
    call: "Anrufen",
    cashOnly: "Nur Barzahlung",
    cashOnlyDetail: "Keine Kartenzahlung möglich.",
    imprint: "Impressum",
    privacy: "Datenschutz",
    langLabel: "Sprache",
    exampleNote: "Beispielinhalte – vor dem Start ersetzen",
  },
  en: {
    navToday: "Today",
    navMenu: "Menu",
    navEvents: "Events",
    navHours: "Hours",
    todayTitle: "Specials",
    recommendTitle: "Most popular",
    menuTitle: "Menu",
    eventsTitle: "Events",
    hoursTitle: "Opening hours",
    visitTitle: "Visit us",
    filterLabel: "Choose a category",
    openNow: "Open now",
    closedNow: "Closed",
    until: "until",
    opensToday: "opens today at",
    opensTomorrow: "opens tomorrow at",
    opensOn: "opens",
    at: "at",
    regularPrice: "instead of",
    noOffers: "No specials today. Ask at the bar for the tip of the day.",
    noEvents: "No events planned right now. Follow us on Instagram for news.",
    today: "Today",
    pickDay: "Pick a day",
    noOffersYet: "No specials announced yet – check back on the day.",
    closedDayNote: "We're closed on this day.",
    special: "special",
    specials: "specials",
    tomorrow: "Tomorrow",
    closedDay: "Closed",
    instagramCta: "Follow us on Instagram",
    directions: "Get directions",
    call: "Call us",
    cashOnly: "Cash only",
    cashOnlyDetail: "We can't take cards.",
    imprint: "Legal notice",
    privacy: "Privacy",
    langLabel: "Language",
    exampleNote: "Example content – replace before launch",
  },
} satisfies Record<Lang, Record<string, string>>;

export type UiText = (typeof ui)["de"];

/**
 * Current language + a setter. Every visit starts in German; guests switch to English
 * with the DE | EN toggle. The choice is not remembered, so the next visit is German again.
 */
export function useLang() {
  const [lang, setLang] = useState<Lang>("de");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return [lang, setLang] as const;
}
