import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore, type Resume } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { AIAnalysisView } from "@/components/AIAnalysisView";

export const Route = createFileRoute("/admin/ai-analysis")({ component: AIPage });

function AIPage() {
  const { resumes } = useStore();
  const [selected, setSelected] = useState<Resume | null>(resumes[0] || null);

  return (
    <div>
      <PageHeader title="AI Analysis" description="Deep AI-powered insights for every resume" />
      <div className="grid lg:grid-cols-[300px_1fr] gap-4">
        <Card className="border-0 shadow-soft h-fit max-h-[80vh] overflow-y-auto">
          <CardContent className="p-2 space-y-1">
            {resumes.map(r => (
              <button key={r.id} onClick={() => setSelected(r)} className={`w-full text-left p-3 rounded-lg transition ${selected?.id === r.id ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}>
                <div className="font-medium text-sm">{r.candidateName}</div>
                <div className="text-xs text-muted-foreground flex justify-between mt-0.5"><span>{r.department}</span><span className="text-primary font-semibold">{r.atsScore}%</span></div>
              </button>
            ))}
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            {selected ? <AIAnalysisView resume={selected} /> : <div className="text-center py-12"><Sparkles className="size-12 text-muted-foreground mx-auto" /><p className="mt-3">Select a resume to analyze</p></div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
