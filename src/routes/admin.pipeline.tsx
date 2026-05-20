import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, STAGES, type Stage, type Candidate } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/pipeline")({ component: PipelinePage });

const stageColors: Record<Stage, string> = {
  Applied: "border-t-slate-400",
  Screening: "border-t-info",
  "Technical Round": "border-t-violet-500",
  "HR Round": "border-t-warning",
  Offered: "border-t-success",
  Hired: "border-t-emerald-600",
  Rejected: "border-t-destructive",
};

function PipelinePage() {
  const { candidates, moveStage } = useStore();
  const [dragId, setDragId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<Stage | null>(null);

  const onDrop = (s: Stage) => {
    if (dragId) {
      moveStage(dragId, s);
      toast.success(`Moved to ${s}`);
    }
    setDragId(null);
    setOverStage(null);
  };

  return (
    <div>
      <PageHeader title="Pipeline" description="Drag candidates between stages to update their status" />
      <div className="grid grid-flow-col auto-cols-[280px] gap-4 overflow-x-auto scrollbar-thin pb-4">
        {STAGES.map((s) => {
          const items = candidates.filter((c) => c.stage === s);
          return (
            <div
              key={s}
              onDragOver={(e) => { e.preventDefault(); setOverStage(s); }}
              onDragLeave={() => setOverStage(null)}
              onDrop={() => onDrop(s)}
              className={cn(
                "rounded-xl bg-card border-t-4 shadow-soft p-3 flex flex-col gap-2 min-h-[500px] transition-all",
                stageColors[s],
                overStage === s && "ring-2 ring-primary bg-accent/30"
              )}
            >
              <div className="flex items-center justify-between px-1 pb-2 border-b">
                <h3 className="font-medium text-sm">{s}</h3>
                <Badge variant="secondary">{items.length}</Badge>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin">
                {items.map((c: Candidate) => (
                  <Card
                    key={c.id}
                    draggable
                    onDragStart={() => setDragId(c.id)}
                    onDragEnd={() => setDragId(null)}
                    className={cn("p-3 cursor-grab active:cursor-grabbing border-0 shadow-soft hover:shadow-elegant transition-all", dragId === c.id && "opacity-50")}
                  >
                    <div className="flex items-start gap-2">
                      <Avatar className="size-9"><AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">{c.name.slice(0,1)}</AvatarFallback></Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{c.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{c.position}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{c.experience}y exp</span>
                      <Badge variant="secondary" className="text-[10px]">ATS {c.atsScore}%</Badge>
                    </div>
                  </Card>
                ))}
                {items.length === 0 && <div className="text-xs text-muted-foreground text-center py-6">Drop candidates here</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
