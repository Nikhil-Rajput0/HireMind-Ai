"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaRedo } from "react-icons/fa";

export default function Error({ error, reset }) {
  const [particles, setParticles] = useState([]);

  // ✅ Log error safely
  useEffect(() => {
    console.error(error);
  }, [error]);

  // ✅ Generate particles ONLY on client (fixes hydration issue)
  useEffect(() => {
    const generated = Array.from({ length: 25 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 8 + Math.random() * 10,
    }));

    setParticles(generated);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#020617] text-white overflow-hidden px-6">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-red-900/20 via-purple-900/10 to-transparent blur-3xl" />

      <div className="absolute inset-0 -z-10">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: `${p.x}%`,
              y: `${p.y}%`,
            }}
            animate={{ y: ["0%", "100%"] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl mb-4"
        >
          ⚠️
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            text-3xl sm:text-4xl font-bold
            bg-linear-to-r from-red-400 to-purple-500
            text-transparent bg-clip-text
          "
        >
          Something went wrong
        </motion.h1>

        <p className="text-gray-400 mt-3">
          An unexpected error occurred. Please try again.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="
            mt-8 p-6 rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/10
          "
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={reset}
              className="
                flex items-center justify-center gap-2
                w-full py-3 rounded-xl
                bg-linear-to-r from-red-500 to-purple-500
                hover:scale-[1.05]
                hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]
                transition
              "
            >
              <FaRedo />
              Try Again
            </button>

            <Link
              href="/"
              className="
                flex items-center justify-center gap-2
                w-full py-3 rounded-xl
                border border-white/20
                hover:bg-white/10
                transition
              "
            >
              <FaHome />
              Go Home
            </Link>
          </div>
        </motion.div>

        {process.env.NODE_ENV === "development" && (
          <pre className="mt-6 text-xs text-red-400 whitespace-pre-wrap">
            {error?.message}
          </pre>
        )}

        <p className="mt-6 text-gray-500 text-sm">Error Code: INTERNAL_ERROR</p>
      </div>
    </section>
  );
}
