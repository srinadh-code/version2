import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Briefcase, CalendarDays, Trophy, UserCheck, TrendingUp, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export const Route = createFileRoute("/admin/dashboard")({ component: DashboardPage });

function DashboardPage() {
  const { candidates, jobs, interviews, resumes, users, activities } = useStore();
  const hired = candidates.filter((c) => c.stage === "Hired").length;
  const upcoming = interviews.filter((i) => i.status === "Upcoming");

  const stats = [
    { label: "Total Candidates", value: candidates.length, icon: Users, trend: "+12%", color: "from-violet-500 to-violet-600" },
    { label: "Open Jobs", value: jobs.filter(j => j.status === "Active").length, icon: Briefcase, trend: "+3", color: "from-indigo-500 to-indigo-600" },
    { label: "Interviews", value: upcoming.length, icon: CalendarDays, trend: "+8%", color: "from-blue-500 to-blue-600" },
    { label: "Hired", value: hired, icon: Trophy, trend: "+2", color: "from-emerald-500 to-emerald-600" },
    { label: "Recruiters", value: users.filter(u => u.active).length, icon: UserCheck, trend: "Active", color: "from-pink-500 to-pink-600" },
  ];

  const funnel = ["Applied", "Screening", "Technical Round", "HR Round", "Offered", "Hired"].map((s) => ({ stage: s, count: candidates.filter(c => c.stage === s).length }));
  const trends = Array.from({ length: 7 }).map((_, i) => ({ day: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i], resumes: 5 + Math.floor(Math.random() * 20), interviews: 2 + Math.floor(Math.random() * 8) }));
  const deptData = ["Web Development","Data Science","UI/UX","SAP","Networking"].map(d => ({ name: d, value: candidates.filter(c => c.department === d).length }));
  const COLORS = ["oklch(0.55 0.22 290)","oklch(0.62 0.18 250)","oklch(0.70 0.18 200)","oklch(0.72 0.17 150)","oklch(0.75 0.18 60)"];

  return (
    <div>
      <PageHeader title="Dashboard" description="Welcome back. Here's what's happening with your recruitment today." />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label} className="border-0 shadow-soft hover:shadow-elegant transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className={`size-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-soft`}>
                  <s.icon className="size-5" />
                </div>
                <span className="text-xs font-medium text-success flex items-center gap-0.5"><TrendingUp className="size-3" />{s.trend}</span>
              </div>
              <div className="mt-4 text-3xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Resumes</CardTitle>
            <Link to="/admin/resumes" className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowUpRight className="size-3" /></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {resumes.slice(0, 5).map(r => (
              <div key={r.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                <Avatar className="size-9"><AvatarFallback className="bg-accent text-accent-foreground text-xs">{r.candidateName.slice(0,1)}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{r.candidateName}</div><div className="text-xs text-muted-foreground truncate">{r.department}</div></div>
                <Badge variant="secondary">{r.atsScore}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Interviews</CardTitle>
            <Link to="/admin/interviews" className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowUpRight className="size-3" /></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.slice(0, 5).map(i => (
              <div key={i.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                <div className="size-10 rounded-lg bg-accent text-accent-foreground flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase">{new Date(i.date).toLocaleString('en', { month: 'short' })}</span>
                  <span className="text-sm font-bold leading-none">{new Date(i.date).getDate()}</span>
                </div>
                <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{i.candidateName}</div><div className="text-xs text-muted-foreground truncate">{i.position} • {i.time}</div></div>
              </div>
            ))}
            {upcoming.length === 0 && <div className="text-sm text-muted-foreground text-center py-4">No upcoming interviews</div>}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {activities.slice(0, 6).map(a => (
              <div key={a.id} className="flex gap-3 text-sm">
                <div className="size-2 rounded-full bg-primary mt-2 shrink-0" />
                <div className="flex-1"><span className="font-medium">{a.user}</span> <span className="text-muted-foreground">{a.action}</span> <span className="font-medium">{a.target}</span><div className="text-xs text-muted-foreground mt-0.5">{new Date(a.createdAt).toLocaleString()}</div></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>



      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader><CardTitle>Resume Upload & Interview Trends</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="resumes" stroke="oklch(0.55 0.22 290)" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="interviews" stroke="oklch(0.62 0.18 250)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Top Recruiters</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {users.filter(u => u.active).slice(0, 5).map((u, i) => (
              <div key={u.id} className="flex items-center gap-3">
                <Avatar className="size-9"><AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">{u.name.slice(0,1)}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.role}</div>
                </div>
                <div className="text-sm font-semibold">{20 - i * 3}<span className="text-xs text-muted-foreground"> hires</span></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 border-0 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <div><CardTitle>Hiring Funnel</CardTitle><p className="text-sm text-muted-foreground mt-1">Candidate distribution by stage</p></div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={funnel}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="stage" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="count" fill="oklch(0.55 0.22 290)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle>Department Hiring</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={deptData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  {deptData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      
    </div>
  );
}
