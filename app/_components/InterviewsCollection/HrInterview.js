"use client";
import userContext from "@/app/contexts/UserContext";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { IoTrashBin } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

function HrInterview() {
  const { interview, setInterview } = useContext(userContext);
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    setLoadingId(id);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/${id}`,
        { withCredentials: true },
      );

      setInterview((prev) => prev.filter((i) => i._id !== id));
      toast.success("Interview deleted");
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoadingId(null);
    }
  };

  if (!interview || interview.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center text-gray-400">
        <h2 className="text-2xl mb-2">No Interviews Yet</h2>
        <p>Start your first AI interview 🚀</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white px-6 pt-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          My Interviews
        </h1>
        <p className="text-gray-400 mt-2">Track your performance & progress</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {interview.map((item) => {
          const scoreColor =
            item.score >= 80
              ? "text-green-400"
              : item.score >= 50
                ? "text-yellow-400"
                : "text-red-400";

          return (
            <div
              key={item._id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    item.status === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {item.status || "pending"}
                </span>

                <span className={`font-bold ${scoreColor}`}>
                  {item.score ? `${item.score}%` : "--"}
                </span>
              </div>

              <h2 className="text-lg font-semibold mb-1">
                {item.name || "Interview"}
              </h2>

              <p className="text-sm text-gray-400 mb-3">
                {item.role || "Role not defined"}
              </p>

              <div className="flex justify-between text-xs text-gray-400 mb-4">
                <span>{item.interviewType}</span>
                <span>{item.difficulty}</span>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                <Link
                  href={`/homepage/result/${item._id}`}
                  className="flex-1 text-center bg-linear-to-r from-green-500 to-green-600 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
                >
                  View Full
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={loadingId === item._id}
                  className={`px-3 py-2 rounded-full cursor-pointer ${
                    loadingId === item._id
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  <IoTrashBin />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HrInterview;
