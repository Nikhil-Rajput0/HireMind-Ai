"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function SignIn() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/login`,
        inputValue,
        { withCredentials: true },
      );

      toast.success(res.data.message);
      console.log(res.status);
      setTimeout(() => {
        document.cookie;
        window.location.href = "/homepage";
      }, 200);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Email</label>
        <input
          type="email"
          name="email"
          required
          value={inputValue.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="
            px-4 py-2 rounded-xl
            bg-white/5
            border border-white/10
            text-white
            focus:outline-none
            focus:border-blue-400
            focus:ring-2 focus:ring-blue-400/30
            transition
          "
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Password</label>
        <input
          type="password"
          name="password"
          required
          value={inputValue.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="
            px-4 py-2 rounded-xl
            bg-white/5
            border border-white/10
            text-white
            focus:outline-none
            focus:border-blue-400
            focus:ring-2 focus:ring-blue-400/30
            transition
          "
        />
      </div>

      <div className="flex justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-400">
          <input type="checkbox" />
          Remember me
        </label>

        <Link
          href="/authentication/forgetPassword"
          className="text-blue-400 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <button
        disabled={loading}
        className="
          mt-2 py-2 rounded-xl
          bg-linear-to-r from-blue-500 to-purple-500
          text-white font-medium
          shadow-lg
          hover:scale-[1.02]
          transition
          disabled:opacity-50 cursor-pointer
        "
      >
        {loading ? "Signing in..." : "Sign In →"}
      </button>

      <p className="text-sm text-center text-gray-400">
        Don’t have an account?{" "}
        <Link
          href="/authentication/signUp"
          className="text-blue-400 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default SignIn;
