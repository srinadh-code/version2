import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inbox, Paperclip, Reply } from "lucide-react";
import { useStore, type Email } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/inbox")({ component: InboxPage });

function InboxPage() {
  const { emails } = useStore();
  const [sel, setSel] = useState<Email | null>(emails[0] || null);

  return (
    <div>
      <PageHeader title="Email Inbox" description="Recruiter inbox with candidate emails" />
      <Card className="border-0 shadow-soft overflow-hidden">
        <div className="grid md:grid-cols-[340px_1fr] h-[70vh]">
          <div className="border-r overflow-y-auto">
            {emails.map(e => (
              <button key={e.id} onClick={() => setSel(e)} className={cn("w-full text-left p-4 border-b hover:bg-muted/50 flex gap-3", sel?.id === e.id && "bg-accent")}>
                <Avatar className="size-9 shrink-0"><AvatarFallback className="bg-accent text-accent-foreground text-xs">{e.from.slice(0,1).toUpperCase()}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5"><span className={cn("text-sm truncate", !e.read && "font-semibold")}>{e.from}</span>{e.hasResume && <Paperclip className="size-3 text-muted-foreground shrink-0" />}</div>
                  <div className="text-sm truncate">{e.subject}</div>
                  <div className="text-xs text-muted-foreground truncate">{e.preview}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="overflow-y-auto">
            {sel ? (
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">{sel.subject}</h2>
                    <div className="text-sm text-muted-foreground mt-1">From <strong>{sel.from}</strong> • {new Date(sel.date).toLocaleString()}</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.success("Template loaded")}><Reply className="size-4 mr-1" /> Reply</Button>
                </div>
                {sel.hasResume && <Badge variant="secondary" className="mb-3"><Paperclip className="size-3 mr-1" /> Resume attached</Badge>}
                <div className="text-sm whitespace-pre-line leading-relaxed">{sel.body}</div>
                <div className="mt-6 p-4 rounded-lg bg-muted/40 border">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Quick templates</div>
                  <div className="flex flex-wrap gap-2">
                    {["Interview invitation","Rejection","Offer letter","Follow-up"].map(t => (
                      <Button key={t} size="sm" variant="outline" onClick={() => toast.success(`${t} template inserted`)}>{t}</Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            ) : <div className="flex items-center justify-center h-full text-muted-foreground"><Inbox className="size-10 mr-2" /> Select an email</div>}
          </div>
        </div>
      </Card>
    </div>
  );
}
