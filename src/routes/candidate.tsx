import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { CandidateLayout } from "@/components/layouts/CandidateLayout";

export const Route = createFileRoute("/candidate")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    let user: any = null;
    try { user = JSON.parse(localStorage.getItem("ats-user") || "null"); } catch {}
    if (!user) throw redirect({ to: "/login" });
  },
  component: () => <CandidateLayout><Outlet /></CandidateLayout>,
});
