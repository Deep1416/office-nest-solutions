// React Query hooks for leads. Client-only data (localStorage-backed), so these are
// plain useQuery/useMutation rather than SSR-prefetched query options.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLead, deleteLead, getLeads, type CreateLeadInput } from "@/lib/api/leads";

const leadsKey = ["leads"] as const;

export function useLeadsQuery() {
  return useQuery({ queryKey: leadsKey, queryFn: getLeads });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateLeadInput) => createLead(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: leadsKey }),
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: leadsKey }),
  });
}
