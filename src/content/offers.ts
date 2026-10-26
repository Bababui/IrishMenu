import type { Offer } from "../types";

// ⚠️ EXAMPLE CONTENT. An offer shows on the listed dates ("YYYY-MM-DD"),
// or every week on the listed weekdays (0 = Sunday ... 6 = Saturday).
export const offers: Offer[] = [
  {
    id: "guinness-tuesday",
    title: { de: "Guinness 0,5 l", en: "Guinness pint (0.5 l)" },
    price: 5.0,
    regularPrice: 6.5,
    weekdays: [2],
  },
  {
    id: "whiskey-wednesday",
    title: { de: "Whiskey-Mittwoch", en: "Whiskey Wednesday" },
    note: { de: "Alle Irish Whiskeys 4 cl", en: "All Irish whiskeys, 4 cl" },
    price: 5.0,
    weekdays: [3],
  },
  {
    id: "quiz-pitcher",
    title: { de: "Quiz-Pitcher Harp", en: "Quiz pitcher of Harp" },
    note: { de: "1,5 l für dein Quiz-Team", en: "1.5 l for your quiz team" },
    price: 15.0,
    weekdays: [4],
  },
  {
    id: "happy-hour",
    title: { de: "Happy Hour 17–19 Uhr", en: "Happy hour 5–7 pm" },
    note: { de: "Alle Longdrinks", en: "All long drinks" },
    price: 6.0,
    regularPrice: 8.5,
    weekdays: [5, 6],
  },
  {
    id: "sunday-coffee",
    title: { de: "Irish Coffee", en: "Irish Coffee" },
    note: { de: "Den ganzen Sonntag", en: "All day Sunday" },
    price: 6.0,
    regularPrice: 7.5,
    weekdays: [0],
  },
];
