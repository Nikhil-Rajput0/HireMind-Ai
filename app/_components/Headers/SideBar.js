"use client";
import Link from "next/link";
import { FaCruzeiroSign } from "react-icons/fa6";
import { MdLaptopChromebook } from "react-icons/md";
import { RiAiGenerate2 } from "react-icons/ri";
import { BiSolidAnalyse } from "react-icons/bi";
import { GiClawString } from "react-icons/gi";
import { PiGogglesBold } from "react-icons/pi";
import { useContext, useEffect } from "react";
import userContext from "@/app/contexts/UserContext";
import toast from "react-hot-toast";

function SideBar() {
  const { userData } = useContext(userContext);

  return (
    <div className="flex flex-col justify-between h-[90%] text-black">
      <div className="flex flex-col gap-6 z-120">
        <div className="px-3 ">
          <div className="inline-flex gap-1 items-center text-lg bg-[#90EE90] text-black rounded-full px-3 py-2">
            <FaCruzeiroSign />:<p>{userData?.credits}</p>
          </div>
        </div>
        <ul className="flex flex-col text-[15px] gap-1 text-black font-medium">
          <li>
            <Link
              href={"/homepage/interviewHr"}
              className="ring-1 ring-gray-200  gap-1 px-2 flex items-center py-2 shadow-sm cursor-pointer hover:-translate-y-px hover:bg-gray-200"
            >
              <PiGogglesBold /> Hr Interview
            </Link>
          </li>
          <li>
            <Link
              href={"/homepage/interviewTech"}
              className="ring-1 ring-gray-200 gap-1 px-2 flex items-center py-2 shadow-sm cursor-pointer hover:-translate-y-px hover:bg-gray-200"
            >
              <MdLaptopChromebook /> Technical Interview
            </Link>
          </li>
          <li>
            <Link
              href={"/homepage/interviewStrict"}
              className="ring-1 ring-gray-200 gap-1 px-2 py-2 flex items-center shadow-sm cursor-pointer hover:-translate-y-px hover:bg-gray-200"
            >
              <GiClawString /> Strict Interview
            </Link>
          </li>
          <li>
            <Link
              href={"/homepage/generateResume"}
              className="ring-1 ring-gray-200 gap-1 px-2 py-2 flex items-center shadow-sm cursor-pointer hover:-translate-y-px hover:bg-gray-200"
            >
              <RiAiGenerate2 /> Resume Generator
            </Link>
          </li>
          <li>
            <Link
              href={"/homepage/analyseResume"}
              className="ring-1  ring-gray-200 gap-1 px-2 py-2 flex items-center shadow-sm cursor-pointer hover:-translate-y-px hover:bg-gray-200"
            >
              <BiSolidAnalyse /> Resume Analyzer
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-2 text-gray-700 font-medium px-3 pt-30">
        <p>Free</p>
        <span>User</span>
      </div>
    </div>
  );
}

export default SideBar;
