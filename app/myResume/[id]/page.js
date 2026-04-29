"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

function Page() {
  const { id } = useParams();
  const [resume, setResume] = useState([]);

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

  const getMyResume = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/resume/myResume/${id}`,
      );
      setResume(res.data?.resume);
      toast.success("Fetching Resume Successful");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    getMyResume();
  }, []);

  return (
    <>
      <header className="w-full py-4 px-10">
        <nav className="flex items-center justify-between">
          <Image alt="Logo" src={logo} height={40} width={40} />
          <div className="flex gap-4">
            <Link
              href={"/homepage"}
              className="bg-blue-600 px-3 py-2 rounded cursor-pointer"
            >
              Home
            </Link>
            <button
              onClick={downloadPDF}
              className="bg-blue-600 px-4 py-1 rounded-full cursor-pointer"
            >
              Download Pdf
            </button>
          </div>
        </nav>
      </header>
      <div
        id="resume"
        className="max-w-4xl mx-auto bg-white text-black p-10"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {/* 🔥 HEADER */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold">{resume.name}</h1>
          <p className="text-gray-700">{resume.role}</p>
        </div>

        {/* 🔥 SUMMARY */}
        {resume.summary && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold border-b pb-1">Summary</h2>
            <p className="text-sm mt-2 leading-relaxed">{resume.summary}</p>
          </div>
        )}

        {/* 🔥 SKILLS */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1">Skills</h2>

          <div className="mt-2 text-sm">
            {Array.isArray(resume.skills) &&
            typeof resume.skills[0] === "string"
              ? resume.skills.join(", ")
              : Object.entries(resume.skills || {}).map(([key, val], i) => (
                  <p key={i}>
                    <span className="font-semibold capitalize">{key}: </span>
                    {val.join(", ")}
                  </p>
                ))}
          </div>
        </div>

        {/* 🔥 EXPERIENCE */}
        {resume.experience?.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold border-b pb-1">Experience</h2>

            {resume.experience.map((exp, i) => (
              <div key={i} className="mt-3">
                <p className="font-semibold">
                  {exp.title || exp.role} – {exp.company}
                </p>
                <p className="text-xs text-gray-600">{exp.duration}</p>

                <ul className="list-disc ml-5 text-sm mt-1">
                  {[
                    ...(exp.responsibilities || []),
                    ...(exp.achievements || []),
                  ].map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* 🔥 PROJECTS */}
        {resume.projects?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b pb-1">Projects</h2>

            {resume.projects.map((proj, i) => {
              const title =
                proj.title ||
                proj["Project Name"] ||
                proj["Name"] ||
                "Untitled";

              const description = proj.description || proj["Description"] || "";
              const tech = proj.techStack || proj["Technologies Used"] || [];

              return (
                <div key={i} className="mt-3">
                  <p className="font-semibold">{title}</p>

                  <ul className="list-disc ml-5 text-sm">
                    <li>{description}</li>
                  </ul>

                  {tech.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      Tech: {tech.join(", ")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
