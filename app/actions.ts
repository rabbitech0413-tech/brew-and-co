"use server";

/**
 * Footer newsletter signup. Valid emails are forwarded to an n8n workflow
 * (webhook in N8N_NEWSLETTER_WEBHOOK_URL) that stores the mailing list.
 * Returns void — the footer form fires it directly and shows no feedback —
 * so any delivery failure is logged and swallowed rather than surfaced.
 */
export async function subscribeToNewsletter(formData: FormData): Promise<void> {
  const email = formData.get("email");
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return;
  }

  const webhookUrl = process.env.N8N_NEWSLETTER_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("N8N_NEWSLETTER_WEBHOOK_URL is not set — subscriber not delivered.");
    return;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`n8n responded ${res.status}`);
  } catch (error) {
    console.error("Newsletter webhook failed:", error);
  }
}
