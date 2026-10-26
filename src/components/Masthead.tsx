import type { UiText } from "../i18n";
import { formatTime, weekdayName } from "../lib/format";
import type { OpenStatus } from "../lib/time";
import type { Lang, PubInfo } from "../types";
import { Shamrock } from "./Icons";

type MastheadProps = {
  pub: PubInfo;
  status: OpenStatus;
  lang: Lang;
  t: UiText;
};

/** The painted pub sign at the top, plus the open/closed plaque. */
function Masthead({ pub, status, lang, t }: MastheadProps) {
  return (
    <header className="masthead">
      <div className="sign-board">
        <div className="sign-flourish" aria-hidden>
          <span className="sign-rule" />
          <Shamrock className="sign-shamrock sign-shamrock--small" />
          <Shamrock className="sign-shamrock" />
          <Shamrock className="sign-shamrock sign-shamrock--small" />
          <span className="sign-rule" />
        </div>
        <h1 className="sign-name">{pub.name}</h1>
        <p className="sign-town">{pub.town}</p>
        <p className="sign-tagline">{pub.tagline[lang]}</p>
      </div>

      <p className={`status-plaque ${status.open ? "is-open" : "is-closed"}`}>
        <span className="status-dot" aria-hidden />
        <StatusText status={status} lang={lang} t={t} />
      </p>
    </header>
  );
}

function StatusText({
  status,
  lang,
  t,
}: {
  status: OpenStatus;
  lang: Lang;
  t: UiText;
}) {
  if (status.open) {
    const closes =
      status.closesAt === "00:00"
        ? t.midnight
        : formatTime(status.closesAt, lang);
    return (
      <>
        <strong>{t.openNow}</strong> · {t.until} {closes}
      </>
    );
  }
  if (!status.next) return <strong>{t.closedNow}</strong>;

  const { inDays, time, weekday } = status.next;
  const when =
    inDays === 0
      ? `${t.opensToday} ${formatTime(time, lang)}`
      : inDays === 1
        ? `${t.opensTomorrow} ${formatTime(time, lang)}`
        : `${t.opensOn} ${weekdayName(weekday, lang)} ${t.at} ${formatTime(time, lang)}`;

  return (
    <>
      <strong>{t.closedNow}</strong> · {when}
    </>
  );
}

export default Masthead;
