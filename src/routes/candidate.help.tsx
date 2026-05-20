import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/PageHeader";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/candidate/help")({ component: HelpPage });

const FAQ = [
  ["How do I update my resume?", "Go to My Resume from the sidebar and click Replace to upload a new version."],
  ["How long are applications visible?", "Your applications remain visible for 90 days after the job is closed."],
  ["Can I delete my account?", "Yes, contact support and we'll process your request within 24 hours."],
  ["How does job matching work?", "We use your skills, experience, and preferences to recommend jobs you're most likely to succeed at."],
];

function HelpPage() {
  return (
    <div>
      <PageHeader title="Help & Support" />
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {[{ icon: Mail, t: "Email", v: "support@talentflow.com" },{ icon: Phone, t: "Phone", v: "+91 80 1234 5678" },{ icon: MessageCircle, t: "Live chat", v: "9 AM – 6 PM IST" }].map((c, i) => (
          <Card key={i} className="border-0 shadow-soft"><CardContent className="p-5 flex items-center gap-3">
            <div className="size-11 rounded-xl bg-gradient-soft text-primary flex items-center justify-center"><c.icon className="size-5" /></div>
            <div><div className="font-medium">{c.t}</div><div className="text-sm text-muted-foreground">{c.v}</div></div>
          </CardContent></Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Frequently asked questions</h3>
            <Accordion type="single" collapsible>
              {FAQ.map(([q, a], i) => (
                <AccordionItem key={i} value={`i${i}`}>
                  <AccordionTrigger>{q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardContent className="p-6 space-y-3">
            <h3 className="font-semibold">Raise a ticket</h3>
            <div><Label>Subject</Label><Input className="mt-1.5" /></div>
            <div><Label>Message</Label><Textarea rows={4} className="mt-1.5" /></div>
            <Button className="bg-gradient-primary w-full" onClick={() => toast.success("Ticket submitted")}>Submit</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
