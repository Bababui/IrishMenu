import type { PubEvent } from "../types";

// ⚠️ EXAMPLE CONTENT. Past events hide themselves automatically.
export const events: PubEvent[] = [
  {
    id: "quiz-1029",
    date: "2026-10-29",
    time: "20:00",
    title: { de: "Pub Quiz", en: "Pub Quiz" },
    description: {
      de: "Teams bis 6 Personen, Anmeldung an der Bar",
      en: "Teams of up to 6, sign up at the bar",
    },
  },
  {
    id: "halloween-1031",
    date: "2026-10-31",
    time: "21:00",
    title: { de: "Halloween Night", en: "Halloween Night" },
    description: { de: "DJ, Kostüm-Wettbewerb", en: "DJ and costume contest" },
  },
  {
    id: "live-1107",
    date: "2026-11-07",
    time: "21:00",
    title: { de: "Live: Irish Folk", en: "Live: Irish folk" },
    description: { de: "Eintritt frei", en: "Free entry" },
  },
  {
    id: "rugby-1114",
    date: "2026-11-14",
    time: "15:00",
    title: {
      de: "Rugby live: Irland – Australien",
      en: "Rugby live: Ireland v Australia",
    },
    description: { de: "Auf allen Bildschirmen", en: "On every screen" },
  },
];
