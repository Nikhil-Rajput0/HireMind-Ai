import ATSAnalyzer from "@/app/_components/GeneratedResume/ATSAnalyzer";
import Link from "next/link";

export const metadata = {
  title: `HireMind Ai | Analyze Resume`,
  description: "Analyze your resume with HireMind Ai",
};

function Page() {
  return (
    <section className="lg:pl-15 pb-2 text-black">
      <header className="flex bg-gray-900 justify-between items-center pt-8 pb-8 px-5">
        <h1 className="text-gray-200 font-medium">📈Analyse your Resume</h1>
      </header>
      <main>
        <ATSAnalyzer />
      </main>
    </section>
  );
}

export default Page;
