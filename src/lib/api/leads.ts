// Data-access seam for leads. Wraps the localStorage-backed store so callers depend
// on an async API shaped like a real backend, not on localStorage directly.

import { leadsStore, type Lead } from "@/lib/storage";
import { LEADS_SHEET_URL } from "@/lib/config";

export type CreateLeadInput = Omit<Lead, "id" | "createdAt">;

export async function getLeads(): Promise<Lead[]> {
  return leadsStore.list();
}

export async function createLead(input: CreateLeadInput): Promise<void> {
  leadsStore.add(input);
  await sendToSheet(input);
}

// Mirrors the lead into a Google Sheet. Best-effort: the lead is already saved locally,
// so a sheet failure must never fail the form. text/plain + no-cors avoids a CORS preflight
// (Apps Script web apps don't answer OPTIONS), which makes the response opaque.
async function sendToSheet(input: CreateLeadInput): Promise<void> {
  if (!LEADS_SHEET_URL) return;
  try {
    await fetch(LEADS_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...input, createdAt: new Date().toISOString() }),
    });
  } catch (err) {
    console.error("Failed to sync lead to Google Sheet", err);
  }
}

export async function deleteLead(id: string): Promise<void> {
  leadsStore.remove(id);
}
