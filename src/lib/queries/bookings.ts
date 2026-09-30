// React Query hooks for bookings — see lib/queries/leads.ts for rationale.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBooking,
  deleteBooking,
  findBooking,
  getBookings,
  updateBookingStatus,
  type CreateBookingInput,
} from "@/lib/api/bookings";
import type { Booking } from "@/lib/storage";

const bookingsKey = ["bookings"] as const;

export function useBookingsQuery() {
  return useQuery({ queryKey: bookingsKey, queryFn: getBookings });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateBookingInput) => createBooking(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bookingsKey }),
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Booking["status"] }) => updateBookingStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bookingsKey }),
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBooking(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: bookingsKey }),
  });
}

export function useFindBooking() {
  return useMutation({
    mutationFn: ({ reference, phone }: { reference: string; phone: string }) => findBooking(reference, phone),
  });
}
