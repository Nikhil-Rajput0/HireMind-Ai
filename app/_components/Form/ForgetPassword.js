"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/forgetPassword`,
        { email },
        { withCredentials: true },
      );
      toast.success(res.data.message);
      router.push("/authentication/resetPassword");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 pb-3">
        <label htmlFor="email" className=" text-gray-600">
          Your Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-200 text-black px-3 py-1 shadow-2xl/50 focus:outline-green-400 ring-1 ring-green-400 rounded-2xl"
        />
      </div>
      <div className="flex items-center gap-5">
        <h3 className="text-[16px] text-black">Know your password?</h3>
        <Link
          href={"/authentication/signIn"}
          className="text-[16px] underline text-green-600"
        >
          Sign In &rarr;
        </Link>
      </div>
      <div className="pt-5">
        <button
          disabled={loading}
          type="submit"
          className={` w-full text-center py-2 ${loading ? "bg-gray-300" : "bg-green-400"}  rounded-full ${loading ? "" : "hover:bg-green-500"}  font-medium ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading ? "Sending..." : <span>Send Otp&rarr;</span>}
        </button>
      </div>
    </form>
  );
}

export default ForgetPassword;
