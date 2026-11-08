import { useState } from "react";
import { Clover } from "../components/Icons";
import { api, ApiError } from "./api";
import {
  addDays,
  dayNumber,
  euros,
  eventsOn,
  longDate,
  mondayOf,
  offersOn,
  relativeName,
  shortMonth,
  shortWeekday,
  today,
  weekdayName,
  weekdayOf,
  weeklyLabel,
} from "./dates";
import { CalendarIcon, ChevronLeft, ChevronRight, CopyDay, Pencil, Plus, Repeat, Trash } from "./icons";
import type { ToastMessage } from "./Toast";
import type { AdminEvent, AdminOffer } from "./types";

type DayViewProps = {
  day: string;
  offers: AdminOffer[] | null;
  events: AdminEvent[] | null;
  onDayChange: (day: string) => void;
  onAddOffer: () => void;
  onEditOffer: (offer: AdminOffer) => void;
  onAddEvent: () => void;
  onEditEvent: (event: AdminEvent) => void;
  onChanged: () => Promise<void>;
  onToast: (message: ToastMessage) => void;
};

function DayView(props: DayViewProps) {
  const { day, offers, events, onDayChange } = props;
  const isPast = day < today();
  const relative = relativeName(day);

  return (
    <>
      <WeekStrip day={day} offers={offers} events={events} onDayChange={onDayChange} />

      <div className="day-head">
        <button type="button" className="step-button" onClick={() => onDayChange(addDays(day, -1))}>
          <ChevronLeft className="icon" />
          <span className="visually-hidden">Previous day</span>
        </button>
        <div className="day-title">
          <h1>{longDate(day)}</h1>
          <p className="day-note">
            {relative && <span className={relative === "Today" ? "pill pill-today" : "pill"}>{relative}</span>}
            {isPast && <span>This day is over. You can look, but not add anything.</span>}
            {!relative && !isPast && day !== today() && (
              <button type="button" className="link-button" onClick={() => onDayChange(today())}>
                Back to today
              </button>
            )}
          </p>
        </div>
        <button type="button" className="step-button" onClick={() => onDayChange(addDays(day, 1))}>
          <ChevronRight className="icon" />
          <span className="visually-hidden">Next day</span>
        </button>
      </div>

      <SpecialsSection {...props} isPast={isPast} />
      <EventsSection {...props} isPast={isPast} />
    </>
  );
}

/* ---------- The seven days at the top ---------- */

