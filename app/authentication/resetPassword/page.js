import ResetPassword from "@/app/_components/Form/ResetPassword";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Page() {
  return (
    <section className="min-h-screen flex bg-[#020617] text-white">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-linear-to-br from-purple-900/20 to-blue-900/20">
        <Image src={logo} width={140} alt="logo" />

        <div>
          <h1 className="text-4xl font-semibold">Set a new password 🔒</h1>
          <p className="text-gray-400 mt-3">
            Make sure it&apos;s strong and secure.
          </p>
        </div>

        <p className="text-gray-500 text-sm">© 2026 HireMind AI</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-10">
        <div className="max-w-md mx-auto w-full">
          <Link href="/" className="text-gray-400 text-sm hover:text-white">
            ← Back
          </Link>

          <div
            className="
            mt-6 p-8 rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/10
            shadow-[0_0_40px_rgba(0,0,0,0.3)]
          "
          >
            <h2 className="text-2xl font-semibold mb-2">Reset Password</h2>

            <p className="text-sm text-gray-400 mb-6">
              Enter the OTP and your new password.
            </p>

            <ResetPassword />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
