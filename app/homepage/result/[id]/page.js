"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import html2pdf from "html2pdf.js";
import Link from "next/link";

function Page() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/${id}`,
          { withCredentials: true },
        );
        setData(res.data.data);
      } catch (err) {
        toast.error("Failed to load result");
      }
    };
    fetchData();
  }, [id]);

  if (!data)
    return (
      <div className="text-black flex items-center justify-center">
        {" "}
        <div className="py-30 inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );

  // 🔥 score calc
  const totalQuestions = data.conversation.length || 1;
  const totalScore = data.conversation.reduce(
    (acc, curr) => acc + (curr.score || 0),
    0,
  );
  const percentage = Math.round((totalScore / totalQuestions) * 10);

  // 🔥 Radar data (fake if not present)
  const radarData = [
    { subject: "Technical", A: Math.min(percentage, 100) },
    { subject: "Communication", A: 70 },
    { subject: "Confidence", A: 65 },
    { subject: "Problem Solving", A: 75 },
  ];

  return (
    <section className="bg-black text-white min-h-screen p-6 pl-20">
      <div ref={pdfRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Interview Report
          </h1>
          <p className="text-gray-400 mt-2">
            {data.role} • {data.interviewType} • {data.difficulty}
          </p>
        </motion.div>

        {/* 🔥 TOP DASHBOARD */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* 🎯 Circular Score */}
          <div className="bg-white/5 p-6 rounded-3xl text-center border border-white/10">
            <h2 className="text-gray-400 mb-3">Overall Score</h2>

            <div className="relative w-40 h-40 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#333"
                  strokeWidth="10"
                  fill="none"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#22c55e"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="440"
                  strokeDashoffset={440 - (440 * percentage) / 100}
                  initial={{ strokeDashoffset: 440 }}
                  animate={{
                    strokeDashoffset: 440 - (440 * percentage) / 100,
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                {percentage}%
              </div>
              <p className="pt-8 text-gray-100">
                Percentage out of {data.conversation.length} Questions
              </p>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
            <h2 className="text-gray-400 mb-3 text-center">Skill Analysis</h2>

            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar dataKey="A" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🔥 INSIGHTS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-500/10 p-5 rounded-xl">
            <h3 className="text-green-400 font-bold mb-2">Strengths</h3>
            <p className="text-sm text-gray-300">
              Strong understanding of core concepts and clear explanations.
            </p>
          </div>

          <div className="bg-red-500/10 p-5 rounded-xl">
            <h3 className="text-red-400 font-bold mb-2">Weaknesses</h3>
            <p className="text-sm text-gray-300">
              Needs improvement in structured answers and depth.
            </p>
          </div>

          <div className="bg-purple-500/10 p-5 rounded-xl">
            <h3 className="text-purple-400 font-bold mb-2">Suggestions</h3>
            <p className="text-sm text-gray-300">
              Practice real-world scenarios and optimize explanations.
            </p>
          </div>
        </div>

        {/* 🔥 QUESTIONS */}
        <div className="space-y-6">
          {data.conversation.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 p-6 rounded-3xl border border-white/10"
            >
              <p className="text-green-400 font-semibold mb-2">
                Q{i + 1}: {item.question}
              </p>

              <p className="text-gray-300 mb-2">
                <span className="text-blue-400">Answer:</span> {item.answer}
              </p>

              <p className="text-sm text-yellow-400">
                Score: {item.score || 0}/10
              </p>

              {item.feedback && (
                <p className="text-sm text-gray-400 mt-2">💡 {item.feedback}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🔥 ACTIONS */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => toast.error("Sorry these logic is not working now.")}
          className="bg-blue-500 px-6 py-2 rounded-full cursor-pointer"
        >
          Download PDF
        </button>

        <Link
          href={"/homepage/interviewHr"}
          className="bg-green-500 px-6 py-2 rounded-full"
        >
          Dashboard
        </Link>
      </div>
    </section>
  );
}

export default Page;
