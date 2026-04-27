"use client";

import Cookies from "js-cookie";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/logo.png";
import userContext from "@/app/contexts/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const { otp, setOtp } = useContext(userContext);

  useEffect(() => {
    const savedData = Cookies.get("inputValue");
    if (!savedData) {
      toast.error("Session expired");
      router.push("/authentication/signUp");
      return;
    }

    try {
      setUserData(JSON.parse(savedData));
    } catch {
      router.push("/authentication/signUp");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const verify = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/verifyOtp`,
        { email: userData.email, otp },
        { withCredentials: true },
      );

      const signup = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/signUp`,
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          passwordConfirm: userData.passwordConfirm,
          verifyToken: verify.data.verifyToken,
        },
        { withCredentials: true },
      );
      toast.success(signup.data.message);
      Cookies.remove("inputValue");
      router.push("/homepage");
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex bg-[#020617] text-white">
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <Image src={logo} width={140} alt="logo" />

        <div>
          <h1 className="text-4xl font-semibold">Verify your email 🔐</h1>
          <p className="text-gray-400 mt-3">
            We’ve sent a one-time password to your email.
          </p>
        </div>

        <p className="text-gray-500 text-sm">© 2026 HireMind AI</p>
      </div>

      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-10">
        <div className="max-w-md mx-auto w-full">
          <Link href="/" className="text-gray-400 text-sm hover:text-white">
            ← Back
          </Link>

          <div className="mt-6 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-2">Enter OTP</h2>

            <p className="text-sm text-gray-400 mb-6">
              Code sent to <span className="text-white">{userData.email}</span>
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="••••••"
                className="
                  text-center tracking-[10px]
                  text-xl font-semibold
                  px-4 py-3 rounded-xl
                  bg-white/5 border border-white/10
                  focus:outline-none
                  focus:border-blue-400
                  focus:ring-2 focus:ring-blue-400/30
                "
              />

              <button
                disabled={loading}
                className="
                  py-2 rounded-xl
                  bg-linear-to-r from-blue-500 to-purple-500
                  font-medium
                  hover:scale-[1.02]
                  transition
                  disabled:opacity-50 cursor-pointer
                "
              >
                {loading ? "Verifying..." : "Verify & Continue →"}
              </button>

              {/* <p className="text-sm text-center text-gray-400">
                Didn’t receive code?{" "}
                <button type="button" className="text-blue-400 hover:underline">
                  Resend
                </button>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
