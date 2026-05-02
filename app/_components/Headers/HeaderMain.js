"use client";

import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiDollar } from "react-icons/ci";
import { MdSupportAgent } from "react-icons/md";
import { useContext } from "react";
import userContext from "@/app/contexts/UserContext";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function HeaderMain() {
  const router = useRouter();
  const { userData } = useContext(userContext);
  const pathname = usePathname();

  const navItems = [
    {
      href: "/homepage",
      icon: <IoHomeOutline />,
      label: "Home",
    },
    {
      href: "/homepage/profile",
      icon: userData?.photo ? (
        <Image
          src={userData.photo}
          width={24}
          height={24}
          alt="profile"
          className="rounded-full"
        />
      ) : (
        <CgProfile />
      ),
      label: "Profile",
    },
    {
      href: "/homepage#price",
      icon: <CiDollar />,
      label: "Buy Plan",
    },
    {
      href: "/homepage#support",
      icon: <MdSupportAgent />,
      label: "Contact",
    },
  ];

  return (
    <div className="hidden lg:flex items-center gap-8 text-white text-sm font-medium">
      {navItems.map((item, i) => {
        const isActive = pathname === item.href;

        return (
          <motion.div key={i} whileHover={{ scale: 1.08 }}>
            <Link
              href={item.href}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300
              ${
                isActive ? "text-green-400" : "text-gray-300 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}

              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute left-0 bottom-0 h-0.5 w-full bg-green-400 rounded-full"
                />
              )}
            </Link>
          </motion.div>
        );
      })}

      <motion.button
        onClick={() => {
          if (userData?.subscription?.isActive || userData?.isLifetime) {
            toast.success("You are already subscribed 😇");
            return;
          }
          router.push("/homepage#price");
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="ml-4 bg-linear-to-r from-green-500 to-emerald-400 
        text-black px-4 py-2 rounded-full font-semibold 
        shadow-lg hover:shadow-green-500/40 transition-all cursor-pointer"
      >
        {userData?.subscription?.isActive || userData?.isLifetime
          ? "Subscribed"
          : "Upgrade 🚀"}
      </motion.button>
    </div>
  );
}

export default HeaderMain;
