import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/PageHeader";
import { useStore, SKILLS_POOL } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/candidate/profile")({ component: ProfilePage });

function ProfilePage() {
  const { currentUser } = useStore();
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "AWS"]);
  return (
    <div>
      <PageHeader title="My Profile" description="Keep your info up to date" actions={<Button className="bg-gradient-primary" onClick={() => toast.success("Profile saved")}>Save changes</Button>} />
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-soft lg:col-span-1">
          <CardContent className="p-6 text-center">
            <Avatar className="size-24 mx-auto"><AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">{(currentUser?.name||"C").slice(0,1)}</AvatarFallback></Avatar>
            <h2 className="mt-3 font-semibold text-lg">{currentUser?.name || "Candidate"}</h2>
            <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => toast.info("Photo upload coming soon")}>Change photo</Button>
            <div className="mt-5 pt-5 border-t text-left space-y-2 text-sm">
              <div><div className="text-xs text-muted-foreground">Profile completion</div><div className="font-semibold text-primary">85%</div></div>
              <div><div className="text-xs text-muted-foreground">Profile views</div><div className="font-semibold">124</div></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft lg:col-span-2">
          <CardContent className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Full name</Label><Input className="mt-1.5" defaultValue={currentUser?.name || ""} /></div>
              <div><Label>Email</Label><Input className="mt-1.5" defaultValue={currentUser?.email || ""} /></div>
              <div><Label>Phone</Label><Input className="mt-1.5" defaultValue="+91 9876543210" /></div>
              <div><Label>Location</Label><Input className="mt-1.5" defaultValue="Bangalore, India" /></div>
            </div>
            <div><Label>About</Label><Textarea className="mt-1.5" rows={3} defaultValue="Passionate engineer with 5+ years of experience building scalable web applications." /></div>
            <div>
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {SKILLS_POOL.slice(0,10).map(s => {
                  const on = skills.includes(s);
                  return <Badge key={s} variant={on ? "default" : "outline"} className="cursor-pointer" onClick={() => setSkills(on ? skills.filter(x => x!==s) : [...skills, s])}>{s}</Badge>;
                })}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Education</Label><Input className="mt-1.5" defaultValue="B.Tech, Computer Science" /></div>
              <div><Label>Experience (years)</Label><Input type="number" className="mt-1.5" defaultValue={5} /></div>
            </div>
            <div><Label>Certifications</Label><Input className="mt-1.5" defaultValue="AWS Certified Developer, Google Cloud Professional" /></div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>LinkedIn</Label><Input className="mt-1.5" defaultValue="linkedin.com/in/me" /></div>
              <div><Label>GitHub</Label><Input className="mt-1.5" defaultValue="github.com/me" /></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
