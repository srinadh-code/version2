// import { createFileRoute, Link } from "@tanstack/react-router";
// import { Briefcase, ClipboardList, Calendar, CheckCircle, XCircle, ArrowUpRight } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { useStore } from "@/lib/mock-data";
// import { PageHeader } from "@/components/PageHeader";

// export const Route = createFileRoute("/candidate/dashboard")({ component: CDashboard });

// function CDashboard() {
//   const { jobs, interviews, currentUser } = useStore();
//   const stats = [
//     { label: "Applied Jobs", value: 8, icon: Briefcase, color: "from-violet-500 to-violet-600" },
//     { label: "Under Review", value: 3, icon: ClipboardList, color: "from-indigo-500 to-indigo-600" },
//     { label: "Interviews", value: 2, icon: Calendar, color: "from-blue-500 to-blue-600" },
//     { label: "Shortlisted", value: 2, icon: CheckCircle, color: "from-emerald-500 to-emerald-600" },
//     { label: "Rejected", value: 1, icon: XCircle, color: "from-rose-500 to-rose-600" },
//   ];
//   const recommended = jobs.filter(j => j.status === "Active").slice(0, 4);
//   const upcoming = interviews.filter(i => i.status === "Upcoming").slice(0, 3);

//   return (
//     <div>
//       <PageHeader title={`Welcome back, ${currentUser?.name?.split(" ")[0] || "there"}!`} description="Here's your job hunt at a glance." />
//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//         {stats.map(s => (
//           <Card key={s.label} className="border-0 shadow-soft hover:shadow-elegant transition">
//             <CardContent className="p-5">
//               <div className={`size-10 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center shadow-soft`}><s.icon className="size-5" /></div>
//               <div className="mt-3 text-2xl font-bold">{s.value}</div>
//               <div className="text-xs text-muted-foreground">{s.label}</div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//       <div className="grid lg:grid-cols-3 gap-6">
//         <Card className="lg:col-span-2 border-0 shadow-soft">
//           <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Recommended Jobs</CardTitle><Link to="/candidate/matched-jobs" className="text-xs text-primary flex items-center gap-1 hover:underline">View all <ArrowUpRight className="size-3" /></Link></CardHeader>
//           <CardContent className="space-y-3">
//             {recommended.map(j => (
//               <div key={j.id} className="p-3 rounded-lg border hover:bg-muted/30 transition">
//                 <div className="flex items-start justify-between">
//                   <div><div className="font-medium">{j.title}</div><div className="text-xs text-muted-foreground">{j.department} • {j.location} • {j.workMode}</div></div>
//                   <Badge variant="secondary">{Math.floor(70 + Math.random()*25)}% match</Badge>
//                 </div>
//                 <div className="mt-2 flex flex-wrap gap-1">{j.skills.slice(0,3).map(s => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}</div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//         <Card className="border-0 shadow-soft">
//           <CardHeader><CardTitle>Upcoming Interviews</CardTitle></CardHeader>
//           <CardContent className="space-y-3">
//             {upcoming.map(i => (
//               <div key={i.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
//                 <div className="size-10 rounded-lg bg-accent text-accent-foreground flex flex-col items-center justify-center">
//                   <span className="text-[10px] uppercase">{new Date(i.date).toLocaleString('en', { month: 'short' })}</span>
//                   <span className="text-sm font-bold leading-none">{new Date(i.date).getDate()}</span>
//                 </div>
//                 <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{i.position}</div><div className="text-xs text-muted-foreground">{i.time} • {i.type}</div></div>
//               </div>
//             ))}
//             {upcoming.length === 0 && <div className="text-sm text-center text-muted-foreground py-4">No upcoming interviews</div>}
//           </CardContent>
//         </Card>
//       </div>
//       <Card className="border-0 shadow-soft mt-6">
//         <CardHeader><CardTitle>Application Timeline</CardTitle></CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {[
//               ["Today", "Applied to Senior Frontend Engineer at TalentFlow"],
//               ["Yesterday", "Profile viewed by Acme Recruiter"],
//               ["3 days ago", "Interview scheduled for Backend Developer"],
//               ["1 week ago", "Resume updated"],
//             ].map(([t, msg], i) => (
//               <div key={i} className="flex gap-3"><div className="size-2 rounded-full bg-primary mt-2 shrink-0" /><div><div className="text-xs text-muted-foreground">{t}</div><div className="text-sm">{msg}</div></div></div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  Briefcase,
  Calendar,
  Bell,
  Bookmark,
  XCircle,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/candidate/dashboard")({
  component: Dashboard,
});

const recommendedJobs = [
  {
    id: 1,
    company: "TechNova Solutions",
    title: "Full Stack Developer",
    location: "Hyderabad, India",
    mode: "On-site",
    desc: "Work on exciting projects and build scalable web applications.",
    tags: ["React", "Node.js", "JavaScript", "SQL"],
    posted: "2 days ago",
  },
  {
    id: 2,
    company: "TechNova Solutions",
    title: "Backend Developer (Python)",
    location: "Hyderabad, India",
    mode: "Hybrid",
    desc: "Build robust APIs and backend services using Python and Django.",
    tags: ["Python", "Django", "REST API", "SQL"],
    posted: "3 days ago",
  },
  {
    id: 3,
    company: "TechNova Solutions",
    title: "React Developer",
    location: "Hyderabad, India",
    mode: "Remote",
    desc: "Create responsive and interactive user interfaces with React.",
    tags: ["React", "JavaScript", "HTML", "CSS"],
    posted: "3 days ago",
  },
  {
    id: 4,
    company: "InnovateX",
    title: "DevOps Engineer",
    location: "Bangalore, India",
    mode: "Hybrid",
    desc: "Manage CI/CD and cloud infrastructure.",
    tags: ["AWS", "Docker", "Kubernetes"],
    posted: "5 days ago",
  },
];

