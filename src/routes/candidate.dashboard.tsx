import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, ClipboardList, Calendar, CheckCircle, XCircle, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/candidate/dashboard")({ component: CDashboard });

function CDashboard() {
  const { jobs, interviews, currentUser } = useStore();
  const stats = [
    { label: "Applied Jobs", value: 8, icon: Briefcase, color: "from-violet-500 to-violet-600" },
    { label: "Under Review", value: 3, icon: ClipboardList, color: "from-indigo-500 to-indigo-600" },
    { label: "Interviews", value: 2, icon: Calendar, color: "from-blue-500 to-blue-600" },
    { label: "Shortlisted", value: 2, icon: CheckCircle, color: "from-emerald-500 to-emerald-600" },
    { label: "Rejected", value: 1, icon: XCircle, color: "from-rose-500 to-rose-600" },
  ];
  const recommended = jobs.filter(j => j.status === "Active").slice(0, 4);
  const upcoming = interviews.filter(i => i.status === "Upcoming").slice(0, 3);

  return (
    <div>
      <PageHeader title={`Welcome back, ${currentUser?.name?.split(" ")[0] || "there"}!`} description="Here's your job hunt at a glance." />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {stats.map(s => (
          <Card key={s.label} className="border-0 shadow-soft hover:shadow-elegant transition">
            <CardContent className="p-5">
              <div className={`size-10 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center shadow-soft`}><s.icon className="size-5" /></div>
              <div className="mt-3 text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Recommended Jobs</CardTitle><Link to="/candidate/matched-jobs" className="text-xs text-primary flex items-center gap-1 hover:underline">View all <ArrowUpRight className="size-3" /></Link></CardHeader>
          <CardContent className="space-y-3">
            {recommended.map(j => (
              <div key={j.id} className="p-3 rounded-lg border hover:bg-muted/30 transition">
                <div className="flex items-start justify-between">
                  <div><div className="font-medium">{j.title}</div><div className="text-xs text-muted-foreground">{j.department} • {j.location} • {j.workMode}</div></div>
                  <Badge variant="secondary">{Math.floor(70 + Math.random()*25)}% match</Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">{j.skills.slice(0,3).map(s => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle>Upcoming Interviews</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {upcoming.map(i => (
              <div key={i.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
                <div className="size-10 rounded-lg bg-accent text-accent-foreground flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase">{new Date(i.date).toLocaleString('en', { month: 'short' })}</span>
                  <span className="text-sm font-bold leading-none">{new Date(i.date).getDate()}</span>
                </div>
                <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{i.position}</div><div className="text-xs text-muted-foreground">{i.time} • {i.type}</div></div>
              </div>
            ))}
            {upcoming.length === 0 && <div className="text-sm text-center text-muted-foreground py-4">No upcoming interviews</div>}
          </CardContent>
        </Card>
      </div>
      <Card className="border-0 shadow-soft mt-6">
        <CardHeader><CardTitle>Application Timeline</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              ["Today", "Applied to Senior Frontend Engineer at TalentFlow"],
              ["Yesterday", "Profile viewed by Acme Recruiter"],
              ["3 days ago", "Interview scheduled for Backend Developer"],
              ["1 week ago", "Resume updated"],
            ].map(([t, msg], i) => (
              <div key={i} className="flex gap-3"><div className="size-2 rounded-full bg-primary mt-2 shrink-0" /><div><div className="text-xs text-muted-foreground">{t}</div><div className="text-sm">{msg}</div></div></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
