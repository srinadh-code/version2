// import { createFileRoute } from "@tanstack/react-router";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { PageHeader } from "@/components/PageHeader";
// import { useStore } from "@/lib/mock-data";

// export const Route = createFileRoute("/candidate/applied-jobs")({ component: Applied });

// const STAGE_COLORS: Record<string,string> = {
//   Applied: "bg-muted text-muted-foreground",
//   "Under Review": "bg-info/15 text-info border-info/20",
//   Interview: "bg-accent text-accent-foreground",
//   Shortlisted: "bg-success/15 text-success border-success/20",
//   Rejected: "bg-destructive/15 text-destructive",
// };

// function Applied() {
//   const { jobs } = useStore();
//   const stages = ["Applied", "Under Review", "Interview", "Shortlisted", "Rejected"];
//   const sample = jobs.slice(0, 8).map((j, i) => ({ ...j, _stage: stages[i % stages.length], _appliedAt: new Date(Date.now() - i * 86400000 * 2).toISOString() }));

//   return (
//     <div>
//       <PageHeader title="Applied Jobs" description="Track your job applications" />
//       <Card className="border-0 shadow-soft overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
//             <tr><th className="text-left px-4 py-3">Position</th><th className="text-left px-4 py-3">Department</th><th className="text-left px-4 py-3">Location</th><th className="text-left px-4 py-3">Applied</th><th className="text-left px-4 py-3">Status</th></tr>
//           </thead>
//           <tbody>
//             {sample.map(j => (
//               <tr key={j.id} className="border-t hover:bg-muted/30">
//                 <td className="px-4 py-3 font-medium">{j.title}</td>
//                 <td className="px-4 py-3 text-muted-foreground">{j.department}</td>
//                 <td className="px-4 py-3 text-muted-foreground">{j.location}</td>
//                 <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(j._appliedAt).toLocaleDateString()}</td>
//                 <td className="px-4 py-3"><Badge variant="outline" className={STAGE_COLORS[j._stage]}>{j._stage}</Badge></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Card>
//     </div>
//   );
// }




import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Filter } from "lucide-react";

export const Route = createFileRoute("/candidate/applied-jobs")({
  component: AppliedJobsPage,
});

const filters = [
  "All Applications",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Rejected",
  "Offered",
];

const appliedJobs = [
  {
    title: "Full Stack Developer",
    company: "TechNova Solutions",
    location: "Hyderabad, India",
    date: "21 May 2025",
    status: "Under Review",
  },
  {
    title: "Backend Developer (Python)",
    company: "InnovateX",
    location: "Hyderabad, India",
    date: "20 May 2025",
    status: "Shortlisted",
  },
  {
    title: "React Developer",
    company: "WebCraft Labs",
    location: "Hyderabad, India",
    date: "19 May 2025",
    status: "Interview Scheduled",
  },
  {
    title: "UI/UX Designer",
    company: "PixelPerfect",
    location: "Hyderabad, India",
    date: "18 May 2025",
    status: "Rejected",
  },
  {
    title: "Frontend Developer",
    company: "CodeWave",
    location: "Hyderabad, India",
    date: "16 May 2025",
    status: "Applied",
  },
];

function getStatusStyle(status: string) {
  switch (status) {
    case "Under Review":
      return "bg-yellow-100 text-yellow-700";

    case "Shortlisted":
      return "bg-green-100 text-green-700";

    case "Interview Scheduled":
      return "bg-cyan-100 text-cyan-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    case "Applied":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function AppliedJobsPage() {
  const [filter, setFilter] = useState("All Applications");

  const jobs =
    filter === "All Applications"
      ? [...appliedJobs, ...appliedJobs]
      : appliedJobs.filter((job) => job.status === filter);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Applied Jobs</h1>

        <p className="text-gray-500 mt-2">
          Track the status of jobs you've applied to
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
              ${
                filter === item
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-200 hover:bg-gray-50"
              }`}
          >
            {item}
          </button>
        ))}

        <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="text-left p-4">Job Details</th>
              <th className="text-left p-4">Application Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Next Step</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                {/* Job */}
                <td className="p-4">
                  <div className="font-semibold text-gray-800">
                    {job.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    {job.company} · {job.location}
                  </div>
                </td>

                {/* Date */}
                <td className="p-4 text-gray-700">{job.date}</td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>

                {/* Next Step */}
                <td className="p-4 text-sm text-gray-500">
                  {job.status === "Shortlisted"
                    ? "Technical round scheduled"
                    : job.status === "Under Review"
                    ? "Our team is reviewing your application"
                    : "—"}
                </td>

                {/* Actions */}
                <td className="p-4">
                  <button className="text-indigo-600 hover:underline text-sm font-medium">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}