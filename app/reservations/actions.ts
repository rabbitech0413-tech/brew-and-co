"use server";

export interface ReservationFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "partySize" | "date" | "time", string>>;
}

// Booking submissions are forwarded to an n8n workflow (webhook set in
// N8N_RESERVATION_WEBHOOK_URL) which fans out to email / Google Sheet /
// Calendar. Kept server-side so the URL never ships to the client.
const CALL_TO_ACTION = "Couldn't submit your booking — please call us on 020 7123 4567.";

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

  const webhookUrl = process.env.N8N_RESERVATION_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("N8N_RESERVATION_WEBHOOK_URL is not set — reservation not delivered.");
    return { status: "error", message: CALL_TO_ACTION };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        partySize: Number(partySize),
        date,
        time,
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`n8n responded ${res.status}`);
  } catch (error) {
    console.error("Reservation webhook failed:", error);
    return { status: "error", message: CALL_TO_ACTION };
  }

  return {
    status: "success",
    message: `You're booked, ${name.split(" ")[0]}. We'll see your party of ${partySize} on ${date} at ${time}.`,
  };
}
