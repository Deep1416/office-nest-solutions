import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout-only — see locations.$state.index.tsx for why, same as virtual-offices.tsx.
export const Route = createFileRoute("/locations/$state")({
  component: () => <Outlet />,
});
