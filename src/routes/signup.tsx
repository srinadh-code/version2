
// import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";

// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// export const Route = createFileRoute("/signup")({
//   component: SignupPage,
// });

// function SignupPage() {

//   const [name, setName] = useState("");

//   const [email, setEmail] = useState("");

//   const [pwd, setPwd] = useState("");

//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // SIGNUP FUNCTION
//   const submit = async (e: React.FormEvent) => {

//     e.preventDefault();

//     // validation
//     if (
//       !name ||
//       !email.includes("@") ||
//       pwd.length < 6
//     ) {

//       toast.error(
//         "Please fill all fields properly"
//       );

//       return;
//     }

//     setLoading(true);

//     try {

//       // API CALL
//       const response = await fetch(
//         "http://127.0.0.1:8000/signup/",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//           },

//           body: JSON.stringify({
//             username: name,
//             email: email,
//             password: pwd,
//           }),
//         }
//       );

//       const data = await response.json();

//       console.log(data);

//       // SUCCESS
//       if (response.ok) {

//         toast.success(
//           "Signup successful!"
//         );

//         // GO TO LOGIN PAGE
//         navigate({
//           to: "/login",

//           search: {
//             email: email,
//             password: pwd,
//             success: "Signup successful!",
//           },
//         });

//       }

//       // FAILED
//       else {

//         toast.error(
//           data.message || "Signup failed"
//         );
//       }

//     } catch (error) {

//       console.log(error);

//       toast.error(
//         "Server Error"
//       );

//     } finally {

//       setLoading(false);
//     }
//   };

//   return (

//     <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">

//       <Card className="w-full max-w-md shadow-elegant border-0">

//         <CardContent className="p-8">

//           {/* LOGO */}
//           <div className="size-12 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
//             T
//           </div>

//           {/* HEADING */}
//           <h1 className="text-2xl font-semibold">
//             Create your account
//           </h1>

//           <p className="text-sm text-muted-foreground mt-1">
//             Join thousands of candidates.
//           </p>

//           {/* FORM */}
//           <form
//             onSubmit={submit}
//             className="mt-6 space-y-4"
//           >

//             {/* NAME */}
//             <div>

//               <Label>
//                 Full Name
//               </Label>

//               <Input
//                 className="mt-1.5"
//                 value={name}
//                 onChange={(e) =>
//                   setName(e.target.value)
//                 }
//                 placeholder="srinadh yalagandula"
//               />

//             </div>

//             {/* EMAIL */}
//             <div>

//               <Label>
//                 Email
//               </Label>

//               <Input
//                 className="mt-1.5"
//                 type="email"
//                 value={email}
//                 onChange={(e) =>
//                   setEmail(e.target.value)
//                 }
//                 placeholder="srinadh@gmail.com"
//               />

//             </div>

//             {/* PASSWORD */}
//             <div>

//               <Label>
//                 Password
//               </Label>

//               <Input
//                 className="mt-1.5"
//                 type="password"
//                 value={pwd}
//                 onChange={(e) =>
//                   setPwd(e.target.value)
//                 }
//                 placeholder="At least 6 characters"
//               />

//             </div>

//             {/* BUTTON */}
//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-primary shadow-elegant"
//             >

//               {loading && (
//                 <Loader2 className="size-4 animate-spin mr-2" />
//               )}

//               Create Account

//             </Button>

//           </form>

//           {/* LOGIN LINK */}
//           <p className="text-sm text-center mt-5 text-muted-foreground">

//             Already have an account?

//             <Link
//               to="/login"
//               className="text-primary font-medium hover:underline ml-1"
//             >
//               Sign in
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

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { toast } from "sonner";

import { Loader2 } from "lucide-react";

export const Route = createFileRoute(
  "/signup"
)({
  component: SignupPage,
});

function SignupPage() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [pwd, setPwd] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ERROR STATES
  const [nameError,
  setNameError] =
    useState("");

  const [emailError,
  setEmailError] =
    useState("");

  const [passwordError,
  setPasswordError] =
    useState("");

  const navigate = useNavigate();

  // SIGNUP FUNCTION
  const submit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    // RESET ERRORS
    setNameError("");

    setEmailError("");

    setPasswordError("");

    let hasError = false;

    // USERNAME VALIDATION
    if (!name.trim()) {

      setNameError(
        "Username is required"
      );

      hasError = true;
    }

    // EMAIL REQUIRED
    if (!email.trim()) {

      setEmailError(
        "Email is required"
      );

      hasError = true;
    }

    // EMAIL FORMAT
    else {

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailRegex.test(email)
      ) {

        setEmailError(
          "Enter valid email"
        );

        hasError = true;
      }
    }

    // PASSWORD REQUIRED
    if (!pwd.trim()) {

      setPasswordError(
        "Password is required"
      );

      hasError = true;
    }

    // PASSWORD LENGTH
    else if (pwd.length < 6) {

      setPasswordError(
        "Password must be at least 6 characters"
      );

      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {

      // API CALL
      const response =
        await fetch(
          "http://127.0.0.1:8000/signup/",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              username: name,
              email: email,
              password: pwd,
            }),
          }
        );

      const data =
        await response.json();

      console.log(data);

      // SUCCESS
      if (response.ok) {

        toast.success(
          "Signup successful!"
        );

        navigate({
          to: "/login",

          search: {
            email: email,
            password: pwd,
            success:
              "Signup successful!",
          } as any,
        });

      }

      // FAILED
      else {

        // BACKEND ERRORS
        if (data.username) {

          setNameError(
            data.username[0]
          );
        }

        if (data.email) {

          setEmailError(
            data.email[0]
          );
        }

        if (data.password) {

          setPasswordError(
            data.password[0]
          );
        }

        if (data.message) {

          toast.error(
            data.message
          );
        }
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

    <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">

      <Card className="w-full max-w-md shadow-elegant border-0">

        <CardContent className="p-8">

          {/* LOGO */}
          <div className="size-12 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
            T
          </div>

          {/* HEADING */}
          <h1 className="text-2xl font-semibold">
            Create your account
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Join thousands of candidates.
          </p>

          {/* FORM */}
          <form
            onSubmit={submit}
            className="mt-6 space-y-4"
          >

            {/* NAME */}
            <div>

              <Label>
                Full Name
              </Label>

              <Input
                className="mt-1.5"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="srinadh yalagandula"
              />

              {nameError && (

                <p className="text-red-500 text-sm mt-1">

                  {nameError}

                </p>

              )}

            </div>

            {/* EMAIL */}
            <div>

              <Label>
                Email
              </Label>

              <Input
                className="mt-1.5"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="srinadh@gmail.com"
              />

              {emailError && (

                <p className="text-red-500 text-sm mt-1">

                  {emailError}

                </p>

              )}

            </div>

            {/* PASSWORD */}
            <div>

              <Label>
                Password
              </Label>

              <Input
                className="mt-1.5"
                type="password"
                value={pwd}
                onChange={(e) =>
                  setPwd(
                    e.target.value
                  )
                }
                placeholder="At least 6 characters"
              />

              {passwordError && (

                <p className="text-red-500 text-sm mt-1">

                  {passwordError}

                </p>

              )}

            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary shadow-elegant"
            >

              {loading && (

                <Loader2 className="size-4 animate-spin mr-2" />

              )}

              Create Account

            </Button>

          </form>

          {/* LOGIN LINK */}
          <p className="text-sm text-center mt-5 text-muted-foreground">

            Already have an account?

            <Link
              to="/login"
              className="text-primary font-medium hover:underline ml-1"
            >
              Sign in
            </Link>

          </p>

        </CardContent>

      </Card>

    </div>
  );
}
