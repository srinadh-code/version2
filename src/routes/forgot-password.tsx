import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPage });
function ForgotPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
      <Card className="w-full max-w-md shadow-elegant border-0">
        <CardContent className="p-8">
          <h1 className="text-2xl font-semibold">Forgot password?</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your email and we'll send you an OTP.</p>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("OTP sent to your email"); navigate({ to: "/otp", search: { email } as any }); }} className="mt-6 space-y-4">
            <div><Label>Email</Label><Input type="email" required className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <Button type="submit" className="w-full bg-gradient-primary shadow-elegant">Send OTP</Button>
          </form>
          <p className="text-sm text-center mt-5 text-muted-foreground">
            <Link to="/login" className="text-primary hover:underline">Back to sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
