import { Button } from "@/components/ui/Button";
import { formatEventEyebrow, formatEventTimeRange } from "@/lib/format";
import type { UpcomingEvent } from "@/lib/types";

/** Event Card (components.md §11). */
export function EventCard({ event }: { event: UpcomingEvent }) {
  return (
    <article className="flex flex-col gap-cup rounded-lg border border-espresso/10 bg-latte p-pot shadow-card transition-[transform,box-shadow] duration-[var(--duration-base)] ease-brew hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none">
      <p className="font-mono text-xs uppercase tracking-wide text-cherry">
        {formatEventEyebrow(event.date)}
      </p>
      <h3 className="font-display text-lg text-ink">{event.name}</h3>
      <p className="font-body text-sm text-ink-muted">
        {formatEventTimeRange(event.date, event.endDate)}
      </p>
      <p className="line-clamp-2 font-body text-sm text-ink-muted">{event.description}</p>
      <Button href="/reservations" variant="ghost" fullWidthOnMobile={false} className="mt-sip w-fit">
        Reserve a table
      </Button>
    </article>
  );
}
