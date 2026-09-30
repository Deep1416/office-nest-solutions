// Query options for office listings — used with queryClient.ensureQueryData in route
// loaders (safe to prefetch on the server, since it has no localStorage dependency)
// and read back via Route.useLoaderData().

import { queryOptions } from "@tanstack/react-query";
import { getOfficeById, getOffices } from "@/lib/api/offices";

export const officesQueryOptions = () =>
  queryOptions({
    queryKey: ["offices"] as const,
    queryFn: getOffices,
  });

export const officeQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["offices", id] as const,
    queryFn: () => getOfficeById(id),
  });
