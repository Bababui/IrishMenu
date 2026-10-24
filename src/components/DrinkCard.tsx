import type { Drink } from "../types";

//This is a component for one drink card. 
// It takes a drink object as a prop and displays its name and price.
type DrinkCardProps = {
  drink: Drink;
};

function DrinkCard({ drink }: DrinkCardProps) {
  return (
    <li>
      {drink.name} -{" "}
      {drink.price.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
      })}
    </li>
  );
}

export default DrinkCard;
