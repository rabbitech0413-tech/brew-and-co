import { getUpcomingEvents } from "@/lib/events";
import { EventCard } from "./EventCard";

export function UpcomingEvents() {
  const events = getUpcomingEvents();

  return (
    <section className="mx-auto max-w-brew px-mug md:px-pot">
      <h2 className="font-display text-2xl text-ink">Upcoming events</h2>
      <p className="mt-cup max-w-[60ch] font-body text-md text-ink-muted">
        Every Friday and Saturday the shop turns into something a little different.
      </p>
      <div className="mt-pot grid grid-cols-1 gap-pot sm:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  );
}
