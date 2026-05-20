import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    let user: { role?: string } | null = null;
    if (typeof window !== "undefined") {
      try { user = JSON.parse(localStorage.getItem("ats-user") || "null"); } catch {}
    }
    if (user?.role === "candidate") throw redirect({ to: "/candidate/dashboard" });
    if (user?.role === "admin") throw redirect({ to: "/admin/dashboard" });
    throw redirect({ to: "/login" });
  },
  component: () => null,
});
