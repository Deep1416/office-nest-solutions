// Data-access seam for leads. Wraps the localStorage-backed store so callers depend
// on an async API shaped like a real backend, not on localStorage directly.

import { leadsStore, type Lead } from "@/lib/storage";
import { notifyByEmail } from "@/lib/api/notify";

export type CreateLeadInput = Omit<Lead, "id" | "createdAt">;

export async function getLeads(): Promise<Lead[]> {
  return leadsStore.list();
}

export async function createLead(input: CreateLeadInput): Promise<void> {
  leadsStore.add(input);
  void notifyByEmail("lead", input);
}

export async function deleteLead(id: string): Promise<void> {
  leadsStore.remove(id);
}
