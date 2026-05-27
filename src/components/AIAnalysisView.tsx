

import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Download,
  RefreshCw,
  FileDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

import { type Resume } from "@/lib/mock-data";

import { toast } from "sonner";
import { useState } from "react";

export function AIAnalysisView({
  resume,
}: {
  resume: Resume;
}) {

  const [score, setScore] = useState(
    resume.ats_score || 0
  );

  const [analyzing, setAnalyzing] =
    useState(false);

  const reanalyze = () => {

    setAnalyzing(true);

    setTimeout(() => {

      setScore(resume.ats_score || 0);

      setAnalyzing(false);

      toast.success("Re-analyzed");

    }, 1200);
  };

  const ringStyle = {

    background: `conic-gradient(
      oklch(0.55 0.22 290)
      ${score * 3.6}deg,

      oklch(0.92 0.01 280)
      0deg
    )`,
  };

  return (

    <div className="space-y-5">

      {/* TOP SECTION */}

      <div className="
        grid
        md:grid-cols-[200px_1fr]
        gap-5
        items-center
      ">

        {/* ATS SCORE */}

        <div
          className="
            relative
            size-40
            rounded-full
            flex
            items-center
            justify-center
          "
          style={ringStyle}
        >

          <div
            className="
              size-32
              rounded-full
              bg-card
              flex
              flex-col
              items-center
              justify-center
              shadow-soft
            "
          >

            <div className="
              text-4xl
              font-bold
              bg-gradient-primary
              bg-clip-text
              text-transparent
            ">
              {score}%
            </div>

            <div className="
              text-xs
              text-muted-foreground
            ">
              ATS Score
            </div>

          </div>

        </div>

        {/* PROFILE */}

        <div>

          <h3 className="
            font-semibold
            text-lg
          ">
            {resume.candidate_name}
          </h3>

          <p className="
            text-sm
            text-muted-foreground
          ">
            {resume.email} • {resume.department}
          </p>

          <p className="
            mt-3
            text-sm
            leading-relaxed
          ">

            <Sparkles className="
              size-4
              inline
              text-primary
              mr-1
            " />

            {resume.ai_summary}

          </p>

          <div className="
            mt-4
            flex
            gap-2
            flex-wrap
          ">

            <Button
              size="sm"
              variant="outline"
              onClick={reanalyze}
              disabled={analyzing}
            >

              <RefreshCw
                className={`
                  size-3.5
                  mr-1
                  ${
                    analyzing
                      ? "animate-spin"
                      : ""
                  }
                `}
              />

              Re-analyze

            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                toast.success(
                  "Report exported"
                )
              }
            >

              <FileDown className="
                size-3.5
                mr-1
              " />

              Export PDF

            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                toast.success(
                  "Report downloaded"
                )
              }
            >

              <Download className="
                size-3.5
                mr-1
              " />

              Download

            </Button>

          </div>

        </div>

      </div>

      {/* SKILLS */}

      <div>

        <h4 className="
          text-sm
          font-semibold
          mb-2
        ">
          Skills Detected
        </h4>

        <div className="
          flex
          flex-wrap
          gap-1.5
        ">

          {(resume.skills || []).map(
            (skill, index) => (

              <Badge
                key={index}
                variant="secondary"
              >
                {skill}
              </Badge>

            )
          )}

        </div>

      </div>

      {/* STRENGTHS + WEAKNESSES */}

      <div className="
        grid
        md:grid-cols-2
        gap-4
      ">

        {/* STRENGTHS */}

        <Card className="
          p-4
          border-0
          shadow-soft
        ">

          <h4 className="
            text-sm
            font-semibold
            flex
            items-center
            gap-2
            mb-3
            text-success
          ">

            <CheckCircle2 className="
              size-4
            " />

            Strengths

          </h4>

          <ul className="
            space-y-2
            text-sm
          ">

            {(resume.strengths || []).map(
              (item, index) => (

                <li
                  key={index}
                  className="flex gap-2"
                >

                  <span className="
                    text-success
                  ">
                    •
                  </span>

                  {item}

                </li>

              )
            )}

          </ul>

        </Card>

        {/* WEAKNESSES */}

        <Card className="
          p-4
          border-0
          shadow-soft
        ">

          <h4 className="
            text-sm
            font-semibold
            flex
            items-center
            gap-2
            mb-3
            text-warning-foreground
          ">

            <AlertCircle className="
              size-4
            " />

            Weaknesses

          </h4>

          <ul className="
            space-y-2
            text-sm
          ">

            {(resume.weaknesses || []).map(
              (item, index) => (

                <li
                  key={index}
                  className="flex gap-2"
                >

                  <span className="
                    text-warning-foreground
                  ">
                    •
                  </span>

                  {item}

                </li>

              )
            )}

          </ul>

        </Card>

      </div>

      {/* MISSING SKILLS */}

      <Card className="
        p-4
        border-0
        shadow-soft
      ">

        <h4 className="
          text-sm
          font-semibold
          mb-3
        ">
          Missing Skills
        </h4>

        <div className="
          flex
          flex-wrap
          gap-1.5
        ">

          {(resume.missing_skills || []).map(
            (skill, index) => (

              <Badge
                key={index}
                variant="outline"
                className="
                  border-destructive/30
                  text-destructive
                "
              >
                {skill}
              </Badge>

            )
          )}

        </div>

      </Card>

      {/* IMPROVEMENTS */}

      <Card className="
        p-4
        border-0
        shadow-soft
      ">

        <h4 className="
          text-sm
          font-semibold
          flex
          items-center
          gap-2
          mb-3
          text-primary
        ">

          <Lightbulb className="
            size-4
          " />

          Recommended Improvements

        </h4>

        <ul className="
          space-y-2
          text-sm
        ">

          {(resume.improvements || []).map(
            (item, index) => (

              <li
                key={index}
                className="flex gap-2"
              >

                <span className="
                  text-primary
                ">
                  {index + 1}.
                </span>

                {item}

              </li>

            )
          )}

        </ul>

      </Card>

      {/* ROLES + MATCH */}

      <div className="
        grid
        md:grid-cols-2
        gap-4
      ">

        {/* ROLES */}

        <Card className="
          p-4
          border-0
          shadow-soft
        ">

          <h4 className="
            text-sm
            font-semibold
            mb-3
          ">
            Recommended Job Roles
          </h4>

          <div className="
            space-y-2
          ">

            {(resume.recommended_roles || []).map(
              (role, index) => (

                <div
                  key={index}
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span className="
                    text-sm
                  ">
                    {role}
                  </span>

                  <Badge variant="secondary">
                    {90 - index * 5}% match
                  </Badge>

                </div>

              )
            )}

          </div>

        </Card>

        {/* MATCH BREAKDOWN */}

        <Card className="
          p-4
          border-0
          shadow-soft
        ">

          <h4 className="
            text-sm
            font-semibold
            mb-3
          ">
            Resume Match Breakdown
          </h4>

          <div className="
            space-y-3
          ">

            {[
              [
                "Skills match",
                resume.match_breakdown
                  ?.skills_match || 0
              ],

              [
                "Experience match",
                resume.match_breakdown
                  ?.experience_match || 0
              ],

              [
                "Education match",
                resume.match_breakdown
                  ?.education_match || 0
              ],

              [
                "Keywords match",
                resume.match_breakdown
                  ?.keywords_match || 0
              ],
            ].map(([label, value], index) => (

              <div key={index}>

                <div className="
                  flex
                  justify-between
                  text-xs
                  mb-1
                ">

                  <span>
                    {label}
                  </span>

                  <span className="
                    font-medium
                  ">
                    {value}%
                  </span>

                </div>

                <Progress
                  value={value as number}
                />

              </div>

            ))}

          </div>

        </Card>

      </div>

    </div>
  );
}