function WeekStrip({
  day,
  offers,
  events,
  onDayChange,
}: Pick<DayViewProps, "day" | "offers" | "events" | "onDayChange">) {
  const monday = mondayOf(day);
  const week = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  const now = today();

  return (
    <nav className="week" aria-label="Choose a day">
      <button type="button" className="week-step" onClick={() => onDayChange(addDays(day, -7))}>
        <ChevronLeft className="icon" />
        <span className="visually-hidden">Previous week</span>
      </button>
      <ol className="week-days">
        {week.map((date) => {
          const specialCount = offers ? offersOn(offers, date).length : 0;
          const eventCount = events ? eventsOn(events, date).length : 0;
          const summary = [
            specialCount ? `${specialCount} special${specialCount > 1 ? "s" : ""}` : "",
            eventCount ? `${eventCount} event${eventCount > 1 ? "s" : ""}` : "",
          ]
            .filter(Boolean)
            .join(", ");
          return (
            <li key={date}>
              <button
                type="button"
                className="tile"
                data-selected={date === day || undefined}
                data-today={date === now || undefined}
                data-past={date < now || undefined}
                aria-current={date === day ? "date" : undefined}
                aria-label={`${longDate(date)}${date === now ? ", today" : ""}${summary ? `, ${summary}` : ""}`}
                onClick={() => onDayChange(date)}
              >
                <span className="tile-weekday">{shortWeekday(date)}</span>
                <span className="tile-day">{dayNumber(date)}</span>
                <span className="tile-month">{shortMonth(date)}</span>
                <span className="tile-marks" aria-hidden>
                  {specialCount > 0 && <Clover className="tile-clover" />}
                  {eventCount > 0 && <CalendarIcon className="tile-event" />}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <button type="button" className="week-step" onClick={() => onDayChange(addDays(day, 7))}>
        <ChevronRight className="icon" />
        <span className="visually-hidden">Next week</span>
      </button>
    </nav>
  );
}

/* ---------- Specials ---------- */

/** The same special again, without its id: used by "Undo" to put a deleted one back. */
function offerInput(offer: AdminOffer) {
  return {
    title_en: offer.title_en,
    title_de: offer.title_de,
    note_en: offer.note_en,
    note_de: offer.note_de,
    price: offer.price,
    regular_price: offer.regular_price,
    date: offer.date,
    weekdays: offer.weekdays,
  };
}

function SpecialsSection({
  day,
  offers,
  isPast,
  onAddOffer,
  onEditOffer,
  onChanged,
  onToast,
}: DayViewProps & { isPast: boolean }) {
  const [copying, setCopying] = useState(false);
  const previousDay = addDays(day, -1);
  const todays = offers ? offersOn(offers, day) : [];
  const titlesToday = new Set(todays.map((offer) => offer.title_en));
  // What "Same as yesterday" would bring over: one-off specials not already on this day
  const copyable = offers ? offers.filter((o) => o.date === previousDay && !titlesToday.has(o.title_en)) : [];

  async function copyPreviousDay() {
    setCopying(true);
    try {
      const copies = await api.copyDay(previousDay, day);
      await onChanged();
      onToast({
        text:
          copies.length === 0
            ? "Nothing new to copy."
            : `Copied ${copies.length} special${copies.length > 1 ? "s" : ""} from ${weekdayName(weekdayOf(previousDay))}.`,
      });
    } catch (error) {
      onToast({ text: (error as ApiError).message });
    } finally {
      setCopying(false);
    }
  }

  async function remove(offer: AdminOffer) {
    try {
      await api.deleteOffer(offer.id);
      await onChanged();
      onToast({
        text: `“${offer.title_en}” deleted.`,
        action: {
          label: "Undo",
          run: async () => {
            await api.createOffer(offerInput(offer));
            await onChanged();
          },
        },
      });
    } catch (error) {
      onToast({ text: (error as ApiError).message });
    }
  }

  return (
    <section className="section" aria-labelledby="specials-heading">
      <h2 id="specials-heading" className="section-title">
        <Clover className="section-clover" />
        Specials
      </h2>

      {offers === null ? (
        <SkeletonRows />
      ) : todays.length === 0 ? (
        <p className="empty">No specials on this day{isPast ? "." : " yet."}</p>
      ) : (
        <ul className="rows">
          {todays.map((offer) => (
            <li key={offer.id} className="row">
              <div className="row-main">
                <p className="row-title">{offer.title_en}</p>
                {offer.title_de && <p className="row-german">German: {offer.title_de}</p>}
                {offer.note_en && <p className="row-detail">{offer.note_en}</p>}
                <p className="row-when">
                  {offer.date === null ? (
                    <>
                      <Repeat className="icon-small" />
                      {weeklyLabel(offer.weekdays)}
                    </>
                  ) : (
                    "Only this day"
                  )}
                </p>
              </div>
              <div className="row-price">
                {offer.price !== null && <span className="price">{euros(offer.price)}</span>}
                {offer.regular_price !== null && <s className="price-old">{euros(offer.regular_price)}</s>}
              </div>
              {!isPast && (
                <div className="row-actions">
                  <button type="button" className="button button-quiet" onClick={() => onEditOffer(offer)}>
                    <Pencil className="icon" />
                    Change
                  </button>
                  <button type="button" className="button button-quiet button-danger" onClick={() => remove(offer)}>
                    <Trash className="icon" />
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {!isPast && offers !== null && (
        <div className="section-actions">
          <button type="button" className="button button-primary" onClick={onAddOffer}>
            <Plus className="icon" />
            Add a special
          </button>
          {copyable.length > 0 && (
            <button type="button" className="button button-secondary" onClick={copyPreviousDay} disabled={copying}>
              <CopyDay className="icon" />
              {copying
                ? "Copying…"
                : `Same as ${weekdayName(weekdayOf(previousDay))} (${copyable.length} special${copyable.length > 1 ? "s" : ""})`}
            </button>
          )}
        </div>
      )}
    </section>
  );
}

/* ---------- Events ---------- */

function eventInput(event: AdminEvent) {
  return {
    date: event.date,
    time: event.time,
    title_en: event.title_en,
    title_de: event.title_de,
    description_en: event.description_en,
    description_de: event.description_de,
  };
}

function EventsSection({
  day,
  events,
  isPast,
  onAddEvent,
  onEditEvent,
  onChanged,
  onToast,
}: DayViewProps & { isPast: boolean }) {
  const todays = events ? eventsOn(events, day) : [];

  async function remove(event: AdminEvent) {
    try {
      await api.deleteEvent(event.id);
      await onChanged();
      onToast({
        text: `“${event.title_en}” deleted.`,
        action: {
          label: "Undo",
          run: async () => {
            await api.createEvent(eventInput(event));
            await onChanged();
          },
        },
      });
    } catch (error) {
      onToast({ text: (error as ApiError).message });
    }
  }

  return (
    <section className="section" aria-labelledby="events-heading">
      <h2 id="events-heading" className="section-title">
        <CalendarIcon className="section-icon" />
        Events
      </h2>

      {events === null ? (
        <SkeletonRows />
      ) : todays.length === 0 ? (
        <p className="empty">No events on this day{isPast ? "." : " yet."}</p>
      ) : (
        <ul className="rows">
          {todays.map((event) => (
            <li key={event.id} className="row">
              <p className="row-time">{event.time ? event.time.slice(0, 5) : "All day"}</p>
              <div className="row-main">
                <p className="row-title">{event.title_en}</p>
                {event.title_de && <p className="row-german">German: {event.title_de}</p>}
                {event.description_en && <p className="row-detail">{event.description_en}</p>}
              </div>
              {!isPast && (
                <div className="row-actions">
                  <button type="button" className="button button-quiet" onClick={() => onEditEvent(event)}>
                    <Pencil className="icon" />
                    Change
                  </button>
                  <button type="button" className="button button-quiet button-danger" onClick={() => remove(event)}>
                    <Trash className="icon" />
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {!isPast && events !== null && (
        <div className="section-actions">
          <button type="button" className="button button-primary" onClick={onAddEvent}>
            <Plus className="icon" />
            Add an event
          </button>
        </div>
      )}
    </section>
  );
}

function SkeletonRows() {
  return (
    <div className="rows rows-loading" aria-label="Loading">
      <div className="skeleton" />
      <div className="skeleton" />
    </div>
  );
}

export default DayView;
