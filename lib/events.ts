import type { RecurringEvent, UpcomingEvent } from "./types";

export const RECURRING_EVENTS: RecurringEvent[] = [
  {
    slug: "open-mic-night",
    name: "Open Mic Night",
    description: "Bring a song, a poem, or just an audience. Sign-ups from 6:30, first act at 7.",
    dayOfWeek: 5, // Friday
    startTime: { hour: 19, minute: 0 },
    endTime: { hour: 21, minute: 30 },
  },
  {
    slug: "coffee-cupping",
    name: "Coffee Cupping",
    description: "Taste the new bags before they hit the shelf, guided by whoever roasted them.",
    dayOfWeek: 6, // Saturday
    startTime: { hour: 10, minute: 0 },
    endTime: { hour: 11, minute: 0 },
  },
];

function nextOccurrence(from: Date, dayOfWeek: number, hour: number, minute: number): Date {
  const candidate = new Date(from);
  candidate.setHours(hour, minute, 0, 0);

  let daysAhead = (dayOfWeek - candidate.getDay() + 7) % 7;
  if (daysAhead === 0 && candidate.getTime() <= from.getTime()) {
    daysAhead = 7;
  }
  candidate.setDate(candidate.getDate() + daysAhead);
  return candidate;
}

/** Computed relative to `from` every call — never hardcoded, so this stays accurate indefinitely. */
export function getUpcomingEvents(from: Date = new Date()): UpcomingEvent[] {
  return RECURRING_EVENTS.map((event) => {
    const date = nextOccurrence(from, event.dayOfWeek, event.startTime.hour, event.startTime.minute);
    const endDate = new Date(date);
    endDate.setHours(event.endTime.hour, event.endTime.minute, 0, 0);
    return { ...event, date, endDate };
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
}
