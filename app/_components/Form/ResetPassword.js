"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ResetPassword() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/resetPassword/${otp}`,
        {
          password: userData.password,
          passwordConfirm: userData.passwordConfirm,
        },
        { withCredentials: true },
      );

      toast.success(res.data.message);
      router.push("/authentication/signIn");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* OTP */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">OTP</label>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="••••••"
          className="
            text-center tracking-[8px]
            px-4 py-2 rounded-xl
            bg-white/5 border border-white/10
            focus:outline-none
            focus:border-blue-400
            focus:ring-2 focus:ring-blue-400/30
          "
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">New Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
          className="input-style"
        />
      </div>

      {/* Confirm */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Confirm Password</label>
        <input
          type="password"
          name="passwordConfirm"
          value={userData.passwordConfirm}
          onChange={handleChange}
          required
          placeholder="••••••••"
          className="input-style"
        />
      </div>

      {/* Button */}
      <button
        disabled={loading}
        className="
          mt-2 py-2 rounded-xl
          bg-linear-to-r from-purple-500 to-blue-500
          font-medium
          hover:scale-[1.02]
          transition
          disabled:opacity-50 cursor-pointer
        "
      >
        {loading ? "Updating..." : "Reset Password →"}
      </button>
    </form>
  );
}

export default ResetPassword;
