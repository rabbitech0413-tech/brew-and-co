"use server";

export interface ReservationFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "partySize" | "date" | "time", string>>;
}

/**
 * No booking system is wired up yet — this validates and returns a
 * confirmation, deliberately not persisting anywhere (see the implementation
 * plan's stated scope limit; same as the footer newsletter stub).
 */
export async function createReservation(
  _prevState: ReservationFormState,
  formData: FormData
): Promise<ReservationFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const partySize = String(formData.get("partySize") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const time = String(formData.get("time") ?? "").trim();

  const fieldErrors: ReservationFormState["fieldErrors"] = {};

  if (!name) fieldErrors.name = "Enter your name.";
  if (!partySize || Number(partySize) < 1) {
    fieldErrors.partySize = "Enter how many people are coming.";
  }
  if (!date) fieldErrors.date = "Choose a date.";
  if (!time) fieldErrors.time = "Choose a time.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, message: "Fix the fields below and try again." };
  }

  return {
    status: "success",
    message: `You're booked, ${name.split(" ")[0]}. We'll see your party of ${partySize} on ${date} at ${time}.`,
  };
}
