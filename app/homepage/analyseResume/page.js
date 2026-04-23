import Link from "next/link";

export const metadata = {
  title: `HireMind Ai | Analyze Resume`,
  description: "Analyze your resume with HireMind Ai",
};

function Page() {
  return (
    <section className="pl-15 mb-70 text-black">
      <header className="flex bg-gray-900 justify-between items-center pt-8 pb-6 px-5">
        <h1 className="text-gray-200 font-medium">📈Analyse your Resume</h1>
        <Link
          href={"#"}
          className="w-auto px-3 py-2 rounded bg-green-500 text-white"
        >
          Analyse resume
        </Link>
      </header>
      <main></main>
    </section>
  );
}

export default Page;
