export default function TemplateModern({ resume = {} }) {
  // 🔒 Helpers (bulletproof)
  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      // split comma/newline strings
      return val
        .split(/,|\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (typeof val === "object") {
      // flatten object values
      return Object.values(val).flatMap((v) => toArray(v));
    }
    return [String(val)];
  };

  const safeText = (val) => {
    if (val == null) return "";
    if (typeof val === "string") return val;
    if (Array.isArray(val)) return val.join(", ");
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
  };

  const renderList = (items) => {
    const arr = toArray(items);
    if (arr.length === 0) return null;
    return (
      <ul className="list-disc ml-5 text-sm mt-1">
        {arr.map((item, idx) => (
          <li key={idx}>{safeText(item)}</li>
        ))}
      </ul>
    );
  };

  // 🔥 Normalize top-level fields
  const skillsArray = toArray(resume.skills);

  return (
    <div>
      {/* 🔥 HEADER */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold">{safeText(resume.name)}</h1>
        <p className="text-gray-700">{safeText(resume.role)}</p>
      </div>

      {/* 🔥 SUMMARY */}
      {resume.summary && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1">Summary</h2>
          <p className="text-sm mt-2 leading-relaxed">
            {safeText(resume.summary)}
          </p>
        </div>
      )}

      {/* 🔥 SKILLS */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold border-b pb-1">Skills</h2>

        <div className="mt-2 text-sm">
          {skillsArray.length > 0 ? (
            <p>{skillsArray.join(", ")}</p>
          ) : (
            <p>No skills added</p>
          )}
        </div>
      </div>

      {/* 🔥 EXPERIENCE */}
      {Array.isArray(resume.experience) && resume.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b pb-1">Experience</h2>

          {resume.experience.map((exp, i) => (
            <div key={i} className="mt-3">
              <p className="font-semibold">
                {safeText(exp.title || exp.role)} – {safeText(exp.company)}
              </p>
              <p className="text-xs text-gray-600">{safeText(exp.duration)}</p>

              {renderList([
                ...(toArray(exp.responsibilities) || []),
                ...(toArray(exp.achievements) || []),
              ])}
            </div>
          ))}
        </div>
      )}

      {/* 🔥 PROJECTS */}
      {Array.isArray(resume.projects) && resume.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold border-b pb-1">Projects</h2>

          {resume.projects.map((proj, i) => {
            const title =
              proj?.title ||
              proj?.["Project Name"] ||
              proj?.["Name"] ||
              "Untitled";

            const description =
              proj?.description || proj?.["Description"] || "";

            const tech = proj?.techStack || proj?.["Technologies Used"] || [];

            return (
              <div key={i} className="mt-3">
                <p className="font-semibold">{safeText(title)}</p>

                {renderList(description)}

                {toArray(tech).length > 0 && (
                  <p className="text-xs text-gray-600 mt-1">
                    Tech: {toArray(tech).join(", ")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
