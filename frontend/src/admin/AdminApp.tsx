import { useCallback, useEffect, useState } from "react";
import { api, clearToken, getToken, LOGGED_OUT_EVENT } from "./api";
import DayView from "./DayView";
import EventForm from "./EventForm";
import Login from "./Login";
import MenuPrices from "./MenuPrices";
import OfferForm from "./OfferForm";
import Toast, { type ToastMessage } from "./Toast";
import { today } from "./dates";
import type { AdminEvent, AdminOffer } from "./types";

/** What fills the screen: the day page, or one form. Never both. */
type Screen =
  | { kind: "day" }
  | { kind: "offer"; offer?: AdminOffer }
  | { kind: "event"; event?: AdminEvent };

function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(() => getToken() !== null);
  const [area, setArea] = useState<"days" | "menu">("days");
  const [day, setDay] = useState(today);
  const [screen, setScreen] = useState<Screen>({ kind: "day" });
  const [offers, setOffers] = useState<AdminOffer[] | null>(null);
  const [events, setEvents] = useState<AdminEvent[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const reload = useCallback(async () => {
    try {
      const [newOffers, newEvents] = await Promise.all([api.offers(), api.events()]);
      setOffers(newOffers);
      setEvents(newEvents);
      setLoadError(null);
    } catch (error) {
      setLoadError((error as Error).message);
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    let cancelled = false;
    Promise.all([api.offers(), api.events()])
      .then(([newOffers, newEvents]) => {
        if (cancelled) return;
        setOffers(newOffers);
        setEvents(newEvents);
        setLoadError(null);
      })
      .catch((error: Error) => {
        if (!cancelled) setLoadError(error.message);
      });
    return () => {
      cancelled = true;
    };
  }, [loggedIn]);

  // The login runs out after 12 hours: any request then answers 401 and we land here.
  useEffect(() => {
    const onLoggedOut = () => setLoggedIn(false);
    window.addEventListener(LOGGED_OUT_EVENT, onLoggedOut);
    return () => window.removeEventListener(LOGGED_OUT_EVENT, onLoggedOut);
  }, []);

  function logOut() {
    clearToken();
    setLoggedIn(false);
    setOffers(null);
    setEvents(null);
  }

  /** Back to the day page after saving, with a short confirmation. */
  async function saved(message: string, showDay?: string) {
    await reload();
    if (showDay) setDay(showDay);
    setScreen({ kind: "day" });
    setToast({ text: message });
    window.scrollTo({ top: 0 });
  }

  if (!loggedIn) return <Login onLoggedIn={() => setLoggedIn(true)} />;

  return (
    <>
      <header className="bar">
        <div className="bar-inner">
          <p className="bar-name">
            <span className="bar-sign">Irish Pub</span>
            <span className="bar-label">Admin</span>
          </p>
          <nav className="bar-tabs" aria-label="Admin sections">
            <button
              type="button"
              className="bar-tab"
              aria-current={area === "days" ? "page" : undefined}
              onClick={() => {
                setArea("days");
                setScreen({ kind: "day" });
              }}
            >
              Specials &amp; events
            </button>
            <button
              type="button"
              className="bar-tab"
              aria-current={area === "menu" ? "page" : undefined}
              onClick={() => setArea("menu")}
            >
              Menu &amp; prices
            </button>
          </nav>
          <div className="bar-actions">
            <a className="bar-link" href="/" target="_blank" rel="noreferrer">
              See guest page
            </a>
            <button type="button" className="bar-button" onClick={logOut}>
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="shell">
        {area === "menu" ? (
          <MenuPrices onToast={setToast} />
        ) : loadError && offers === null ? (
          <div className="notice notice-error" role="alert">
            <p>{loadError}</p>
            <button type="button" className="button button-secondary" onClick={reload}>
              Try again
            </button>
          </div>
        ) : screen.kind === "offer" ? (
          <OfferForm
            day={day}
            offer={screen.offer}
            onCancel={() => setScreen({ kind: "day" })}
            onSaved={(message, savedDay) => saved(message, savedDay)}
          />
        ) : screen.kind === "event" ? (
          <EventForm
            day={day}
            event={screen.event}
            onCancel={() => setScreen({ kind: "day" })}
            onSaved={(message, savedDay) => saved(message, savedDay)}
          />
        ) : (
          <DayView
            day={day}
            offers={offers}
            events={events}
            onDayChange={setDay}
            onAddOffer={() => setScreen({ kind: "offer" })}
            onEditOffer={(offer) => setScreen({ kind: "offer", offer })}
            onAddEvent={() => setScreen({ kind: "event" })}
            onEditEvent={(event) => setScreen({ kind: "event", event })}
            onChanged={reload}
            onToast={setToast}
          />
        )}
      </main>

      <Toast message={toast} onDone={() => setToast(null)} />
    </>
  );
}

export default AdminApp;
