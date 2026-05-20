import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { useStore } from "@/lib/mock-data";
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar } from "recharts";

export const Route = createFileRoute("/admin/reports")({ component: ReportsPage });

const COLORS = ["oklch(0.55 0.22 290)","oklch(0.62 0.18 250)","oklch(0.70 0.18 200)","oklch(0.72 0.17 150)","oklch(0.75 0.18 60)"];

function ReportsPage() {
  const { candidates, users } = useStore();
  const funnel = ["Applied", "Screening", "Technical Round", "HR Round", "Offered", "Hired"].map((s) => ({ stage: s, count: candidates.filter(c => c.stage === s).length }));
  const sources = [{ name: "LinkedIn", value: 35 }, { name: "Indeed", value: 25 }, { name: "Referral", value: 20 }, { name: "Website", value: 12 }, { name: "Other", value: 8 }];
  const ats = [{ range: "90+", count: candidates.filter(c => c.atsScore >= 90).length },{ range: "75-89", count: candidates.filter(c => c.atsScore >= 75 && c.atsScore < 90).length },{ range: "60-74", count: candidates.filter(c => c.atsScore >= 60 && c.atsScore < 75).length },{ range: "<60", count: candidates.filter(c => c.atsScore < 60).length }];
  const recruiterPerf = users.filter(u => u.active).map((u, i) => ({ name: u.name.split(" ")[0], hires: 20 - i * 3, fill: COLORS[i % COLORS.length] }));

  return (
    <div>
      <PageHeader title="Reports & Analytics" description="In-depth recruiting analytics" />
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle>Hiring Funnel</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={funnel}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="stage" tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="count" fill="oklch(0.55 0.22 290)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle>Resume Sources</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={sources} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {sources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle>ATS Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={ats}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="count" fill="oklch(0.62 0.18 250)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle>Recruiter Performance</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={recruiterPerf}>
                <RadialBar background dataKey="hires" cornerRadius={8} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              {recruiterPerf.map(r => (
                <div key={r.name} className="flex items-center gap-2"><span className="size-2 rounded-full" style={{background: r.fill}} />{r.name}: {r.hires} hires</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
