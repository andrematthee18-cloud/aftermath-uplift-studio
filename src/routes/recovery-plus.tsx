import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/recovery-plus")({
  component: () => <Outlet />,
});
