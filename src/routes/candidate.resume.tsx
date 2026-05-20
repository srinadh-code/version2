import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Upload, FileText, Download, Trash2, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/candidate/resume")({ component: ResumePage });

function ResumePage() {
  const [file, setFile] = useState<{ name: string; size: number; uploadedAt: string } | null>(() => {
    try { return JSON.parse(localStorage.getItem("candidate-resume") || "null"); } catch { return null; }
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    setUploading(true);
    let p = 0;
    const t = setInterval(() => {
      p += 12;
      setProgress(Math.min(100, p));
      if (p >= 100) {
        clearInterval(t);
        const rec = { name: f.name, size: f.size, uploadedAt: new Date().toISOString() };
        setFile(rec);
        localStorage.setItem("candidate-resume", JSON.stringify(rec));
        setUploading(false);
        setProgress(0);
        toast.success("Resume uploaded");
      }
    }, 120);
  };

  return (
    <div>
      <PageHeader title="My Resume" description="Upload and manage your resume" />
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            {file ? (
              <div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-soft">
                  <div className="size-12 rounded-xl bg-card flex items-center justify-center text-primary shadow-soft"><FileText className="size-6" /></div>
                  <div className="flex-1 min-w-0"><div className="font-medium truncate">{file.name}</div><div className="text-xs text-muted-foreground">{(file.size/1024).toFixed(0)} KB • Uploaded {new Date(file.uploadedAt).toLocaleDateString()}</div></div>
                  <Button size="icon" variant="outline" onClick={() => toast.success("Download started")}><Download className="size-4" /></Button>
                  <Button size="icon" variant="outline" className="text-destructive" onClick={() => { setFile(null); localStorage.removeItem("candidate-resume"); toast.success("Resume removed"); }}><Trash2 className="size-4" /></Button>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={() => ref.current?.click()}><Upload className="size-4 mr-1" /> Replace resume</Button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                onClick={() => ref.current?.click()}
                className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary hover:bg-accent/30 transition"
              >
                <Upload className="size-10 mx-auto text-muted-foreground" />
                <p className="mt-3 font-medium">Drag & drop your resume here</p>
                <p className="text-sm text-muted-foreground">or click to browse — PDF, DOC, DOCX up to 10MB</p>
              </div>
            )}
            <input ref={ref} type="file" hidden accept=".pdf,.doc,.docx" onChange={(e) => handleFile(e.target.files?.[0] || null)} />
            {(uploading || progress > 0) && (
              <div className="mt-4"><div className="flex justify-between text-xs mb-1"><span>Uploading</span><span>{progress}%</span></div><Progress value={progress} /></div>
            )}
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="size-11 rounded-xl bg-gradient-soft flex items-center justify-center text-primary"><Shield className="size-5" /></div>
            <h3 className="mt-3 font-semibold">Resume Privacy</h3>
            <p className="text-sm text-muted-foreground mt-2">Your resume is only shared with recruiters from jobs you've applied to. You can delete it anytime.</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Encrypted at rest and in transit</li>
              <li>• Never sold to third parties</li>
              <li>• Visible only to verified recruiters</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
