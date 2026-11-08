import { useState, type FormEvent } from "react";
import { api, ApiError } from "./api";
import { longDate, today } from "./dates";
import { FormError, GermanPart, TextField } from "./fields";
import { ChevronLeft } from "./icons";
import type { AdminEvent, EventInput } from "./types";

type EventFormProps = {
  day: string;
  event?: AdminEvent;
  onCancel: () => void;
  onSaved: (message: string, day?: string) => void;
};

function EventForm({ day, event, onCancel, onSaved }: EventFormProps) {
  const [title, setTitle] = useState(event?.title_en ?? "");
  const [titleDe, setTitleDe] = useState(event?.title_de ?? "");
  const [description, setDescription] = useState(event?.description_en ?? "");
  const [descriptionDe, setDescriptionDe] = useState(event?.description_de ?? "");
  const [date, setDate] = useState(event?.date ?? day);
  const [time, setTime] = useState(event?.time?.slice(0, 5) ?? "");
  const [error, setError] = useState<ApiError | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(formEvent: FormEvent) {
    formEvent.preventDefault();
    const input: EventInput = {
      title_en: title,
      title_de: titleDe,
      description_en: description,
      description_de: descriptionDe,
      date,
      time: time || null,
    };
    setBusy(true);
    try {
      if (event) await api.updateEvent(event.id, input);
      else await api.createEvent(input);
      // Show the day the event is on, in case he picked another one
      onSaved(event ? "Event saved." : "Event added. Guests can see it now.", date);
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
      <h1 className="form-title">{event ? "Change this event" : "Add an event"}</h1>

      <FormError message={error ? error.message : null} />

      <TextField
        label="What's happening?"
        hint="For example: Pub Quiz, Live music, Six Nations: Ireland v France"
        value={title}
        onChange={setTitle}
        error={fieldError("title_en")}
        autoFocus={!event}
      />

      <div className="field-row">
        <TextField
          label="Which day?"
          type="date"
          value={date}
          onChange={setDate}
          error={fieldError("date")}
          width="short"
        />
        <TextField
          label="Starts at (optional)"
          type="time"
          value={time}
          onChange={setTime}
          error={fieldError("time")}
          width="short"
        />
      </div>
      {date && date < today() && <p className="field-error">This day is over. Please pick today or a later day.</p>}

      <TextField
        label="Extra details (optional)"
        hint="For example: Teams of up to 6, sign up at the bar"
        value={description}
        onChange={setDescription}
        error={fieldError("description_en")}
        multiline
      />

      <GermanPart open={Boolean(titleDe || descriptionDe)}>
        <TextField label="German name" value={titleDe} onChange={setTitleDe} error={fieldError("title_de")} />
        <TextField
          label="German details"
          value={descriptionDe}
          onChange={setDescriptionDe}
          error={fieldError("description_de")}
          multiline
        />
      </GermanPart>

      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={busy}>
          {busy ? "Saving…" : event ? "Save changes" : "Add event"}
        </button>
        <button type="button" className="button button-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EventForm;
