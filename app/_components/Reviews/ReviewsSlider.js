"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Aman Sharma",
    role: "Software Engineer",
    text: "This platform completely changed how I prepared for interviews. The AI mock interviews are insanely helpful.",
  },
  {
    name: "Priya Verma",
    role: "Frontend Developer",
    text: "Resume analyzer gave me insights I never thought about. I got shortlisted in 3 companies!",
  },
  {
    name: "Rohit Kumar",
    role: "Student",
    text: "The speech recognition tool helped me practice confidently. Feels like real interview prep.",
  },
  {
    name: "Sneha Gupta",
    role: "Backend Developer",
    text: "Clean UI, powerful features. This feels like a premium SaaS product.",
  },
];

function ReviewsSlider() {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {[...reviews, ...reviews].map((review, i) => (
          <div
            key={i}
            className="
              min-w-70 md:min-w-95
              bg-white/70 backdrop-blur-xl
              border border-gray-200/60
              rounded-2xl
              p-6
              shadow-sm
              hover:shadow-xl hover:-translate-y-2
              transition-all duration-300 flex flex-col justify-between
            "
          >
            {/* text */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
              “{review.text}”
            </p>

            {/* user */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-linear-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold">
                {review.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {review.name}
                </p>
                <p className="text-xs text-gray-500">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default ReviewsSlider;
