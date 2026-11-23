import { formatPrice, localize } from "../lib/format";
import type { MenuItem, Lang } from "../types";

// One item on the menu, set like a printed price list:
// name, dotted line, then label (size) and price for each serving.
type DrinkCardProps = {
  drink: MenuItem;
  lang: Lang;
  /** When set, the codes become a button that opens the legend at the end of the menu. */
  onShowCodes?: () => void;
  /** Read out to screen readers on that button, e.g. "Kennzeichnung erklären". */
  showCodesLabel?: string;
};

function DrinkCard({ drink, lang, onShowCodes, showCodesLabel }: DrinkCardProps) {
  return (
    <li className="drink">
      <p className="drink-name">
        <span>
          {localize(drink.name, lang)}
          {drink.codes && (
            <>
              {" "}
              {onShowCodes ? (
                <sup>
                  <button
                    type="button"
                    className="drink-codes drink-codes-button"
                    onClick={onShowCodes}
                    aria-label={`${drink.codes.join(", ")}: ${showCodesLabel ?? ""}`}
                  >
                    {drink.codes.join(", ")}
                  </button>
                </sup>
              ) : (
                <sup className="drink-codes">{drink.codes.join(", ")}</sup>
              )}
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
