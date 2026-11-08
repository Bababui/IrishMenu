// Small drawn glasses for "Unsere Empfehlung". Original drawings, no brand marks.

type GlassProps = { className?: string };

const RIM = "#e4bd5f"; // gold-400: the outline, like the gold leaf on the sign
const FOAM = "#f7f4ea";

/** A tulip pint of stout with its cream head. */
export function StoutGlass({ className }: GlassProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" width="64" height="64" aria-hidden>
      <path d="M18 8h28l-2.5 19c-.6 4.2 2.5 7 2.5 12 0 9-4 17-5 17H23c-1 0-5-8-5-17 0-5 3.1-7.8 2.5-12Z" fill="#1c100b" />
      <path d="M18 8h28l-.9 7H18.9Z" fill={FOAM} />
      <path d="M18 8h28l-2.5 19c-.6 4.2 2.5 7 2.5 12 0 9-4 17-5 17H23c-1 0-5-8-5-17 0-5 3.1-7.8 2.5-12Z" fill="none" stroke={RIM} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M24 22c-.6 3-.5 8 .4 12" fill="none" stroke="#5a3a26" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** A tall, straight glass of golden beer. */
export function LagerGlass({ className }: GlassProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" width="64" height="64" aria-hidden>
      <path d="M20 9h24l-3 47H23Z" fill="#e2a83c" />
      <path d="M20 9h24l-.6 8H20.6Z" fill={FOAM} />
      <circle cx="28" cy="30" r="1.1" fill="#f6dc93" />
      <circle cx="35" cy="38" r="1" fill="#f6dc93" />
      <circle cx="30" cy="45" r="0.9" fill="#f6dc93" />
      <circle cx="37" cy="26" r="0.8" fill="#f6dc93" />
      <path d="M20 9h24l-3 47H23Z" fill="none" stroke={RIM} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M25 20l1.6 30" fill="none" stroke="#f6dc93" strokeWidth="1.3" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

/** A pint of pale lager with a hop cone leaning against it. */
export function HopGlass({ className }: GlassProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" width="64" height="64" aria-hidden>
      <path d="M16 9h24l-2.2 34c-.3 5-1 13-2 13H20.2c-1 0-1.7-8-2-13Z" fill="#efc45a" />
      <path d="M16 9h24l-.5 7H16.5Z" fill={FOAM} />
      <circle cx="24" cy="30" r="1" fill="#fbe7a8" />
      <circle cx="31" cy="40" r="0.9" fill="#fbe7a8" />
      <path d="M16 9h24l-2.2 34c-.3 5-1 13-2 13H20.2c-1 0-1.7-8-2-13Z" fill="none" stroke={RIM} strokeWidth="1.6" strokeLinejoin="round" />
      {/* hop cone */}
      <g transform="translate(47 42)">
        <path d="M0-9c4 2 6 6 5 10-1 5-4 8-5 8s-4-3-5-8c-1-4 1-8 5-10Z" fill="#6fbf73" stroke="#2f7a3d" strokeWidth="1.2" />
        <path d="M-4.2-2.5c2.6 1.4 5.8 1.4 8.4 0M-4.4 2.5c2.8 1.5 6 1.5 8.8 0" fill="none" stroke="#2f7a3d" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M0-9c0-3 2-5 4-6" fill="none" stroke="#2f7a3d" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
