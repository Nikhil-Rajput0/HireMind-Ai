"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCruzeiroSign } from "react-icons/fa6";
import { MdLaptopChromebook } from "react-icons/md";
import { RiAiGenerate2 } from "react-icons/ri";
import { BiSolidAnalyse } from "react-icons/bi";
import { GiClawString } from "react-icons/gi";
import { PiGogglesBold } from "react-icons/pi";
import { useContext, useEffect } from "react";
import userContext from "@/app/contexts/UserContext";

function SideBar() {
  const router = useRouter();
  const { userData } = useContext(userContext);
  const pathname = usePathname();

  const navItems = [
    {
      name: "HR Interview",
      href: "/homepage/interviewHr",
      icon: <PiGogglesBold />,
    },
    {
      name: "Technical",
      href: "/homepage/interviewTech",
      icon: <MdLaptopChromebook />,
    },
    {
      name: "Strict Mode",
      href: "/homepage/interviewStrict",
      icon: <GiClawString />,
    },
    {
      name: "Resume Generator",
      href: "/homepage/generateResume",
      icon: <RiAiGenerate2 />,
    },
    {
      name: "ATS Analyzer",
      href: "/homepage/analyseResume",
      icon: <BiSolidAnalyse />,
    },
  ];

  return (
    <div className="h-[90vh] w-65 bg-linear-to-b from-[#0f172a] to-[#020617] text-white flex flex-col justify-between p-4 border-r border-white/10 backdrop-blur-xl">
      <div>
        <div className="mb-6 mt-2">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg border border-white/10">
            <FaCruzeiroSign className="text-green-400" />
            <span className="text-sm">Credits:</span>
            <span className="font-bold text-green-400">
              {userData?.credits || 0}
            </span>
          </div>
        </div>

        <ul className="space-y-2">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;

            return (
              <li key={i}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  
                  ${
                    isActive
                      ? "bg-linear-to-r from-green-500/20 to-green-400/10 border border-green-400/30 shadow-lg"
                      : "hover:bg-white/5"
                  }
                  
                  hover:scale-[1.03] hover:shadow-xl`}
                >
                  <span
                    className={`text-lg transition-all duration-300 
                    ${
                      isActive
                        ? "text-green-400"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span
                    className={`text-sm font-medium transition-all duration-300 
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>

                  {isActive && (
                    <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-lg">
        <p className="text-xs text-gray-400">Plan</p>
        <p className="text-sm font-semibold text-green-400">
          {userData.role == "admin" ? "Admin" : "Free User"}
        </p>

        <button
          onClick={() => router.push("/homepage#price")}
          className="mt-3 w-full bg-linear-to-r from-green-500 to-emerald-400 text-black py-2 rounded-lg text-sm font-semibold hover:scale-105 transition cursor-pointer"
        >
          Upgrade 🚀
        </button>
      </div>
    </div>
  );
}

export default SideBar;
