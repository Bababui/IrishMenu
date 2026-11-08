import { useState } from "react";
import type { UiText } from "../i18n";
import { offersForDay } from "../lib/content";
import { dateParts, formatPrice, longDate } from "../lib/format";
import { addDays } from "../lib/time";
import type { Lang, Offer, Weekday, WeekHours } from "../types";
import { Clover } from "./Icons";
import { Leprechaun } from "./Ornaments";
import SectionHeading from "./SectionHeading";

type TodaySpecialsProps = {
  /** All offers; the board picks the ones for the chosen day. */
  offers: Offer[];
  /** Today's pub day (before 05:00 it is still yesterday). */
  today: { weekday: Weekday; ymd: string };
  /** To show closed days as "Ruhetag" instead of "no specials". */
  hours: WeekHours;
  lang: Lang;
  t: UiText;
};

/** How many days guests can look ahead, today included. */
const DAYS_SHOWN = 7;

/** The specials board: today first, the next six days one tap (or swipe) away. */
function TodaySpecials({ offers, today, hours, lang, t }: TodaySpecialsProps) {
  // Index into `days`: 0 = today. Kept as a number so it stays "today" when the day rolls over.
  const [selected, setSelected] = useState(0);

  const days = Array.from({ length: DAYS_SHOWN }, (_, i) => {
    const day = { ymd: addDays(today.ymd, i), weekday: ((today.weekday + i) % 7) as Weekday };
    const closed = hours[day.weekday] === null;
    return { ...day, closed, offers: closed ? [] : offersForDay(offers, day) };
  });
  const day = days[selected];

  const heading =
    selected === 0
      ? `${t.today} · ${longDate(day.ymd, lang)}`
      : selected === 1
        ? `${t.tomorrow} · ${longDate(day.ymd, lang)}`
        : longDate(day.ymd, lang);

  const emptyText = day.closed ? t.closedDayNote : selected === 0 ? t.noOffers : t.noOffersYet;

  return (
    <section id="heute" className="section" aria-labelledby="heute-title">
      <SectionHeading id="heute-title">{t.todayTitle}</SectionHeading>

      <div className="specials-board">
        {/* a leprechaun keeps watch over the lucky specials */}
        <span className="leprechaun-peek" aria-hidden>
          <Leprechaun className="leprechaun" />
        </span>

        {/* Today and the coming days. Swipe sideways on a phone; a clover marks days with specials. */}
        <div className="day-strip" role="group" aria-label={t.pickDay}>
          {days.map((d, i) => {
            const parts = dateParts(d.ymd, lang);
            const count = d.offers.length;
            return (
              <button
                key={d.ymd}
                type="button"
                className="day-chip"
                aria-pressed={i === selected}
                data-closed={d.closed || undefined}
                aria-label={`${longDate(d.ymd, lang)}${
                  d.closed ? `, ${t.closedDay}` : count ? `, ${count} ${count === 1 ? t.special : t.specials}` : ""
                }`}
                onClick={() => setSelected(i)}
              >
                <span className="day-chip-weekday">{i === 0 ? t.today : parts.weekday.replace(".", "")}</span>
                <span className="day-chip-day">{parts.day}</span>
                <span className="day-chip-mark" aria-hidden>
                  {count > 0 && <Clover className="day-chip-clover" />}
                </span>
              </button>
            );
          })}
        </div>

        <div key={day.ymd} className="specials-day" aria-live="polite">
          <p className="specials-date">{heading}</p>

          {day.offers.length === 0 ? (
            <p className="specials-empty">{emptyText}</p>
          ) : (
            <ul className="specials-list">
              {day.offers.map((offer) => (
                <li key={offer.id} className="special">
                  <Clover className="special-clover" />
                  <div className="special-text">
                    <p className="special-title">{offer.title[lang]}</p>
                    {offer.note && <p className="special-note">{offer.note[lang]}</p>}
                  </div>
                  {offer.price !== undefined && (
                    <p className="special-price">
                      <span className="price">{formatPrice(offer.price, lang)}</span>
                      {offer.regularPrice !== undefined && (
                        <span className="special-regular">
                          <span className="visually-hidden">{t.regularPrice} </span>
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
      </div>
    </section>
  );
}

export default TodaySpecials;
