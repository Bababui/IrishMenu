import type { MenuItem } from "../../types";

// Group "Shots": shots (2 cl) and shooters. Copied from the printed menu.
// "TODO(check)" = could not be read for sure.

export const shots: MenuItem[] = [
  // --- Shots ---
  {
    id: "absinth",
    name: { de: "Absinth", en: "Absinthe" },
    category: "shot",
    servings: [{ label: "2 cl", price: 3.6 }],
  },
  {
    id: "ficken",
    name: "Ficken",
    category: "shot",
    servings: [{ label: "2 cl", price: 3.3 }],
  },
  {
    id: "grappa",
    name: "Grappa",
    category: "shot",
    servings: [{ label: "2 cl", price: 3.3 }],
  },
  {
    id: "jaegermeister",
    name: "Jägermeister",
    category: "shot",
    servings: [{ label: "2 cl", price: 3.3 }],
  },
  {
    id: "joster",
    name: "Joster",
    category: "shot",
    servings: [{ label: "2 cl", price: 2.8 }],
  },
  {
    id: "kirschlikoer",
    name: { de: "Kirschlikör", en: "Cherry liqueur" },
    category: "shot",
    servings: [{ label: "2 cl", price: 2.8 }],
  },
  {
    id: "korn",
    name: "Korn",
    category: "shot",
    servings: [{ label: "2 cl", price: 2.8 }],
  },
  {
    id: "obstwasser",
    name: { de: "Obstwasser", en: "Fruit brandy" },
    category: "shot",
    servings: [{ label: "2 cl", price: 3.3 }],
  },
  {
    id: "ouzo",
    name: "Ouzo",
    category: "shot",
    servings: [{ label: "2 cl", price: 2.8 }],
  },
  {
    id: "pfefferminzlikoer",
    name: { de: "Pfefferminzlikör", en: "Peppermint liqueur" },
    category: "shot",
    servings: [{ label: "2 cl", price: 2.8 }],
  },
  {
    id: "ramazzotti",
    name: "Ramazzotti",
    category: "shot",
    servings: [{ label: "2 cl", price: 3.3 }],
  },
  {
    id: "sambuca",
    name: "Sambuca",
    category: "shot",
    servings: [{ label: "2 cl", price: 2.8 }],
  },
  {
    id: "tequila",
    name: "Tequila",
    category: "shot",
    servings: [{ label: "2 cl", price: 3.3 }],
  },
  {
    id: "willi",
    name: "Willi",
    category: "shot",
    servings: [{ label: "2 cl", price: 3.3 }],
  },
  {
    // TODO(check): name hidden by glare on the photo, probably plain "Wodka".
    id: "wodka",
    name: { de: "Wodka", en: "Vodka" },
    category: "shot",
    servings: [{ label: "2 cl", price: 3.3 }],
  },
  {
    // TODO(check): code partly hidden by glare, looks like 3.
    id: "wodka-waldmeister",
    name: { de: "Wodka-Waldmeister", en: "Vodka woodruff" },
    category: "shot",
    codes: ["3"],
    servings: [{ label: "2 cl", price: 2.8 }],
  },
  {
    // TODO(check): 4 cl price half hidden by glare, looks like 6,90 €.
    id: "baileys-on-ice",
    name: { de: "Bailey's auf Eis", en: "Bailey's on ice" },
    category: "shot",
    codes: ["B"],
    servings: [
      { label: "2 cl", price: 3.9 },
      { label: "4 cl", price: 6.9 },
    ],
  },

  // --- Shooters ---
  {
    id: "baby-guinness",
    name: "Baby Guinness",
    category: "shooter",
    description: { de: "Kahlúa, Bailey's", en: "Kahlúa, Bailey's" },
    codes: ["1", "B"],
    servings: [{ label: "4 cl", price: 6.5 }],
  },
  {
    id: "b52",
    name: "B52",
    category: "shooter",
    description: {
      de: "Kahlúa, Bailey's, brauner Rum",
      en: "Kahlúa, Bailey's, dark rum",
    },
    codes: ["1", "B"],
    servings: [{ label: "4 cl", price: 7.0 }],
  },
  {
    id: "irish-car-bomb",
    name: "Irish Car Bomb",
    category: "shooter",
    description: {
      de: "4 cl Whiskey & Bailey's im Glas Guinness",
      en: "4 cl whiskey & Bailey's dropped into Guinness",
    },
    codes: ["A", "B"],
    servings: [
      { label: "0,3 l", price: 7.0 },
      { label: "0,5 l", price: 10.0 },
    ],
  },
  {
    id: "kamikaze",
    name: "Kamikaze",
    category: "shooter",
    description: {
      de: "Wodka, Triple Sec, Zitronensaft",
      en: "Vodka, triple sec, lemon juice",
    },
    servings: [{ label: "4 cl", price: 6.5 }],
  },
  {
    id: "u-boot",
    name: "U-Boot",
    category: "shooter",
    description: { de: "Wodka, Miranda", en: "Vodka, Miranda" },
    servings: [{ label: "0,25 l", price: 6.0 }],
  },
  {
    id: "jaeger-bomb",
    name: "Jäger Bomb",
    category: "shooter",
    description: {
      de: "Jägermeister, Energy",
      en: "Jägermeister, energy drink",
    },
    servings: [{ label: "0,25 l", price: 7.0 }],
  },
];
