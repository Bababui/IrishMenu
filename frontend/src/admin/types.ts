// The shapes the admin endpoints send and receive (see backend/app/schemas.py).
// English is required, German is only filled in when it's different.

export type AdminOffer = {
  id: number;
  title_en: string;
  title_de: string | null;
  note_en: string | null;
  note_de: string | null;
  price: number | null;
  regular_price: number | null;
  /** "YYYY-MM-DD" for a one-off special, null for a weekly one */
  date: string | null;
  /** 0 = Sunday ... 6 = Saturday */
  weekdays: number[];
};

/** What we send to create or change a special. Prices may be typed as "5,50". */
export type OfferInput = Omit<AdminOffer, "id" | "price" | "regular_price"> & {
  price: string | number | null;
  regular_price: string | number | null;
};

export type AdminEvent = {
  id: number;
  date: string;
  /** "20:00:00" or null */
  time: string | null;
  title_en: string;
  title_de: string | null;
  description_en: string | null;
  description_de: string | null;
};

export type EventInput = Omit<AdminEvent, "id">;
