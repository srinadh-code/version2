import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Briefcase, Clock, IndianRupee, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/jobs/$jobId")({ component: JobDetail });

function JobDetail() {
  const { jobId } = Route.useParams();
  const { jobs, candidates } = useStore();
  const job = jobs.find(j => j.id === jobId);
  if (!job) return <div className="p-6">Job not found. <Link to="/admin/jobs" className="text-primary">Back</Link></div>;
  const applicants = candidates.filter(c => c.jobId === job.id);

  return (
    <div>
      <Link to="/admin/jobs" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4"><ArrowLeft className="size-4" /> Back to jobs</Link>
      <Card className="border-0 shadow-soft mb-6">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold">{job.title}</h1>
              <p className="text-muted-foreground mt-1">{job.department}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="size-4" />{job.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="size-4" />{job.type} • {job.workMode}</span>
                <span className="flex items-center gap-1"><Clock className="size-4" />{job.experience}</span>
                <span className="flex items-center gap-1"><IndianRupee className="size-4" />{(job.salaryMin/100000).toFixed(0)}L - {(job.salaryMax/100000).toFixed(0)}L</span>
                <span className="flex items-center gap-1"><Users className="size-4" />{job.openings} openings</span>
              </div>
            </div>
            <Badge>{job.status}</Badge>
          </div>
          <div className="mt-5">
            <h3 className="font-medium mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-1.5">{job.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
          </div>
          <div className="mt-5">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{job.description || "No description provided."}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-soft">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Applicants ({applicants.length})</h2>
          <div className="divide-y">
            {applicants.map(c => (
              <div key={c.id} className="py-3 flex items-center justify-between">
                <div><div className="font-medium">{c.name}</div><div className="text-xs text-muted-foreground">{c.email} • {c.experience}y exp</div></div>
                <div className="flex items-center gap-2"><Badge variant="secondary">ATS {c.atsScore}%</Badge><Badge>{c.stage}</Badge></div>
              </div>
            ))}
            {applicants.length === 0 && <div className="py-6 text-center text-sm text-muted-foreground">No applicants yet</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
