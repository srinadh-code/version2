// import { createFileRoute } from "@tanstack/react-router";
// import { Card, CardContent } from "@/components/ui/card";
// import { PageHeader } from "@/components/PageHeader";
// import { Bell } from "lucide-react";

// export const Route = createFileRoute("/candidate/notifications")({ component: CNotifs });

// const NOTIFS = [
//   { t: "Interview scheduled", m: "Your Backend Developer interview is on Friday at 2:00 PM", d: "2h ago", unread: true },
//   { t: "Application viewed", m: "Acme Inc viewed your application for Senior Frontend Engineer", d: "5h ago", unread: true },
//   { t: "Profile match", m: "5 new jobs match your profile", d: "1d ago", unread: false },
//   { t: "Application status", m: "Your application moved to Technical Round", d: "2d ago", unread: false },
// ];

// function CNotifs() {
//   return (
//     <div>
//       <PageHeader title="Notifications" />
//       <Card className="border-0 shadow-soft">
//         <CardContent className="p-0 divide-y">
//           {NOTIFS.map((n, i) => (
//             <div key={i} className={`p-4 flex gap-3 ${n.unread ? "bg-accent/30" : ""}`}>
//               <div className="size-9 rounded-full bg-muted flex items-center justify-center"><Bell className="size-4 text-primary" /></div>
//               <div className="flex-1"><div className="text-sm font-medium">{n.t}</div><div className="text-sm text-muted-foreground">{n.m}</div><div className="text-xs text-muted-foreground mt-1">{n.d}</div></div>
//               {n.unread && <div className="size-2 rounded-full bg-primary mt-2" />}
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";

export const Route = createFileRoute("/candidate/notifications")({
  component: NotificationsPage,
});

const tabs = [
  "All",
  "Applications",
  "Interviews",
  "System",
  "Messages",
];

const notifications = [
  {
    id: 1,
    category: "Applications",
    title: "Your application has been shortlisted",
    desc: "Congratulations! Your application for React Developer at TechNova Solutions has been shortlisted.",
    time: "21 May 2025 · 11:30 AM",
    read: false,
  },
  {
    id: 2,
    category: "Interviews",
    title: "Interview scheduled",
    desc: "Your interview for Backend Developer (Python) at InnovateX is scheduled on 23 May 2025 at 11:00 AM.",
    time: "20 May 2025 · 10:15 AM",
    read: false,
  },
  {
    id: 3,
    category: "Applications",
    title: "Application under review",
    desc: "Your application for Full Stack Developer at WebCraft Labs is under review.",
    time: "20 May 2025 · 09:00 AM",
    read: false,
  },
  {
    id: 4,
    category: "System",
    title: "Resume analysis completed",
    desc: "Your resume John_Doe_Resume.pdf has been analyzed. Check your results now.",
    time: "18 May 2025 · 09:30 AM",
    read: true,
  },
  {
    id: 5,
    category: "Messages",
    title: "New message from HR",
    desc: "You have a new message from HR team at PixelPerfect.",
    time: "17 May 2025 · 03:15 PM",
    read: true,
  },
];

function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredNotifications =
    activeTab === "All"
      ? notifications
      : notifications.filter((item) => item.category === activeTab);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">Notifications</h1>

          <p className="text-gray-500 mt-2">
            Stay updated with the latest activity on your applications
          </p>
        </div>

        <button className="flex items-center gap-2 text-indigo-600 text-sm font-medium hover:underline">
          <CheckCheck className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm border-b-2 transition-all
              ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600 font-semibold"
                  : "border-transparent text-gray-500"
              }`}
          >
            {tab}

            {tab === "Applications" && (
              <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 rounded">
                12
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border border-gray-200 p-5 flex gap-4 shadow-sm
              ${!item.read ? "border-l-4 border-l-indigo-600" : ""}
            `}
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-1 text-sm">
                    {item.desc}
                  </p>
                </div>

                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}