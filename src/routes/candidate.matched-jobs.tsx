import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Briefcase, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { useStore } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/candidate/matched-jobs")({ component: Matched });

function Matched() {
  const { jobs } = useStore();
  const [q, setQ] = useState("");
  const [mode, setMode] = useState("all");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [applied, setApplied] = useState<Set<string>>(new Set());

  const filtered = jobs.filter(j => j.status === "Active" &&
    (mode === "all" || j.workMode === mode) &&
    (q === "" || j.title.toLowerCase().includes(q.toLowerCase())));

  return (
    <div>
      <PageHeader title="Matched Jobs" description="Jobs tailored to your skills and experience" />
      <Card className="border-0 shadow-soft mb-4">
        <CardContent className="p-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search jobs..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger className="md:w-44"><SelectValue /></SelectTrigger>
            <SelectContent>{["all","Remote","Hybrid","On-site"].map(m => <SelectItem key={m} value={m}>{m === "all" ? "All Modes" : m}</SelectItem>)}</SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(j => (
          <Card key={j.id} className="border-0 shadow-soft hover:shadow-elegant transition">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <div className="size-11 rounded-xl bg-gradient-soft flex items-center justify-center text-primary"><Briefcase className="size-5" /></div>
                <Button variant="ghost" size="icon" className="size-8" onClick={() => { const s = new Set(saved); s.has(j.id) ? s.delete(j.id) : s.add(j.id); setSaved(s); toast.success(s.has(j.id) ? "Saved" : "Removed"); }}>
                  <Bookmark className={`size-4 ${saved.has(j.id) ? "fill-primary text-primary" : ""}`} />
                </Button>
              </div>
              <h3 className="mt-3 font-semibold">{j.title}</h3>
              <p className="text-xs text-muted-foreground">{j.department}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="size-3" />{j.location} • {j.workMode}</div>
              <div className="mt-3 flex flex-wrap gap-1">{j.skills.slice(0,3).map(s => <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>)}</div>
              <div className="mt-4 pt-3 border-t flex items-center justify-between">
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">{Math.floor(70 + Math.random()*25)}% match</Badge>
                <Button size="sm" disabled={applied.has(j.id)} onClick={() => { setApplied(new Set([...applied, j.id])); toast.success("Applied!"); }} className="bg-gradient-primary">
                  {applied.has(j.id) ? "Applied" : "Quick Apply"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <Card className="col-span-full border-dashed"><CardContent className="p-12 text-center text-muted-foreground">No matching jobs</CardContent></Card>}
      </div>
    </div>
  );
}
