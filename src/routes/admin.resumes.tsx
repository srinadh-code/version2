import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Upload, Search, Bookmark, Download, Trash2, Sparkles, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useStore, DEPARTMENTS, SKILLS_POOL, type Resume } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { AIAnalysisView } from "@/components/AIAnalysisView";

export const Route = createFileRoute("/admin/resumes")({ component: ResumesPage });

function ResumesPage() {
  const { resumes, addResume, deleteResume, toggleBookmark } = useStore();
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [aiResume, setAiResume] = useState<Resume | null>(null);
  const [preview, setPreview] = useState<Resume | null>(null);

  const filtered = resumes.filter(r =>
    (dept === "all" || r.department === dept) &&
    (q === "" || r.candidateName.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      <PageHeader title="All Resumes" description={`${filtered.length} resumes in the database`} actions={
        <Button onClick={() => setUploadOpen(true)} className="bg-gradient-primary shadow-elegant"><Upload className="size-4 mr-1" /> Upload Resume</Button>
      } />

      <Card className="border-0 shadow-soft mb-4">
        <CardContent className="p-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search resumes..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="md:w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(r => (
          <Card key={r.id} className="border-0 shadow-soft hover:shadow-elegant transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="size-11 rounded-xl bg-gradient-soft flex items-center justify-center text-primary">
                  <FileText className="size-5" />
                </div>
                <Button variant="ghost" size="icon" className="size-8" onClick={() => toggleBookmark(r.id)}>
                  <Bookmark className={`size-4 ${r.bookmarked ? "fill-primary text-primary" : ""}`} />
                </Button>
              </div>
              <h3 className="mt-3 font-semibold truncate">{r.candidateName}</h3>
              <p className="text-xs text-muted-foreground truncate">{r.email}</p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <Badge variant="secondary">{r.department}</Badge>
                <span className="text-muted-foreground">{r.experience}y exp</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {r.skills.slice(0,3).map(s => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
              </div>
              <div className="mt-4 pt-3 border-t flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">ATS Score</div>
                  <div className="text-lg font-bold text-primary">{r.atsScore}%</div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => setPreview(r)}><Eye className="size-4" /></Button>
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => setAiResume(r)}><Sparkles className="size-4 text-primary" /></Button>
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => toast.success("Download started")}><Download className="size-4" /></Button>
                  <Button variant="ghost" size="icon" className="size-8 text-destructive" onClick={() => { deleteResume(r.id); toast.success("Deleted"); }}><Trash2 className="size-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="col-span-full border-dashed"><CardContent className="p-12 text-center text-muted-foreground">No resumes found</CardContent></Card>
        )}
      </div>

      <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} onSubmit={(r) => { addResume(r); toast.success("Resume uploaded"); }} />

      <Dialog open={!!aiResume} onOpenChange={(o) => !o && setAiResume(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>AI Resume Analysis</DialogTitle></DialogHeader>
          {aiResume && <AIAnalysisView resume={aiResume} />}
        </DialogContent>
      </Dialog>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Resume Preview</DialogTitle></DialogHeader>
          {preview && (
            <div className="rounded-lg border bg-muted/30 p-8 font-serif">
              <div className="text-center pb-4 border-b">
                <h2 className="text-2xl font-bold">{preview.candidateName}</h2>
                <p className="text-sm text-muted-foreground">{preview.email}</p>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div><div className="font-semibold uppercase text-xs tracking-wider text-primary">Summary</div><p>Experienced {preview.department} professional with {preview.experience} years of expertise in delivering high-quality projects.</p></div>
                <div><div className="font-semibold uppercase text-xs tracking-wider text-primary">Skills</div><p>{preview.skills.join(", ")}</p></div>
                <div><div className="font-semibold uppercase text-xs tracking-wider text-primary">Experience</div><p>Senior Engineer @ TechCorp (2020 — Present)<br/>Software Engineer @ StartupXYZ (2018 — 2020)</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function UploadDialog({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (o: boolean) => void; onSubmit: (r: Omit<Resume, "id" | "uploadedAt">) => void }) {
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [dept, setDept] = useState(DEPARTMENTS[0]); const [sub, setSub] = useState("Frontend");
  const [exp, setExp] = useState(2); const [skills, setSkills] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setUploading(true);
    let p = 0;
    const t = setInterval(() => {
      p += 15;
      setProgress(Math.min(100, p));
      if (p >= 100) { clearInterval(t); setUploading(false); toast.success("File ready"); }
    }, 150);
  };

  const reset = () => { setName(""); setEmail(""); setSkills([]); setFile(null); setProgress(0); };

  const submit = () => {
    if (!name || !email || !file) return toast.error("Please fill all required fields");
    onSubmit({
      candidateId: Math.random().toString(36).slice(2),
      candidateName: name, email, department: dept, subDepartment: sub,
      skills, experience: exp, fileName: file.name, fileSize: file.size,
      atsScore: 60 + Math.floor(Math.random() * 40), bookmarked: false,
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) reset(); }}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Upload Resume</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
            onClick={() => ref.current?.click()}
            className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-accent/30 transition"
          >
            <Upload className="size-8 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">{file ? file.name : "Drag & drop or click to upload"}</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX up to 10MB</p>
            <input ref={ref} type="file" hidden accept=".pdf,.doc,.docx" onChange={(e) => handleFile(e.target.files?.[0] || null)} />
          </div>
          {(uploading || progress > 0) && (
            <div><div className="flex items-center justify-between text-xs mb-1"><span>Uploading</span><span>{progress}%</span></div><Progress value={progress} /></div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Candidate name *</Label><Input className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div><Label>Email *</Label><Input type="email" className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Department</Label>
              <Select value={dept} onValueChange={setDept}><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>{DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Sub-department</Label><Input className="mt-1.5" value={sub} onChange={(e) => setSub(e.target.value)} /></div>
          </div>
          <div><Label>Experience (years)</Label><Input type="number" className="mt-1.5" value={exp} onChange={(e) => setExp(+e.target.value)} /></div>
          <div>
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {SKILLS_POOL.slice(0,12).map(s => {
                const on = skills.includes(s);
                return <Badge key={s} variant={on ? "default" : "outline"} className="cursor-pointer" onClick={() => setSkills(on ? skills.filter(x => x !== s) : [...skills, s])}>{s}</Badge>;
              })}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={submit} className="bg-gradient-primary">Upload</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
