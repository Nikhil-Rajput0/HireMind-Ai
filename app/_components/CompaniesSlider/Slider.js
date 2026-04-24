"use client";

import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft, FaFacebook, FaTwitter, FaAmazon } from "react-icons/fa";
import { SiNetflix } from "react-icons/si";

const companies = [
  { name: "Google", icon: <FcGoogle /> },
  { name: "Microsoft", icon: <FaMicrosoft className="text-blue-500" /> },
  { name: "Amazon", icon: <FaAmazon className="text-orange-500" /> },
  { name: "Netflix", icon: <SiNetflix className="text-red-500" /> },
  { name: "Twitter", icon: <FaTwitter className="text-sky-500" /> },
  { name: "Facebook", icon: <FaFacebook className="text-blue-600" /> },
];

export default function Slider() {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-8 md:gap-12"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 35,
          ease: "linear",
        }}
      >
        {[...companies, ...companies].map((c, i) => (
          <div
            key={i}
            className="
              flex items-center gap-3 px-6 py-3
              bg-white/60 backdrop-blur-lg
              border border-gray-200/50
              rounded-xl shadow-sm
              hover:shadow-md hover:-translate-y-1
              transition-all duration-300
              min-w-max
            "
          >
            <span className="text-2xl">{c.icon}</span>
            <span className="text-gray-800 font-medium text-sm md:text-base">
              {c.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
