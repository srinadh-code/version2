import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, MoreVertical, MapPin, Briefcase as BriefcaseIcon, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useStore, DEPARTMENTS, type Job } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { JobForm } from "@/components/JobForm";

export const Route = createFileRoute("/admin/jobs")({ component: JobsPage });

function JobsPage() {
  const { jobs, deleteJob, updateJob, candidates } = useStore();
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editJob, setEditJob] = useState<Job | null>(null);

  const filtered = jobs.filter(j =>
    (dept === "all" || j.department === dept) &&
    (status === "all" || j.status === status) &&
    (q === "" || j.title.toLowerCase().includes(q.toLowerCase()) || j.skills.some(s => s.toLowerCase().includes(q.toLowerCase())))
  );

  const statusColor: Record<string,string> = {
    Active: "bg-success/15 text-success border-success/20",
    Paused: "bg-warning/15 text-warning-foreground border-warning/20",
    Closed: "bg-muted text-muted-foreground"
  };

  return (
    <div>
      <PageHeader title="Job Openings" description={`${filtered.length} jobs found`} actions={
        <Button onClick={() => setCreateOpen(true)} className="bg-gradient-primary shadow-elegant"><Plus className="size-4 mr-1" /> Create Job</Button>
      } />

      <Card className="border-0 shadow-soft mb-4">
        <CardContent className="p-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search jobs by title or skill..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="md:w-48"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="md:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(j => {
          const applicants = candidates.filter(c => c.jobId === j.id).length;
          return (
            <Card key={j.id} className="border-0 shadow-soft hover:shadow-elegant transition-all group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="size-11 rounded-xl bg-gradient-soft flex items-center justify-center text-primary">
                    <BriefcaseIcon className="size-5" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-8"><MoreVertical className="size-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditJob(j)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { updateJob(j.id, { status: j.status === "Active" ? "Paused" : "Active" }); toast.success(`Job ${j.status === "Active" ? "paused" : "activated"}`); }}>
                        {j.status === "Active" ? "Pause" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { deleteJob(j.id); toast.success("Job deleted"); }} className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link to="/admin/jobs/$jobId" params={{ jobId: j.id }} className="block mt-3">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{j.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{j.department}</p>
                </Link>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {j.skills.slice(0,3).map(s => <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>)}
                  {j.skills.length > 3 && <Badge variant="outline" className="text-[10px]">+{j.skills.length - 3}</Badge>}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><MapPin className="size-3" />{j.location}</div>
                  <div className="flex items-center gap-1"><Clock className="size-3" />{j.experience}</div>
                  <div className="flex items-center gap-1 col-span-2"><IndianRupee className="size-3" />{(j.salaryMin/100000).toFixed(0)}L - {(j.salaryMax/100000).toFixed(0)}L</div>
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t">
                  <Badge variant="outline" className={statusColor[j.status]}>{j.status}</Badge>
                  <span className="text-xs text-muted-foreground">{applicants} applicants</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <Card className="col-span-full border-dashed">
            <CardContent className="p-12 text-center text-muted-foreground">No jobs match your filters</CardContent>
          </Card>
        )}
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Create new job</DialogTitle></DialogHeader>
          <JobForm onClose={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editJob} onOpenChange={(o) => !o && setEditJob(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit job</DialogTitle></DialogHeader>
          {editJob && <JobForm job={editJob} onClose={() => setEditJob(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
