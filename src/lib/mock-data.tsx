import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ============ TYPES ============
export type Stage = "Applied" | "Screening" | "Technical Round" | "HR Round" | "Offered" | "Hired" | "Rejected";
export type JobStatus = "Active" | "Paused" | "Closed";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type UserRole = "Super Admin" | "Recruiter" | "HR" | "Interviewer" | "Candidate";

export interface Job {
  id: string;
  title: string;
  department: string;
  experience: string;
  skills: string[];
  salaryMin: number;
  salaryMax: number;
  type: JobType;
  workMode: WorkMode;
  location: string;
  description: string;
  status: JobStatus;
  openings: number;
  postedAt: string;
  recruiterIds: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  position: string;
  jobId?: string;
  experience: number;
  atsScore: number;
  stage: Stage;
  skills: string[];
  status: "Active" | "Rejected" | "Shortlisted" | "Hold";
  appliedDate: string;
  department: string;
  resumeId?: string;
  bookmarked?: boolean;
}

export interface Resume {
  id: string;
  candidateId: string;
  candidateName: string;
  email: string;
  department: string;
  subDepartment: string;
  skills: string[];
  experience: number;
  uploadedAt: string;
  fileName: string;
  fileSize: number;
  atsScore: number;
  bookmarked: boolean;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  interviewer: string;
  date: string;
  time: string;
  type: "Phone" | "Video" | "Onsite";
  meetingLink?: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  active: boolean;
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  openings: number;
  employees: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  read: boolean;
  createdAt: string;
}

export interface Note {
  id: string;
  candidateId: string;
  candidateName: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  hasResume?: boolean;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  createdAt: string;
}

// ============ SEED DATA ============
const DEPARTMENTS = ["SAP", "Web Development", "Networking", "UI/UX", "Data Science", "DevOps", "Marketing"];
const SKILLS_POOL = ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "SQL", "MongoDB", "Figma", "SAP HANA", "Cisco", "TensorFlow", "GraphQL", "Tailwind"];
const POSITIONS = ["Senior Frontend Engineer", "Backend Developer", "Full Stack Engineer", "UI/UX Designer", "Data Scientist", "DevOps Engineer", "SAP Consultant", "Network Administrator", "Product Manager", "QA Engineer"];
const NAMES = ["Aarav Sharma", "Priya Patel", "Rohan Mehta", "Anika Iyer", "Vikram Singh", "Sara Khan", "Arjun Nair", "Meera Reddy", "Karthik Rao", "Diya Joshi", "Ishaan Verma", "Tanvi Gupta", "Aditya Kumar", "Neha Bansal", "Rahul Desai", "Pooja Shah"];

const randomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomMany = <T,>(arr: T[], n: number): T[] => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
const id = () => Math.random().toString(36).slice(2, 10);

function seedJobs(): Job[] {
  return Array.from({ length: 12 }).map((_, i) => ({
    id: id(),
    title: POSITIONS[i % POSITIONS.length],
    department: randomFrom(DEPARTMENTS),
    experience: `${2 + (i % 6)}-${4 + (i % 6)} years`,
    skills: randomMany(SKILLS_POOL, 4),
    salaryMin: 600000 + i * 50000,
    salaryMax: 1200000 + i * 80000,
    type: randomFrom<JobType>(["Full-time", "Contract", "Part-time"]),
    workMode: randomFrom<WorkMode>(["Remote", "Hybrid", "On-site"]),
    location: randomFrom(["Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad", "Remote"]),
    description: "We are looking for a passionate professional to join our growing team. You will work on cutting-edge products and collaborate with talented engineers.",
    status: randomFrom<JobStatus>(["Active", "Active", "Active", "Paused", "Closed"]),
    openings: 1 + (i % 5),
    postedAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
    recruiterIds: [],
  }));
}

const STAGES: Stage[] = ["Applied", "Screening", "Technical Round", "HR Round", "Offered", "Hired", "Rejected"];

function seedCandidates(jobs: Job[]): Candidate[] {
  return Array.from({ length: 28 }).map((_, i) => {
    const job = jobs[i % jobs.length];
    return {
      id: id(),
      name: NAMES[i % NAMES.length] + (i >= NAMES.length ? " " + (i + 1) : ""),
      email: `candidate${i + 1}@example.com`,
      phone: `+91 9${Math.floor(100000000 + Math.random() * 899999999)}`,
      position: job.title,
      jobId: job.id,
      experience: 1 + (i % 10),
      atsScore: 55 + Math.floor(Math.random() * 45),
      stage: STAGES[i % STAGES.length],
      skills: randomMany(SKILLS_POOL, 4),
      status: randomFrom<Candidate["status"]>(["Active", "Active", "Shortlisted", "Hold", "Rejected"]),
      appliedDate: new Date(Date.now() - i * 86400000).toISOString(),
      department: job.department,
    };
  });
}

