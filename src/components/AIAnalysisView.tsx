import { Sparkles, CheckCircle2, AlertCircle, Lightbulb, Download, RefreshCw, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { SKILLS_POOL, type Resume } from "@/lib/mock-data";
import { toast } from "sonner";
import { useState } from "react";

export function AIAnalysisView({ resume }: { resume: Resume }) {
  const [score, setScore] = useState(resume.atsScore);
  const [analyzing, setAnalyzing] = useState(false);

  const reanalyze = () => {
    setAnalyzing(true);
    setTimeout(() => { setScore(60 + Math.floor(Math.random() * 40)); setAnalyzing(false); toast.success("Re-analyzed"); }, 1200);
  };

  const missing = SKILLS_POOL.filter(s => !resume.skills.includes(s)).slice(0, 4);
  const strengths = ["Strong technical skill set", `${resume.experience}+ years of relevant experience`, "Well-structured resume format", "Clear career progression"];
  const weaknesses = ["Limited mention of leadership experience", "Could add more measurable achievements", "Certifications section missing"];
  const recommendations = ["Add quantifiable metrics (e.g., 'improved performance by 40%')", "Include relevant certifications and courses", "Highlight team leadership and mentorship", "Add a professional summary section"];
  const recommendedRoles = ["Senior Frontend Engineer", "Tech Lead", "Full Stack Developer"];

  const ringStyle = {
    background: `conic-gradient(oklch(0.55 0.22 290) ${score * 3.6}deg, oklch(0.92 0.01 280) 0deg)`,
  };

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-[200px_1fr] gap-5 items-center">
        <div className="relative size-40 rounded-full flex items-center justify-center" style={ringStyle}>
          <div className="size-32 rounded-full bg-card flex flex-col items-center justify-center shadow-soft">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">{score}%</div>
            <div className="text-xs text-muted-foreground">ATS Score</div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{resume.candidateName}</h3>
          <p className="text-sm text-muted-foreground">{resume.email} • {resume.department}</p>
          <p className="mt-3 text-sm leading-relaxed">
            <Sparkles className="size-4 inline text-primary mr-1" />
            A strong candidate with {resume.experience} years in {resume.department}. The resume demonstrates good technical depth and aligns well with industry standards. Match probability for similar roles is <strong className="text-primary">{Math.min(95, score + 8)}%</strong>.
          </p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" onClick={reanalyze} disabled={analyzing}><RefreshCw className={`size-3.5 mr-1 ${analyzing ? "animate-spin" : ""}`} /> Re-analyze</Button>
            <Button size="sm" variant="outline" onClick={() => toast.success("Report exported")}><FileDown className="size-3.5 mr-1" /> Export PDF</Button>
            <Button size="sm" variant="outline" onClick={() => toast.success("Report downloaded")}><Download className="size-3.5 mr-1" /> Download</Button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Skills Detected</h4>
        <div className="flex flex-wrap gap-1.5">{resume.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 border-0 shadow-soft">
          <h4 className="text-sm font-semibold flex items-center gap-2 mb-3 text-success"><CheckCircle2 className="size-4" /> Strengths</h4>
          <ul className="space-y-2 text-sm">{strengths.map((s, i) => <li key={i} className="flex gap-2"><span className="text-success">•</span>{s}</li>)}</ul>
        </Card>
        <Card className="p-4 border-0 shadow-soft">
          <h4 className="text-sm font-semibold flex items-center gap-2 mb-3 text-warning-foreground"><AlertCircle className="size-4" /> Weaknesses</h4>
          <ul className="space-y-2 text-sm">{weaknesses.map((s, i) => <li key={i} className="flex gap-2"><span className="text-warning-foreground">•</span>{s}</li>)}</ul>
        </Card>
      </div>

      <Card className="p-4 border-0 shadow-soft">
        <h4 className="text-sm font-semibold mb-3">Missing Skills</h4>
        <div className="flex flex-wrap gap-1.5">{missing.map(s => <Badge key={s} variant="outline" className="border-destructive/30 text-destructive">{s}</Badge>)}</div>
      </Card>

      <Card className="p-4 border-0 shadow-soft">
        <h4 className="text-sm font-semibold flex items-center gap-2 mb-3 text-primary"><Lightbulb className="size-4" /> Recommended Improvements</h4>
        <ul className="space-y-2 text-sm">{recommendations.map((s, i) => <li key={i} className="flex gap-2"><span className="text-primary">{i+1}.</span>{s}</li>)}</ul>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 border-0 shadow-soft">
          <h4 className="text-sm font-semibold mb-3">Recommended Job Roles</h4>
          <div className="space-y-2">
            {recommendedRoles.map((r, i) => (
              <div key={r} className="flex items-center justify-between"><span className="text-sm">{r}</span><Badge variant="secondary">{92 - i * 6}% match</Badge></div>
            ))}
          </div>
        </Card>
        <Card className="p-4 border-0 shadow-soft">
          <h4 className="text-sm font-semibold mb-3">Resume Match Breakdown</h4>
          <div className="space-y-3">
            {[["Skills match", 88], ["Experience match", 75], ["Education match", 92], ["Keywords match", 70]].map(([l, v]) => (
              <div key={l as string}>
                <div className="flex justify-between text-xs mb-1"><span>{l}</span><span className="font-medium">{v}%</span></div>
                <Progress value={v as number} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
