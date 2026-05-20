import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AdminLayout } from "@/components/layouts/AdminLayout";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    let user: any = null;
    try { user = JSON.parse(localStorage.getItem("ats-user") || "null"); } catch {}
    if (!user) throw redirect({ to: "/login" });
  },
  component: () => <AdminLayout><Outlet /></AdminLayout>,
});
