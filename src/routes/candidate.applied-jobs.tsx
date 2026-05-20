import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/PageHeader";
import { useStore } from "@/lib/mock-data";

export const Route = createFileRoute("/candidate/applied-jobs")({ component: Applied });

const STAGE_COLORS: Record<string,string> = {
  Applied: "bg-muted text-muted-foreground",
  "Under Review": "bg-info/15 text-info border-info/20",
  Interview: "bg-accent text-accent-foreground",
  Shortlisted: "bg-success/15 text-success border-success/20",
  Rejected: "bg-destructive/15 text-destructive",
};

function Applied() {
  const { jobs } = useStore();
  const stages = ["Applied", "Under Review", "Interview", "Shortlisted", "Rejected"];
  const sample = jobs.slice(0, 8).map((j, i) => ({ ...j, _stage: stages[i % stages.length], _appliedAt: new Date(Date.now() - i * 86400000 * 2).toISOString() }));

  return (
    <div>
      <PageHeader title="Applied Jobs" description="Track your job applications" />
      <Card className="border-0 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left px-4 py-3">Position</th><th className="text-left px-4 py-3">Department</th><th className="text-left px-4 py-3">Location</th><th className="text-left px-4 py-3">Applied</th><th className="text-left px-4 py-3">Status</th></tr>
          </thead>
          <tbody>
            {sample.map(j => (
              <tr key={j.id} className="border-t hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{j.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{j.department}</td>
                <td className="px-4 py-3 text-muted-foreground">{j.location}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(j._appliedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3"><Badge variant="outline" className={STAGE_COLORS[j._stage]}>{j._stage}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
