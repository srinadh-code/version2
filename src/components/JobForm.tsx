import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useStore, DEPARTMENTS, type Job } from "@/lib/mock-data";
import { toast } from "sonner";

export function JobForm({ job, onClose }: { job?: Job; onClose: () => void }) {
  const { addJob, updateJob } = useStore();
  const [f, setF] = useState<Omit<Job, "id" | "postedAt">>({
    title: job?.title || "",
    department: job?.department || DEPARTMENTS[0],
    experience: job?.experience || "2-4 years",
    skills: job?.skills || [],
    salaryMin: job?.salaryMin || 600000,
    salaryMax: job?.salaryMax || 1200000,
    type: job?.type || "Full-time",
    workMode: job?.workMode || "Hybrid",
    location: job?.location || "Bangalore",
    description: job?.description || "",
    status: job?.status || "Active",
    openings: job?.openings || 1,
    recruiterIds: job?.recruiterIds || [],
  });
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => { if (skillInput.trim() && !f.skills.includes(skillInput.trim())) { setF({ ...f, skills: [...f.skills, skillInput.trim()] }); setSkillInput(""); } };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.title) return toast.error("Title required");
    if (job) { updateJob(job.id, f); toast.success("Job updated"); } else { addJob(f); toast.success("Job created"); }
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div><Label>Job title *</Label><Input className="mt-1.5" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Department</Label>
          <Select value={f.department} onValueChange={(v) => setF({ ...f, department: v })}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>{DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Experience</Label><Input className="mt-1.5" value={f.experience} onChange={(e) => setF({ ...f, experience: e.target.value })} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><Label>Type</Label>
          <Select value={f.type} onValueChange={(v: any) => setF({ ...f, type: v })}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>{["Full-time","Part-time","Contract","Internship"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Work mode</Label>
          <Select value={f.workMode} onValueChange={(v: any) => setF({ ...f, workMode: v })}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>{["Remote","Hybrid","On-site"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Openings</Label><Input className="mt-1.5" type="number" value={f.openings} onChange={(e) => setF({ ...f, openings: +e.target.value })} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><Label>Location</Label><Input className="mt-1.5" value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })} /></div>
        <div><Label>Salary min (₹)</Label><Input className="mt-1.5" type="number" value={f.salaryMin} onChange={(e) => setF({ ...f, salaryMin: +e.target.value })} /></div>
        <div><Label>Salary max (₹)</Label><Input className="mt-1.5" type="number" value={f.salaryMax} onChange={(e) => setF({ ...f, salaryMax: +e.target.value })} /></div>
      </div>
      <div>
        <Label>Required skills</Label>
        <div className="flex gap-2 mt-1.5">
          <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} placeholder="Type skill and press Enter" />
          <Button type="button" variant="secondary" onClick={addSkill}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {f.skills.map(s => (
            <Badge key={s} variant="secondary" className="pl-2 pr-1 py-1 gap-1">{s}
              <button type="button" onClick={() => setF({ ...f, skills: f.skills.filter(x => x !== s) })}><X className="size-3" /></button>
            </Badge>
          ))}
        </div>
      </div>
      <div><Label>Description</Label><Textarea className="mt-1.5 min-h-24" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
      <div><Label>Status</Label>
        <Select value={f.status} onValueChange={(v: any) => setF({ ...f, status: v })}>
          <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
          <SelectContent>{["Active","Paused","Closed"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" className="bg-gradient-primary">{job ? "Update" : "Create"} Job</Button>
      </div>
    </form>
  );
}
