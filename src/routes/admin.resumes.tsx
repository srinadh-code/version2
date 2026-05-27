

import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import ResumeUploadForm from "@/components/ResumeUploadForm";
import {
  Upload,
  Search,
  Bookmark,
  Download,
  Trash2,
  Sparkles,
  FileText,
  Eye
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";



import { PageHeader } from "@/components/PageHeader";

import { toast } from "sonner";

import { AIAnalysisView } from "@/components/AIAnalysisView";

import API from "@/api/api";

export const Route = createFileRoute(
  "/admin/resumes"
)({
  component: ResumesPage
});

function ResumesPage() {

  const [resumes, setResumes] =
    useState<any[]>([]);
  const [departments, setDepartments] =
  useState<any[]>([]);

  const [q, setQ] = useState("");

  const [dept, setDept] =
    useState("all");

  const [uploadOpen, setUploadOpen] =
    useState(false);

  const [aiResume, setAiResume] =
    useState<any | null>(null);

  const [preview, setPreview] =
    useState<any | null>(null);





  const fetchDepartments =
  async () => {

    try {

      const response =
        await API.get(
          "/departments/"
        );

      setDepartments(
        response.data
      );

    } catch (error) {

      console.error(error);
    }
};

  // FETCH RESUMES

  const fetchResumes = async () => {

    try {

      const response = await API.get(
        "/resumes/"
      );

      const transformed =
        response.data.map((r: any) => ({

          id: r.id,

          candidate_name:
            r.candidate_name,

          email: r.email,

          department:
            r.department,

          sub_department:
            r.sub_department,

          experience:
            r.experience,

          skills:
            r.skills || [],

          ats_score:
            r.ats_score || 0,

          is_bookmarked:
            r.is_bookmarked,

          resume_url:
            r.resume_url,

          strengths:
            r.strengths || [],

          weaknesses:
            r.weaknesses || [],

          missing_skills:
            r.missing_skills || [],

          improvements:
            r.improvements || [],

          recommended_roles:
            r.recommended_roles || [],

          match_breakdown:
            r.match_breakdown || {},

          ai_summary:
            r.ai_summary || "",

        }));

      setResumes(transformed);

    } catch (error) {

      console.error(error);
    }
  };

useEffect(() => {

  fetchResumes();

  fetchDepartments();

}, []);

  // FILTER

  const filtered = resumes.filter(
    (r) =>

      (dept === "all" ||
        r.department === dept)

      &&

      (
        q === "" ||

        r.candidate_name
          .toLowerCase()
          .includes(
            q.toLowerCase()
          )
      )
  );

  return (

    <div>

      <PageHeader
        title="All Resumes"
        description={`${filtered.length} resumes in the database`}
        actions={
          <Button
            onClick={() =>
              setUploadOpen(true)
            }
            className="
              bg-gradient-primary
              shadow-elegant
            "
          >
            <Upload className="
              size-4
              mr-1
            " />

            Upload Resume

          </Button>
        }
      />

      {/* SEARCH */}

      <Card className="
        border-0
        shadow-soft
        mb-4
      ">

        <CardContent className="
          p-4
          flex
          flex-col
          md:flex-row
          gap-3
        ">

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
              placeholder="Search resumes..."
              value={q}
              onChange={(e) =>
                setQ(e.target.value)
              }
              className="pl-9"
            />

          </div>

          <Select
            value={dept}
            onValueChange={setDept}
          >

            <SelectTrigger className="
              md:w-48
            ">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                All Departments
              </SelectItem>

              {/* {DEPARTMENTS.map((d) => (

                <SelectItem
                  key={d}
                  value={d}
                >
                  {d}
                </SelectItem>

              ))} */}
              {departments.map((d) => (

  <SelectItem
    key={d.id}
    value={d.name}
  >

    {d.name}

  </SelectItem>

))}

            </SelectContent>

          </Select>

        </CardContent>

      </Card>

      {/* RESUME GRID */}

      <div className="
        grid
        md:grid-cols-2
        xl:grid-cols-3
        gap-4
      ">

        {filtered.map((r) => (

          <Card
            key={r.id}
            className="
              border-0
              shadow-soft
              hover:shadow-elegant
              transition-all
            "
          >

            <CardContent className="
              p-5
            ">

              <div className="
                flex
                items-start
                justify-between
              ">

                <div className="
                  size-11
                  rounded-xl
                  bg-gradient-soft
                  flex
                  items-center
                  justify-center
                  text-primary
                ">

                  <FileText className="
                    size-5
                  " />

                </div>

                {/* BOOKMARK */}

                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={async () => {

                    try {

                      await API.patch(
                        `/resumes/${r.id}/bookmark/`
                      );

                      fetchResumes();

                      toast.success(
                        "Bookmark updated"
                      );

                    } catch (error) {

                      console.error(error);

                      toast.error(
                        "Bookmark failed"
                      );
                    }
                  }}
                >

                  <Bookmark
                    className={`
                      size-4
                      ${
                        r.is_bookmarked
                          ? "fill-primary text-primary"
                          : ""
                      }
                    `}
                  />

                </Button>

              </div>

              {/* NAME */}

              <h3 className="
                mt-3
                font-semibold
                truncate
              ">
                {r.candidate_name}
              </h3>

              <p className="
                text-xs
                text-muted-foreground
                truncate
              ">
                {r.email}
              </p>

              {/* DEPARTMENT */}

              <div className="
                mt-2
                flex
                items-center
                gap-2
                text-xs
              ">

                <Badge variant="secondary">
                  {r.department}
                </Badge>

                <span className="
                  text-muted-foreground
                ">
                  {r.experience}y exp
                </span>

              </div>

              {/* SKILLS */}

              <div className="
                mt-3
                flex
                flex-wrap
                gap-1
              ">

                {(r.skills || [])
                  .slice(0, 3)
                  .map((s: string) => (

                    <Badge
                      key={s}
                      variant="outline"
                      className="
                        text-[10px]
                      "
                    >
                      {s}
                    </Badge>

                  ))}

              </div>

              {/* FOOTER */}

              <div className="
                mt-4
                pt-3
                border-t
                flex
                items-center
                justify-between
              ">

                <div>

                  <div className="
                    text-xs
                    text-muted-foreground
                  ">
                    ATS Score
                  </div>

                  <div className="
                    text-lg
                    font-bold
                    text-primary
                  ">
                    {r.ats_score}%
                  </div>

                </div>

                {/* ACTIONS */}

                <div className="
                  flex
                  gap-1
                ">

                  {/* VIEW */}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => {

                      if (!r.resume_url) {

                        toast.error(
                          "Resume not found"
                        );

                        return;
                      }

                      const viewerUrl =
                        `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(r.resume_url)}`;

                      window.open(
                        viewerUrl,
                        "_blank"
                      );

                    }}
                  >

                    <Eye className="
                      size-4
                    " />

                  </Button>

                  {/* AI */}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() =>
                      setAiResume(r)
                    }
                  >

                    <Sparkles className="
                      size-4
                      text-primary
                    " />

                  </Button>

                  {/* DOWNLOAD */}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={async () => {

                      try {

                        const response =
                          await fetch(
                            `http://127.0.0.1:8000/resumes/${r.id}/download/`
                          );

                        const blob =
                          await response.blob();

                        const url =
                          window.URL.createObjectURL(
                            blob
                          );

                        const link =
                          document.createElement(
                            "a"
                          );

                        link.href = url;

                        link.setAttribute(
                          "download",
                          `${r.candidate_name}_resume.pdf`
                        );

                        document.body.appendChild(
                          link
                        );

                        link.click();

                        link.remove();

                        window.URL.revokeObjectURL(
                          url
                        );

                      } catch (error) {

                        console.error(error);

                        toast.error(
                          "Download failed"
                        );
                      }
                    }}
                  >

                    <Download className="
                      size-4
                    " />

                  </Button>

                  {/* DELETE */}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="
                      size-8
                      text-destructive
                    "
                    onClick={async () => {

                      try {

                        await API.delete(
                          `/resumes/${r.id}/`
                        );

                        fetchResumes();

                        toast.success(
                          "Deleted"
                        );

                      } catch (error) {

                        console.error(error);

                        toast.error(
                          "Delete failed"
                        );
                      }
                    }}
                  >

                    <Trash2 className="
                      size-4
                    " />

                  </Button>

                </div>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>
      {/* UPLOAD MODAL */}

<Dialog
  open={uploadOpen}
  onOpenChange={setUploadOpen}
>

  <DialogContent
    className="max-w-lg"
  >

    <DialogHeader>

      <DialogTitle>
        Upload Resume
      </DialogTitle>

    </DialogHeader>

    <ResumeUploadForm
      onSuccess={() => {

        setUploadOpen(false);

        fetchResumes();

      }}
    />

  </DialogContent>

</Dialog>

      {/* AI MODAL */}

      <Dialog
        open={!!aiResume}
        onOpenChange={(o) =>
          !o && setAiResume(null)
        }
      >

        <DialogContent className="
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
        ">

          <DialogHeader>

            <DialogTitle>
              AI Resume Analysis
            </DialogTitle>

          </DialogHeader>

          {aiResume && (
  <AIAnalysisView
    resume={{
      ...aiResume,

      strengths:
        aiResume?.strengths || [],

      weaknesses:
        aiResume?.weaknesses || [],

      missing_skills:
        aiResume?.missing_skills || [],

      improvements:
        aiResume?.improvements || [],

      recommended_roles:
        aiResume?.recommended_roles || [],

      skills:
        aiResume?.skills || [],

      ai_summary:
        aiResume?.ai_summary || "",

      match_breakdown:
        aiResume?.match_breakdown || {

          skills_match: 0,

          experience_match: 0,

          education_match: 0,

          keywords_match: 0
        }
    }}
  />
)}

        </DialogContent>

      </Dialog>

    </div>
  );
}