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
    todayTitle: "Heute",
    menuTitle: "Karte",
    eventsTitle: "Events",
    hoursTitle: "Öffnungszeiten",
    visitTitle: "Besuch uns",
    filterLabel: "Kategorie wählen",
    openNow: "Jetzt geöffnet",
    closedNow: "Geschlossen",
    until: "bis",
    midnight: "Mitternacht",
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
    tomorrow: "Morgen",
    closedDay: "Ruhetag",
    instagramCta: "Folge uns auf Instagram",
    directions: "Route planen",
    call: "Anrufen",
    orderAtBar: "Bestellt und bezahlt wird an der Bar.",
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
    todayTitle: "Today",
    menuTitle: "Menu",
    eventsTitle: "Events",
    hoursTitle: "Opening hours",
    visitTitle: "Visit us",
    filterLabel: "Choose a category",
    openNow: "Open now",
    closedNow: "Closed",
    until: "until",
    midnight: "midnight",
    opensToday: "opens today at",
    opensTomorrow: "opens tomorrow at",
    opensOn: "opens",
    at: "at",
    regularPrice: "instead of",
    noOffers: "No specials today. Ask at the bar for the tip of the day.",
    noEvents: "No events planned right now. Follow us on Instagram for news.",
    today: "Today",
    tomorrow: "Tomorrow",
    closedDay: "Closed",
    instagramCta: "Follow us on Instagram",
    directions: "Get directions",
    call: "Call us",
    orderAtBar: "Order and pay at the bar.",
    imprint: "Legal notice",
    privacy: "Privacy",
    langLabel: "Language",
    exampleNote: "Example content – replace before launch",
  },
} satisfies Record<Lang, Record<string, string>>;

export type UiText = (typeof ui)["de"];

const STORAGE_KEY = "pub-lang";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "de" || saved === "en") return saved;
  } catch {
    // Storage can be blocked (private mode). Fall through to the browser language.
  }
  return navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
}

/** Current language + a setter. Remembers the choice and updates <html lang>. */
export function useLang() {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Not critical if it can't be saved.
    }
  }, [lang]);

  return [lang, setLang] as const;
}
