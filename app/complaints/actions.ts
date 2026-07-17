"use server";

export type ComplaintType = "Complaint" | "Suggestion" | "Compliment";

export interface ComplaintFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "type" | "message", string>>;
}

const COMPLAINT_TYPES: ComplaintType[] = ["Complaint", "Suggestion", "Compliment"];

const CALL_TO_ACTION =
  "Couldn't send your message — please email us at hello@brewand.co or call 020 7123 4567.";

/**
 * Complaints & feedback submissions are forwarded to an n8n workflow
 * (webhook in N8N_COMPLAINTS_WEBHOOK_URL) which fans out to email / a sheet.
 * Same shape and error handling as createReservation (app/reservations/actions.ts).
 */
export async function submitComplaint(
  _prevState: ComplaintFormState,
  formData: FormData
): Promise<ComplaintFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const type = String(formData.get("type") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: ComplaintFormState["fieldErrors"] = {};

  if (!name) fieldErrors.name = "Enter your name.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Enter a valid email so we can reply.";
  }
  if (!COMPLAINT_TYPES.includes(type as ComplaintType)) {
    fieldErrors.type = "Choose a category.";
  }
  if (!message) fieldErrors.message = "Tell us what happened.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, message: "Fix the fields below and try again." };
  }

  const webhookUrl = process.env.N8N_COMPLAINTS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("N8N_COMPLAINTS_WEBHOOK_URL is not set — message not delivered.");
    return { status: "error", message: CALL_TO_ACTION };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, type, message, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`n8n responded ${res.status}`);
  } catch (error) {
    console.error("Complaints webhook failed:", error);
    return { status: "error", message: CALL_TO_ACTION };
  }

  return {
    status: "success",
    message: `Thanks, ${name.split(" ")[0]} — we've received your message and will get back to you soon.`,
  };
}
