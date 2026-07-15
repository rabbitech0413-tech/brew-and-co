"use server";

/**
 * Footer newsletter signup. No mailing list is wired up yet — this
 * validates and returns, deliberately not persisting anywhere (same scope
 * limit as the reservation form; see docs/design plan).
 */
export async function subscribeToNewsletter(formData: FormData): Promise<void> {
  const email = formData.get("email");
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return;
  }
}
