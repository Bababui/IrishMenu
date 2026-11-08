import type { UiText } from "../i18n";
import { weekdayName } from "../lib/format";
import type { Lang, Weekday, WeekHours } from "../types";
import SectionHeading from "./SectionHeading";

type OpeningHoursProps = {
  hours: WeekHours;
  /** Today's pub weekday, highlighted in the table. */
  today: Weekday;
  lang: Lang;
  t: UiText;
};

// German weeks start on Monday.
const ORDER: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

function OpeningHours({ hours, today, lang, t }: OpeningHoursProps) {
  return (
    <section id="zeiten" className="section" aria-labelledby="zeiten-title">
      <SectionHeading id="zeiten-title">{t.hoursTitle}</SectionHeading>

      <table className="hours">
        <tbody>
          {ORDER.map((weekday) => {
            const day = hours[weekday];
            const isToday = weekday === today;
            return (
              <tr key={weekday} className={isToday ? "is-today" : undefined}>
                <th scope="row">
                  {weekdayName(weekday, lang)}
                  {isToday && <span className="hours-today">{t.today}</span>}
                </th>
                <td>{day ? `${day.open} – ${day.close}` : t.closedDay}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default OpeningHours;
