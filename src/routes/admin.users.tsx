import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useStore, type UserRole } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({ component: UsersPage });

const ROLES: UserRole[] = ["Super Admin", "Recruiter", "HR", "Interviewer"];

function UsersPage() {
  const { users, addUser, updateUser, deleteUser } = useStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [role, setRole] = useState<UserRole>("Recruiter");

  const submit = () => {
    if (!name || !email) return toast.error("Name and email required");
    addUser({ name, email, role, active: true });
    setName(""); setEmail(""); setRole("Recruiter");
    setOpen(false);
    toast.success("User added");
  };

  return (
    <div>
      <PageHeader title="Users & Roles" description="Team members and access" actions={
        <Button onClick={() => setOpen(true)} className="bg-gradient-primary shadow-elegant"><Plus className="size-4 mr-1" /> Add User</Button>
      } />
      <Card className="border-0 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left px-4 py-3">User</th><th className="text-left px-4 py-3">Role</th><th className="text-left px-4 py-3">Department</th><th className="text-left px-4 py-3">Status</th><th></th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-3 flex items-center gap-2.5">
                  <Avatar className="size-8"><AvatarFallback className="bg-accent text-accent-foreground text-xs">{u.name.slice(0,1)}</AvatarFallback></Avatar>
                  <div><div className="font-medium">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></div>
                </td>
                <td className="px-4 py-3"><Badge variant="secondary">{u.role}</Badge></td>
                <td className="px-4 py-3 text-muted-foreground">{u.department || "—"}</td>
                <td className="px-4 py-3"><Switch checked={u.active} onCheckedChange={(v) => updateUser(u.id, { active: v })} /></td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="size-8"><MoreVertical className="size-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info("Edit form coming soon")}>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => { deleteUser(u.id); toast.success("Deleted"); }}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add user</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Name</Label><Input className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div><Label>Email</Label><Input type="email" className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div><Label>Role</Label>
              <Select value={role} onValueChange={(v: any) => setRole(v)}><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>{ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Button onClick={submit} className="w-full bg-gradient-primary">Add user</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
