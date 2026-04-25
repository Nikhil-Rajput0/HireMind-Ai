"use client";

import Link from "next/link";
import { useState } from "react";
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="input-style"
        />
      </div>

      {/* Button */}
      <button
        disabled={loading}
        className="
          mt-2 py-2 rounded-xl
          bg-linear-to-r from-purple-500 to-blue-500
          text-white font-medium
          shadow-lg
          hover:scale-[1.02]
          transition
          disabled:opacity-50 cursor-pointer
        "
      >
        {loading ? "Sending..." : "Send Reset Link →"}
      </button>

      <p className="text-sm text-center text-gray-400">
        Remember your password?{" "}
        <Link
          href="/authentication/signIn"
          className="text-blue-400 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default ForgetPassword;
