import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout-only: TanStack Router's flat file naming makes this the parent route of
// virtual-offices.$id.tsx (and virtual-offices.index.tsx below). It must render
// Outlet or the child route's component never mounts — see virtual-offices.index.tsx
// for the actual "/virtual-offices" page.
export const Route = createFileRoute("/virtual-offices")({
  component: () => <Outlet />,
});
