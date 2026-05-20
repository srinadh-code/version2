import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const [email, setEmail] = useState("admin@company.com");
  const [pwd, setPwd] = useState("password");
  const [role, setRole] = useState<"admin" | "candidate">("admin");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useStore();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || pwd.length < 4) { toast.error("Invalid credentials"); return; }
    setLoading(true);
    setTimeout(() => {
      const name = role === "admin" ? "Sarah Johnson" : "Aarav Sharma";
      setCurrentUser({ email, name, role });
      toast.success("Welcome back!");
      navigate({ to: role === "admin" ? "/admin/dashboard" : "/candidate/dashboard" });
    }, 700);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-bold">T</div>
            <div className="font-semibold text-lg">TalentFlow ATS</div>
          </div>
        </div>
        <div className="relative space-y-6 max-w-md">
          <Sparkles className="size-8" />
          <h2 className="text-4xl font-bold leading-tight">Hire smarter, faster, and fairer.</h2>
          <p className="text-white/80">Enterprise recruitment platform with AI-powered resume analysis, kanban pipelines, and unified candidate experience.</p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[["12k+","Candidates"],["340","Open jobs"],["98%","Match accuracy"]].map(([n,l]) => (
              <div key={l}><div className="text-2xl font-bold">{n}</div><div className="text-xs text-white/70">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-white/60">© TalentFlow 2026</div>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-elegant border-0">
          <CardContent className="p-8">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="size-9 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold">T</div>
              <span className="font-semibold">TalentFlow</span>
            </div>
            <h1 className="text-2xl font-semibold">Sign in</h1>
            <p className="text-sm text-muted-foreground mt-1">Welcome back. Please sign in to continue.</p>

            <div className="mt-5 grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
              <button onClick={() => { setRole("admin"); setEmail("admin@company.com"); }} className={`py-2 text-sm rounded-md transition ${role==="admin"?"bg-background shadow-soft font-medium":"text-muted-foreground"}`}>Recruiter / Admin</button>
              <button onClick={() => { setRole("candidate"); setEmail("candidate@example.com"); }} className={`py-2 text-sm rounded-md transition ${role==="candidate"?"bg-background shadow-soft font-medium":"text-muted-foreground"}`}>Candidate</button>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="pwd">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
                </div>
                <div className="relative mt-1.5">
                  <Input id="pwd" type={show ? "text" : "password"} value={pwd} onChange={(e) => setPwd(e.target.value)} className="pr-10" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-gradient-primary hover:opacity-95 shadow-elegant">
                {loading && <Loader2 className="size-4 animate-spin mr-2" />}
                Sign in
              </Button>
            </form>
            <p className="text-sm text-center mt-5 text-muted-foreground">
              Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
