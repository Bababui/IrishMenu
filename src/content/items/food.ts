import type { MenuItem, Serving } from "../../types";

// Group "Essen": pub grub, pizza, Flammkuchen, baguettes & toasts, salad.

/** Toasts come as a normal one or a "Double Up!" with twice the filling. */
function toast(normal: number, doubleUp: number): Serving[] {
  return [
    { label: { de: "Normal", en: "Regular" }, price: normal },
    { label: "Double Up!", price: doubleUp },
  ];
}

const WITH_FRIES = { de: "mit Pommes / Twisters", en: "with fries / twisters" };
const KETCHUP_MAYO = { de: "Mit Ketchup / Mayo", en: "With ketchup / mayo" };

export const food: MenuItem[] = [
  // --- Pub Grub ---
  {
    id: "pub-burger",
    name: "Pub Burger",
    category: "pub-grub",
    description: {
      de: "Saftiges Rindfleisch, Käse, Salat, Tomaten, Zwiebeln, Gurke, Sauce",
      en: "Juicy beef, cheese, lettuce, tomatoes, onions, pickles, sauce",
    },
    codes: ["3", "6", "A", "B", "E", "F", "H", "I"],
    servings: [{ price: 7.9 }, { label: WITH_FRIES, price: 10.9 }],
  },
  {
    id: "chicken-burger",
    name: "Chicken Burger",
    category: "pub-grub",
    description: {
      de: "Hühnchenfleisch, Salat, Tomaten, Zwiebeln, Gurke, Sauce",
      en: "Chicken, lettuce, tomatoes, onions, pickles, sauce",
    },
    codes: ["A", "B", "D", "E", "F", "G"],
    servings: [{ price: 9.9 }, { label: WITH_FRIES, price: 12.9 }],
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets",
    category: "pub-grub",
    servings: [{ price: 7.9 }, { label: WITH_FRIES, price: 10.9 }],
  },
  {
    id: "fish-chips",
    name: "Fish & Chips",
    category: "pub-grub",
    servings: [{ price: 13.4 }],
  },
  {
    id: "pommes",
    name: "Pommes",
    category: "pub-grub",
    description: KETCHUP_MAYO,
    servings: [{ price: 6.5 }],
  },
  {
    id: "twisters",
    name: "Twisters",
    category: "pub-grub",
    description: KETCHUP_MAYO,
    servings: [{ price: 6.5 }],
  },
  {
    id: "chips",
    name: { de: "Chips", en: "Crisps" },
    category: "pub-grub",
    description: {
      de: "Paprika oder Salt 'n' Vinegar",
      en: "Paprika or salt 'n' vinegar",
    },
    servings: [{ price: 2.0 }],
  },
  {
    id: "irish-stew",
    name: { de: "Irish Stew", en: "Irish Stew" },
    category: "pub-grub",
    description: {
      de: "Nur am letzten Freitag & Samstag des Monats",
      en: "Only on the last Friday & Saturday of the month",
    },
    servings: [
      { label: { de: "Klein", en: "Small" }, price: 9.9 },
      { label: { de: "Groß", en: "Large" }, price: 14.9 },
    ],
  },

  // --- Pizza ---
  {
    id: "irish-pub-pizza",
    name: "Irish Pub Pizza",
    category: "pizza",
    description: {
      de: "Whisky-Schinken, Tomaten, Käse",
      en: "Whiskey ham, tomatoes, cheese",
    },
    codes: ["5", "6", "7", "8", "B", "D", "E"],
    servings: [{ price: 12.0 }],
  },
  {
    id: "pizza-margherita",
    name: "Margherita",
    category: "pizza",
    description: { de: "Tomaten, Mozzarella", en: "Tomatoes, mozzarella" },
    codes: ["B"],
    servings: [{ price: 8.5 }],
  },
  {
    id: "pizza-zwiebeln",
    name: { de: "Zwiebeln", en: "Onion" },
    category: "pizza",
    description: {
      de: "Tomaten, Käse, Zwiebeln",
      en: "Tomatoes, cheese, onions",
    },
    codes: ["B"],
    servings: [{ price: 9.5 }],
  },
  {
    id: "pizza-salami",
    name: "Salami",
    category: "pizza",
    description: {
      de: "Tomaten, Käse, Salami",
      en: "Tomatoes, cheese, salami",
    },
    codes: ["6", "7", "8", "B"],
    servings: [{ price: 9.5 }],
  },
  {
    id: "pizza-schinken",
    name: { de: "Schinken", en: "Ham" },
    category: "pizza",
    description: { de: "Tomaten, Käse, Schinken", en: "Tomatoes, cheese, ham" },
    codes: ["5", "6", "7", "8", "B", "D", "E"],
    servings: [{ price: 9.5 }],
  },
  {
    id: "pizza-hawaii",
    name: "Hawaii",
    category: "pizza",
    description: {
      de: "Tomaten, Käse, Schinken, Ananas",
      en: "Tomatoes, cheese, ham, pineapple",
    },
    codes: ["5", "6", "7", "8", "A", "B"],
    servings: [{ price: 10.5 }],
  },
  {
    id: "pizza-diavolo",
    name: "Diavolo",
    category: "pizza",
    description: {
      de: "Tomaten, Käse, Peperoni",
      en: "Tomatoes, cheese, hot peppers",
    },
    codes: ["6", "7", "8", "A", "B", "C", "D", "E", "F", "G"],
    servings: [{ price: 9.5 }],
  },
  {
    id: "pizza-speziale",
    name: "Speziale",
    category: "pizza",
    description: {
      de: "Schinken, Salami oder Diavolo mit Tomaten & Zwiebel",
      en: "Ham, salami or Diavolo with tomatoes & onion",
    },
    codes: ["5", "6", "7", "8", "A", "B", "D", "E", "F", "G"],
    servings: [{ price: 11.0 }],
  },
  {
    id: "pizza-extra-topping",
    name: { de: "Jede weitere Zutat", en: "Each extra topping" },
    category: "pizza",
    servings: [{ price: 1.0 }],
  },

  // --- Flammkuchen ---
  {
    id: "flammkuchen-schinken-lauch",
    name: { de: "Schinken & Lauch", en: "Ham & leek" },
    category: "flammkuchen",
    codes: ["6", "8", "A", "B"],
    servings: [{ price: 10.0 }],
  },
  {
    id: "flammkuchen-speck-zwiebeln",
    name: { de: "Speck & Zwiebeln", en: "Bacon & onions" },
    category: "flammkuchen",
    codes: ["6", "8", "A", "B"],
    servings: [{ price: 10.0 }],
  },
  {
    id: "flammkuchen-kaese",
    name: { de: "Käse", en: "Cheese" },
    category: "flammkuchen",
    codes: ["6", "8", "A", "B"],
    servings: [{ price: 10.0 }],
  },

  // --- Baguettes & Toasts ---
  {
    id: "kaese-toast",
    name: { de: "Käse-Toast", en: "Cheese toast" },
    category: "toast",
    codes: ["3", "5"],
    servings: toast(3.7, 5.9),
  },
  {
    id: "tomaten-kaese-toast",
    name: { de: "Tomaten-Käse-Toast", en: "Tomato & cheese toast" },
    category: "toast",
    codes: ["A", "B"],
    servings: toast(4.1, 6.7),
  },
  {
    id: "schinken-kaese-toast",
    name: { de: "Schinken-Käse-Toast", en: "Ham & cheese toast" },
    category: "toast",
    codes: ["5", "6", "7", "8", "A", "B", "D", "E"],
    servings: toast(4.7, 7.4),
  },
  {
    id: "salami-kaese-toast",
    name: { de: "Salami-Käse-Toast", en: "Salami & cheese toast" },
    category: "toast",
    codes: ["6", "7", "8", "A", "B"],
    servings: toast(4.7, 7.4),
  },
  {
    id: "hawaii-toast",
    name: "Hawaii-Toast",
    category: "toast",
    description: {
      de: "Schinken, Ananas, Käse",
      en: "Ham, pineapple, cheese",
    },
    servings: toast(5.5, 7.9),
  },
  {
    id: "speziale-toast",
    name: "Speziale-Toast",
    category: "toast",
    description: {
      de: "Schinken, Salami oder Diavolo mit Tomaten & Zwiebel",
      en: "Ham, salami or Diavolo with tomatoes & onion",
    },
    servings: toast(5.7, 8.4),
  },
  {
    id: "schinken-kaese-baguette",
    name: { de: "Schinken-Käse-Baguette", en: "Ham & cheese baguette" },
    category: "toast",
    codes: ["5", "6", "7", "8", "A", "B", "D", "E", "F", "G"],
    servings: [{ price: 8.0 }],
  },
  {
    id: "diavolo-baguette",
    name: "„Diavolo“-Baguette",
    category: "toast",
    description: {
      de: "Tomaten, Käse, Peperoni",
      en: "Tomatoes, cheese, hot peppers",
    },
    codes: ["6", "7", "8", "A", "B", "D", "E", "F", "G"],
    servings: [{ price: 8.0 }],
  },
  {
    id: "salami-kaese-baguette",
    name: { de: "Salami-Käse-Baguette", en: "Salami & cheese baguette" },
    category: "toast",
    codes: ["5", "6", "7", "8", "A", "B", "D", "E", "F", "G"],
    servings: [{ price: 8.0 }],
  },
  {
    id: "speziale-baguette",
    name: "Speziale-Baguette",
    category: "toast",
    description: {
      de: "Schinken, Salami oder Diavolo mit Tomaten & Zwiebel",
      en: "Ham, salami or Diavolo with tomatoes & onion",
    },
    codes: ["5", "6", "7", "A", "B", "D", "E", "F", "G"],
    servings: [{ price: 9.0 }],
  },

  // --- Salate ---
  {
    id: "gemischter-salat",
    name: { de: "Gemischter Salat", en: "Mixed salad" },
    category: "salad",
    codes: ["E"],
    servings: [
      { label: { de: "Klein", en: "Small" }, price: 4.9 },
      { label: { de: "Groß", en: "Large" }, price: 6.9 },
    ],
  },
];
