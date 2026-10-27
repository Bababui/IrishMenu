import type { PubInfo } from "../types";

/** Shows a small "example content" note in the footer. Set to false once the real content is in. */
export const USES_EXAMPLE_CONTENT = true;

// Real: name, town, Instagram.
export const pub: PubInfo = {
  name: "Irish Pub",
  town: "Heilbronn",
  tagline: {
    de: "Guinness, Whiskey, Live-Musik & Fußball",
    en: "Guinness, whiskey, live music & football",
  },
  address: { street: "Musterstraße 1", city: "74072 Heilbronn" },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Musterstra%C3%9Fe+1+74072+Heilbronn",
  phone: "07131 000000",
  instagram: "irishpub_heilbronn",
  // Index 0 = Sunday, 1 = Monday ... 6 = Saturday. `null` = closed.
  hours: [
    { open: "15:00", close: "23:00" }, // Sunday
    null, // Monday
    { open: "17:00", close: "00:00" }, // Tuesday
    { open: "17:00", close: "00:00" }, // Wednesday
    { open: "17:00", close: "01:00" }, // Thursday
    { open: "16:00", close: "02:00" }, // Friday
    { open: "14:00", close: "02:00" }, // Saturday
  ],
  legal: {
    imprintUrl: "#impressum",
    privacyUrl: "#datenschutz",
  },
};
