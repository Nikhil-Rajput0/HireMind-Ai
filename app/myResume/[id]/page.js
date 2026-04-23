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
          <Image alt="Logo" src={logo} height={40} />
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
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
        className=" p-6 rounded-xl min-h-full"
      >
        <h1 className="text-2xl font-bold pt-2 pb-2">{resume.name}</h1>
        <div className="flex gap-2 pb-2">
          <h2 className="font-medium">Role:</h2>
          <p className="text-gray-600">{resume.role}</p>
        </div>
        <p className="pb-2">{resume.summary}</p>

        <h2 className="pt-2 pb-2 font-bold">Skills</h2>

        <ul className="flex flex-wrap gap-2">
          {/* CASE 1: Simple array ["React", "Node"] */}
          {Array.isArray(resume.skills) && typeof resume.skills[0] === "string"
            ? resume?.skills?.map((skill, i) => (
                <li key={i} className="bg-gray-400 px-2 py-1 rounded">
                  {skill}
                </li>
              ))
            : null}

          {/* CASE 2: Array of objects [{category, skills}] */}
          {Array.isArray(resume.skills) && typeof resume.skills[0] === "object"
            ? resume?.skills?.map((group, i) => (
                <div key={i} className="w-full">
                  <p className="font-semibold">{group.category}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {group?.skills?.map((s, idx) => (
                      <span key={idx} className="bg-gray-400 px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            : null}

          {!Array.isArray(resume.skills) &&
            typeof resume.skills === "object" &&
            Object.entries(resume.skills).map(([key, val], i) => (
              <div key={i} className="w-full">
                <p className="font-semibold capitalize">{key}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {val?.map((s, idx) => (
                    <span key={idx} className="bg-gray-400 px-2 py-1 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </ul>

        <h2 className="pt-4 pb-2 font-bold">Experience</h2>
        {resume.experience?.length > 0 && (
          <div>
            {resume?.experience?.map((exp, i) => (
              <div key={i} className="pb-2">
                <p className="font-normal">{exp.title || exp.role}</p>

                <p className="text-sm text-gray-600">
                  {exp.company} • {exp.duration}
                </p>

                {exp.responsibilities && (
                  <ul className="pl-5 text-sm">
                    {exp.responsibilities.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                )}

                {/* Achievements */}
                {exp.achievements && (
                  <ul className=" pl-5 text-sm pt-1">
                    {exp.achievements.map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <h2 className="pt-4 pb-2 font-bold">Projects</h2>
        {resume?.projects?.map((proj, i) => {
          if (typeof proj === "string") {
            return <p key={i}>{proj}</p>;
          }

          const title =
            proj.title ||
            proj["Project Name"] ||
            proj["Name"] ||
            "Untitled Project";

          const description = proj.description || proj["Description"] || "";

          const tech = proj.techStack || proj["Technologies Used"] || [];

          return (
            <div key={i}>
              <p className="text-[15px] pb-2">Name: {title}</p>
              <p className="text-[15px]">
                Description: <span className="text-sm">{description}</span>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Page;
