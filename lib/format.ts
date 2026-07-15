const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export function formatPrice(price: number): string {
  return currencyFormatter.format(price);
}

const WEEKDAY_ABBR = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_ABBR = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/** e.g. "FRI · 17 JUL" — the receipt-style eyebrow on an Event Card. */
export function formatEventEyebrow(date: Date): string {
  return `${WEEKDAY_ABBR[date.getDay()]} · ${date.getDate()} ${MONTH_ABBR[date.getMonth()]}`;
}

function formatClockTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return minutes === 0 ? `${displayHour}${period}` : `${displayHour}:${String(minutes).padStart(2, "0")}${period}`;
}

/** e.g. "7–9:30pm" */
export function formatEventTimeRange(start: Date, end: Date): string {
  return `${formatClockTime(start)}–${formatClockTime(end)}`;
}
