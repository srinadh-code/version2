import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Video, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore, type Interview } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/interviews")({ component: InterviewsPage });

function InterviewsPage() {
  const { interviews, candidates, addInterview, updateInterview, deleteInterview } = useStore();
  const [open, setOpen] = useState(false);

  const list = (status: Interview["status"]) => interviews.filter(i => i.status === status);
  const typeIcon = (t: Interview["type"]) => t === "Video" ? <Video className="size-3.5" /> : t === "Phone" ? <Phone className="size-3.5" /> : <MapPin className="size-3.5" />;

  return (
    <div>
      <PageHeader title="Interviews" description="Manage interview schedules" actions={
        <Button onClick={() => setOpen(true)} className="bg-gradient-primary shadow-elegant"><Plus className="size-4 mr-1" /> Schedule Interview</Button>
      } />

      <Tabs defaultValue="Upcoming">
        <TabsList>
          <TabsTrigger value="Upcoming">Upcoming ({list("Upcoming").length})</TabsTrigger>
          <TabsTrigger value="Completed">Completed ({list("Completed").length})</TabsTrigger>
          <TabsTrigger value="Cancelled">Cancelled ({list("Cancelled").length})</TabsTrigger>
        </TabsList>
        {(["Upcoming", "Completed", "Cancelled"] as const).map(s => (
          <TabsContent key={s} value={s} className="mt-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {list(s).map(i => (
                <Card key={i.id} className="border-0 shadow-soft hover:shadow-elegant transition">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold">{i.candidateName}</div>
                        <div className="text-xs text-muted-foreground">{i.position}</div>
                      </div>
                      <Badge variant="outline" className="gap-1">{typeIcon(i.type)}{i.type}</Badge>
                    </div>
                    <div className="mt-3 text-sm space-y-1">
                      <div><span className="text-muted-foreground">When: </span>{new Date(i.date).toLocaleDateString()} at {i.time}</div>
                      <div><span className="text-muted-foreground">Interviewer: </span>{i.interviewer}</div>
                      {i.meetingLink && <a href="#" className="text-primary text-xs hover:underline flex items-center gap-1"><LinkIcon className="size-3" />Meeting link</a>}
                    </div>
                    {s === "Upcoming" && (
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { updateInterview(i.id, { status: "Completed" }); toast.success("Marked completed"); }}>Complete</Button>
                        <Button size="sm" variant="outline" onClick={() => { updateInterview(i.id, { status: "Cancelled" }); toast.error("Cancelled"); }}>Cancel</Button>
                        <Button size="sm" variant="ghost" className="ml-auto text-destructive" onClick={() => { deleteInterview(i.id); toast.success("Deleted"); }}>Delete</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {list(s).length === 0 && <div className="col-span-full text-center text-muted-foreground py-12 text-sm">No {s.toLowerCase()} interviews</div>}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Schedule new interview</DialogTitle></DialogHeader>
          <ScheduleForm candidates={candidates.map(c => ({ id: c.id, name: c.name, position: c.position }))} onSubmit={(i) => { addInterview(i); toast.success("Interview scheduled"); setOpen(false); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ScheduleForm({ candidates, onSubmit }: { candidates: { id: string; name: string; position: string }[]; onSubmit: (i: Omit<Interview, "id">) => void }) {
  const [cid, setCid] = useState(candidates[0]?.id || "");
  const [interviewer, setInterviewer] = useState("Sarah Johnson");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("10:00");
  const [type, setType] = useState<Interview["type"]>("Video");
  const [link, setLink] = useState("");

  const submit = () => {
    const c = candidates.find(x => x.id === cid); if (!c) return;
    onSubmit({ candidateId: cid, candidateName: c.name, position: c.position, interviewer, date, time, type, meetingLink: link, status: "Upcoming" });
  };

  return (
    <div className="space-y-3">
      <div><Label>Candidate</Label>
        <Select value={cid} onValueChange={setCid}><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
          <SelectContent>{candidates.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div><Label>Interviewer</Label><Input className="mt-1.5" value={interviewer} onChange={(e) => setInterviewer(e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Date</Label><Input type="date" className="mt-1.5" value={date} onChange={(e) => setDate(e.target.value)} /></div>
        <div><Label>Time</Label><Input type="time" className="mt-1.5" value={time} onChange={(e) => setTime(e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Type</Label>
          <Select value={type} onValueChange={(v: any) => setType(v)}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>{["Video","Phone","Onsite"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Meeting link</Label><Input className="mt-1.5" placeholder="https://" value={link} onChange={(e) => setLink(e.target.value)} /></div>
      </div>
      <Button onClick={submit} className="w-full bg-gradient-primary">Schedule</Button>
    </div>
  );
}
