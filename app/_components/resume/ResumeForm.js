"use client";
import userContext from "@/app/contexts/UserContext";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function ResumeForm({ resume, setResume, setScore }) {
  const [loading, setLoading] = useState(false);
  const { setUserData, userData } = useContext(userContext);

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };
  // name, role, skills, experience, projects
  const handleAI = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/resume/generate`,
        {
          resume,
        },
        { withCredentials: true },
      );
      setResume((prev) => ({
        ...prev,
        ...res.data.data,
      }));
      toast.success(res.data?.message);
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/resume/save`,
        {
          resumeData: resume,
        },
        { withCredentials: true },
      );

      setScore(res.data?.resume?.score);
      toast.success(res.data?.message);

      const userRes = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/updateCredits`,
        { credits: userData.credits },
        { withCredentials: true },
      );

      setUserData(userRes.data.user);
      // setResume({
      //   name: "",
      //   role: "",
      //   skills: [],
      //   experience: [],
      //   projects: [],
      //   summary: "",
      // });
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl space-y-4">
      <input
        name="name"
        placeholder="Name"
        value={resume.name}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"
      />

      <input
        name="role"
        placeholder="Role"
        value={resume.role}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"
      />

      <textarea
        name="summary"
        placeholder="Summary"
        value={resume.summary}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 rounded"
      />

      <input
        placeholder="Skills (comma separated)"
        onChange={(e) =>
          setResume((prev) => ({
            ...prev,
            skills: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          }))
        }
        className="w-full p-2 bg-gray-800 rounded"
      />
      <input
        placeholder="Experiences (comma separated)"
        onChange={(e) =>
          setResume((prev) => ({
            ...prev,
            experience: e.target.value
              .split(",")
              .map((exp) => exp.trim())
              .filter(Boolean),
          }))
        }
        className="w-full p-2 bg-gray-800 rounded"
      />

      <input
        placeholder="title:project name"
        onChange={(e) =>
          setResume((prev) => ({
            ...prev,
            projects: e.target.value
              .split(",")
              .map((p) => p.trim())
              .filter(Boolean),
          }))
        }
        className="w-full p-2 bg-gray-800 rounded"
      />

      {/* BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={handleAI}
          className={`${loading ? "bg-gray-200" : "bg-purple-600 "} px-4 py-2 rounded cursor-pointer`}
        >
          {loading ? "Enhancing" : "AI Improve"}
        </button>

        <button
          onClick={handleSave}
          className={`${loading ? "bg-gray-200" : "bg-green-600"} px-4 py-2 rounded cursor-pointer`}
        >
          {loading ? "Saving.." : "Save"}
        </button>
      </div>
    </div>
  );
}
