"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useState } from "react";
import axios from "axios";
import userContext from "@/app/contexts/UserContext";
import toast from "react-hot-toast";

function SignUp() {
  const { inputValue, setInputValue } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    if (inputValue.password !== inputValue.passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/sendOtp`,
        { email: inputValue.email },
        { withCredentials: true },
      );

      toast.success(res.data.message);

      Cookies.set("inputValue", JSON.stringify(inputValue), {
        expires: 1 / 144,
        sameSite: "lax",
      });

      router.push("/authentication/signUp/signUpVerify");
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
        <label className="text-sm text-gray-400">Full Name</label>
        <input
          type="text"
          name="name"
          required
          value={inputValue.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="input-style"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Email</label>
        <input
          type="email"
          name="email"
          required
          value={inputValue.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="input-style"
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
          className="input-style"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Confirm Password</label>
        <input
          type="password"
          name="passwordConfirm"
          required
          value={inputValue.passwordConfirm}
          onChange={handleChange}
          placeholder="••••••••"
          className="input-style"
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-gray-400">
        <input type="checkbox" required className="mt-1" />I agree to the terms
        and conditions
      </label>

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
        {loading ? "Creating..." : "Create Account →"}
      </button>

      <p className="text-sm text-center text-gray-400">
        Already have an account?{" "}
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

export default SignUp;
