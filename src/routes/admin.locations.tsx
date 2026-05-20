import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/admin/locations")({ component: LocationsPage });

const LOCATIONS = [
  { name: "Bangalore", country: "India", employees: 245, jobs: 12 },
  { name: "Mumbai", country: "India", employees: 132, jobs: 8 },
  { name: "Delhi", country: "India", employees: 98, jobs: 5 },
  { name: "Pune", country: "India", employees: 76, jobs: 4 },
  { name: "Hyderabad", country: "India", employees: 89, jobs: 6 },
  { name: "Remote", country: "Global", employees: 54, jobs: 9 },
];

function LocationsPage() {
  return (
    <div>
      <PageHeader title="Locations" description="Office locations and remote teams" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LOCATIONS.map(l => (
          <Card key={l.name} className="border-0 shadow-soft hover:shadow-elegant transition">
            <CardContent className="p-5">
              <div className="size-11 rounded-xl bg-gradient-soft flex items-center justify-center text-primary"><MapPin className="size-5" /></div>
              <h3 className="mt-3 font-semibold">{l.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{l.country}</p>
              <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-sm">
                <div><div className="text-muted-foreground text-xs">Employees</div><div className="font-semibold">{l.employees}</div></div>
                <div><div className="text-muted-foreground text-xs">Open Jobs</div><div className="font-semibold">{l.jobs}</div></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
