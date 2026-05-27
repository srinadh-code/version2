// import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
// import { toast } from "sonner";

// export const Route = createFileRoute("/otp")({ component: OtpPage });
// function OtpPage() {
//   const [code, setCode] = useState("");
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
//       <Card className="w-full max-w-md shadow-elegant border-0">
//         <CardContent className="p-8 text-center">
//           <h1 className="text-2xl font-semibold">Verify your email</h1>
//           <p className="text-sm text-muted-foreground mt-1">Enter the 6-digit code we just sent you.</p>
//           <div className="my-6 flex justify-center">
//             <InputOTP maxLength={6} value={code} onChange={setCode}>
//               <InputOTPGroup>
//                 {[0,1,2,3,4,5].map(i => <InputOTPSlot key={i} index={i} />)}
//               </InputOTPGroup>
//             </InputOTP>
//           </div>
//           <Button onClick={() => { if (code.length < 6) return toast.error("Enter all 6 digits"); toast.success("Code verified"); navigate({ to: "/reset-password" }); }} className="w-full bg-gradient-primary shadow-elegant">Verify</Button>
//           <button onClick={() => toast.info("New code sent")} className="text-sm text-primary mt-4 hover:underline">Resend code</button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { toast } from "sonner";

export const Route = createFileRoute(
  "/otp"
)({
  component: OTPPage,
});

function OTPPage() {

  const [otp, setOtp] =
    useState("");

  const navigate = useNavigate();

  const search = useSearch({
    from: "/otp",
  });

  const submit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/verify-otp/",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: search.email,
            otp,
          }),
        }
      );

      const data =
        await response.json();

      if (response.ok) {

        toast.success(
          "OTP verified"
        );

        navigate({
          to: "/reset-password",

          search: {
            email: search.email,
          },
        });

      } else {

        toast.error(
          data.message
        );
      }

    } catch (error) {

      toast.error(
        "Server Error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">

      <Card className="w-full max-w-md shadow-elegant border-0">

        <CardContent className="p-8">

          <h1 className="text-2xl font-semibold">
            Verify OTP
          </h1>

          <form
            onSubmit={submit}
            className="mt-6 space-y-4"
          >

            <div>

              <Label>
                Enter OTP
              </Label>

              <Input
                required
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }
              />

            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary"
            >
              Verify OTP
            </Button>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}