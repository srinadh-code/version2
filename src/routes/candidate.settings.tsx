import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/candidate/settings")({ component: CSettings });

function CSettings() {
  return (
    <div>
      <PageHeader title="Settings" />
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-4">
          <Card className="border-0 shadow-soft"><CardContent className="p-6 space-y-3 max-w-lg">
            <div><Label>Email</Label><Input className="mt-1.5" defaultValue="candidate@example.com" /></div>
            <div><Label>Phone</Label><Input className="mt-1.5" defaultValue="+91 9876543210" /></div>
            <Button className="bg-gradient-primary" onClick={() => toast.success("Saved")}>Save</Button>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="privacy" className="mt-4">
          <Card className="border-0 shadow-soft"><CardContent className="p-6 space-y-4 max-w-lg">
            {["Profile visible to recruiters","Show salary expectations","Open to remote opportunities"].map(l => (
              <div key={l} className="flex items-center justify-between"><div>{l}</div><Switch defaultChecked /></div>
            ))}
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="password" className="mt-4">
          <Card className="border-0 shadow-soft"><CardContent className="p-6 space-y-3 max-w-lg">
            <div><Label>Current password</Label><Input type="password" className="mt-1.5" /></div>
            <div><Label>New password</Label><Input type="password" className="mt-1.5" /></div>
            <div><Label>Confirm new password</Label><Input type="password" className="mt-1.5" /></div>
            <Button className="bg-gradient-primary" onClick={() => toast.success("Password updated")}>Update password</Button>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <Card className="border-0 shadow-soft"><CardContent className="p-6 space-y-4 max-w-lg">
            {["Application updates","Interview reminders","New job matches","Weekly newsletter"].map(l => (
              <div key={l} className="flex items-center justify-between"><div>{l}</div><Switch defaultChecked /></div>
            ))}
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
