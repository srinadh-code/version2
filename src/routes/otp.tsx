import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

export const Route = createFileRoute("/otp")({ component: OtpPage });
function OtpPage() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
      <Card className="w-full max-w-md shadow-elegant border-0">
        <CardContent className="p-8 text-center">
          <h1 className="text-2xl font-semibold">Verify your email</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter the 6-digit code we just sent you.</p>
          <div className="my-6 flex justify-center">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                {[0,1,2,3,4,5].map(i => <InputOTPSlot key={i} index={i} />)}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button onClick={() => { if (code.length < 6) return toast.error("Enter all 6 digits"); toast.success("Code verified"); navigate({ to: "/reset-password" }); }} className="w-full bg-gradient-primary shadow-elegant">Verify</Button>
          <button onClick={() => toast.info("New code sent")} className="text-sm text-primary mt-4 hover:underline">Resend code</button>
        </CardContent>
      </Card>
    </div>
  );
}
