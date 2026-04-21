"use client";
import React, { useContext, useState } from "react";
import { IoClose, IoHomeOutline, IoMenu } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaCruzeiroSign } from "react-icons/fa6";
import userContext from "@/app/contexts/UserContext";
import { PiGogglesBold } from "react-icons/pi";
import Link from "next/link";
import { MdLaptopChromebook, MdSupportAgent } from "react-icons/md";
import { GiClawString } from "react-icons/gi";
import { RiAiGenerate2 } from "react-icons/ri";
import { BiSolidAnalyse } from "react-icons/bi";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { CiDollar } from "react-icons/ci";

function HeaderMobile() {
  const { userData } = useContext(userContext);
  const [active, setActive] = useState(false);
  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        suppressHydrationWarning={true}
        style={{
          position: "fixed",
          top: "20px",
          zIndex: 999999,
          padding: "10px",
          touchAction: "manipulation",
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setActive(!active);
        }}
        className="text-[30px] cursor-pointer touch-manipulation right-5 md:right-10"
      >
        {active ? <IoClose /> : <IoMenu />}
      </button>

      {active && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ ease: "linear", duration: 0.4 }}
          className="lg:hidden absolute top-12 bg-green-400 -right-10 w-[70vw] flex flex-col items-start  h-[90vh]"
        >
          <div className="flex flex-col gap-6 z-120 pt-5 pl-8 mb-2">
            <div className="px-3 ">
              <div className="inline-flex gap-1 items-center text-lg bg-[#90EE90] text-black rounded-full px-3 py-2">
                <FaCruzeiroSign />:<p>{userData?.credits || 100}</p>
              </div>
            </div>
            <ul className="flex flex-col text-[17px] gap-1 text-black font-medium">
              <li>
                <Link
                  onClick={() => setActive(false)}
                  href={"/homepage/interviewHr"}
                  className="gap-1 px-2 flex items-center py-2 cursor-pointer"
                >
                  <PiGogglesBold /> Hr Interview
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setActive(false)}
                  href={"/homepage/interviewTech"}
                  className="gap-1 px-2 flex items-center py-2 cursor-pointer"
                >
                  <MdLaptopChromebook /> Technical Interview
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setActive(false)}
                  href={"/homepage/interviewStrict"}
                  className="gap-1 px-2 flex items-center py-2 cursor-pointer"
                >
                  <GiClawString /> Strict Interview
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setActive(false)}
                  href={"/homepage/generateResume"}
                  className="gap-1 px-2 flex items-center py-2 cursor-pointer"
                >
                  <RiAiGenerate2 /> Resume Generator
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setActive(false)}
                  href={"/homepage/analyseResume"}
                  className="gap-1 px-2 flex items-center py-2 cursor-pointer"
                >
                  <BiSolidAnalyse /> Resume Analyzer
                </Link>
              </li>
            </ul>
          </div>
          <div className="border-t w-full border-white">
            <ul className="flex flex-col gap-6 pl-10 pt-6 text-xl font-medium">
              <li>
                <Link
                  onClick={() => setActive(false)}
                  href={"/homepage"}
                  className="flex gap-1 items-center"
                >
                  <IoHomeOutline />
                  Home
                </Link>
              </li>
              <li className="flex gap-1 items-center">
                <Link
                  onClick={() => setActive(false)}
                  href={"/homepage/profile"}
                  className="flex gap-1 items-center"
                >
                  {userData?.photo ? (
                    <Image
                      quality={75}
                      loading="eager"
                      src={userData?.photo}
                      height={24}
                      width={24}
                      alt="User Profile"
                      className="rounded-full"
                    />
                  ) : (
                    <CgProfile />
                  )}
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setActive(false)}
                  href={"/homepage#price"}
                  className="flex gap-1 items-center"
                >
                  <CiDollar /> Buy Plan
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setActive(false)}
                  href={"/homepage#support"}
                  className="flex gap-1 items-center"
                >
                  <MdSupportAgent />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default HeaderMobile;