function seedResumes(candidates: Candidate[]): Resume[] {
  return candidates.slice(0, 20).map((c) => ({
    id: id(),
    candidateId: c.id,
    candidateName: c.name,
    email: c.email,
    department: c.department,
    subDepartment: randomFrom(["Frontend", "Backend", "Cloud", "Mobile", "Analytics"]),
    skills: c.skills,
    experience: c.experience,
    uploadedAt: c.appliedDate,
    fileName: `${c.name.replace(/\s/g, "_")}_Resume.pdf`,
    fileSize: 120000 + Math.floor(Math.random() * 500000),
    atsScore: c.atsScore,
    bookmarked: Math.random() > 0.7,
  }));
}

function seedInterviews(candidates: Candidate[]): Interview[] {
  return candidates.slice(0, 10).map((c, i) => ({
    id: id(),
    candidateId: c.id,
    candidateName: c.name,
    position: c.position,
    interviewer: randomFrom(["Sarah Johnson", "Michael Chen", "Priya Sharma", "David Kumar"]),
    date: new Date(Date.now() + (i - 3) * 86400000).toISOString().slice(0, 10),
    time: `${10 + (i % 7)}:00`,
    type: randomFrom<Interview["type"]>(["Video", "Phone", "Onsite"]),
    meetingLink: "https://meet.example.com/" + id(),
    status: i < 3 ? "Completed" : i === 9 ? "Cancelled" : "Upcoming",
  }));
}

function seedUsers(): User[] {
  return [
    { id: "u1", name: "Sarah Johnson", email: "sarah@company.com", role: "Super Admin", department: "HR", active: true },
    { id: "u2", name: "Michael Chen", email: "michael@company.com", role: "Recruiter", department: "Web Development", active: true },
    { id: "u3", name: "Priya Sharma", email: "priya@company.com", role: "HR", department: "HR", active: true },
    { id: "u4", name: "David Kumar", email: "david@company.com", role: "Interviewer", department: "Data Science", active: true },
    { id: "u5", name: "Anna Lee", email: "anna@company.com", role: "Recruiter", department: "UI/UX", active: false },
  ];
}

function seedDepartments(): Department[] {
  return DEPARTMENTS.map((name, i) => ({
    id: "d" + i,
    name,
    head: randomFrom(["Sarah Johnson", "Michael Chen", "Priya Sharma"]),
    openings: 2 + (i % 5),
    employees: 10 + i * 4,
  }));
}