const recentActivity = [
  {
    id: 1,
    title: "Resume uploaded successfully",
    desc: "John_Doe_Resume.pdf",
    time: "21 May 2025 · 11:42 AM",
    type: "success",
  },
  {
    id: 2,
    title: "AI analysis completed",
    desc: "We’ve extracted your details",
    time: "21 May 2025 · 11:45 AM",
    type: "info",
  },
  {
    id: 3,
    title: "Applied for React Developer",
    desc: "TechNova Solutions",
    time: "20 May 2025 · 04:30 PM",
    type: "primary",
  },
  {
    id: 4,
    title: "Interview scheduled",
    desc: "Frontend Developer - Round 1",
    time: "19 May 2025 · 10:00 AM",
    type: "warning",
  },
  {
    id: 5,
    title: "Application rejected",
    desc: "UI/UX Designer at PixelPerfect",
    time: "18 May 2025 · 02:15 PM",
    type: "destructive",
  },
];

const appliedJobs = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "TechNova Solutions",
    status: "Under Review",
  },
  {
    id: 2,
    title: "Backend Developer (Python)",
    company: "InnovateX",
    status: "Shortlisted",
  },
  {
    id: 3,
    title: "React Developer",
    company: "WebCraft Labs",
    status: "Interview Scheduled",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "PixelPerfect",
    status: "Rejected",
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "CodeWave",
    status: "Applied",
  },
];

const upcomingInterviews = [
  {
    id: 1,
    role: "Frontend Developer - Round 1",
    company: "TechNova Solutions",
    date: "22 May 2025 · 10:00 AM",
  },
  {
    id: 2,
    role: "Backend Developer - Technical Round",
    company: "InnovateX",
    date: "25 May 2025 · 02:00 PM",
  },
];

function Dashboard() {
  const [name] = useState("John");

  const activityIcon = {
    success: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    info: <Bell className="w-4 h-4 text-blue-500" />,
    primary: <Briefcase className="w-4 h-4 text-purple-500" />,
    warning: <Clock3 className="w-4 h-4 text-yellow-500" />,
    destructive: <XCircle className="w-4 h-4 text-red-500" />,
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, {name}! 👋
        </h1>

        <p className="text-muted-foreground mt-2">
          Here’s what’s happening with your job search today.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <Briefcase className="w-10 h-10 text-purple-500 mb-4" />
            <h2 className="text-4xl font-bold">12</h2>
            <p className="text-muted-foreground">Applied Jobs</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Bookmark className="w-10 h-10 text-green-500 mb-4" />
            <h2 className="text-4xl font-bold">3</h2>
            <p className="text-muted-foreground">Under Review</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Calendar className="w-10 h-10 text-sky-500 mb-4" />
            <h2 className="text-4xl font-bold">2</h2>
            <p className="text-muted-foreground">
              Interviews Scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <CheckCircle2 className="w-10 h-10 text-yellow-600 mb-4" />
            <h2 className="text-4xl font-bold">1</h2>
            <p className="text-muted-foreground">Shortlisted</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <XCircle className="w-10 h-10 text-red-500 mb-4" />
            <h2 className="text-4xl font-bold">6</h2>
            <p className="text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">
              Recommended Jobs For You
            </h2>

            <Link
              to="/candidate/matched-jobs"
              className="text-primary hover:underline"
            >
              View all jobs →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {recommendedJobs.map((j) => (
              <Card key={j.id}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {j.company.charAt(0)}
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        {j.company}
                      </p>

                      <h3 className="font-bold text-2xl">
                        {j.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {j.location}
                    </span>

                    <span>• {j.mode}</span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {j.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {j.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <p className="text-sm text-muted-foreground">
                      Posted {j.posted}
                    </p>

                    <div className="flex gap-2">
                      <button className="border rounded-lg px-4 py-2">
                        Save
                      </button>

                      <button className="bg-primary text-white rounded-lg px-4 py-2">
                        Quick Apply
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>

              <Link
                to="/candidate/notifications"
                className="text-primary hover:underline text-sm"
              >
                View all
              </Link>
            </CardHeader>

            <CardContent className="space-y-6">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex gap-3">
                  <div className="mt-1">
                    {
                      activityIcon[
                        a.type as keyof typeof activityIcon
                      ]
                    }
                  </div>

                  <div>
                    <h3 className="font-semibold">{a.title}</h3>

                    <p className="text-sm text-muted-foreground">
                      {a.desc}
                    </p>

                    <p className="text-xs text-muted-foreground mt-1">
                      {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Applied Jobs</CardTitle>

            <Link
              to="/candidate/applied-jobs"
              className="text-primary hover:underline text-sm"
            >
              View all
            </Link>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {appliedJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between border rounded-xl p-4"
                >
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>

                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                  </div>

                  <Badge>{job.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Interviews</CardTitle>

            <Link
              to="/candidate/interviews"
              className="text-primary hover:underline text-sm"
            >
              View all
            </Link>
          </CardHeader>

          <CardContent className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div
                key={interview.id}
                className="border rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {interview.role}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {interview.company}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {interview.date}
                    </p>
                  </div>
                </div>

                <button className="bg-primary text-white px-4 py-2 rounded-lg">
                  View Details
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}