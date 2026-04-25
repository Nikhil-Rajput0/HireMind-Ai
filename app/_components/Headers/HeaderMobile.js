"use client";

import React, { useContext, useState, useEffect } from "react";
import { IoClose, IoMenu, IoHomeOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { FaCruzeiroSign } from "react-icons/fa6";
import userContext from "@/app/contexts/UserContext";
import { PiGogglesBold } from "react-icons/pi";
import Link from "next/link";
import {
  MdLaptopChromebook,
  MdOutlineLogout,
  MdSupportAgent,
} from "react-icons/md";
import { GiClawString } from "react-icons/gi";
import { RiAiGenerate2 } from "react-icons/ri";
import { BiSolidAnalyse } from "react-icons/bi";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { CiDollar } from "react-icons/ci";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function HeaderMobile() {
  const { userData } = useContext(userContext);
  const [active, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "auto";
  }, [active]);

  const goToSection = (hash) => {
    setActive(false);
    router.push(`/homepage${hash}`);
  };

  const loggedOut = async () => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/logout`,
        {},
        { withCredentials: true },
      );
      toast.success(res.data?.message);
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="lg:hidden">
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setActive(!active)}
        className="fixed top-5 right-8 z-[99999] text-white text-3xl bg-black/40 p-2 rounded-full backdrop-blur-md "
      >
        {active ? <IoClose /> : <IoMenu />}
      </motion.button>

      {/* 🔥 EDGE SWIPE TRIGGER */}
      {!active && (
        <div
          className="fixed top-0 right-0 h-full w-4 z-[998]"
          onTouchStart={() => setActive(true)}
        />
      )}

      <AnimatePresence>
        {active && (
          <>
            {/* 🔥 BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[999]"
            />

            {/* 🔥 SIDEBAR */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 300 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100) setActive(false);
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="fixed top-0 right-0 h-screen w-[80%] z-[5000]
                backdrop-blur-2xl bg-gray-800 backdrop-saturate-150
                border-l border-white/10
                shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                p-6 flex flex-col justify-between text-white"
            >
              <div>
                <div className="pb-5 pt-10">
                  <div className="flex items-center gap-2  bg-white/10 px-4 py-2 rounded-full border border-white/10">
                    <FaCruzeiroSign className="text-green-400" />
                    <span>{userData?.credits || 0}</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm">
                  {[
                    {
                      href: "/homepage/interviewHr",
                      icon: <PiGogglesBold />,
                      label: "HR Interview",
                    },
                    {
                      href: "/homepage/interviewTech",
                      icon: <MdLaptopChromebook />,
                      label: "Technical",
                    },
                    {
                      href: "/homepage/interviewStrict",
                      icon: <GiClawString />,
                      label: "Strict Mode",
                    },
                    {
                      href: "/homepage/generateResume",
                      icon: <RiAiGenerate2 />,
                      label: "Resume Generator",
                    },
                    {
                      href: "/homepage/analyseResume",
                      icon: <BiSolidAnalyse />,
                      label: "ATS Analyzer",
                    },
                  ].map((item, i) => (
                    <motion.li key={i} whileHover={{ scale: 1.05 }}>
                      <Link
                        href={item.href}
                        onClick={() => setActive(false)}
                        className="flex gap-2 items-center px-3 py-2 rounded-lg 
                        hover:bg-white/10 transition-all duration-200 
                        hover:translate-x-1"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <Link
                  href="/homepage"
                  onClick={() => setActive(false)}
                  className="flex gap-2 items-center hover:text-green-400"
                >
                  <IoHomeOutline /> Home
                </Link>

                <Link
                  href="/homepage/profile"
                  onClick={() => setActive(false)}
                  className="flex gap-2 items-center hover:text-green-400"
                >
                  {userData?.photo ? (
                    <Image
                      src={userData.photo}
                      width={24}
                      height={24}
                      alt="profile"
                      className="rounded-full"
                    />
                  ) : (
                    <CgProfile />
                  )}
                  Profile
                </Link>

                <button
                  onClick={() => goToSection("#price")}
                  className="flex gap-2 items-center hover:text-green-400"
                >
                  <CiDollar /> Buy Plan
                </button>

                <button
                  onClick={() => goToSection("#support")}
                  className="flex gap-2 items-center hover:text-green-400"
                >
                  <MdSupportAgent /> Contact
                </button>

                <div
                  onClick={loggedOut}
                  className="text-white flex items-center justify-center gap-3 font-semibold bg-red-700 px-3 py-2 rounded-md cursor-pointer hover:-translate-y-px hover:bg-red-600"
                >
                  <button className="cursor-pointer">Logout</button>
                  <MdOutlineLogout />
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => goToSection("#price")}
                  className="w-full mt-2 bg-linear-to-r from-green-500 to-emerald-400 text-black py-2 rounded-lg font-semibold"
                >
                  Upgrade 🚀
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeaderMobile;
