import { formatPrice, localize } from "../lib/format";
import type { MenuItem, Lang } from "../types";

// One item on the menu, set like a printed price list:
// name, dotted line, then label (size) and price for each serving.
type DrinkCardProps = {
  drink: MenuItem;
  lang: Lang;
};

function DrinkCard({ drink, lang }: DrinkCardProps) {
  return (
    <li className="drink">
      <p className="drink-name">
        <span>
          {localize(drink.name, lang)}
          {drink.codes && (
            <>
              {" "}
              <sup className="drink-codes">{drink.codes.join(", ")}</sup>
            </>
          )}
        </span>
        <span className="drink-leader" aria-hidden />
      </p>
      {drink.description && (
        <p className="drink-desc">{drink.description[lang]}</p>
      )}
      <ul className="drink-servings">
        {drink.servings.map((serving, i) => (
          <li key={i}>
            {serving.label && (
              <span className="drink-size">
                {localize(serving.label, lang)}
              </span>
            )}
            <span className="price">{formatPrice(serving.price, lang)}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default DrinkCard;
