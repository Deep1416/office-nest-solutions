import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout-only — see blogs.index.tsx for why, same as virtual-offices.tsx.
export const Route = createFileRoute("/blogs")({
  component: () => <Outlet />,
});
