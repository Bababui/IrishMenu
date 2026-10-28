import type { Localized, MenuItem, Serving } from "../../types";

// Group "Whisky": whiskies by region and whisky mixes.

/** Age line under the name, e.g. years(12) -> { de: "12 Jahre", en: "12 years" }. */
function years(n: number): Localized {
  return { de: `${n} Jahre`, en: `${n} years` };
}

/** 2 cl and 4 cl prices, the way every whisky is listed. */
function shots(price2cl: number, price4cl: number): Serving[] {
  return [
    { label: "2 cl", price: price2cl },
    { label: "4 cl", price: price4cl },
  ];
}

export const whisky: MenuItem[] = [
  // --- Whiskys ---
  {
    id: "jack-daniels",
    name: "Jack Daniel's",
    category: "whisky",
    servings: shots(4.2, 6.9),
  },
  {
    id: "jim-beam",
    name: "Jim Beam",
    category: "whisky",
    servings: shots(4.2, 6.9),
  },
  {
    id: "southern-comfort",
    name: "Southern Comfort",
    category: "whisky",
    servings: shots(4.2, 6.9),
  },

  // --- Single Malt Whiskys ---
  {
    id: "ardbeg",
    name: "Ardbeg",
    category: "single-malt",
    description: years(10),
    servings: shots(5.3, 8.5),
  },
  {
    id: "cragganmore",
    name: "Cragganmore",
    category: "single-malt",
    description: years(12),
    servings: shots(5.6, 8.8),
  },
  {
    id: "dalwhinnie",
    name: "Dalwhinnie",
    category: "single-malt",
    description: years(15),
    servings: shots(5.2, 8.4),
  },
  {
    id: "glenkinchie",
    name: "Glenkinchie",
    category: "single-malt",
    description: years(10),
    servings: shots(5.6, 8.8),
  },
  {
    id: "glenlivet",
    name: "Glenlivet",
    category: "single-malt",
    description: years(12),
    servings: shots(4.4, 7.6),
  },
  {
    id: "jura",
    name: "Jura",
    category: "single-malt",
    description: years(10),
    servings: shots(4.6, 7.8),
  },
  {
    id: "lagavulin",
    name: "Lagavulin",
    category: "single-malt",
    description: years(16),
    servings: shots(8.9, 15.6),
  },
  {
    id: "laphroaig",
    name: "Laphroaig",
    category: "single-malt",
    description: years(10),
    servings: shots(5.4, 8.6),
  },
  {
    id: "oban",
    name: "Oban",
    category: "single-malt",
    description: years(14),
    servings: shots(6.4, 9.6),
  },
  {
    id: "talisker",
    name: "Talisker",
    category: "single-malt",
    description: years(10),
    servings: shots(5.4, 8.6),
  },
  {
    id: "cardhu",
    name: "Cardhu",
    category: "single-malt",
    description: years(12),
    servings: shots(5.7, 8.9),
  },

  // --- Scotch Whiskys ---
  {
    id: "ballantines",
    name: "Ballantine's",
    category: "scotch",
    servings: shots(3.4, 6.5),
  },
  {
    id: "chivas-regal",
    name: "Chivas Regal",
    category: "scotch",
    servings: shots(4.1, 7.7),
  },
  {
    id: "dimple",
    name: "Dimple de Luxe",
    category: "scotch",
    servings: shots(4.4, 7.3),
  },
  {
    id: "glenfiddich",
    name: "Glenfiddich",
    category: "scotch",
    servings: shots(3.9, 6.4),
  },
  {
    id: "johnnie-walker-red",
    name: "Johnnie Walker Red Label",
    category: "scotch",
    servings: shots(3.9, 6.4),
  },
  {
    id: "johnnie-walker-black",
    name: "Johnnie Walker Black Label",
    category: "scotch",
    servings: shots(4.3, 7.1),
  },

  // --- Irish Whiskeys ---
  {
    id: "bushmills",
    name: "Bushmills",
    category: "irish-whiskey",
    servings: shots(4.4, 7.3),
  },
  {
    id: "connemara",
    name: "Connemara",
    category: "irish-whiskey",
    servings: shots(4.6, 7.7),
  },
  {
    id: "dubliner",
    name: "Dubliner",
    category: "irish-whiskey",
    description: { de: "Whiskeylikör", en: "Whiskey liqueur" },
    servings: shots(4.3, 7.1),
  },
  {
    id: "irish-mist",
    name: "Irish Mist",
    category: "irish-whiskey",
    description: { de: "Whiskeylikör", en: "Whiskey liqueur" },
    servings: shots(4.3, 7.1),
  },
  {
    id: "jameson",
    name: "Jameson",
    category: "irish-whiskey",
    servings: shots(4.4, 7.3),
  },
  {
    id: "redbreast",
    name: "Redbreast",
    category: "irish-whiskey",
    description: years(12),
    servings: shots(5.6, 8.8),
  },
  {
    id: "paddy",
    name: "Paddy Old Irish",
    category: "irish-whiskey",
    servings: shots(4.1, 6.7),
  },
  {
    id: "tyrconnell",
    name: "Tyrconnell",
    category: "irish-whiskey",
    servings: shots(4.2, 7.1),
  },
  {
    id: "tullamore-dew",
    name: "Tullamore Dew",
    category: "irish-whiskey",
    servings: shots(4.4, 7.3),
  },

  // --- Whisky-Mix ---
  {
    id: "highball",
    name: "Highball",
    category: "whisky-mix",
    description: {
      de: "4 cl Whisky, Ginger Ale",
      en: "4 cl whisky, ginger ale",
    },
    codes: ["3"],
    servings: [{ label: "0,3 l", price: 8.0 }],
  },
  {
    id: "jameson-ginger",
    name: "Jameson Ginger",
    category: "whisky-mix",
    description: {
      de: "4 cl Jameson, Ginger Ale",
      en: "4 cl Jameson, ginger ale",
    },
    codes: ["3"],
    servings: [{ label: "0,3 l", price: 9.0 }],
  },
  {
    id: "jack-honey-ginger",
    name: "Jack Honey Ginger",
    category: "whisky-mix",
    description: {
      de: "4 cl Jack Daniel's, Ginger Ale, Limette",
      en: "4 cl Jack Daniel's, ginger ale, lime",
    },
    codes: ["2", "3"],
    servings: [{ label: "0,3 l", price: 9.0 }],
  },
  {
    id: "jack-honey-tonic",
    name: "Jack Honey Tonic",
    category: "whisky-mix",
    description: {
      de: "4 cl Jack Daniel's, Tonic, Limette",
      en: "4 cl Jack Daniel's, tonic, lime",
    },
    codes: ["2"],
    servings: [{ label: "0,3 l", price: 9.0 }],
  },
  {
    id: "irish-pub-lemonade",
    name: "Irish Pub Lemonade",
    category: "whisky-mix",
    description: {
      de: "4 cl Whisky, 1 cl Triple Sec, Zitrone, Limette, Limo",
      en: "4 cl whisky, 1 cl triple sec, lemon, lime, lemonade",
    },
    servings: [{ label: "0,4 l", price: 10.0 }],
  },
  {
    id: "whisky-apfel",
    name: { de: "Whisky Apfel", en: "Whisky Apple" },
    category: "whisky-mix",
    description: {
      de: "4 cl Whisky, Apfelsaft",
      en: "4 cl whisky, apple juice",
    },
    servings: [{ label: "0,25 l", price: 7.0 }],
  },
  {
    id: "whisky-sour",
    name: "Whisky Sour",
    category: "whisky-mix",
    description: {
      de: "4 cl Whisky, Zitronensaft, Zuckersirup",
      en: "4 cl whisky, lemon juice, sugar syrup",
    },
    servings: [{ label: "0,25 l", price: 7.0 }],
  },
  {
    id: "jacky-cola",
    name: "Jacky Cola",
    category: "whisky-mix",
    servings: [
      { label: "0,25 l", price: 7.0 },
      { label: "0,3 l", price: 10.0 },
    ],
  },
  {
    id: "whisky-cola",
    name: "Whisky Cola",
    category: "whisky-mix",
    servings: [
      { label: "0,25 l", price: 5.0 },
      { label: "0,3 l", price: 8.0 },
    ],
  },
];
