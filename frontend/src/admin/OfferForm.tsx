import { useState, type FormEvent } from "react";
import { api, ApiError } from "./api";
import { longDate, priceField, weekdayName, weekdayOf } from "./dates";
import { FormError, GermanPart, TextField } from "./fields";
import { ChevronLeft } from "./icons";
import type { AdminOffer, OfferInput } from "./types";

type OfferFormProps = {
  /** The day he was looking at: new specials go on this day */
  day: string;
  /** Set when changing an existing special */
  offer?: AdminOffer;
  onCancel: () => void;
  onSaved: (message: string, day?: string) => void;
};

/** Monday first, like a printed calendar. 0 = Sunday. */
const WEEK = [1, 2, 3, 4, 5, 6, 0];

function OfferForm({ day, offer, onCancel, onSaved }: OfferFormProps) {
  const [title, setTitle] = useState(offer?.title_en ?? "");
  const [titleDe, setTitleDe] = useState(offer?.title_de ?? "");
  const [note, setNote] = useState(offer?.note_en ?? "");
  const [noteDe, setNoteDe] = useState(offer?.note_de ?? "");
  const [price, setPrice] = useState(priceField(offer?.price ?? null));
  const [regularPrice, setRegularPrice] = useState(priceField(offer?.regular_price ?? null));
  const [repeat, setRepeat] = useState<"once" | "weekly">(offer && offer.date === null ? "weekly" : "once");
  const [weekdays, setWeekdays] = useState<number[]>(offer?.date === null ? offer.weekdays : [weekdayOf(day)]);
  const [error, setError] = useState<ApiError | null>(null);
  const [busy, setBusy] = useState(false);

  const onceDay = offer?.date ?? day;

  function toggleWeekday(weekday: number) {
    setWeekdays((current) =>
      current.includes(weekday) ? current.filter((d) => d !== weekday) : [...current, weekday],
    );
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (repeat === "weekly" && weekdays.length === 0) {
      setError(new ApiError(422, "Please pick at least one day of the week."));
      return;
    }
    const input: OfferInput = {
      title_en: title,
      title_de: titleDe,
      note_en: note,
      note_de: noteDe,
      price,
      regular_price: regularPrice,
      date: repeat === "once" ? onceDay : null,
      weekdays: repeat === "weekly" ? weekdays : [],
    };
    setBusy(true);
    try {
      if (offer) await api.updateOffer(offer.id, input);
      else await api.createOffer(input);
      onSaved(offer ? "Special saved." : "Special added. Guests can see it now.");
    } catch (err) {
      setError(err as ApiError);
      setBusy(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const fieldError = (name: string) => error?.fields[name];

  return (
    <form className="form" onSubmit={submit} noValidate>
      <button type="button" className="link-button back" onClick={onCancel}>
        <ChevronLeft className="icon" />
        Back to {longDate(day)}
      </button>
      <h1 className="form-title">{offer ? "Change this special" : "Add a special"}</h1>

      <FormError message={error ? error.message : null} />

      <TextField
        label="What's the special?"
        hint="For example: Guinness 0,5 l"
        value={title}
        onChange={setTitle}
        error={fieldError("title_en")}
        autoFocus={!offer}
      />
      <TextField
        label="Extra details (optional)"
        hint="For example: Only until 9 pm"
        value={note}
        onChange={setNote}
        error={fieldError("note_en")}
      />

      <div className="field-row">
        <TextField
          label="Special price"
          hint="What guests pay"
          value={price}
          onChange={setPrice}
          inputMode="decimal"
          suffix="€"
          width="short"
          error={fieldError("price")}
        />
        <TextField
          label="Normal price (optional)"
          hint="Shown crossed out"
          value={regularPrice}
          onChange={setRegularPrice}
          inputMode="decimal"
          suffix="€"
          width="short"
          error={fieldError("regular_price")}
        />
      </div>

      <fieldset className="choice">
        <legend className="field-label">When is it on?</legend>
        <label className="choice-option">
          <input type="radio" name="repeat" checked={repeat === "once"} onChange={() => setRepeat("once")} />
          <span>Only on {longDate(onceDay)}</span>
        </label>
        <label className="choice-option">
          <input type="radio" name="repeat" checked={repeat === "weekly"} onChange={() => setRepeat("weekly")} />
          <span>Every week</span>
        </label>
        {repeat === "weekly" && (
          <div className="weekday-picker" role="group" aria-label="On these days">
            {WEEK.map((weekday) => (
              <button
                key={weekday}
                type="button"
                className="weekday"
                aria-pressed={weekdays.includes(weekday)}
                onClick={() => toggleWeekday(weekday)}
              >
                {weekdayName(weekday).slice(0, 3)}
              </button>
            ))}
          </div>
        )}
        {fieldError("weekdays") && <p className="field-error">{fieldError("weekdays")}</p>}
      </fieldset>

      <GermanPart open={Boolean(titleDe || noteDe)}>
        <TextField label="German name" value={titleDe} onChange={setTitleDe} error={fieldError("title_de")} />
        <TextField label="German details" value={noteDe} onChange={setNoteDe} error={fieldError("note_de")} />
      </GermanPart>

      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={busy}>
          {busy ? "Saving…" : offer ? "Save changes" : "Add special"}
        </button>
        <button type="button" className="button button-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default OfferForm;
