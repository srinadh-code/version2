// import { createFileRoute } from "@tanstack/react-router";
// import { Card, CardContent } from "@/components/ui/card";
// import { Building2 } from "lucide-react";
// import { useStore } from "@/lib/mock-data";
// import { PageHeader } from "@/components/PageHeader";

// export const Route = createFileRoute("/admin/departments")({ component: DeptsPage });

// function DeptsPage() {
//   const { departments } = useStore();
//   return (
//     <div>
//       <PageHeader title="Departments" />
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {departments.map(d => (
//           <Card key={d.id} className="border-0 shadow-soft hover:shadow-elegant transition">
//             <CardContent className="p-5">
//               <div className="size-11 rounded-xl bg-gradient-soft flex items-center justify-center text-primary"><Building2 className="size-5" /></div>
//               <h3 className="mt-3 font-semibold">{d.name}</h3>
//               <p className="text-xs text-muted-foreground mt-0.5">Head: {d.head}</p>
//               <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-sm">
//                 <div><div className="text-muted-foreground text-xs">Openings</div><div className="font-semibold">{d.openings}</div></div>
//                 <div><div className="text-muted-foreground text-xs">Employees</div><div className="font-semibold">{d.employees}</div></div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }







import { createFileRoute } from "@tanstack/react-router";

import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

import {
  Building2,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin/departments")({
  component: DeptsPage,
});

interface Department {
  id: number;
  name: string;
  head: string;
  openings: number;
  employees: number;
}

function DeptsPage() {

  // ================= STATES =================

  const [departments, setDepartments] = useState<Department[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [head, setHead] = useState("");
  const [openings, setOpenings] = useState("");
  const [employees, setEmployees] = useState("");

  // ================= GET DEPARTMENTS =================

  const fetchDepartments = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/departments/"
      );

      const data = await response.json();

      setDepartments(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchDepartments();

  }, []);

  // ================= ADD DEPARTMENT =================

  const handleAddDepartment = async () => {

    const newDepartment = {
      name,
      head,
      openings: Number(openings),
      employees: Number(employees),
    };

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/departments/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newDepartment),
        }
      );

      const data = await response.json();

      setDepartments([...departments, data]);

      setName("");
      setHead("");
      setOpenings("");
      setEmployees("");

      setShowForm(false);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= DELETE DEPARTMENT =================

  const handleDeleteDepartment = async (id: number) => {

    try {

      await fetch(
        `http://127.0.0.1:8000/departments/${id}/`,
        {
          method: "DELETE",
        }
      );

      setDepartments(
        departments.filter((d) => d.id !== id)
      );

    } catch (error) {

      console.log(error);

    }

  };

  // ================= EDIT DEPARTMENT =================

  const handleEditDepartment = async (department: Department) => {

    const updatedName = prompt(
      "Enter Department Name",
      department.name
    );

    const updatedHead = prompt(
      "Enter Department Head",
      department.head
    );

    const updatedOpenings = prompt(
      "Enter Openings",
      department.openings.toString()
    );

    const updatedEmployees = prompt(
      "Enter Employees",
      department.employees.toString()
    );

    if (
      !updatedName ||
      !updatedHead ||
      !updatedOpenings ||
      !updatedEmployees
    ) {
      return;
    }

    const updatedDepartment = {
      name: updatedName,
      head: updatedHead,
      openings: Number(updatedOpenings),
      employees: Number(updatedEmployees),
    };

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/departments/${department.id}/`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(updatedDepartment),
        }
      );

      const data = await response.json();

      setDepartments(
        departments.map((d) =>
          d.id === department.id ? data : d
        )
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      {/* ================= HEADER ================= */}

      <div className="flex justify-between items-center mb-5">

        <PageHeader title="Departments" />

        <Button onClick={() => setShowForm(!showForm)}>

          <Plus className="size-4 mr-2" />

          Add Department

        </Button>

      </div>

      {/* ================= FORM ================= */}

      {showForm && (

        <div className="bg-white p-5 rounded-xl shadow mb-6">

          <h2 className="text-lg font-semibold mb-4">
            Add Department
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Department Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Department Head"
              value={head}
              onChange={(e) => setHead(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Openings"
              value={openings}
              onChange={(e) => setOpenings(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Employees"
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
              className="border p-2 rounded"
            />

          </div>

          <Button
            onClick={handleAddDepartment}
            className="mt-4"
          >

            <Plus className="size-4 mr-2" />

            Save Department

          </Button>

        </div>

      )}

      {/* ================= DEPARTMENT CARDS ================= */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {departments.map((d) => (

          <Card
            key={d.id}
            className="border-0 shadow-soft hover:shadow-elegant transition"
          >

            <CardContent className="p-5">

              <div className="flex justify-between items-start">

                <div className="size-11 rounded-xl bg-gradient-soft flex items-center justify-center text-primary">

                  <Building2 className="size-5" />

                </div>

                <div className="flex gap-2">

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEditDepartment(d)}
                  >

                    <Pencil className="size-4" />

                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDeleteDepartment(d.id)}
                  >

                    <Trash2 className="size-4" />

                  </Button>

                </div>

              </div>

              <h3 className="mt-3 font-semibold">
                {d.name}
              </h3>

              <p className="text-xs text-muted-foreground mt-0.5">
                Head: {d.head}
              </p>

              <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-sm">

                <div>

                  <div className="text-muted-foreground text-xs">
                    Openings
                  </div>

                  <div className="font-semibold">
                    {d.openings}
                  </div>

                </div>

                <div>

                  <div className="text-muted-foreground text-xs">
                    Employees
                  </div>

                  <div className="font-semibold">
                    {d.employees}
                  </div>

                </div>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>

  );
}

export default DeptsPage;