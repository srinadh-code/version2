import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { useStore } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/notifications")({ component: NotificationsPage });

function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useStore();
  const icon = (t: string) => t === "success" ? <CheckCircle2 className="size-4 text-success" /> : t === "warning" ? <AlertTriangle className="size-4 text-warning-foreground" /> : <Info className="size-4 text-info" />;

  return (
    <div>
      <PageHeader title="Notifications" description={`${notifications.filter(n => !n.read).length} unread`} actions={
        <Button variant="outline" onClick={markAllNotificationsRead}>Mark all read</Button>
      } />
      <Card className="border-0 shadow-soft">
        <CardContent className="p-0 divide-y">
          {notifications.length === 0 && <div className="p-12 text-center text-muted-foreground"><Bell className="size-10 mx-auto mb-2" />No notifications</div>}
          {notifications.map(n => (
            <button key={n.id} onClick={() => markNotificationRead(n.id)} className={cn("w-full text-left p-4 flex gap-3 hover:bg-muted/50", !n.read && "bg-accent/30")}>
              <div className="size-9 rounded-full bg-muted flex items-center justify-center shrink-0">{icon(n.type)}</div>
              <div className="flex-1">
                <div className="text-sm font-medium">{n.title}</div>
                <div className="text-sm text-muted-foreground">{n.message}</div>
                <div className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
              {!n.read && <div className="size-2 rounded-full bg-primary mt-2" />}
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
