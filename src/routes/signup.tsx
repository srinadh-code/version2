import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/lib/mock-data";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useStore();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email.includes("@") || pwd.length < 6) { toast.error("Please fill all fields. Password must be 6+ chars."); return; }
    setLoading(true);
    setTimeout(() => {
      setCurrentUser({ name, email, role: "candidate" });
      toast.success("Account created!");
      navigate({ to: "/candidate/dashboard" });
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
      <Card className="w-full max-w-md shadow-elegant border-0">
        <CardContent className="p-8">
          <div className="size-12 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold mb-4">T</div>
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join thousands of candidates and recruiters.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div><Label>Full name</Label><Input className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" /></div>
            <div><Label>Email</Label><Input className="mt-1.5" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></div>
            <div><Label>Password</Label><Input className="mt-1.5" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="At least 6 characters" /></div>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-primary shadow-elegant">
              {loading && <Loader2 className="size-4 animate-spin mr-2" />}Create account
            </Button>
          </form>
          <p className="text-sm text-center mt-5 text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
