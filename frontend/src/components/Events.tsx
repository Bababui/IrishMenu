import type { UiText } from "../i18n";
import { dateParts, formatTime } from "../lib/format";
import { addDays } from "../lib/time";
import type { Lang, PubEvent } from "../types";
import SectionHeading from "./SectionHeading";

type EventsProps = {
  /** Upcoming events only, already sorted. */
  events: PubEvent[];
  /** The pub day as "YYYY-MM-DD", to mark "today" and "tomorrow". */
  day: string;
  lang: Lang;
  t: UiText;
};

function Events({ events, day, lang, t }: EventsProps) {
  const tomorrow = addDays(day, 1);

  return (
    <section id="events" className="section" aria-labelledby="events-title">
      <SectionHeading id="events-title">{t.eventsTitle}</SectionHeading>

      {events.length === 0 ? (
        <p className="empty-note">{t.noEvents}</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => {
            const parts = dateParts(event.date, lang);
            const badge =
              event.date === day
                ? t.today
                : event.date === tomorrow
                  ? t.tomorrow
                  : null;
            return (
              <li key={event.id} className="event">
                <time className="event-date" dateTime={event.date}>
                  <span className="event-weekday">{parts.weekday}</span>
                  <span className="event-day">{parts.day}</span>
                  <span className="event-month">{parts.month}</span>
                </time>
                <div className="event-body">
                  <p className="event-meta">
                    {badge && <span className="event-badge">{badge}</span>}
                    {event.time && formatTime(event.time, lang)}
                  </p>
                  <h3 className="event-title">{event.title[lang]}</h3>
                  {event.description && (
                    <p className="event-desc">{event.description[lang]}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Events;
