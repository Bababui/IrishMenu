import { formatPrice } from "../lib/format";
import type { Drink, Lang } from "../types";

// One drink on the menu, set like a printed price list:
// name, dotted line, then size and price for each serving.
type DrinkCardProps = {
  drink: Drink;
  lang: Lang;
};

function DrinkCard({ drink, lang }: DrinkCardProps) {
  return (
    <li className="drink">
      <p className="drink-name">
        <span>{drink.name}</span>
        <span className="drink-leader" aria-hidden />
      </p>
      {drink.description && (
        <p className="drink-desc">{drink.description[lang]}</p>
      )}
      <ul className="drink-servings">
        {drink.servings.map((serving, i) => (
          <li key={i}>
            {serving.size && <span className="drink-size">{serving.size}</span>}
            <span className="price">{formatPrice(serving.price, lang)}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default DrinkCard;
