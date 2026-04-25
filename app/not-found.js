"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaHeadphones } from "react-icons/fa";
import { Compass } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white overflow-hidden px-6">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-900/20 via-blue-900/10 to-transparent blur-3xl" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,white_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="text-center max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            text-[90px] sm:text-[130px]
            font-extrabold
            bg-linear-to-r from-green-400 via-cyan-400 to-blue-500
            text-transparent bg-clip-text
          "
        >
          404
        </motion.h1>

        <h2 className="text-2xl sm:text-3xl font-semibold mt-2">
          Page Not Found
        </h2>
        <p className="text-gray-400 mt-3">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>

        <div className="mt-10 flex justify-center">
          <Image
            src="/astronaut.png"
            alt="astronaut"
            loading="eager"
            width={240}
            height={240}
            className="opacity-90"
          />
        </div>

        <div
          className="
          mt-10 p-5 rounded-2xl
          bg-white/5 backdrop-blur-xl
          border border-white/10
          grid grid-cols-1 sm:grid-cols-3 gap-4
        "
        >
          <Link
            href="/"
            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/10 transition"
          >
            <FaHome className="text-green-400 text-2xl" />
            <span className="font-medium">Go Home</span>
            <p className="text-xs text-gray-400">Back to homepage</p>
          </Link>

          <Link
            href="/#features"
            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/10 transition"
          >
            <Compass className="text-blue-400 text-2xl" />
            <span className="font-medium">Explore</span>
            <p className="text-xs text-gray-400">Browse features</p>
          </Link>

          <Link
            href="/#support"
            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/10 transition"
          >
            <FaHeadphones className="text-purple-400 text-2xl" />
            <span className="font-medium">Need Help?</span>
            <p className="text-xs text-gray-400">Contact support</p>
          </Link>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          Let’s get you back on track ✨
        </p>
      </div>
    </section>
  );
}
