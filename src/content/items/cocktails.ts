import type { MenuItem, Serving } from "../../types";

// Group "Cocktails": cocktails with alcohol and long drinks.

/** Every long drink comes in the same two sizes for the same prices. */
const LONGDRINK: Serving[] = [
  { label: "0,25 l", price: 5.0 },
  { label: "0,3 l", price: 8.0 },
];

export const cocktails: MenuItem[] = [
  // --- Cocktails ---
  {
    id: "anabulika",
    name: "Anabulika",
    category: "cocktail",
    description: {
      de: "Wodka, Whisky, Orangensaft, Energy-Drink",
      en: "Vodka, whisky, orange juice, energy drink",
    },
    codes: ["1"],
    servings: [{ label: "0,3 l", price: 9.0 }],
  },
  {
    id: "caipirinha",
    name: "Caipirinha",
    category: "cocktail",
    description: {
      de: "Cachaça, Zitronensaft, Rohrzucker, Limetten",
      en: "Cachaça, lemon juice, cane sugar, limes",
    },
    servings: [{ label: "0,4 l", price: 12.0 }],
  },
  {
    id: "cosmopolitan",
    name: "Cosmopolitan",
    category: "cocktail",
    description: {
      de: "Wodka, Triple Sec, Cranberry-Nektar, Zitronensaft",
      en: "Vodka, triple sec, cranberry nectar, lemon juice",
    },
    servings: [{ label: "0,3 l", price: 9.0 }],
  },
  {
    id: "irish-dream",
    name: "Irish Dream",
    category: "cocktail",
    description: {
      de: "Whisky, Orangenlikör, Grenadine, Orangensaft, Zitronensaft",
      en: "Whisky, orange liqueur, grenadine, orange juice, lemon juice",
    },
    codes: ["3"],
    servings: [{ label: "0,3 l", price: 9.0 }],
  },
  {
    id: "lady-love",
    name: "Lady Love",
    category: "cocktail",
    description: {
      de: "Sekt, Ficken, Grenadine, Orangensaft, Ananassaft",
      en: "Sparkling wine, Ficken, grenadine, orange juice, pineapple juice",
    },
    codes: ["3", "8", "C"],
    servings: [{ label: "0,3 l", price: 9.0 }],
  },
  {
    id: "long-island-iced-tea",
    name: "Long Island Iced Tea",
    category: "cocktail",
    description: {
      de: "Gin, Wodka, Tequila, Cointreau, Rum, Zitronensaft, Orangensaft, Cola",
      en: "Gin, vodka, tequila, Cointreau, rum, lemon juice, orange juice, cola",
    },
    codes: ["1", "3", "5", "8"],
    servings: [{ label: "0,4 l", price: 12.0 }],
  },
  {
    id: "mojito",
    name: "Mojito",
    category: "cocktail",
    description: {
      de: "Havana, Minze, Limette, brauner Zucker",
      en: "Havana rum, mint, lime, brown sugar",
    },
    servings: [{ label: "0,4 l", price: 12.0 }],
  },
  {
    id: "pina-colada",
    name: "Piña Colada",
    category: "cocktail",
    description: {
      de: "Weißer Rum, Ananassaft, Kokossirup, Sahne",
      en: "White rum, pineapple juice, coconut syrup, cream",
    },
    codes: ["8", "B"],
    servings: [{ label: "0,3 l", price: 8.5 }],
  },
  {
    id: "planters-punch",
    name: "Planters Punch",
    category: "cocktail",
    description: {
      de: "Brauner Rum, Zitronensaft, Orangensaft, Zuckersirup",
      en: "Dark rum, lemon juice, orange juice, sugar syrup",
    },
    servings: [{ label: "0,3 l", price: 8.5 }],
  },
  {
    id: "sex-on-the-beach",
    name: "Sex on the Beach",
    category: "cocktail",
    description: {
      de: "Wodka, Pfirsichlikör, Cranberry-Nektar, Orangensaft",
      en: "Vodka, peach liqueur, cranberry nectar, orange juice",
    },
    servings: [{ label: "0,3 l", price: 9.0 }],
  },
  {
    id: "silent-death",
    name: "Silent Death",
    category: "cocktail",
    description: {
      de: "Wodka, Rum, Tequila, Ficken, Triple Sec, Mango-Nektar, Maracuja-Nektar",
      en: "Vodka, rum, tequila, Ficken, triple sec, mango nectar, passion fruit nectar",
    },
    codes: ["8"],
    servings: [{ label: "0,4 l", price: 12.0 }],
  },
  {
    id: "swimming-pool",
    name: "Swimming Pool",
    category: "cocktail",
    description: {
      de: "Wodka, Blue Curaçao, Kokossirup, Ananassaft, Sahne",
      en: "Vodka, blue curaçao, coconut syrup, pineapple juice, cream",
    },
    codes: ["8", "B"],
    servings: [{ label: "0,3 l", price: 9.0 }],
  },
  {
    id: "tequila-sunrise",
    name: "Tequila Sunrise",
    category: "cocktail",
    description: {
      de: "Tequila, Zitronensaft, Orangensaft, Grenadine",
      en: "Tequila, lemon juice, orange juice, grenadine",
    },
    servings: [{ label: "0,3 l", price: 8.5 }],
  },
  {
    id: "zombie",
    name: "Zombie",
    category: "cocktail",
    description: {
      de: "Weißer Rum, Apricot Brandy, Grenadine, Orangensaft, Maracuja-Nektar",
      en: "White rum, apricot brandy, grenadine, orange juice, passion fruit nectar",
    },
    servings: [{ label: "0,3 l", price: 9.0 }],
  },
  {
    id: "pitcher-cocktail",
    name: { de: "Pitcher-Cocktail 1,5 l", en: "Pitcher cocktail 1,5 l" },
    category: "cocktail",
    description: {
      de: "Preis je nach Cocktail, außer Caipirinha & Mojito",
      en: "Price depends on the cocktail, except Caipirinha & Mojito",
    },
    servings: [
      { label: { de: "Cocktail à 8,50 €", en: "€8.50 cocktail" }, price: 34.0 },
      { label: { de: "Cocktail à 9,00 €", en: "€9.00 cocktail" }, price: 36.0 },
      {
        label: { de: "Cocktail à 12,00 €", en: "€12.00 cocktail" },
        price: 48.0,
      },
    ],
  },

  // --- Longdrinks ---
  {
    id: "captain-morgan-cola",
    name: "Captain Morgan Cola",
    category: "longdrink",
    codes: ["1", "3", "5", "8"],
    servings: LONGDRINK,
  },
  {
    id: "cuba-libre",
    name: "Cuba Libre",
    category: "longdrink",
    codes: ["1", "3", "5", "8"],
    servings: LONGDRINK,
  },
  {
    id: "ficken-longdrink",
    name: "Ficken",
    category: "longdrink",
    description: {
      de: "Kirsch, Mango, Maracuja oder Orange",
      en: "Cherry, mango, passion fruit or orange",
    },
    codes: ["8"],
    servings: LONGDRINK,
  },
  {
    id: "gin-tonic",
    name: "Gin Tonic",
    category: "longdrink",
    codes: ["2"],
    servings: LONGDRINK,
  },
  {
    id: "hugo",
    name: "Hugo",
    category: "longdrink",
    description: {
      de: "Holundersirup, Prosecco, Limette, Minze",
      en: "Elderflower syrup, prosecco, lime, mint",
    },
    codes: ["C"],
    servings: LONGDRINK,
  },
  {
    id: "jaeger-cola",
    name: "Jäger Cola",
    category: "longdrink",
    codes: ["1", "3", "5", "8"],
    servings: LONGDRINK,
  },
  {
    id: "jaeger-energy",
    name: "Jäger Energy",
    category: "longdrink",
    codes: ["1", "3"],
    servings: LONGDRINK,
  },
  {
    id: "rum-cola",
    name: "Rum Cola",
    category: "longdrink",
    codes: ["1", "3", "5", "8"],
    servings: LONGDRINK,
  },
  {
    id: "spritz",
    name: "Spritz",
    category: "longdrink",
    description: {
      de: "Aperol, Prosecco, Soda",
      en: "Aperol, prosecco, soda",
    },
    codes: ["2", "3", "C"],
    servings: LONGDRINK,
  },
  {
    id: "southern-comfort-lemonade",
    name: {
      de: "Southern Comfort mit Limonade",
      en: "Southern Comfort & lemonade",
    },
    category: "longdrink",
    servings: LONGDRINK,
  },
  {
    id: "vodka-energy",
    name: { de: "Wodka Energy", en: "Vodka Energy" },
    category: "longdrink",
    codes: ["1", "3"],
    servings: LONGDRINK,
  },
  {
    id: "vodka-lemon",
    name: { de: "Wodka Lemon", en: "Vodka Lemon" },
    category: "longdrink",
    codes: ["2", "8"],
    servings: LONGDRINK,
  },
  {
    id: "asbach-cola",
    name: "Asbach Cola",
    category: "longdrink",
    codes: ["1", "3", "5", "8"],
    servings: LONGDRINK,
  },
];
