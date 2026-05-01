export default function TemplateMinimal({ resume }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{resume.name}</h1>
      <p className="text-gray-600">{resume.role}</p>

      <h2 className="mt-4 font-bold">Summary</h2>
      <p>{resume.summary}</p>

      <h2 className="mt-4 font-bold">Skills</h2>

      <ul className="flex flex-wrap gap-2">
        {Array.isArray(resume.skills) && typeof resume.skills[0] === "string"
          ? resume.skills.map((skill, i) => (
              <li key={i} className="bg-gray-400 px-2 py-1 rounded">
                {skill}
              </li>
            ))
          : null}

        {/* CASE 2: Array of objects [{category, skills}] */}
        {Array.isArray(resume.skills) && typeof resume.skills[0] === "object"
          ? resume.skills.map((group, i) => (
              <div key={i} className="w-full">
                <p className="font-semibold">{group.category}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {group.skills?.map((s, idx) => (
                    <span key={idx} className="bg-gray-400 px-2 py-1 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))
          : null}

        {/* CASE 3: Object { language: [], frameworks: [] } */}
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

      <h2 className="mt-4 font-bold">Experience</h2>
      {resume.experience?.length > 0 && (
        <div>
          {resume.experience.map((exp, i) => (
            <div key={i} className="mt-2">
              <p className="font-semibold">{exp.title || exp.role}</p>

              <p className="text-sm text-gray-600">
                {exp.company} • {exp.duration}
              </p>

              {/* Responsibilities */}
              {exp.responsibilities && (
                <ul className="list-disc ml-5 text-sm">
                  {exp.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              )}

              {/* Achievements */}
              {exp.achievements && (
                <ul className="list-disc ml-5 text-sm mt-1">
                  {exp.achievements.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-4 font-bold">Projects</h2>
      {resume.projects.map((proj, i) => {
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
            <p className="font-semibold">{title}</p>
            <p>{description}</p>
          </div>
        );
      })}
    </div>
  );
}
