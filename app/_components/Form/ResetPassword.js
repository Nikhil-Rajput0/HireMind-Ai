"use client";
import axios from "axios";
import React, { useState } from "react";
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
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form
      suppressHydrationWarning={true}
      className="flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="otp" className="text-gray-300">
          OTP
        </label>
        <input
          id="otp"
          type="text"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="otp.."
          className="bg-gray-300 text-black px-3 py-1 shadow-xl focus:outline-green-400 rounded-2xl "
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-gray-300">
          New Password
        </label>
        <input
          id="password"
          type="text"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="***********"
          className="bg-gray-300 text-black px-3 py-1 shadow-xl focus:outline-green-400 rounded-2xl "
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="passwordConfirm" className="text-gray-300">
          Confirm password
        </label>
        <input
          id="passwordConfirm"
          type="text"
          name="passwordConfirm"
          value={userData.passwordConfirm}
          onChange={handleChange}
          placeholder="***********"
          className="bg-gray-300 px-3 text-black py-1 shadow-xl focus:outline-green-400 rounded-2xl "
        />
      </div>
      <div className="pt-5">
        <button
          disabled={loading}
          type="submit"
          className={` w-full text-center py-2 ${loading ? "bg-gray-300" : "bg-green-400"}  rounded-full ${loading ? "" : "hover:bg-green-500"}  font-medium ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading ? "Submitting..." : <span>Submit&rarr;</span>}
        </button>
      </div>
    </form>
  );
}

export default ResetPassword;
