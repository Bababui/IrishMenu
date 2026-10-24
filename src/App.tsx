import "./App.css";
import DrinkCard from "./components/DrinkCard";
import type { Drink } from "./types";

const drinks: Drink[] = [
  { id: 1, name: "Guinness", price: 6.5, category: "beer" },
  { id: 2, name: "Export", price: 4.6, category: "beer" },
  { id: 3, name: "Mojito", price: 8, category: "cocktail" },
  { id: 4, name: "Saft", price: 3.9, category: "soft" },
];

function App() {
  const pubName = "Irish Pub";

  return (
    <main>
      <h1>{pubName}</h1>
      <p>Pick your drink, order at the bar.</p>

      <ul>
        {drinks.map((d) => (
          <DrinkCard key={d.id} drink={d} />
        ))}
      </ul>
    </main>
  );
}

export default App;
