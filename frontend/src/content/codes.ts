import type { Code, MenuItem } from "../types";

// What the codes next to drinks and dishes mean, exactly as in the legend of the paper menu.
// Numbers = additives (Zusatzstoffe), letters = allergens (Allergene).
//
// Taken from the legend at the bottom of the paper menu ("Enthält: 1 Koffein ...").
// C: the paper menu says "Sulphide"; the legal allergen name is "Sulfite", used here.
//
// HOW TO CHANGE: write the German text from the paper menu into `de`.
// `en` is optional; if it stays empty, English guests see the German text.
//
// The legend on the menu page stays hidden until every code that is used on the menu
// has its German text here, so guests never see a half-finished legend.

export type CodeMeaning = { code: Code; de: string; en: string };

export const ADDITIVES: CodeMeaning[] = [
  { code: "1", de: "Koffein", en: "Caffeine" },
  { code: "2", de: "Chinin", en: "Quinine" },
  { code: "3", de: "Lebensmittelfarbstoffe", en: "Food colouring" },
  { code: "4", de: "Süßungsmittel", en: "Sweeteners" },
  { code: "5", de: "Phosphat", en: "Phosphate" },
  { code: "6", de: "Konservierungsstoffe", en: "Preservatives" },
  { code: "7", de: "Geschmacksverstärker", en: "Flavour enhancers" },
  { code: "8", de: "Antioxidationsmittel", en: "Antioxidants" },
  { code: "9", de: "Aromastoffe", en: "Flavourings" },
];

export const ALLERGENS: CodeMeaning[] = [
  { code: "A", de: "Gluten", en: "Gluten" },
  { code: "B", de: "Milch", en: "Milk" },
  { code: "C", de: "Schwefeldioxid und Sulfite", en: "Sulphur dioxide and sulphites" },
  { code: "D", de: "Sellerie", en: "Celery" },
  { code: "E", de: "Senf", en: "Mustard" },
  { code: "F", de: "Sesamsamen", en: "Sesame seeds" },
  { code: "G", de: "Ei", en: "Egg" },
  { code: "H", de: "Lupine", en: "Lupin" },
  { code: "I", de: "Sojabohnen", en: "Soybeans" },
];

/** The meaning of one code, or "" if it hasn't been filled in yet. English falls back to German. */
export function meaningOf(code: string, lang: "de" | "en"): string {
  const entry = [...ADDITIVES, ...ALLERGENS].find((c) => c.code === code);
  if (!entry) return "";
  return (lang === "en" && entry.en.trim()) || entry.de.trim();
}

/** True when every code used on this menu has its German text, so the legend can be shown. */
export function legendIsComplete(items: MenuItem[]): boolean {
  const used = new Set(items.flatMap((item) => item.codes ?? []));
  return used.size > 0 && [...used].every((code) => meaningOf(code, "de") !== "");
}
