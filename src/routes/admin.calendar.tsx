import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/calendar")({ component: CalendarPage });

function CalendarPage() {
  const { interviews } = useStore();
  const [month, setMonth] = useState(new Date());

  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const daysIn = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const startDay = first.getDay();
  const today = new Date().toISOString().slice(0, 10);

  const eventsOn = (d: number) => {
    const ds = new Date(month.getFullYear(), month.getMonth(), d).toISOString().slice(0, 10);
    return interviews.filter(i => i.date === ds);
  };

  const cells = [...Array(startDay).fill(null), ...Array.from({ length: daysIn }, (_, i) => i + 1)];

  return (
    <div>
      <PageHeader title="Calendar" description="HR events, interviews, and reminders" />
      <Card className="border-0 shadow-soft">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{month.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft className="size-4" /></Button>
              <Button variant="outline" size="sm" onClick={() => setMonth(new Date())}>Today</Button>
              <Button variant="outline" size="icon" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight className="size-4" /></Button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-xs uppercase tracking-wider text-muted-foreground mb-2">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d} className="px-2 py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const ds = new Date(month.getFullYear(), month.getMonth(), d).toISOString().slice(0, 10);
              const evs = eventsOn(d);
              const isToday = ds === today;
              return (
                <div key={i} className={cn("min-h-24 rounded-lg border p-1.5 hover:bg-muted/30 transition", isToday && "bg-accent border-primary")}>
                  <div className={cn("text-xs font-medium", isToday && "text-primary")}>{d}</div>
                  <div className="mt-1 space-y-0.5">
                    {evs.slice(0, 2).map(e => (
                      <div key={e.id} className="text-[10px] bg-primary/10 text-primary rounded px-1 py-0.5 truncate">{e.time} {e.candidateName}</div>
                    ))}
                    {evs.length > 2 && <div className="text-[10px] text-muted-foreground">+{evs.length - 2} more</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
