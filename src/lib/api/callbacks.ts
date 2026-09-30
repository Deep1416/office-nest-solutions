// Data-access seam for callback requests — see lib/api/leads.ts for rationale.

import { callbacksStore, type CallbackReq } from "@/lib/storage";

export type CreateCallbackInput = Omit<CallbackReq, "id" | "createdAt">;

export async function getCallbacks(): Promise<CallbackReq[]> {
  return callbacksStore.list();
}

export async function createCallback(input: CreateCallbackInput): Promise<void> {
  callbacksStore.add(input);
}

export async function deleteCallback(id: string): Promise<void> {
  callbacksStore.remove(id);
}
