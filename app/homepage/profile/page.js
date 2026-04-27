"use client";

import { motion } from "framer-motion";
import UserProfile from "@/app/_components/ProfileHandler/UserProfile";
import UpdateUser from "@/app/_components/ProfileHandler/UpdateUser";
import UpdatePassword from "@/app/_components/ProfileHandler/UpdatePassword";
import { MdOutlineLogout } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const loggedOut = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/logout`,
        {},
        { withCredentials: true },
      );
      toast.success(res.data?.message);
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen bg-[#020617] text-white px-5 lg:px-32 py-18 sm:py-16 ">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-900/20 via-blue-900/10 to-transparent blur-3xl" />
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] items-start justify-end gap-10">
        <div className="hidden sm:flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className=" hidden sm:flex sm:flex-col
            rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/10
            p-6
            shadow-xl h-[50vh] justify-between
          "
          >
            <UserProfile />
          </motion.div>
          <div
            aria-disabled={loading}
            onClick={loggedOut}
            className={`${loading ? "text-black" : "text-white"} flex items-center justify-center gap-3 font-semibold ${loading ? "bg-gray-200" : "bg-red-700 "} px-3 py-2 rounded-md ${loading ? "cursor-not-allowed" : "cursor-pointer"} hover:-translate-y-px ${loading ? "hover:bg-gray-200" : "hover:bg-red-600"} `}
          >
            <button className="cursor-pointer">
              {loading ? "Submitting.." : "LogOut"}
            </button>
            <MdOutlineLogout />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div
            className="
            rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/10
            p-6
            shadow-xl
          "
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-200">
              Account Settings
            </h3>

            <UpdateUser />
          </div>

          <div
            className="
            rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/10
            p-6
            shadow-xl
          "
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-200">
              Change Password
            </h3>

            <UpdatePassword />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
