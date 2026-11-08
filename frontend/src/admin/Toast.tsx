import { useEffect } from "react";

export type ToastMessage = {
  text: string;
  /** Shown as a button next to the text, e.g. "Undo". */
  action?: { label: string; run: () => void };
};

const SHOW_FOR_MS = 10_000; // long enough to read and press "Undo" without hurrying

/** A short message at the bottom of the screen that goes away by itself. */
function Toast({ message, onDone }: { message: ToastMessage | null; onDone: () => void }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDone, SHOW_FOR_MS);
    return () => clearTimeout(timer);
  }, [message, onDone]);

  return (
    <div className="toast-region" aria-live="polite">
      {message && (
        <div className="toast" key={message.text}>
          <p>{message.text}</p>
          {message.action && (
            <button
              type="button"
              className="toast-action"
              onClick={() => {
                message.action?.run();
                onDone();
              }}
            >
              {message.action.label}
            </button>
          )}
          <button type="button" className="toast-close" onClick={onDone}>
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default Toast;
