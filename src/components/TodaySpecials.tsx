import type { UiText } from "../i18n";
import { formatPrice, longDate } from "../lib/format";
import type { Lang, Offer } from "../types";
import { Clover } from "./Icons";
import SectionHeading from "./SectionHeading";

type TodaySpecialsProps = {
  offers: Offer[];
  /** The pub day as "YYYY-MM-DD". */
  day: string;
  lang: Lang;
  t: UiText;
};

/** The specials board. Only receives the offers that apply today. */
function TodaySpecials({ offers, day, lang, t }: TodaySpecialsProps) {
  return (
    <section id="heute" className="section" aria-labelledby="heute-title">
      <SectionHeading id="heute-title">{t.todayTitle}</SectionHeading>

      <div className="specials-board">
        <p className="specials-date">{longDate(day, lang)}</p>

        {offers.length === 0 ? (
          <p className="specials-empty">{t.noOffers}</p>
        ) : (
          <ul className="specials-list">
            {offers.map((offer) => (
              <li key={offer.id} className="special">
                <Clover className="special-clover" />
                <div className="special-text">
                  <p className="special-title">{offer.title[lang]}</p>
                  {offer.note && (
                    <p className="special-note">{offer.note[lang]}</p>
                  )}
                </div>
                {offer.price !== undefined && (
                  <p className="special-price">
                    <span className="price">
                      {formatPrice(offer.price, lang)}
                    </span>
                    {offer.regularPrice !== undefined && (
                      <span className="special-regular">
                        <span className="visually-hidden">
                          {t.regularPrice}{" "}
                        </span>
                        <s>{formatPrice(offer.regularPrice, lang)}</s>
                      </span>
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default TodaySpecials;
