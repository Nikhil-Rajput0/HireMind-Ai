"use client";
import Image from "next/image";
import React, { useState } from "react";
import profile from "@/public/profile.png";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

function UpdatePassword() {
  const [userData, setUserData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/v1/users/updatePassword",
        {
          passwordCurrent: userData.passwordCurrent,
          password: userData.password,
          passwordConfirm: userData.passwordConfirm,
        },
        { withCredentials: true },
      );
      toast.success(res.data.message);
      setUserData({ passwordCurrent: "", password: "", passwordConfirm: "" });
    } catch (error) {
      console.log(error);
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
      className="px-8 pb-7 pt-3 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="passwordCurrent" className="text-gray-300">
          Current password
        </label>
        <input
          id="passwordCurrent"
          type="text"
          name="passwordCurrent"
          value={userData.passwordCurrent}
          onChange={handleChange}
          placeholder="***********"
          className="bg-gray-300 px-3 py-1 w-[25vw] shadow-xl focus:outline-green-400 rounded-2xl "
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
          className="bg-gray-300 px-3 py-1 w-[25vw] shadow-xl focus:outline-green-400 rounded-2xl "
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
          className="bg-gray-300 px-3 py-1 w-[25vw] shadow-xl focus:outline-green-400 rounded-2xl "
        />
      </div>

      <div className="flex items-end justify-end pt-3">
        <button
          disabled={loading}
          type="submit"
          className={`w-[25vw] text-center py-2 ${loading ? "bg-gray-300" : "bg-green-400"}  rounded-full ${loading ? "" : "hover:bg-green-500"}  font-medium ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading ? "Submitting..." : <span>Save Changes&rarr;</span>}
        </button>
      </div>
    </form>
  );
}

export default UpdatePassword;
