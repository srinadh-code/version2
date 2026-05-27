// import { useState } from "react";

// import API from "@/api/api";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import { toast } from "sonner";

// export default function ResumeUploadForm({
//   onSuccess
// }: {
//   onSuccess: () => void;
// }) {

//   const [loading, setLoading] =
//     useState(false);

//   const [file, setFile] =
//     useState<File | null>(null);

//   const [candidateName, setCandidateName] =
//     useState("");

//   const [email, setEmail] =
//     useState("");

//   const [department, setDepartment] =
//     useState("");

//   const [experience, setExperience] =
//     useState("");

//   const handleUpload = async () => {

//     try {

//       if (!file) {

//         toast.error(
//           "Please select resume"
//         );

//         return;
//       }

//       setLoading(true);

//       const formData = new FormData();

//       formData.append(
//         "resume",
//         file
//       );

//       formData.append(
//         "candidate_name",
//         candidateName
//       );

//       formData.append(
//         "email",
//         email
//       );

//       formData.append(
//         "department",
//         department
//       );

//       formData.append(
//         "experience",
//         experience
//       );

//       await API.post(
//         "/resumes/",
//         formData,
//         {
//           headers: {
//             "Content-Type":
//               "multipart/form-data"
//           }
//         }
//       );

//       toast.success(
//         "Resume uploaded"
//       );

//       onSuccess();

//     } catch (error) {

//       console.error(error);

//       toast.error(
//         "Upload failed"
//       );

//     } finally {

//       setLoading(false);
//     }
//   };

//   return (

//     <div className="space-y-4">

//       <div>

//         <Label>
//           Candidate Name
//         </Label>

//         <Input
//           value={candidateName}
//           onChange={(e) =>
//             setCandidateName(
//               e.target.value
//             )
//           }
//         />

//       </div>

//       <div>

//         <Label>
//           Email
//         </Label>

//         <Input
//           value={email}
//           onChange={(e) =>
//             setEmail(
//               e.target.value
//             )
//           }
//         />

//       </div>

//       <div>

//         <Label>
//           Department
//         </Label>

//         <Input
//           value={department}
//           onChange={(e) =>
//             setDepartment(
//               e.target.value
//             )
//           }
//         />

//       </div>

//       <div>

//         <Label>
//           Experience
//         </Label>

//         <Input
//           type="number"
//           value={experience}
//           onChange={(e) =>
//             setExperience(
//               e.target.value
//             )
//           }
//         />

//       </div>

//       <div>

//         <Label>
//           Resume File
//         </Label>

//         <Input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={(e) =>
//             setFile(
//               e.target.files?.[0] || null
//             )
//           }
//         />

//       </div>

//       <Button
//         onClick={handleUpload}
//         disabled={loading}
//         className="w-full"
//       >

//         {
//           loading
//             ? "Uploading..."
//             : "Upload Resume"
//         }

//       </Button>

//     </div>
//   );
// }


import { useState, useEffect } from "react";

import API from "@/api/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ResumeUploadForm({
  onSuccess
}: {
  onSuccess: () => void;
}) {

  const [loading, setLoading] =
    useState(false);

  const [file, setFile] =
    useState<File | null>(null);

  const [candidateName, setCandidateName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [experience, setExperience] =
    useState("");
  const [departments, setDepartments] =
  useState<any[]>([]);

  // JOB STATES

  const [jobs, setJobs] =
    useState<any[]>([]);

  const [selectedJob, setSelectedJob] =
    useState("");

  // FETCH JOBS

  useEffect(() => {

  fetchJobs();

  fetchDepartments();

}, []);

  const fetchJobs = async () => {

    try {

      const response =
        await API.get("/jobs/");

      console.log(response.data);

      setJobs(response.data);

    } catch (error) {

      console.error(error);
    }
  };





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

  // HANDLE UPLOAD

  const handleUpload = async () => {

    try {

      if (!file) {

        toast.error(
          "Please select resume"
        );

        return;
      }

      if (!selectedJob) {

        toast.error(
          "Please select job position"
        );

        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "resume",
        file
      );

      formData.append(
        "candidate_name",
        candidateName
      );

      formData.append(
        "email",
        email
      );

      formData.append(
        "department",
        department
      );

      formData.append(
        "experience",
        experience
      );

      // SEND JOB ID

      formData.append(
        "job_id",
        selectedJob
      );

      await API.post(
        "/resumes/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      toast.success(
        "Resume uploaded successfully"
      );

      onSuccess();

    } catch (error) {

      console.error(error);

      toast.error(
        "Upload failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="space-y-4">

      {/* CANDIDATE NAME */}

      <div>

        <Label>
          Candidate Name
        </Label>

        <Input
          value={candidateName}
          onChange={(e) =>
            setCandidateName(
              e.target.value
            )
          }
        />

      </div>

      {/* EMAIL */}

      <div>

        <Label>
          Email
        </Label>

        <Input
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

      </div>

      {/* DEPARTMENT */}
      <div>

  <Label>
    Department
  </Label>

  <Select
    value={department}
    onValueChange={
      setDepartment
    }
  >

    <SelectTrigger>

      <SelectValue
        placeholder="Select Department"
      />

    </SelectTrigger>

    <SelectContent>

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

</div>

      {/* <div>

        <Label>
          Department
        </Label>

        <Input
          value={department}
          onChange={(e) =>
            setDepartment(
              e.target.value
            )
          }
        />

      </div> */}

      {/* SELECT JOB */}

      <div>

        <Label>
          Select Job Position
        </Label>

        <select

          value={selectedJob}

          onChange={(e) =>
            setSelectedJob(
              e.target.value
            )
          }

          className="
            w-full
            border
            rounded-md
            p-2
            h-10
          "
        >

          <option value="">
            Select Job Position
          </option>

          {jobs.map((job) => (

            <option
              key={job.id}
              value={job.id}
            >

              {job.title}

            </option>

          ))}

        </select>

      </div>

      {/* EXPERIENCE */}

      <div>

        <Label>
          Experience
        </Label>

        <Input
          type="number"
          value={experience}
          onChange={(e) =>
            setExperience(
              e.target.value
            )
          }
        />

      </div>

      {/* FILE */}

      <div>

        <Label>
          Resume File
        </Label>

        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] || null
            )
          }
        />

      </div>

      {/* BUTTON */}

      <Button
        onClick={handleUpload}
        disabled={loading}
        className="w-full"
      >

        {
          loading
            ? "Uploading..."
            : "Upload Resume"
        }

      </Button>

    </div>
  );
}