function seedNotifications(): Notification[] {
  return [
    { id: id(), title: "New application received", message: "Aarav Sharma applied for Senior Frontend Engineer", type: "info", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: id(), title: "Interview scheduled", message: "Interview with Priya Patel at 2:00 PM tomorrow", type: "success", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
    { id: id(), title: "Candidate shortlisted", message: "Rohan Mehta moved to HR Round", type: "success", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
    { id: id(), title: "Resume processing complete", message: "AI analysis done for 12 new resumes", type: "info", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
    { id: id(), title: "Offer accepted", message: "Anika Iyer accepted the Backend Developer offer", type: "success", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  ];
}

function seedEmails(): Email[] {
  return [
    { id: id(), from: "aarav.sharma@gmail.com", subject: "Application for Senior Frontend Engineer", preview: "Hi, please find my resume attached for the Frontend position...", body: "Hi Hiring Team,\n\nPlease find my resume attached for the Senior Frontend Engineer role. I have 5+ years of experience with React and TypeScript.\n\nBest,\nAarav", date: new Date().toISOString(), read: false, hasResume: true },
    { id: id(), from: "priya.patel@yahoo.com", subject: "Re: Interview confirmation", preview: "Thanks for scheduling the interview. I confirm my availability...", body: "Thank you for the interview invitation. I confirm my availability on the proposed date.", date: new Date(Date.now() - 3600000).toISOString(), read: false },
    { id: id(), from: "rohan.mehta@outlook.com", subject: "Following up on Backend Developer role", preview: "I wanted to follow up on my application from last week...", body: "Hi, I wanted to follow up on my application for the Backend Developer position.", date: new Date(Date.now() - 86400000).toISOString(), read: true, hasResume: true },
    { id: id(), from: "noreply@linkedin.com", subject: "5 new candidates matching your job posting", preview: "We found 5 new candidates that match your Senior Frontend Engineer posting...", body: "Top matches this week...", date: new Date(Date.now() - 86400000 * 2).toISOString(), read: true },
  ];
}

// ============ STORE ============
interface Store {
  jobs: Job[];
  candidates: Candidate[];
  resumes: Resume[];
  interviews: Interview[];
  users: User[];
  departments: Department[];
  notifications: Notification[];
  notes: Note[];
  emails: Email[];
  activities: Activity[];
  currentUser: { name: string; email: string; role: "admin" | "candidate" } | null;

  addJob: (j: Omit<Job, "id" | "postedAt">) => void;
  updateJob: (id: string, j: Partial<Job>) => void;
  deleteJob: (id: string) => void;

  addCandidate: (c: Omit<Candidate, "id" | "appliedDate">) => void;
  updateCandidate: (id: string, c: Partial<Candidate>) => void;
  moveStage: (id: string, stage: Stage) => void;
  deleteCandidate: (id: string) => void;

  addResume: (r: Omit<Resume, "id" | "uploadedAt">) => void;
  deleteResume: (id: string) => void;
  toggleBookmark: (id: string) => void;

  addInterview: (i: Omit<Interview, "id">) => void;
  updateInterview: (id: string, i: Partial<Interview>) => void;
  deleteInterview: (id: string) => void;

  addUser: (u: Omit<User, "id">) => void;
  updateUser: (id: string, u: Partial<User>) => void;
  deleteUser: (id: string) => void;

  addNote: (n: Omit<Note, "id" | "createdAt">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  setCurrentUser: (u: Store["currentUser"]) => void;
  logActivity: (action: string, target: string) => void;
}

const StoreContext = createContext<Store | null>(null);

const STORAGE_KEY = "ats-store-v1";

function loadInitial() {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
  }
  const jobs = seedJobs();
  const candidates = seedCandidates(jobs);
  const resumes = seedResumes(candidates);
  const interviews = seedInterviews(candidates);
  return {
    jobs,
    candidates,
    resumes,
    interviews,
    users: seedUsers(),
    departments: seedDepartments(),
    notifications: seedNotifications(),
    notes: [] as Note[],
    emails: seedEmails(),
    activities: [
      { id: id(), user: "Sarah Johnson", action: "shortlisted", target: "Aarav Sharma", createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
      { id: id(), user: "Michael Chen", action: "scheduled interview with", target: "Priya Patel", createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
      { id: id(), user: "Priya Sharma", action: "created job", target: "Senior Backend Engineer", createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
    ] as Activity[],
  };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(() => loadInitial());
  const [currentUser, setCurrentUser] = useState<Store["currentUser"]>(() => {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(localStorage.getItem("ats-user") || "null"); } catch { return null; }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);
  useEffect(() => {
    try { localStorage.setItem("ats-user", JSON.stringify(currentUser)); } catch {}
  }, [currentUser]);

  const update = (fn: (s: typeof state) => typeof state) => setState(fn);

  const store: Store = {
    ...state,
    currentUser,
    setCurrentUser,
    addJob: (j) => update((s) => ({ ...s, jobs: [{ ...j, id: id(), postedAt: new Date().toISOString() }, ...s.jobs] })),
    updateJob: (jid, patch) => update((s) => ({ ...s, jobs: s.jobs.map((x: Job) => x.id === jid ? { ...x, ...patch } : x) })),
    deleteJob: (jid) => update((s) => ({ ...s, jobs: s.jobs.filter((x: Job) => x.id !== jid) })),
    addCandidate: (c) => update((s) => ({ ...s, candidates: [{ ...c, id: id(), appliedDate: new Date().toISOString() }, ...s.candidates] })),
    updateCandidate: (cid, patch) => update((s) => ({ ...s, candidates: s.candidates.map((x: Candidate) => x.id === cid ? { ...x, ...patch } : x) })),
    moveStage: (cid, stage) => update((s) => ({ ...s, candidates: s.candidates.map((x: Candidate) => x.id === cid ? { ...x, stage } : x) })),
    deleteCandidate: (cid) => update((s) => ({ ...s, candidates: s.candidates.filter((x: Candidate) => x.id !== cid) })),
    addResume: (r) => update((s) => ({ ...s, resumes: [{ ...r, id: id(), uploadedAt: new Date().toISOString() }, ...s.resumes] })),
    deleteResume: (rid) => update((s) => ({ ...s, resumes: s.resumes.filter((x: Resume) => x.id !== rid) })),
    toggleBookmark: (rid) => update((s) => ({ ...s, resumes: s.resumes.map((x: Resume) => x.id === rid ? { ...x, bookmarked: !x.bookmarked } : x) })),
    addInterview: (i) => update((s) => ({ ...s, interviews: [{ ...i, id: id() }, ...s.interviews] })),
    updateInterview: (iid, patch) => update((s) => ({ ...s, interviews: s.interviews.map((x: Interview) => x.id === iid ? { ...x, ...patch } : x) })),
    deleteInterview: (iid) => update((s) => ({ ...s, interviews: s.interviews.filter((x: Interview) => x.id !== iid) })),
    addUser: (u) => update((s) => ({ ...s, users: [...s.users, { ...u, id: id() }] })),
    updateUser: (uid, patch) => update((s) => ({ ...s, users: s.users.map((x: User) => x.id === uid ? { ...x, ...patch } : x) })),
    deleteUser: (uid) => update((s) => ({ ...s, users: s.users.filter((x: User) => x.id !== uid) })),
    addNote: (n) => update((s) => ({ ...s, notes: [{ ...n, id: id(), createdAt: new Date().toISOString() }, ...s.notes] })),
    markNotificationRead: (nid) => update((s) => ({ ...s, notifications: s.notifications.map((x: Notification) => x.id === nid ? { ...x, read: true } : x) })),
    markAllNotificationsRead: () => update((s) => ({ ...s, notifications: s.notifications.map((x: Notification) => ({ ...x, read: true })) })),
    logActivity: (action, target) => update((s) => ({ ...s, activities: [{ id: id(), user: currentUser?.name || "You", action, target, createdAt: new Date().toISOString() }, ...s.activities].slice(0, 50) })),
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export { DEPARTMENTS, SKILLS_POOL, STAGES };
