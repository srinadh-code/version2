import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/triage")({ component: TriagePage });

function TriagePage() {
  const { candidates, updateCandidate } = useStore();

  const lists = {
    all: candidates,
    Shortlisted: candidates.filter(c => c.status === "Shortlisted"),
    Rejected: candidates.filter(c => c.status === "Rejected"),
    Pending: candidates.filter(c => c.status === "Active"),
  };

  const renderList = (items: typeof candidates) => (
    <div className="grid md:grid-cols-2 gap-3 mt-4">
      {items.map(c => (
        <Card key={c.id} className="border-0 shadow-soft">
          <CardContent className="p-4 flex items-center gap-3">
            <Avatar className="size-10"><AvatarFallback className="bg-accent text-accent-foreground">{c.name.slice(0,1)}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{c.name}</div>
              <div className="text-xs text-muted-foreground truncate">{c.position}</div>
            </div>
            <Badge variant="secondary">{c.atsScore}%</Badge>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => { updateCandidate(c.id, { status: "Shortlisted" }); toast.success("Accepted"); }}>Accept</Button>
              <Button size="sm" variant="outline" onClick={() => { updateCandidate(c.id, { status: "Hold" }); toast.info("On hold"); }}>Hold</Button>
              <Button size="sm" variant="outline" className="text-destructive" onClick={() => { updateCandidate(c.id, { status: "Rejected" }); toast.error("Rejected"); }}>Reject</Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {items.length === 0 && <div className="col-span-full text-sm text-muted-foreground text-center py-8">No candidates</div>}
    </div>
  );

  return (
    <div>
      <PageHeader title="Triage" description="Quickly accept, hold, or reject candidates" />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({lists.all.length})</TabsTrigger>
          <TabsTrigger value="Shortlisted">Shortlisted ({lists.Shortlisted.length})</TabsTrigger>
          <TabsTrigger value="Pending">Pending ({lists.Pending.length})</TabsTrigger>
          <TabsTrigger value="Rejected">Rejected ({lists.Rejected.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all">{renderList(lists.all)}</TabsContent>
        <TabsContent value="Shortlisted">{renderList(lists.Shortlisted)}</TabsContent>
        <TabsContent value="Pending">{renderList(lists.Pending)}</TabsContent>
        <TabsContent value="Rejected">{renderList(lists.Rejected)}</TabsContent>
      </Tabs>
    </div>
  );
}
