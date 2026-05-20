import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Manage your workspace" />
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-4">
          <Card className="border-0 shadow-soft"><CardContent className="p-6 space-y-4 max-w-lg">
            <div><Label>Company name</Label><Input className="mt-1.5" defaultValue="TalentFlow Inc." /></div>
            <div><Label>Support email</Label><Input className="mt-1.5" defaultValue="support@talentflow.com" /></div>
            <div><Label>Timezone</Label><Input className="mt-1.5" defaultValue="Asia/Kolkata" /></div>
            <Button className="bg-gradient-primary" onClick={() => toast.success("Saved")}>Save changes</Button>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="security" className="mt-4">
          <Card className="border-0 shadow-soft"><CardContent className="p-6 space-y-4 max-w-lg">
            <div className="flex items-center justify-between"><div><div className="font-medium">Two-factor authentication</div><div className="text-xs text-muted-foreground">Add an extra layer of security</div></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><div className="font-medium">SSO Login</div><div className="text-xs text-muted-foreground">Sign in with Google Workspace</div></div><Switch /></div>
            <div className="flex items-center justify-between"><div><div className="font-medium">Session timeout</div><div className="text-xs text-muted-foreground">Auto-logout after inactivity</div></div><Switch defaultChecked /></div>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <Card className="border-0 shadow-soft"><CardContent className="p-6 space-y-4 max-w-lg">
            {["New applications","Interview reminders","Weekly summary","Mentions in notes"].map(l => (
              <div key={l} className="flex items-center justify-between"><div className="font-medium">{l}</div><Switch defaultChecked /></div>
            ))}
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="branding" className="mt-4">
          <Card className="border-0 shadow-soft"><CardContent className="p-6 space-y-4 max-w-lg">
            <div><Label>Primary color</Label><div className="mt-1.5 flex gap-2">{["#7c3aed","#6366f1","#0ea5e9","#10b981"].map(c => <div key={c} className="size-10 rounded-lg border cursor-pointer" style={{background:c}} />)}</div></div>
            <div><Label>Logo upload</Label><Input type="file" className="mt-1.5" /></div>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="integrations" className="mt-4">
          <div className="grid md:grid-cols-2 gap-3">
            {["Slack","Google Calendar","Zoom","LinkedIn","Microsoft Teams","Indeed"].map(i => (
              <Card key={i} className="border-0 shadow-soft"><CardContent className="p-4 flex items-center justify-between">
                <div className="font-medium">{i}</div><Switch />
              </CardContent></Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
