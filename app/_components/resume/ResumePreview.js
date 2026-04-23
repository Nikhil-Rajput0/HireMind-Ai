"use client";
import TemplateModern from "./TemplateModern";
import TemplateMinimal from "./TemplateMinimal";

export default function ResumePreview({ resume, template }) {
  return (
    <div
      id="resume"
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
      className="bg-white text-black p-6 rounded-xl min-h-150"
    >
      {template === "modern" && <TemplateModern resume={resume} />}
      {template === "minimal" && <TemplateMinimal resume={resume} />}
    </div>
  );
}
