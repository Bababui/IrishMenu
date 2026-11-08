import { useEffect, useState } from "react";
import "./App.css";
import Events from "./components/Events";
import LangToggle from "./components/LangToggle";
import Masthead from "./components/Masthead";
import Menu from "./components/Menu";
import OpeningHours from "./components/OpeningHours";
import SectionNav from "./components/SectionNav";
import TodaySpecials from "./components/TodaySpecials";
import Visit from "./components/Visit";
import { events as regularEvents } from "./content/events";
import { drinks } from "./content/menu";
import { offers } from "./content/offers";
import { pub, USES_EXAMPLE_CONTENT } from "./content/pub";
import { ui, useLang } from "./i18n";
import { offersForDay, upcomingEvents } from "./lib/content";
import { fetchLiveContent, type LiveContent } from "./lib/api";
import { berlinNow, openStatus, pubDay } from "./lib/time";
import type { Page } from "./types";

function App() {
  const [lang, setLang] = useLang();
  const t = ui[lang];
  const now = useBerlinNow();
  const live = useLiveContent();

  // Everything below is calculated from `now` on each render, not stored in state.
  // Menu, specials and events come from the backend. Until it answers (or if it can't be
  // reached) the page shows the built-in copy from src/content, so guests never see an empty menu.
  // Regular events like karaoke are a rule in src/content/events.ts; one-off events come from the backend.
  const day = pubDay(now);
  const status = openStatus(pub.hours, now);
  const items = live.items ?? drinks;
  const todaysOffers = offersForDay(live.offers ?? offers, day);
  const nextEvents = upcomingEvents([...regularEvents, ...(live.events ?? [])], day.ymd);

  const navItems: {id: Page; label: string}[] = [
    { id: "menu", label: t.navMenu },
    { id: "events", label: t.navEvents },
    { id: "hours", label: t.navHours },
  ];

  const [page, setPage] = useState<Page>("menu");

  function selectPage(next: Page) {
    setPage(next);
    // If we're scrolled past the tabs, jump back so the new page starts right under them.
    const content = document.getElementById("page-content");
    if (!content) return;
    const navHeight = 52;
    const top = content.getBoundingClientRect().top + window.scrollY - navHeight;
    if (window.scrollY > top) window.scrollTo({ top });
  }

  return (
    <>
      <div className="topbar">
        <LangToggle lang={lang} onChange={setLang} label={t.langLabel} />
      </div>

      <Masthead pub={pub} status={status} lang={lang} t={t}/>

      <main>
        <div className="page">
          <TodaySpecials offers={todaysOffers} day={day.ymd} lang={lang} t={t} />
        </div>

        <SectionNav items={navItems} active={page} onSelect={selectPage} label={pub.name} />

        <div className="page" id="page-content">
          <div key={page} className="page-view">
            {page === "menu" && <Menu drinks={items} lang={lang} t={t} />}
            {page === "events" && <Events events={nextEvents} day={day.ymd} lang={lang} t={t} />}
            {page === "hours" && <OpeningHours hours={pub.hours} today={day.weekday} lang={lang} t={t} />}
          </div>

          <Visit pub={pub} t={t} showExampleNote={USES_EXAMPLE_CONTENT} />
        </div>
      </main>


    </>
  );
}

/** Loads the live content from the backend once, when the page opens. */
function useLiveContent() {
  const [content, setContent] = useState<LiveContent>({});

  useEffect(() => {
    let cancelled = false; // the page may close before the answer arrives
    fetchLiveContent().then((result) => {
      if (!cancelled) setContent(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}

/** Berlin time, refreshed every minute so "open now" stays correct if the page stays open. */
function useBerlinNow() {
  const [now, setNow] = useState(() => berlinNow());
  useEffect(() => {
    const timer = setInterval(() => setNow(berlinNow()), 60_000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

export default App;
