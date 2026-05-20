import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import { LayoutDashboard, User, FileText, Briefcase, ClipboardList, CalendarDays, Bell, Settings, HelpCircle, LogOut, Menu, Search, Sun, Moon } from "lucide-react";
import { useStore } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const menu = [
  { to: "/candidate/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/candidate/profile", label: "My Profile", icon: User },
  { to: "/candidate/resume", label: "My Resume", icon: FileText },
  { to: "/candidate/matched-jobs", label: "Matched Jobs", icon: Briefcase },
  { to: "/candidate/applied-jobs", label: "Applied Jobs", icon: ClipboardList },
  { to: "/candidate/interviews", label: "Interview Center", icon: CalendarDays },
  { to: "/candidate/notifications", label: "Notifications", icon: Bell },
  { to: "/candidate/settings", label: "Settings", icon: Settings },
  { to: "/candidate/help", label: "Help & Support", icon: HelpCircle },
] as const;

export function CandidateLayout({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useStore();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDark = () => setDark((d) => { document.documentElement.classList.toggle("dark", !d); return !d; });
  const logout = () => { setCurrentUser(null); toast.success("Logged out"); navigate({ to: "/login" }); };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="h-16 px-5 flex items-center gap-2 border-b border-sidebar-border">
          <div className="size-9 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold shadow-elegant">T</div>
          <div>
            <div className="font-semibold text-sm">TalentFlow</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Candidate</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {menu.map((m) => {
            const active = path.startsWith(m.to);
            const Icon = m.icon;
            return (
              <Link key={m.to} to={m.to} onClick={() => setOpen(false)}
                className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                  active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-soft" : "text-sidebar-foreground hover:bg-sidebar-accent/60")}>
                <Icon className="size-4" /><span>{m.label}</span>
              </Link>
            );
          })}
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-destructive/10 hover:text-destructive transition">
            <LogOut className="size-4" /> Logout
          </button>
        </nav>
      </aside>

      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 bg-background/80 backdrop-blur border-b flex items-center gap-3 px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}><Menu className="size-5" /></Button>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search jobs..." className="pl-9 h-9 bg-muted/40 border-transparent" />
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDark}>{dark ? <Sun className="size-4" /> : <Moon className="size-4" />}</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-muted">
                <Avatar className="size-7"><AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">{(currentUser?.name || "C").slice(0,1)}</AvatarFallback></Avatar>
                <span className="text-sm font-medium hidden sm:inline">{currentUser?.name || "Candidate"}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>{currentUser?.name || "Candidate"}</div>
                <div className="text-xs text-muted-foreground font-normal">{currentUser?.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate({ to: "/candidate/profile" })}>My Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-destructive">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 lg:p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
