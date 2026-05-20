import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useStore } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/admin/departments")({ component: DeptsPage });

function DeptsPage() {
  const { departments } = useStore();
  return (
    <div>
      <PageHeader title="Departments" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map(d => (
          <Card key={d.id} className="border-0 shadow-soft hover:shadow-elegant transition">
            <CardContent className="p-5">
              <div className="size-11 rounded-xl bg-gradient-soft flex items-center justify-center text-primary"><Building2 className="size-5" /></div>
              <h3 className="mt-3 font-semibold">{d.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Head: {d.head}</p>
              <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-sm">
                <div><div className="text-muted-foreground text-xs">Openings</div><div className="font-semibold">{d.openings}</div></div>
                <div><div className="text-muted-foreground text-xs">Employees</div><div className="font-semibold">{d.employees}</div></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
