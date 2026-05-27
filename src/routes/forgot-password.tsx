// import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import { toast } from "sonner";

// export const Route = createFileRoute("/forgot-password")({ component: ForgotPage });
// function ForgotPage() {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
//       <Card className="w-full max-w-md shadow-elegant border-0">
//         <CardContent className="p-8">
//           <h1 className="text-2xl font-semibold">Forgot password?</h1>
//           <p className="text-sm text-muted-foreground mt-1">Enter your email and we'll send you an OTP.</p>
//           <form onSubmit={(e) => { e.preventDefault(); toast.success("OTP sent to your email"); navigate({ to: "/otp", search: { email } as any }); }} className="mt-6 space-y-4">
//             <div><Label>Email</Label><Input type="email" required className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
//             <Button type="submit" className="w-full bg-gradient-primary shadow-elegant">Send OTP</Button>
//           </form>
//           <p className="text-sm text-center mt-5 text-muted-foreground">
//             <Link to="/login" className="text-primary hover:underline">Back to sign in</Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }





// import {
//   createFileRoute,
//   Link,
//   useNavigate,
// } from "@tanstack/react-router";

// import { useState } from "react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card";

// import { toast } from "sonner";

// export const Route = createFileRoute(
//   "/forgot-password"
// )({
//   component: ForgotPage,
// });

// function ForgotPage() {

//   const [email, setEmail] =
//     useState("");

//   const navigate = useNavigate();

//   const submit = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     try {

//       const response = await fetch(
//         "http://127.0.0.1:8000/forgot-password/",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type":
//               "application/json",
//           },

//           body: JSON.stringify({
//             email,
//           }),
//         }
//       );

//       const data =
//         await response.json();

//       if (response.ok) {

//         toast.success(
//           "OTP sent to email"
//         );

//         navigate({
//           to: "/otp",

//           search: {
//             email,
//           },
//         });

//       } else {

//         toast.error(
//           data.message ||
//           "Something went wrong"
//         );
//       }

//     } catch (error) {

//       toast.error(
//         "Server Error"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">

//       <Card className="w-full max-w-md shadow-elegant border-0">

//         <CardContent className="p-8">

//           <h1 className="text-2xl font-semibold">
//             Forgot password?
//           </h1>

//           <p className="text-sm text-muted-foreground mt-1">
//             Enter your email.
//           </p>

//           <form
//             onSubmit={submit}
//             className="mt-6 space-y-4"
//           >

//             <div>

//               <Label>Email</Label>

//               <Input
//                 type="email"
//                 required
//                 className="mt-1.5"
//                 value={email}
//                 onChange={(e) =>
//                   setEmail(
//                     e.target.value
//                   )
//                 }
//               />

//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-gradient-primary"
//             >
//               Send OTP
//             </Button>

//           </form>

//           <p className="text-sm text-center mt-5">

//             <Link
//               to="/login"
//               className="text-primary hover:underline"
//             >
//               Back to Login
//             </Link>

//           </p>

//         </CardContent>

//       </Card>

//     </div>
//   );
// }




import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import { toast } from "sonner";

import {
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute(
  "/forgot-password"
)({
  component: ForgotPage,
});

function ForgotPage() {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const submit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!email.includes("@")) {

      toast.error(
        "Enter valid email"
      );

      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/forgot-password/",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data =
        await response.json();

      if (response.ok) {

        toast.success(
          "OTP sent successfully"
        );

        navigate({
          to: "/otp",
          search: {
            email: email,
          } as any,
        });

      } else {

        toast.error(
          data.message ||
          "Something went wrong"
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Server Error"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-500 text-white p-14">

        <div>

          <div className="size-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
            T
          </div>

        </div>

        <div>

          <h1 className="text-6xl font-bold leading-tight">
            Reset your
            <br />
            password securely.
          </h1>

          <p className="mt-8 text-lg text-white/80 max-w-lg">
            We’ll send a secure OTP to your
            registered email so you can
            safely reset your password and
            continue using TalentFlow ATS.
          </p>

          <div className="flex gap-10 mt-14">

            <div>
              <h2 className="text-4xl font-bold">
                100%
              </h2>

              <p className="text-white/70">
                Secure verification
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">
                Fast
              </h2>

              <p className="text-white/70">
                OTP delivery
              </p>
            </div>

          </div>

        </div>

        <p className="text-white/60 text-sm">
          © TalentFlow 2026
        </p>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center justify-center bg-slate-50 p-6">

        <Card className="w-full max-w-md border-0 shadow-2xl rounded-3xl">

          <CardContent className="p-10">

            <div className="size-16 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 flex items-center justify-center text-white mb-6 shadow-lg">

              <ShieldCheck className="size-8" />

            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              Forgot password?
            </h1>

            <p className="text-muted-foreground mt-3 leading-6">
              Enter your registered email
              address and we’ll send you
              an OTP verification code.
            </p>

            <form
              onSubmit={submit}
              className="mt-8 space-y-6"
            >

              <div>

                <Label className="mb-2 block">
                  Email Address
                </Label>

                <div className="relative">

                  <Mail className="absolute left-3 top-3.5 size-5 text-muted-foreground" />

                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    placeholder="Enter your email"
                    className="pl-11 h-12 rounded-xl"
                  />

                </div>

              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl text-base bg-gradient-to-r from-violet-600 to-blue-500 hover:opacity-90"
              >

                {loading && (
                  <Loader2 className="size-4 animate-spin mr-2" />
                )}

                Send OTP

              </Button>

            </form>

            <div className="mt-8 text-center">

              <Link
                to="/login"
                className="text-sm text-primary hover:underline"
              >
                ← Back to login
              </Link>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}