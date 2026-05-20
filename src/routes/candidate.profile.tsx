// import { createFileRoute } from "@tanstack/react-router";
// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { PageHeader } from "@/components/PageHeader";
// import { useStore, SKILLS_POOL } from "@/lib/mock-data";
// import { toast } from "sonner";

// export const Route = createFileRoute("/candidate/profile")({ component: ProfilePage });

// function ProfilePage() {
//   const { currentUser } = useStore();
//   const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "AWS"]);
//   return (
//     <div>
//       <PageHeader title="My Profile" description="Keep your info up to date" actions={<Button className="bg-gradient-primary" onClick={() => toast.success("Profile saved")}>Save changes</Button>} />
//       <div className="grid lg:grid-cols-3 gap-6">
//         <Card className="border-0 shadow-soft lg:col-span-1">
//           <CardContent className="p-6 text-center">
//             <Avatar className="size-24 mx-auto"><AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">{(currentUser?.name||"C").slice(0,1)}</AvatarFallback></Avatar>
//             <h2 className="mt-3 font-semibold text-lg">{currentUser?.name || "Candidate"}</h2>
//             <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
//             <Button variant="outline" size="sm" className="mt-3" onClick={() => toast.info("Photo upload coming soon")}>Change photo</Button>
//             <div className="mt-5 pt-5 border-t text-left space-y-2 text-sm">
//               <div><div className="text-xs text-muted-foreground">Profile completion</div><div className="font-semibold text-primary">85%</div></div>
//               <div><div className="text-xs text-muted-foreground">Profile views</div><div className="font-semibold">124</div></div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="border-0 shadow-soft lg:col-span-2">
//           <CardContent className="p-6 space-y-5">
//             <div className="grid sm:grid-cols-2 gap-3">
//               <div><Label>Full name</Label><Input className="mt-1.5" defaultValue={currentUser?.name || ""} /></div>
//               <div><Label>Email</Label><Input className="mt-1.5" defaultValue={currentUser?.email || ""} /></div>
//               <div><Label>Phone</Label><Input className="mt-1.5" defaultValue="+91 9876543210" /></div>
//               <div><Label>Location</Label><Input className="mt-1.5" defaultValue="Bangalore, India" /></div>
//             </div>
//             <div><Label>About</Label><Textarea className="mt-1.5" rows={3} defaultValue="Passionate engineer with 5+ years of experience building scalable web applications." /></div>
//             <div>
//               <Label>Skills</Label>
//               <div className="flex flex-wrap gap-1.5 mt-1.5">
//                 {SKILLS_POOL.slice(0,10).map(s => {
//                   const on = skills.includes(s);
//                   return <Badge key={s} variant={on ? "default" : "outline"} className="cursor-pointer" onClick={() => setSkills(on ? skills.filter(x => x!==s) : [...skills, s])}>{s}</Badge>;
//                 })}
//               </div>
//             </div>
//             <div className="grid sm:grid-cols-2 gap-3">
//               <div><Label>Education</Label><Input className="mt-1.5" defaultValue="B.Tech, Computer Science" /></div>
//               <div><Label>Experience (years)</Label><Input type="number" className="mt-1.5" defaultValue={5} /></div>
//             </div>
//             <div><Label>Certifications</Label><Input className="mt-1.5" defaultValue="AWS Certified Developer, Google Cloud Professional" /></div>
//             <div className="grid sm:grid-cols-2 gap-3">
//               <div><Label>LinkedIn</Label><Input className="mt-1.5" defaultValue="linkedin.com/in/me" /></div>
//               <div><Label>GitHub</Label><Input className="mt-1.5" defaultValue="github.com/me" /></div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }




import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  Pencil,
  Plus,
  GraduationCap,
  Briefcase,
  Award,
  Calendar,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/candidate/profile")({
  component: ProfilePage,
});

const tabs = [
  "Overview",
  "Personal Information",
  "Education",
  "Experience",
  "Skills",
  "Certificates",
  "Additional Information",
] as const;

type Tab = (typeof tabs)[number];

const education = [
  {
    id: 1,
    degree: "B.Tech in Computer Science",
    school: "JNTU Hyderabad",
    years: "2018 - 2022",
    grade: "8.5 CGPA",
    field: "Computer Science",
    medium: "English",
  },
  {
    id: 2,
    degree: "Intermediate",
    school: "Narayana Junior College",
    years: "2016 - 2018",
    grade: "95%",
    board: "TSBIE",
    medium: "English",
  },
];

const experience = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "TechNova Solutions",
    years: "2023 - Present",
    desc: "Developed scalable React applications and dashboards.",
  },
  {
    id: 2,
    role: "React Intern",
    company: "CodeCraft",
    years: "2022 - 2023",
    desc: "Worked on UI development and responsive design.",
  },
];

const skills = [
  {
    name: "React",
    level: "Advanced",
    percent: 90,
  },
  {
    name: "JavaScript",
    level: "Advanced",
    percent: 85,
  },
  {
    name: "Node.js",
    level: "Intermediate",
    percent: 75,
  },
  {
    name: "Python",
    level: "Intermediate",
    percent: 70,
  },
];

const otherSkills = [
  {
    name: "Git",
    level: "Advanced",
  },
  {
    name: "Docker",
    level: "Intermediate",
  },
  {
    name: "AWS",
    level: "Beginner",
  },
  {
    name: "MongoDB",
    level: "Intermediate",
  },
];

