import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { Activity } from "lucide-react";

export const Route = createFileRoute("/admin/activity")({ component: ActivityPage });

function ActivityPage() {
  const { activities } = useStore();
  return (
    <div>
      <PageHeader title="Activity Logs" description="Recent actions across the platform" />
      <Card className="border-0 shadow-soft">
        <CardContent className="p-0 divide-y">
          {activities.length === 0 && <div className="p-8 text-center text-muted-foreground"><Activity className="size-10 mx-auto mb-2" />No activity yet</div>}
          {activities.map(a => (
            <div key={a.id} className="p-4 flex items-start gap-3">
              <div className="size-9 rounded-full bg-gradient-soft text-primary flex items-center justify-center shrink-0"><Activity className="size-4" /></div>
              <div className="flex-1">
                <div className="text-sm"><strong>{a.user}</strong> {a.action} <strong>{a.target}</strong></div>
                <div className="text-xs text-muted-foreground mt-0.5">{new Date(a.createdAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
