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

  const downloadPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;

    const element = document.getElementById("resume");

    html2pdf()
      .set({
        margin: 0,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        },
      })
      .from(element)
      .save();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resume Builder</h1>

        <div className="flex gap-3">
          <Link
            href={"/homepage"}
            className="px-3 py-1 bg-blue-600 rounded cursor-pointer"
          >
            Home
          </Link>
          <button
            onClick={() => setTemplate("modern")}
            className="px-3 py-1 bg-green-600 rounded cursor-pointer"
          >
            Modern
          </button>
          <button
            onClick={() => setTemplate("minimal")}
            className="px-3 py-1 bg-gray-700 rounded cursor-pointer"
          >
            Minimal
          </button>

          <button
            onClick={downloadPDF}
            className="bg-blue-600 px-4 py-1 rounded-full cursor-pointer"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-2 gap-6">
        <ResumeForm resume={resume} setResume={setResume} setScore={setScore} />

        <div>
          <ATSScore score={score} />
          <ResumePreview resume={resume} template={template} />
        </div>
      </div>
    </div>
  );
}
