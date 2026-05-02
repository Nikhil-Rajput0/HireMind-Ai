"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCruzeiroSign } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import userContext from "@/app/contexts/UserContext";
import UpgradeButton from "../UpgradeButton/UpgradeButton";
import navItems from "../NavItems/NavItems";

function SideBar() {
  const router = useRouter();
  const { userData } = useContext(userContext);
  const pathname = usePathname();

  return (
    <div className="h-[90vh] w-65 bg-linear-to-b from-[#0f172a] to-[#020617] text-white flex flex-col justify-between p-4 border-r border-white/10 backdrop-blur-xl">
      <div>
        <div className="mb-6 mt-2">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg border border-white/10">
            <FaCruzeiroSign className="text-green-400" />
            <span className="text-sm">Credits:</span>
            <span className="font-bold text-green-400">
              {Boolean(userData?.subscription?.isActive)
                ? userData?.subscription?.planName
                : userData?.isLifetime
                  ? "Lifetime"
                  : userData?.credits || 0}
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

      <UpgradeButton />
    </div>
  );
}

export default SideBar;
