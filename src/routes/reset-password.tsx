// import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import { toast } from "sonner";

// export const Route = createFileRoute("/reset-password")({ component: ResetPage });
// function ResetPage() {
//   const [p1, setP1] = useState(""); const [p2, setP2] = useState("");
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
//       <Card className="w-full max-w-md shadow-elegant border-0">
//         <CardContent className="p-8">
//           <h1 className="text-2xl font-semibold">Reset password</h1>
//           <p className="text-sm text-muted-foreground mt-1">Choose a new password for your account.</p>
//           <form onSubmit={(e) => { e.preventDefault(); if (p1.length < 6) return toast.error("Min 6 characters"); if (p1 !== p2) return toast.error("Passwords don't match"); toast.success("Password reset"); navigate({ to: "/login" }); }} className="mt-6 space-y-4">
//             <div><Label>New password</Label><Input type="password" className="mt-1.5" value={p1} onChange={(e) => setP1(e.target.value)} /></div>
//             <div><Label>Confirm password</Label><Input type="password" className="mt-1.5" value={p2} onChange={(e) => setP2(e.target.value)} /></div>
//             <Button type="submit" className="w-full bg-gradient-primary shadow-elegant">Reset password</Button>
//           </form>
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
  "/reset-password"
)({
  component: ResetPage,
});

function ResetPage() {

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const search = useSearch({
    from: "/reset-password",
  });

  const submit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/reset-password/",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: search.email,

            new_password:
              password,
          }),
        }
      );

      const data =
        await response.json();

      if (response.ok) {

        toast.success(
          "Password reset successful"
        );

        navigate({
          to: "/login",
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
            Reset Password
          </h1>

          <form
            onSubmit={submit}
            className="mt-6 space-y-4"
          >

            <div>

              <Label>
                New Password
              </Label>

              <Input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary"
            >
              Reset Password
            </Button>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}