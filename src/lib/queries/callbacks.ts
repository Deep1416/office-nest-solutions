// React Query hooks for callback requests — see lib/queries/leads.ts for rationale.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCallback, deleteCallback, getCallbacks, type CreateCallbackInput } from "@/lib/api/callbacks";

const callbacksKey = ["callbacks"] as const;

export function useCallbacksQuery() {
  return useQuery({ queryKey: callbacksKey, queryFn: getCallbacks });
}

export function useCreateCallback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateCallbackInput) => createCallback(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: callbacksKey }),
  });
}

export function useDeleteCallback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCallback(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: callbacksKey }),
  });
}
