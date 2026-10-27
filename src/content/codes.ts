import type { Code, Localized } from "../types";

/**
 * What the small codes after a name mean (the legend from the printed menu).
 * Numbers = additives, letters = allergens.
 */
export const CODE_LEGEND: Record<Code, Localized> = {
  "1": { de: "Koffein", en: "Caffeine" },
  "2": { de: "Chinin", en: "Quinine" },
  "3": { de: "Lebensmittelfarbstoffe", en: "Food colouring" },
  "4": { de: "Süßungsmittel", en: "Sweeteners" },
  "5": { de: "Phosphat", en: "Phosphate" },
  "6": { de: "Konservierungsstoffe", en: "Preservatives" },
  "7": { de: "Geschmacksverstärker", en: "Flavour enhancers" },
  "8": { de: "Antioxidationsmittel", en: "Antioxidants" },
  "9": { de: "Aromastoffe", en: "Flavourings" },
  A: { de: "Gluten", en: "Gluten" },
  B: { de: "Milch", en: "Milk" },
  C: { de: "Schwefeldioxid und Sulfite", en: "Sulphur dioxide and sulphites" },
  D: { de: "Sellerie", en: "Celery" },
  E: { de: "Senf", en: "Mustard" },
  F: { de: "Sesam", en: "Sesame" },
  G: { de: "Ei", en: "Egg" },
  H: { de: "Lupine", en: "Lupin" },
  I: { de: "Soja", en: "Soy" },
};
