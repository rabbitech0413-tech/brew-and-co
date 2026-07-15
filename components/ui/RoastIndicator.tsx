import type { RoastLevel } from "@/lib/types";

const FILLED_COUNT: Record<Exclude<RoastLevel, null>, number> = {
  Light: 1,
  Medium: 2,
  Dark: 3,
};

// Left-to-right, the same three stops as the Roast Line gradient.
const DOT_COLOR = ["bg-cherry", "bg-gold", "bg-espresso"];

/**
 * Roast Indicator (components.md §6) — the one legitimate sequence marker in
 * this system, because roast level is a real, ordered product attribute.
 * The text label is the accessible name; the dot row is presentational.
 */
export function RoastIndicator({ roast, className = "" }: { roast: RoastLevel; className?: string }) {
  if (!roast) return null;

  const filled = FILLED_COUNT[roast];

  return (
    <div className={`inline-flex items-center gap-cup ${className}`}>
      <span className="inline-flex items-center gap-sip" aria-hidden="true">
        {DOT_COLOR.map((color, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-pill ${index < filled ? color : "bg-latte"}`}
          />
        ))}
      </span>
      <span className="font-body text-sm text-ink-muted">{roast} roast</span>
    </div>
  );
}
