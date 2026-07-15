export interface Stat {
  value: string;
  label: string;
}

/** Stat Row (components.md §9) — quick-hit credibility numbers, hero support detail. */
export function StatRow({ stats, className = "" }: { stats: Stat[]; className?: string }) {
  return (
    <div className={`flex ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex flex-col gap-sip px-mug first:pl-0 ${
            index > 0 ? "border-l border-crema/15" : ""
          }`}
        >
          <span className="font-mono text-lg sm:text-xl text-crema">{stat.value}</span>
          <span className="font-body text-xs uppercase tracking-wide text-crema/60">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
