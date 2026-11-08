// Decorative Irish ornaments, drawn as SVG. All are hidden from screen readers.

type OrnamentProps = { className?: string };

// --- Trinity knot (triquetra) ---
// Three pointed loops ("lenses"), each running from an outer tip through the
// centre to a short inner tip, rotated 120° apart.
function lens(angle: number) {
  const cx = 50,
    cy = 53,
    outer = 42,
    inner = 16;
  const radius = ((outer + inner) * 0.62).toFixed(2);
  const a = (angle * Math.PI) / 180;
  const ox = (cx + outer * Math.cos(a)).toFixed(2);
  const oy = (cy + outer * Math.sin(a)).toFixed(2);
  const ix = (cx - inner * Math.cos(a)).toFixed(2);
  const iy = (cy - inner * Math.sin(a)).toFixed(2);
  return `M${ox} ${oy}A${radius} ${radius} 0 0 1 ${ix} ${iy}A${radius} ${radius} 0 0 1 ${ox} ${oy}Z`;
}
const TRINITY_PATHS = [-90, 30, 150].map(lens);

export function TrinityKnot({ className }: OrnamentProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      width="24"
      height="24"
      aria-hidden
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinejoin="round"
      >
        {TRINITY_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

// --- Leprechaun peeking over an edge ---
// The bottom of the drawing is the edge he holds on to.
const INK = "#021008";
const SKIN = "#f2c9a3";
const GINGER = "#d9772b";
const HAT = "#1a5139";

export function Leprechaun({ className }: OrnamentProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 56"
      width="64"
      height="56"
      aria-hidden
    >
      <g
        stroke={INK}
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* shoulders */}
        <path
          d="M12 56C12 50 16 47.5 21 47.5H43C48 47.5 52 50 52 56Z"
          fill={HAT}
        />
        {/* sideburns, face, beard */}
        <ellipse cx="21.6" cy="39" rx="3" ry="4.4" fill={GINGER} />
        <ellipse cx="42.4" cy="39" rx="3" ry="4.4" fill={GINGER} />
        <ellipse cx="32" cy="39.5" rx="10.6" ry="9.6" fill={SKIN} />
        <path
          d="M21.5 40C21.5 52.5 26 56 32 56C38 56 42.5 52.5 42.5 40C40 45.5 36.5 47 32 47C27.5 47 24 45.5 21.5 40Z"
          fill={GINGER}
        />
        <path d="M28.8 49.4Q32 51.4 35.2 49.4" fill="none" />
        {/* hat */}
        <path d="M19 30L21.5 8.5Q32 5 42.5 8.5L45 30Z" fill={HAT} />
        <path d="M19.7 24H44.3L45 30H19Z" fill={INK} />
        <ellipse cx="32" cy="30.6" rx="21" ry="3.6" fill={HAT} />
        {/* hands on the edge */}
        <ellipse cx="9.5" cy="54" rx="5" ry="3.4" fill={SKIN} />
        <ellipse cx="54.5" cy="54" rx="5" ry="3.4" fill={SKIN} />
      </g>
      {/* gold buckle */}
      <rect
        x="28.4"
        y="23.4"
        width="7.2"
        height="6.8"
        rx="1"
        fill="none"
        stroke="#d2a646"
        strokeWidth="1.6"
      />
      {/* eyes, brows, nose, cheeks */}
      <circle cx="28" cy="40" r="1.35" fill={INK} />
      <circle cx="36" cy="40" r="1.35" fill={INK} />
      <path
        d="M25.8 36.6Q28 35.4 30.2 36.4M33.8 36.4Q36 35.4 38.2 36.6"
        stroke="#a5521c"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="32" cy="43.3" rx="2.2" ry="1.9" fill="#e8a383" />
      <circle cx="25.2" cy="43.6" r="1.7" fill="#ec9d86" opacity="0.6" />
      <circle cx="38.8" cy="43.6" r="1.7" fill="#ec9d86" opacity="0.6" />
    </svg>
  );
}
