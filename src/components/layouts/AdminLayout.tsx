import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import {
  LayoutDashboard, Briefcase, Users, FileText, Trello, CalendarDays, Sparkles,
  Filter, StickyNote, Bell, Mail, BarChart3, UserCog, Building2, MapPin,
  Activity, Settings, LogOut, CalendarRange, Menu, Search, Sun, Moon
} from "lucide-react";
import { useStore } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const menu = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/jobs", label: "Job Openings", icon: Briefcase },
  { to: "/admin/candidates", label: "Candidates", icon: Users },
  { to: "/admin/resumes", label: "All Resumes", icon: FileText },
  { to: "/admin/pipeline", label: "Pipeline", icon: Trello },
  { to: "/admin/interviews", label: "Interviews", icon: CalendarDays },
  { to: "/admin/calendar", label: "Calendar", icon: CalendarRange },
  { to: "/admin/ai-analysis", label: "AI Analysis", icon: Sparkles },
  { to: "/admin/triage", label: "Triage", icon: Filter },
  { to: "/admin/notes", label: "Notes", icon: StickyNote },
  { to: "/admin/notifications", label: "Notifications", icon: Bell },
  { to: "/admin/inbox", label: "Email Inbox", icon: Mail },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
  { to: "/admin/users", label: "Users & Roles", icon: UserCog },
  { to: "/admin/departments", label: "Departments", icon: Building2 },
  { to: "/admin/locations", label: "Locations", icon: MapPin },
  { to: "/admin/activity", label: "Activity Logs", icon: Activity },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export function AdminLayout({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, notifications, markNotificationRead, markAllNotificationsRead } = useStore();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;
  const current = menu.find((m) => path.startsWith(m.to));

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const logout = () => {
    setCurrentUser(null);
    toast.success("Logged out");
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="h-16 px-5 flex items-center gap-2 border-b border-sidebar-border">
          <div className="size-9 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold shadow-elegant">T</div>
          <div>
            <div className="font-semibold text-sm">TalentFlow</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">ATS Platform</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-0.5">
          {menu.map((m) => {
            const active = path === m.to || (m.to !== "/admin/dashboard" && path.startsWith(m.to));
            const Icon = m.icon;
            return (
              <Link key={m.to} to={m.to} onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-soft"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                )}>
                <Icon className="size-4" />
                <span>{m.label}</span>
                {m.to === "/admin/notifications" && unread > 0 && (
                  <Badge className="ml-auto h-5 px-1.5 bg-primary text-primary-foreground">{unread}</Badge>
                )}
              </Link>
            );
          })}
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all">
            <LogOut className="size-4" /> Logout
          </button>
        </nav>
      </aside>

      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 bg-background/80 backdrop-blur border-b flex items-center gap-3 px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}><Menu className="size-5" /></Button>
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span>Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">{current?.label || "Dashboard"}</span>
          </div>
          <div className="flex-1 max-w-md ml-auto md:ml-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search candidates, jobs..." className="pl-9 h-9 bg-muted/40 border-transparent focus-visible:bg-background" />
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDark}>{dark ? <Sun className="size-4" /> : <Moon className="size-4" />}</Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-4" />
                {unread > 0 && <span className="absolute top-2 right-2 size-2 rounded-full bg-primary" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-3 border-b flex items-center justify-between">
                <div className="font-medium text-sm">Notifications</div>
                <button onClick={markAllNotificationsRead} className="text-xs text-primary hover:underline">Mark all read</button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 && <div className="p-6 text-sm text-muted-foreground text-center">No notifications</div>}
                {notifications.map((n) => (
                  <button key={n.id} onClick={() => markNotificationRead(n.id)} className={cn("w-full text-left p-3 border-b hover:bg-muted/50 transition", !n.read && "bg-accent/40")}>
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{n.message}</div>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-muted">
                <Avatar className="size-7"><AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">{(currentUser?.name || "A").slice(0,1)}</AvatarFallback></Avatar>
                <span className="text-sm font-medium hidden sm:inline">{currentUser?.name || "Admin"}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>{currentUser?.name || "Admin"}</div>
                <div className="text-xs text-muted-foreground font-normal">{currentUser?.email || "admin@company.com"}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate({ to: "/admin/settings" })}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-destructive">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 lg:p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
