import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/notes")({ component: NotesPage });

function NotesPage() {
  const { candidates, notes, addNote, currentUser } = useStore();
  const [cid, setCid] = useState(candidates[0]?.id || "");
  const [content, setContent] = useState("");

  const submit = () => {
    const c = candidates.find(x => x.id === cid); if (!c || !content.trim()) return toast.error("Add a candidate and note");
    addNote({ candidateId: cid, candidateName: c.name, author: currentUser?.name || "You", content });
    setContent("");
    toast.success("Note added");
  };

  return (
    <div>
      <PageHeader title="Notes" description="Internal recruiter notes per candidate" />
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-4">
        <Card className="border-0 shadow-soft">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold">New note</h3>
            <Select value={cid} onValueChange={setCid}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{candidates.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
            <Textarea placeholder="Type your note... use @ to mention recruiters" rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
            <Button onClick={submit} className="bg-gradient-primary w-full">Add note</Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {notes.length === 0 && <Card className="border-dashed"><CardContent className="p-8 text-center text-muted-foreground text-sm">No notes yet. Add the first one!</CardContent></Card>}
          {notes.map(n => (
            <Card key={n.id} className="border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="size-8"><AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">{n.author.slice(0,1)}</AvatarFallback></Avatar>
                  <div>
                    <div className="text-sm font-medium">{n.author}</div>
                    <div className="text-xs text-muted-foreground">on {n.candidateName} • {new Date(n.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <p className="text-sm">{n.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
