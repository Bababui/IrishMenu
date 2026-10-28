import type { PubInfo } from "../types";

/** Shows a small "example content" note in the footer. Set to false once the real content is in. */
export const USES_EXAMPLE_CONTENT = false;

export const pub: PubInfo = {
  name: "Irish Pub",
  town: "Heilbronn",
  tagline: {
    de: "Guinness, Whiskey, Live-Musik & Fußball",
    en: "Guinness, whiskey, live music & football",
  },
  address: { street: "Lammgasse 30", city: "74072 Heilbronn" },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Irish+Pub+Lammgasse+30+74072+Heilbronn",
  phone: "07131 8736336",
  instagram: "irishpub_heilbronn",
  // Index 0 = Sunday, 1 = Monday ... 6 = Saturday. `null` = closed.
  hours: [
    null, // Sunday: closed
    { open: "18:00", close: "00:00" }, // Monday
    { open: "18:00", close: "00:00" }, // Tuesday
    { open: "18:00", close: "00:00" }, // Wednesday
    { open: "18:00", close: "00:00" }, // Thursday
    { open: "18:00", close: "02:00" }, // Friday
    { open: "18:00", close: "02:00" }, // Saturday
  ],
  // TODO: Impressum & Datenschutz pages are still missing (legally needed before launch).
  legal: {
    imprintUrl: "#impressum",
    privacyUrl: "#datenschutz",
  },
};
