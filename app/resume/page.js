"use client";
import { useState } from "react";
import ResumeForm from "../_components/resume/ResumeForm";
import ResumePreview from "../_components/resume/ResumePreview";
import ATSScore from "../_components/resume/ATSScore";
import Link from "next/link";

export default function Page() {
  const [resume, setResume] = useState({
    name: "",
    role: "",
    summary: "",
    skills: [],
    experience: [],
    projects: [],
  });

  const [template, setTemplate] = useState("modern");
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 sm:px-6 lg:px-10 py-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Resume Builder</h1>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Link
            href={"/homepage"}
            className="px-3 py-1 bg-blue-600 rounded text-sm sm:text-base"
          >
            Home
          </Link>

          <button
            onClick={() => setTemplate("modern")}
            className="px-3 py-1 bg-green-600 rounded text-sm sm:text-base"
          >
            Modern
          </button>

          <button
            onClick={() => setTemplate("minimal")}
            className="px-3 py-1 bg-gray-700 rounded text-sm sm:text-base"
          >
            Minimal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
        {/* FORM */}
        <div className="bg-gray-900 p-4 sm:p-5 rounded-xl shadow-lg">
          <ResumeForm
            resume={resume}
            setResume={setResume}
            setScore={setScore}
          />
        </div>

        {/* PREVIEW */}
        <div className="space-y-4">
          <ATSScore score={score} />

          {/* Sticky preview on desktop */}
          <div className="bg-white text-black rounded-xl p-3 sm:p-4 shadow-xl lg:sticky lg:top-24 overflow-auto max-h-[80vh]">
            <ResumePreview resume={resume} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}
