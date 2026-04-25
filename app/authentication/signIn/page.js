import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import SignIn from "@/app/_components/Form/SignIn";

export const metadata = {
  title: `Sign In`,
  description: "Sign in on Hiremind Ai platform to continue.",
};

function Page() {
  return (
    <section className="min-h-screen flex bg-[#020617] text-white">
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div>
          <Image alt="Logo" src={logo} width={140} />
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-semibold leading-tight">
            Crack Interviews with AI 🚀
          </h1>
          <p className="text-gray-400 mt-4">
            Practice interviews, improve your resume, and land your dream job
            faster with AI-powered tools.
          </p>
        </div>

        <p className="text-sm text-gray-500">© 2026 HireMind AI</p>
      </div>

      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-10">
        <div className="max-w-md w-full mx-auto">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            ← Back to home
          </Link>

          <div
            className="
            mt-6 p-8 rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/10
            shadow-[0_0_40px_rgba(0,0,0,0.3)]
          "
          >
            <h2 className="text-2xl font-semibold mb-6">Welcome back 👋</h2>

            <SignIn />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