const certificates = [
  {
    id: 1,
    name: "React Developer Certification",
    issuer: "Udemy",
    date: "Jan 2024",
    credential: "REACT-2024-001",
  },
  {
    id: 2,
    name: "Python Full Stack",
    issuer: "Coursera",
    date: "Aug 2023",
    credential: "PY-STACK-223",
  },
];

function ProfilePage() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-4xl font-bold">My Profile</h1>

        <p className="text-muted-foreground mt-2">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="flex gap-2 border-b overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 whitespace-nowrap border-b-2 text-sm transition ${
              tab === t
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && <Overview />}
      {tab === "Personal Information" && <Personal />}
      {tab === "Education" && <EducationTab />}
      {tab === "Experience" && <ExperienceTab />}
      {tab === "Skills" && <SkillsTab />}
      {tab === "Certificates" && <CertificatesTab />}
      {tab === "Additional Information" && <Additional />}
    </div>
  );
}

function Overview() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardContent className="p-6 text-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white flex items-center justify-center text-4xl font-bold mx-auto mb-4">
            J
          </div>

          <h2 className="text-2xl font-bold">John Doe</h2>

          <p className="text-muted-foreground mt-1">
            Full Stack Developer
          </p>

          <p className="text-sm text-muted-foreground">
            Hyderabad, India
          </p>

          <button className="mt-6 w-full bg-primary text-white py-3 rounded-xl">
            Edit Profile
          </button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            About Me
          </h3>

          <p className="text-muted-foreground leading-7">
            Full Stack Developer with 3+ years of experience
            in building scalable web applications using
            React, Node.js and cloud technologies.
            Passionate about clean code, problem solving,
            and ensuring great user experiences.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div>
              <p className="text-sm text-muted-foreground">
                Email
              </p>

              <p className="font-medium">
                john.doe@email.com
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Phone
              </p>

              <p className="font-medium">
                +91 98765 43210
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Experience
              </p>

              <p className="font-medium">3+ Years</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Notice Period
              </p>

              <p className="font-medium">30 Days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Personal() {
  const fields = [
    ["Full Name", "John Doe"],
    ["Email", "john.doe@email.com"],
    ["Phone", "+91 98765 43210"],
    ["Date of Birth", "15 May 1998"],
    ["Gender", "Male"],
    ["Current Location", "Hyderabad, India"],
    ["Preferred Work Mode", "Hybrid"],
    ["LinkedIn", "linkedin.com/in/johndoe"],
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            Personal Information
          </h3>

          <button className="flex items-center gap-1 text-primary">
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {fields.map(([label, value]) => (
            <div key={label}>
              <p className="text-sm text-muted-foreground">
                {label}
              </p>

              <p className="font-medium">{value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function EducationTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {education.map((e) => (
        <Card key={e.id}>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {e.degree}
                    </h3>

                    <p className="text-muted-foreground">
                      {e.school}
                    </p>
                  </div>

                  <Badge>{e.grade}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Years
                    </p>

                    <p>{e.years}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Field
                    </p>

                    <p>{e.field || "-"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Board
                    </p>

                    <p>{e.board || "-"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Medium
                    </p>

                    <p>{e.medium}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ExperienceTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {experience.map((x) => (
        <Card key={x.id}>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {x.role}
                </h3>

                <p className="text-muted-foreground">
                  {x.company}
                </p>

                <p className="text-sm flex items-center gap-1 mt-1 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {x.years}
                </p>

                <p className="mt-4">{x.desc}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SkillsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ["Total Skills", 18],
          ["Top Skills", 10],
          ["Tools & Others", 3],
          ["Skill Level", "Expert"],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-6">
              <h2 className="text-3xl font-bold">{value}</h2>

              <p className="text-sm text-muted-foreground">
                {label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              Top Skills
            </h3>

            <button className="flex items-center gap-1 text-primary">
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between mb-2">
                  <span>{s.name}</span>

                  <span className="text-sm text-muted-foreground">
                    {s.level}
                  </span>
                </div>

                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${s.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-5">
            Other Skills
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherSkills.map((s) => (
              <div
                key={s.name}
                className="border rounded-xl p-4"
              >
                <p className="font-medium">{s.name}</p>

                <p className="text-sm text-muted-foreground">
                  {s.level}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CertificatesTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Certificate
        </button>
      </div>

      {certificates.map((c) => (
        <Card key={c.id}>
          <CardContent className="p-6 flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {c.name}
                </h3>

                <p className="text-muted-foreground">
                  {c.issuer}
                </p>

                <p className="text-sm text-muted-foreground mt-1">
                  Issued: {c.date}
                </p>

                <p className="text-sm text-muted-foreground">
                  Credential ID: {c.credential}
                </p>
              </div>
            </div>

            <button className="text-primary">
              View Credential
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Additional() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-5">
            Job Preferences
          </h3>

          <div className="space-y-4">
            {[
              ["Preferred Role", "Full Stack Developer"],
              ["Preferred Location", "Hyderabad"],
              ["Experience", "2 - 5 Years"],
              ["Employment Type", "Full-time"],
              ["Notice Period", "30 Days"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between"
              >
                <span className="text-muted-foreground">
                  {label}
                </span>

                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-5">
            Languages
          </h3>

          {[
            ["English", "Professional"],
            ["Telugu", "Native"],
            ["Hindi", "Conversational"],
          ].map(([lang, level]) => (
            <div
              key={lang}
              className="flex justify-between py-3"
            >
              <span>{lang}</span>

              <span className="text-muted-foreground">
                {level}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}