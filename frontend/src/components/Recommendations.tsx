import { recommendations } from "../content/recommendations";
import type { UiText } from "../i18n";
import { formatPrice, localize } from "../lib/format";
import type { Lang, MenuItem } from "../types";
import { HopGlass, LagerGlass, StoutGlass } from "./Glasses";
import SectionHeading from "./SectionHeading";

const GLASSES = { stout: StoutGlass, lager: LagerGlass, hops: HopGlass };

type RecommendationsProps = {
  /** The live menu, so prices are always the current ones */
  items: MenuItem[];
  lang: Lang;
  t: UiText;
};

/** "Unsere Empfehlung": three drinks from the menu, each with a small drawn glass. */
function Recommendations({ items, lang, t }: RecommendationsProps) {
  const cards = recommendations.flatMap((rec) => {
    const item = items.find((i) => i.category === rec.category && localize(i.name, "de") === rec.name);
    if (!item || item.servings.length === 0) return []; // removed from the menu: no card
    // Show the 0,5 l if there is one, otherwise the biggest size
    const serving = item.servings.find((s) => s.label === "0,5 l") ?? item.servings[item.servings.length - 1];
    return [{ rec, item, serving }];
  });

  if (cards.length === 0) return null;

  return (
    <section id="empfehlung" className="section" aria-labelledby="empfehlung-title">
      <SectionHeading id="empfehlung-title">{t.recommendTitle}</SectionHeading>
      <ul className="taps">
        {cards.map(({ rec, item, serving }) => {
          const Glass = GLASSES[rec.glass];
          return (
            <li key={rec.name} className="tap">
              <Glass className="tap-glass" />
              <p className="tap-name">{localize(item.name, lang)}</p>
              <p className="tap-note">{rec.note[lang]}</p>
              <p className="tap-price">
                {serving.label && <span className="tap-size">{localize(serving.label, lang)}</span>}
                <span className="price">{formatPrice(serving.price, lang)}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Recommendations;
