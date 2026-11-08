import type { Lang } from "../types";

type LangToggleProps = {
  lang: Lang;
  onChange: (lang: Lang) => void;
  label: string;
};

const OPTIONS: { id: Lang; short: string; name: string }[] = [
  { id: "de", short: "DE", name: "Deutsch" },
  { id: "en", short: "EN", name: "English" },
];

function LangToggle({ lang, onChange, label }: LangToggleProps) {
  return (
    <div className="lang-toggle" role="group" aria-label={label}>
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          lang={option.id}
          aria-label={option.name}
          aria-pressed={lang === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.short}
        </button>
      ))}
    </div>
  );
}

export default LangToggle;
