"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaMagic } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";

export default function HeroHomepage() {
  return (
    <section className="relative pt-40 pb-10 min-h-screen flex items-center justify-center overflow-x-hidden px-6 lg:px-16">
      <div className="absolute inset-0 bg-linear-to-br from-[#020617] via-[#0f172a] to-black" />

      <div className="absolute -top-25 left-1/2 -translate-x-1/2 w-150 h-150 bg-green-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full bg-white/10 backdrop-blur border border-white/10 text-sm text-gray-300"
          >
            <FaMagic size={16} className="text-green-400" />
            AI-Powered Career Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            Crack Your Dream Job with{" "}
            <span className="bg-linear-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              AI Interviews
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-gray-400 text-lg max-w-xl mx-auto lg:mx-0"
          >
            Practice real interview questions, generate ATS-optimized resumes,
            and analyze your profile like top recruiters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/homepage/interviewTech"
              className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-green-500 to-emerald-400 text-black font-semibold hover:scale-105 transition"
            >
              Start Interview
              <IoArrowForward
                className="group-hover:translate-x-1 transition"
                size={18}
              />
            </Link>

            <Link
              href="/homepage/analyseResume"
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            >
              Analyze Resume
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap justify-center lg:justify-start gap-8 text-gray-400 text-sm"
          >
            <div>
              <p className="text-white font-bold text-xl">10K+</p>
              Users
            </div>
            <div>
              <p className="text-white font-bold text-xl">95%</p>
              Success Rate
            </div>
            <div>
              <p className="text-white font-bold text-xl">AI</p>
              Powered
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6">
            <div className="space-y-4">
              <div className="h-4 bg-white/20 rounded w-2/3" />
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-5/6" />

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="h-20 bg-green-500/20 rounded-xl" />
                <div className="h-20 bg-emerald-400/20 rounded-xl" />
              </div>

              <div className="h-10 bg-white/10 rounded mt-4" />
            </div>
          </div>

          <div className="absolute -inset-2 bg-linear-to-r from-green-500/20 to-emerald-400/20 blur-2xl rounded-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
