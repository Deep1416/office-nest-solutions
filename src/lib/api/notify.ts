import { ENQUIRY_EMAIL_URL } from "@/lib/config";

// Emails an enquiry to the support inbox via a Google Apps Script web app (docs/enquiry-emails.md).
// Best-effort: the enquiry is already saved locally, so a failure must never fail the form.
// Callers should not await it — Apps Script can take seconds, and the UI must not wait on it.
// text/plain + no-cors avoids a CORS preflight (Apps Script doesn't answer OPTIONS); the response is opaque.
export async function notifyByEmail(kind: "lead" | "callback", data: Record<string, unknown>): Promise<void> {
  if (!ENQUIRY_EMAIL_URL) return;
  try {
    await fetch(ENQUIRY_EMAIL_URL, {
      method: "POST",
      mode: "no-cors",
      keepalive: true, // lets the request finish even if the user navigates away
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ kind, ...data, createdAt: new Date().toISOString() }),
    });
  } catch (err) {
    console.error("Failed to email enquiry", err);
  }
}
