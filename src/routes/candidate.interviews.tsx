import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Phone, MapPin, Link as LinkIcon, Calendar } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useStore } from "@/lib/mock-data";

export const Route = createFileRoute("/candidate/interviews")({ component: CInterviews });

function CInterviews() {
  const { interviews } = useStore();
  const list = interviews.slice(0, 6);
  const ico = (t: string) => t === "Video" ? <Video className="size-3.5" /> : t === "Phone" ? <Phone className="size-3.5" /> : <MapPin className="size-3.5" />;
  return (
    <div>
      <PageHeader title="Interview Center" description="Your interview schedule" />
      <div className="grid md:grid-cols-2 gap-4">
        {list.map(i => (
          <Card key={i.id} className="border-0 shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-accent text-accent-foreground flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase">{new Date(i.date).toLocaleString('en', { month: 'short' })}</span>
                    <span className="text-lg font-bold leading-none">{new Date(i.date).getDate()}</span>
                  </div>
                  <div><div className="font-semibold">{i.position}</div><div className="text-xs text-muted-foreground">{i.time} • Interviewer: {i.interviewer}</div></div>
                </div>
                <Badge variant="outline" className="gap-1">{ico(i.type)}{i.type}</Badge>
              </div>
              <div className="mt-3 flex items-center justify-between"><Badge>{i.status}</Badge>{i.meetingLink && <Button size="sm" variant="outline"><LinkIcon className="size-3 mr-1" /> Join</Button>}</div>
            </CardContent>
          </Card>
        ))}
        {list.length === 0 && <Card className="col-span-full border-dashed"><CardContent className="p-12 text-center text-muted-foreground"><Calendar className="size-10 mx-auto mb-2" />No interviews scheduled</CardContent></Card>}
      </div>
    </div>
  );
}
