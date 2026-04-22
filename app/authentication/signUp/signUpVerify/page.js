"use client";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/logo.png";
import userContext from "@/app/contexts/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FooterBar from "@/app/_components/Footer/FooterBar";

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const { otp, setOtp } = useContext(userContext);

  useEffect(() => {
    const savedData = Cookies.get("inputValue");
    if (savedData) {
      try {
        const parseData = JSON.parse(savedData);
        setUserData(parseData);
      } catch (error) {
        toast.error("Failed to parse cookie");
        router.push("/authentication/signUp");
      }
    } else {
      toast.error("No cookie found.");
      router.push("/authentication/signUp");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const verifyResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/verifyOtp`,
        { email: userData.email, otp: otp },
        { withCredentials: true },
      );

      const signupResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/signUp`,
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          passwordConfirm: userData.passwordConfirm,
          verifyToken: verifyResponse.data.verifyToken,
        },

        { withCredentials: true },
      );
      toast.success(signupResponse?.data.message);
      window.location.href = "/homepage";
      Cookies.remove("inputValue");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-black">
      <div className="bg-[#d5d2d2] pb-20 lg:px-40 w-full px-5">
        <header className=" py-10 flex items-center justify-between sm:w-[60vw] sm:mx-auto sm:px-0">
          <div>
            <Image alt="Logo" src={logo} height={120} width={120} />
          </div>
          <Link
            href={"/"}
            className="px-5 py-3 ring-1 bg-green-500 text-white ring-green-400 hover:ring-green-300 cursor-pointer shadow-2xl rounded-full"
          >
            &larr;Back to home
          </Link>
        </header>
        <main className="flex flex-col gap-1 w-full sm:w-100 ring-1 mx-auto bg-white ring-green-300 shadow-2xl px-5 sm:px-10 py-5 backdrop-blur-3xl">
          <h3 className="text-xl font bold text-green-500 text-center">
            Hello {userData.email}
          </h3>
          <h3 className="text-xl pb-3 font bold text-red-500 text-center">
            Your otp👇
          </h3>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="otp..."
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-gray-200 text-black px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-2xl ring-1 ring-green-400 w-full"
            />
            <button
              disabled={loading}
              type="submit"
              className={`w-full text-center py-2 ${loading ? "bg-gray-300" : "bg-green-400"}  rounded-full ${loading ? "" : "hover:bg-green-500"}  font-medium ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {loading ? "Submitting..." : <span>Submit&rarr;</span>}
            </button>
          </form>
        </main>
      </div>
      <footer>
        <FooterBar />
      </footer>
    </section>
  );
}

export default Page;
