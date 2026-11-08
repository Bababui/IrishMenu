import type { Offer } from "../types";

// Today's specials. An offer shows on the listed dates ("YYYY-MM-DD"),
// or every week on the listed weekdays (0 = Sunday ... 6 = Saturday).
// For now one example from the printed menu; the admin panel will manage these later.
export const offers: Offer[] = [
  {
    id: "tasting-board",
    title: { de: "Tasting-Brett", en: "Tasting board" },
    note: {
      de: "Guinness, Kilkenny & Hop House 13, je 0,2 l",
      en: "Guinness, Kilkenny & Hop House 13, 0.2 l each",
    },
    price: 7.5,
    weekdays: [1, 2, 3, 4, 5, 6],
  },
];
