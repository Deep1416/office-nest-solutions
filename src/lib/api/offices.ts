// Data-access seam for office listings. Routes/components should go through this
// module (or lib/queries/offices.ts), never import OFFICES from mock-data directly —
// swapping mock-data for a real backend later means changing only this file.

import { OFFICES, type OfficeListing } from "@/lib/mock-data";

export async function getOffices(): Promise<OfficeListing[]> {
  return OFFICES;
}

export async function getOfficeById(id: string): Promise<OfficeListing | null> {
  return OFFICES.find((o) => o.id === id) ?? null;
}
