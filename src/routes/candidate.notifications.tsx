import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/candidate/notifications")({ component: CNotifs });

const NOTIFS = [
  { t: "Interview scheduled", m: "Your Backend Developer interview is on Friday at 2:00 PM", d: "2h ago", unread: true },
  { t: "Application viewed", m: "Acme Inc viewed your application for Senior Frontend Engineer", d: "5h ago", unread: true },
  { t: "Profile match", m: "5 new jobs match your profile", d: "1d ago", unread: false },
  { t: "Application status", m: "Your application moved to Technical Round", d: "2d ago", unread: false },
];

function CNotifs() {
  return (
    <div>
      <PageHeader title="Notifications" />
      <Card className="border-0 shadow-soft">
        <CardContent className="p-0 divide-y">
          {NOTIFS.map((n, i) => (
            <div key={i} className={`p-4 flex gap-3 ${n.unread ? "bg-accent/30" : ""}`}>
              <div className="size-9 rounded-full bg-muted flex items-center justify-center"><Bell className="size-4 text-primary" /></div>
              <div className="flex-1"><div className="text-sm font-medium">{n.t}</div><div className="text-sm text-muted-foreground">{n.m}</div><div className="text-xs text-muted-foreground mt-1">{n.d}</div></div>
              {n.unread && <div className="size-2 rounded-full bg-primary mt-2" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
