


import { createFileRoute, Link } from "@tanstack/react-router";

import { useState, useEffect } from "react";

import {
  Plus,
  Search,
  MoreVertical,
  MapPin,
  Briefcase as BriefcaseIcon,
  Clock,
  IndianRupee,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import {
//   DEPARTMENTS,
//   type Job,
// } from "@/lib/mock-data";
import {
  type Job,
} from "@/lib/mock-data";
import API from "@/api/api";
import { PageHeader } from "@/components/PageHeader";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { JobForm } from "@/components/JobForm";

import {
  getJobs,
  deleteJob,
} from "@/api/jobApi";

export const Route = createFileRoute(
  "/admin/jobs"
)({
  component: JobsPage,
});

function JobsPage() {

  const [jobs, setJobs] =
    useState<any[]>([]);
const [departments, setDepartments] =
  useState<any[]>([]);

  const [q, setQ] =
    useState("");

  const [dept, setDept] =
    useState<string>("all");

  const [status, setStatus] =
    useState("all");

  const [createOpen, setCreateOpen] =
    useState(false);

  const [editJob, setEditJob] =
    useState<Job | null>(null);

  const [candidates] =
    useState<any[]>([]);

  // FETCH JOBS

  const fetchJobs = async () => {

    try {

      const data = await getJobs();

      const transformed =
        data.map((j: any) => ({

          id: j.id,

          title: j.title,

          department:
            j.department,

          experience:
            j.experience,

          skills:
            j.required_skills || [],

          salaryMin:
            j.salary_min,

          salaryMax:
            j.salary_max,

          type:
            j.job_type,

          workMode:
            j.work_mode,

          location:
            j.location,

          description:
            j.description,

          status:
            j.status,

          openings:
            j.openings,

          recruiterIds: [],
        }));

      setJobs(transformed);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

  fetchJobs();
  const fetchDepartments = async () => {

  try {

    const response =
      await API.get(
        "/departments/"
      );

    setDepartments(
      response.data
    );
    console.log(
      "DEPARTMENTS API:",
      response.data
    );

  } catch (error) {

    console.log(error);
  }
};

  fetchDepartments();

}, []);
  // FILTER

  // const filtered = jobs.filter(
  //   (j) =>

  //     (dept === "all" ||
  //       j.department === dept)

  //     &&

  //     (status === "all" ||
  //       j.status === status)

  //     &&

  //     (
  //       q === ""

  //       ||

  //       j.title
  //         .toLowerCase()
  //         .includes(
  //           q.toLowerCase()
  //         )

  //       ||

  //       j.skills.some(
  //         (s: string) =>
  //           s.toLowerCase()
  //             .includes(
  //               q.toLowerCase()
  //             )
  //       )
  //     )
  // );
  const filtered = jobs.filter((j) => {

  const matchesDept =
    dept === "all"
      ? true
      : j.department === dept;

  const matchesStatus =
    status === "all"
      ? true
      : j.status === status;

  const matchesSearch =
    q === ""
      ? true
      : j.title
          .toLowerCase()
          .includes(q.toLowerCase())
        ||
        j.skills.some(
          (s: string) =>
            s.toLowerCase()
              .includes(
                q.toLowerCase()
              )
        );

  return (
    matchesDept &&
    matchesStatus &&
    matchesSearch
  );
});

  // DELETE JOB

  const handleDeleteJob =
    async (id: number) => {

      try {

        await deleteJob(id);

        toast.success(
          "Job deleted successfully"
        );

        fetchJobs();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to delete job"
        );
      }
    };

  return (

    <div>

      <PageHeader

        title="Job Openings"

        description={`${filtered.length} jobs found`}

        actions={

          <Button
            onClick={() =>
              setCreateOpen(true)
            }
            className="
              bg-gradient-primary
              shadow-lg
            "
          >

            <Plus className="
              size-4
              mr-1
            " />

            Create Job

          </Button>
        }
      />

      {/* FILTERS */}

      <Card className="
        border-0
        shadow-md
        rounded-2xl
        mb-6
      ">

        <CardContent className="
          p-4
          flex
          flex-col
          md:flex-row
          gap-3
        ">

          {/* SEARCH */}

          <div className="
            relative
            flex-1
          ">

            <Search className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              size-4
              text-muted-foreground
            " />

            <Input
              placeholder="
                Search jobs by title or skill...
              "
              value={q}
              onChange={(e) =>
                setQ(e.target.value)
              }
              className="
                pl-9
                rounded-xl
              "
            />

          </div>

          {/* DEPARTMENT */}

          <Select
            value={dept}
            onValueChange={setDept}
          >

            <SelectTrigger className="
              md:w-52
              rounded-xl
            ">

              <SelectValue
                placeholder="Department"
              />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                All Departments
              </SelectItem>

              {
  departments.map((dept) => (

    <SelectItem
      key={dept.id}
      value={dept.name}
    >

      {dept.name}

    </SelectItem>

  ))
}

            </SelectContent>

          </Select>

          {/* STATUS */}

          <Select
            value={status}
            onValueChange={setStatus}
          >

            <SelectTrigger className="
              md:w-44
              rounded-xl
            ">

              <SelectValue
                placeholder="Status"
              />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                All Status
              </SelectItem>

              <SelectItem value="Active">
                Active
              </SelectItem>

              <SelectItem value="Paused">
                Paused
              </SelectItem>

              <SelectItem value="Closed">
                Closed
              </SelectItem>

            </SelectContent>

          </Select>

        </CardContent>

      </Card>

      {/* JOB GRID */}

      <div className="
        grid
        lg:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {filtered.map((j) => {

          const applicants =
            candidates.filter(
              (c) =>
                c.jobId === j.id
            ).length;

          return (

            <Card
              key={j.id}
              className="
                border-0
                shadow-md
                hover:shadow-xl
                rounded-2xl
                transition-all
                duration-300
                group
              "
            >

              <CardContent className="p-6">

                {/* TOP */}

                <div className="
                  flex
                  items-start
                  justify-between
                ">

                  <div className="
                    size-12
                    rounded-2xl
                    bg-primary/10
                    flex
                    items-center
                    justify-center
                  ">

                    <BriefcaseIcon className="
                      size-5
                      text-primary
                    " />

                  </div>

                  <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                      >

                        <MoreVertical className="
                          size-4
                        " />

                      </Button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">

                      <DropdownMenuItem
                        onClick={() =>
                          setEditJob(j)
                        }
                      >
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        Pause
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() =>
                          handleDeleteJob(j.id)
                        }
                      >
                        Delete
                      </DropdownMenuItem>

                    </DropdownMenuContent>

                  </DropdownMenu>

                </div>

                {/* TITLE */}

                <Link
                  to="/admin/jobs/$jobId"
                  params={{
                    jobId:
                      String(j.id),
                  }}
                  className="block mt-4"
                >

                  <h3 className="
                    font-semibold
                    text-lg
                    group-hover:text-primary
                    transition-colors
                  ">

                    {j.title}

                  </h3>

                  <p className="
                    text-sm
                    text-muted-foreground
                    mt-1
                  ">

                    {j.department}

                  </p>

                </Link>
{/* SKILLS */}

<div className="
  flex
  flex-wrap
  gap-2
  mt-4
">

  {j.skills &&
    j.skills.length > 0 ? (

      j.skills.map(
        (
          skill: string,
          index: number
        ) => (

          <Badge
            key={index}
            variant="secondary"
            className="
              rounded-full
              px-3
              py-1
              bg-violet-100
              text-violet-700
              hover:bg-violet-100
            "
          >

            {skill}

          </Badge>
        )
      )

    ) : (

      <span className="
        text-sm
        text-muted-foreground
      ">

        No skills

      </span>
    )}

</div>

                {/* DETAILS */}

                <div className="
                  grid
                  grid-cols-2
                  gap-y-3
                  text-sm
                  text-muted-foreground
                  mt-5
                ">

                  <div className="
                    flex
                    items-center
                    gap-2
                  ">

                    <MapPin className="
                      size-4
                    " />

                    {j.location}

                  </div>

                  <div className="
                    flex
                    items-center
                    gap-2
                  ">

                    <Clock className="
                      size-4
                    " />

                    {j.experience}

                  </div>

                  <div className="
                    flex
                    items-center
                    gap-2
                    col-span-2
                  ">

                    <IndianRupee className="
                      size-4
                    " />

                    ₹ {j.salaryMin / 100000}L
                    -
                    {j.salaryMax / 100000}L

                  </div>

                </div>

               
                {/* FOOTER */}

<div className="
  border-t
  mt-5
  pt-4
  flex
  items-center
  justify-between
">

  <Badge
    className={`
      rounded-full
      px-3
      py-1

      ${j.status === "Active"
        ? "bg-green-100 text-green-700 hover:bg-green-100"
        : ""}

      ${j.status === "Paused"
        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
        : ""}

      ${j.status === "Closed"
        ? "bg-red-100 text-red-700 hover:bg-red-100"
        : ""}
    `}
  >

    {j.status}

  </Badge>

  <div className="
    flex
    items-center
    gap-3
    text-sm
    text-muted-foreground
  ">

    <span>

      {j.openings}
      {" "}
      openings

    </span>

    <span>

      {j.applicants || 0}
      {" "}
      applicants

    </span>

  </div>

</div>

</CardContent>

</Card>
);
})}

        {/* EMPTY */}

        {filtered.length === 0 && (

          <Card className="
            col-span-full
            border-dashed
            rounded-2xl
          ">

            <CardContent className="
              p-12
              text-center
              text-muted-foreground
            ">

              No jobs match your filters

            </CardContent>

          </Card>
        )}

      </div>

      {/* CREATE MODAL */}

      <Dialog
        open={createOpen}
        onOpenChange={setCreateOpen}
      >

        <DialogContent className="
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
        ">

          <DialogHeader>

            <DialogTitle>
              Create New Job
            </DialogTitle>

          </DialogHeader>

          <JobForm
  onClose={() =>
    setCreateOpen(false)
  }
  fetchJobs={fetchJobs}
/>

        </DialogContent>

      </Dialog>

      {/* EDIT MODAL */}

      <Dialog
        open={!!editJob}
        onOpenChange={(o) =>
          !o &&
          setEditJob(null)
        }
      >

        <DialogContent className="
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
        ">

          <DialogHeader>

            <DialogTitle>
              Edit Job
            </DialogTitle>

          </DialogHeader>

          {editJob && (

            <JobForm
  job={editJob}
  onClose={() =>
    setEditJob(null)
  }
  fetchJobs={fetchJobs}
/>

          )}

        </DialogContent>

      </Dialog>

    </div>
  );
}