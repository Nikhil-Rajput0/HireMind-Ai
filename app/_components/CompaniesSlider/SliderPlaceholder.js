"use client";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa6";
import { FaYahoo } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";

function SliderPlaceholder() {
  return (
    <motion.div
      suppressHydrationWarning={true}
      animate={{ x: ["0%", "-100%"] }}
      transition={{ ease: "linear", repeat: Infinity, duration: 30 }}
      className="flex items-center font-bold text-xl min-w-max"
    >
      <h3 className="flex gap-1 items-center  pr-18">
        <FcGoogle />{" "}
        <span className="bg-clip-text text-transparent bg-linear-to-r from-orange-600 via-yellow-500 to-blue-500">
          Google
        </span>
      </h3>
      <h3 className="flex gap-1 items-center pr-18">
        <FaMicrosoft className="text-[#1af] text-4xl" /> Microsoft
      </h3>
      <h3 className="flex gap-1 items-center pr-18">
        <FaYahoo className="text-purple-500 text-4xl" /> Yahoo
      </h3>
      <h3 className="flex gap-1 items-center pr-18">
        <FaTwitter className="text-blue-400 text-4xl" /> Twitter
      </h3>
      <h3 className="flex gap-1 items-center pr-18">
        <FaFacebook className="text-blue-600 text-4xl" /> Facebook
      </h3>
    </motion.div>
  );
}

export default SliderPlaceholder;
