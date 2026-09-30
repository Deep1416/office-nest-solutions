// Data-access seam for bookings — see lib/api/leads.ts for rationale.
// Booking id/reference/status/createdAt are assigned here rather than by callers,
// the way a real backend would assign them on creation.

import { bookingsStore, makeBookingRef, type Booking } from "@/lib/storage";

export type CreateBookingInput = Pick<Booking, "officeId" | "officeName" | "plan" | "duration" | "customer" | "total">;

export async function getBookings(): Promise<Booking[]> {
  return bookingsStore.list();
}

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const booking: Booking = {
    ...input,
    id: crypto.randomUUID(),
    reference: makeBookingRef(),
    status: "payment-confirmed",
    createdAt: new Date().toISOString(),
  };
  bookingsStore.add(booking);
  return booking;
}

export async function updateBookingStatus(id: string, status: Booking["status"]): Promise<void> {
  bookingsStore.update(id, { status });
}

export async function deleteBooking(id: string): Promise<void> {
  bookingsStore.remove(id);
}

export async function findBooking(reference: string, phone: string): Promise<Booking | null> {
  return bookingsStore.find(reference, phone) ?? null;
}
