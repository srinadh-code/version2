import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Download, MoreVertical, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useStore, STAGES, type Candidate } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/candidates")({ component: CandidatesPage });

function CandidatesPage() {
  const { candidates, moveStage, updateCandidate, deleteCandidate, logActivity } = useStore();
  const [q, setQ] = useState("");
  const [stage, setStage] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"date" | "score" | "name">("date");
  const [view, setView] = useState<Candidate | null>(null);
  const perPage = 10;

  const filtered = useMemo(() => {
    let r = candidates.filter(c =>
      (stage === "all" || c.stage === stage) &&
      (status === "all" || c.status === status) &&
      (q === "" || c.name.toLowerCase().includes(q.toLowerCase()) || c.position.toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === "score") r = [...r].sort((a, b) => b.atsScore - a.atsScore);
    if (sort === "name") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "date") r = [...r].sort((a, b) => +new Date(b.appliedDate) - +new Date(a.appliedDate));
    return r;
  }, [candidates, q, stage, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const scoreColor = (s: number) => s >= 85 ? "text-success" : s >= 70 ? "text-info" : s >= 55 ? "text-warning-foreground" : "text-destructive";
  const stageColor: Record<string,string> = {
    Applied: "bg-muted text-muted-foreground",
    Screening: "bg-info/15 text-info border-info/20",
    "Technical Round": "bg-accent text-accent-foreground",
    "HR Round": "bg-warning/15 text-warning-foreground",
    Offered: "bg-success/15 text-success border-success/20",
    Hired: "bg-success text-success-foreground",
    Rejected: "bg-destructive/15 text-destructive",
  };

  return (
    <div>
      <PageHeader title="Candidates" description={`${filtered.length} candidates in your pipeline`} />

      <Card className="border-0 shadow-soft mb-4">
        <CardContent className="p-4 flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search by name or position..." value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} className="pl-9" />
          </div>
          <Select value={stage} onValueChange={(v) => { setStage(v); setPage(1); }}>
            <SelectTrigger className="lg:w-44"><SelectValue placeholder="Stage" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {STAGES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
            <SelectTrigger className="lg:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {["Active","Shortlisted","Hold","Rejected"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v: any) => setSort(v)}>
            <SelectTrigger className="lg:w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Recent</SelectItem>
              <SelectItem value="score">ATS Score</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Candidate</th>
                <th className="text-left px-4 py-3">Position</th>
                <th className="text-left px-4 py-3">Exp</th>
                <th className="text-left px-4 py-3">ATS</th>
                <th className="text-left px-4 py-3">Stage</th>
                <th className="text-left px-4 py-3">Skills</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Applied</th>
                <th className="text-right px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(c => (
                <tr key={c.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8"><AvatarFallback className="bg-accent text-accent-foreground text-xs">{c.name.slice(0,1)}</AvatarFallback></Avatar>
                      <div><div className="font-medium">{c.name}</div><div className="text-xs text-muted-foreground">{c.email}</div></div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{c.position}</td>
                  <td className="px-4 py-3">{c.experience}y</td>
                  <td className={`px-4 py-3 font-semibold ${scoreColor(c.atsScore)}`}>{c.atsScore}%</td>
                  <td className="px-4 py-3"><Badge variant="outline" className={stageColor[c.stage]}>{c.stage}</Badge></td>
                  <td className="px-4 py-3"><div className="flex gap-1">{c.skills.slice(0,2).map(s => <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>)}</div></td>
                  <td className="px-4 py-3"><Badge variant="outline">{c.status}</Badge></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(c.appliedDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button size="icon" variant="ghost" className="size-8"><MoreVertical className="size-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setView(c)}><Eye className="size-4 mr-2" /> View profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { updateCandidate(c.id, { status: "Shortlisted" }); logActivity("shortlisted", c.name); toast.success("Shortlisted"); }}>Shortlist</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { updateCandidate(c.id, { status: "Rejected", stage: "Rejected" }); toast.error("Rejected"); }} className="text-destructive">Reject</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast.success("Resume downloaded")}><Download className="size-4 mr-2" /> Download resume</DropdownMenuItem>
                        {STAGES.filter(s => s !== c.stage).map(s => (
                          <DropdownMenuItem key={s} onClick={() => { moveStage(c.id, s); toast.success(`Moved to ${s}`); }}>Move to {s}</DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => { deleteCandidate(c.id); toast.success("Deleted"); }} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && <tr><td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">No candidates found</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 border-t text-sm">
          <div className="text-muted-foreground">Page {page} of {totalPages}</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>Previous</Button>
            <Button variant="outline" size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</Button>
          </div>
        </div>
      </Card>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{view?.name}</DialogTitle></DialogHeader>
          {view && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-16"><AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">{view.name.slice(0,1)}</AvatarFallback></Avatar>
                <div>
                  <div className="text-lg font-semibold">{view.name}</div>
                  <div className="text-sm text-muted-foreground">{view.position}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{view.email} • {view.phone}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className={`text-3xl font-bold ${scoreColor(view.atsScore)}`}>{view.atsScore}%</div>
                  <div className="text-xs text-muted-foreground">ATS Score</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div><div className="text-muted-foreground text-xs">Stage</div><Badge className={stageColor[view.stage]}>{view.stage}</Badge></div>
                <div><div className="text-muted-foreground text-xs">Status</div><div className="font-medium">{view.status}</div></div>
                <div><div className="text-muted-foreground text-xs">Experience</div><div className="font-medium">{view.experience} years</div></div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Skills</div>
                <div className="flex flex-wrap gap-1.5">{view.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
