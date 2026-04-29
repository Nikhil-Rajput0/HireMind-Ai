import GeneratedResume from "@/app/_components/GeneratedResume/GeneratedResume";
import Link from "next/link";

export const metadata = {
  title: `Generate Resume`,
  description: "Generate your resume with HireMind Ai",
};

function Page() {
  return (
    <section className="lg:pl-15  text-black">
      <header className="flex bg-gray-900 justify-between items-center pt-8 pb-6 px-5">
        <h1 className="text-gray-200 font-medium">💼Generate Resume</h1>
        <Link
          href={"/resume"}
          className="w-auto px-3 py-2 rounded bg-green-500 text-white"
        >
          Create resume
        </Link>
      </header>
      <main>
        <GeneratedResume />
      </main>
    </section>
  );
}

export default Page;
