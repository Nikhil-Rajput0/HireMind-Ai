"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaRegCreditCard } from "react-icons/fa";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import robotImage from "@/public/robotInterview.png";

export default function Hero() {
  return (
    <section className="px-16 py-10 pt-25 lg:pt-35 relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🔥 DARK GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-linear-to-br from-[#020617] via-[#0f172a] to-black" />

      {/* 🔥 GLOW ORB */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/20 blur-[120px] rounded-full" />

      {/* 🔥 CONTENT */}
      <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="text-center lg:text-left">
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full bg-white/10 border border-white/10 text-sm text-gray-300"
          >
            🚀 AI Powered Interview Platform
          </motion.div>

          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            Your Personal{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              AI Interviewer
            </span>
          </motion.h1>

          {/* SUBTEXT */}
          <p className="mt-6 text-gray-400 text-lg max-w-xl mx-auto lg:mx-0">
            Practice real interviews, improve your resume, and get hired faster
            with AI-powered feedback and ATS analysis.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/homepage"
              className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-black font-semibold hover:scale-105 transition"
            >
              Start Free
              <IoArrowForward className="group-hover:translate-x-1 transition" />
            </Link>

            <Link
              href="/homepage/analyseResume"
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            >
              Analyze Resume
            </Link>
          </div>

          {/* TRUST + PAYMENT */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FaRegCreditCard />
              No Credit Card Required
            </div>

            <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
              {[...Array(5)].map((_, i) => (
                <MdOutlineStarPurple500
                  key={i}
                  className="text-yellow-400 text-xs"
                />
              ))}
              <span className="text-xs ml-1">4.9 (10k+ users)</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex justify-center"
        >
          {/* GLASS CARD */}
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl w-full max-w-md">
            {/* IMAGE */}
            <Image
              src={robotImage}
              alt="AI Interview"
              className="w-full object-contain"
              priority
            />

            {/* FLOATING BADGE */}
            <div className="absolute top-4 left-4 bg-green-500/20 text-green-400 px-3 py-1 text-xs rounded-full">
              Live AI Interview
            </div>
          </div>

          {/* GLOW */}
          <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-emerald-400/20 blur-2xl rounded-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
