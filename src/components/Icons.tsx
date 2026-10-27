// Hand-drawn SVG icons. They use `currentColor`, so CSS `color` decides their colour.

type IconProps = { className?: string; title?: string };

// One heart-shaped leaf with its tip near the centre (12, 12), pointing up.
// Each copy is rotated around the centre and nudged outwards so the leaves don't merge.
const LEAF =
  "M12 10.9C9.9 9.5 7.3 7.9 7.2 5.6 7.1 3.6 9.5 2.6 11 4.1L12 5.1 13 4.1C14.5 2.6 16.9 3.6 16.8 5.6 16.7 7.9 14.1 9.5 12 10.9Z";

function a11y(title?: string) {
  return title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
}

/** Three-leaf shamrock. */
export function Shamrock({ className, title }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...a11y(title)}
    >
      <g fill="currentColor">
        {[0, 120, 240].map((angle) => (
          <path
            key={angle}
            d={LEAF}
            transform={`rotate(${angle} 12 12) translate(0 -0.5)`}
          />
        ))}
      </g>
      <path
        d="M12 12.5c.2 3.5.8 6.6 2.2 9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Four-leaf clover, used to mark today's specials. */
export function Clover({ className, title }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...a11y(title)}
    >
      <g
        fill="currentColor"
        transform="translate(12 11.4) scale(.9) translate(-12 -12)"
      >
        {[45, 135, 225, 315].map((angle) => (
          <path
            key={angle}
            d={LEAF}
            transform={`rotate(${angle} 12 12) translate(0 -0.5)`}
          />
        ))}
      </g>
      <path
        d="M12 12.2c.2 3.6.8 6.8 2.2 9.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden
    >
      <path d="M7 17 17 7M9 7h8v8" {...stroke} />
    </svg>
  );
}

/** Small "v" arrow for fold-out headings. Rotate it with CSS when open. */
export function ChevronDown({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" {...stroke} />
    </svg>
  );
}

export function MapPin({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden
    >
      <path
        d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"
        {...stroke}
      />
      <circle cx="12" cy="10" r="2.3" {...stroke} />
    </svg>
  );
}

export function Phone({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden
    >
      <path
        d="M6.6 3.5h2.6l1.4 4-1.9 1.3a11 11 0 0 0 6.5 6.5l1.3-1.9 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"
        {...stroke}
      />
    </svg>
  );
}
