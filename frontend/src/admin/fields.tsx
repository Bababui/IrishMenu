import { useId, useState, type ReactNode } from "react";
import { Plus } from "./icons";

type TextFieldProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  multiline?: boolean;
  type?: "text" | "date" | "time";
  inputMode?: "decimal";
  suffix?: string;
  autoFocus?: boolean;
  width?: "short" | "full";
};

/** A labelled input with its hint and error underneath, all connected for screen readers. */
export function TextField({ label, hint, value, onChange, error, multiline, type = "text", inputMode, suffix, autoFocus, width = "full" }: TextFieldProps) {
  const id = useId();
  const described = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
  const shared = {
    id,
    value,
    autoFocus,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": described,
    onChange: (event: { target: { value: string } }) => onChange(event.target.value),
  };

  return (
    <div className="field" data-width={width}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      <div className="input-wrap">
        {multiline ? (
          <textarea className="input textarea" rows={2} {...shared} />
        ) : (
          <input className="input" type={type} inputMode={inputMode} {...shared} />
        )}
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** German fields stay folded away until he wants them, or when they already hold something. */
export function GermanPart({ open: startOpen, children }: { open: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(startOpen);
  if (!open) {
    return (
      <button type="button" className="button button-quiet add-german" onClick={() => setOpen(true)}>
        <Plus className="icon" />
        Add German text (only if it's different)
      </button>
    );
  }
  return (
    <fieldset className="german">
      <legend>German text</legend>
      <p className="field-hint">Leave a field empty and German guests see the English text.</p>
      {children}
    </fieldset>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="notice notice-error" role="alert">
      <p>{message}</p>
    </div>
  );
}
