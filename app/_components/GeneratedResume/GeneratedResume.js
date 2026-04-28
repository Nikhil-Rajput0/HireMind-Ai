"use client";
import userContext from "@/app/contexts/UserContext";
import { useContext, useState } from "react";
import Link from "next/link";
import { IoTrashBin } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";

function GeneratedResume() {
  const [loadingId, setLoadingId] = useState(null);
  const { generatedResume, setGeneratedResume } = useContext(userContext);

  const handleDelete = async (id) => {
    setLoadingId(id);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/resume/${id}`,
      );

      toast.success("Resume deleted");
      setGeneratedResume((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoadingId(null);
    }
  };

  if (!generatedResume || generatedResume.length === 0) {
    return (
      <div className="h-[50vh] flex flex-col justify-center items-center text-gray-400">
        <h2 className="text-2xl mb-2">No Resumes Found</h2>
        <p>Create your first AI-powered resume 🚀</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white px-6 pt-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          My Resumes
        </h1>
        <p className="text-gray-400 mt-2">Manage & optimize your resumes</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {generatedResume.map((resume) => {
          const score = resume.score || 0;

          return (
            <div
              key={resume._id}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
                  {resume.template}
                </span>

                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                  ATS
                </span>
              </div>

              <h2 className="text-lg font-semibold">
                {resume.name || "Unnamed"}
              </h2>

              <p className="text-sm text-gray-400 mb-4">
                {resume.role || "No role"}
              </p>

              <div className="flex justify-center mb-4">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="#333"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="#22c55e"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="220"
                      strokeDashoffset={220 - (220 * score) / 100}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {score}%
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Link
                  href={`/myResume/${resume._id}`}
                  className="flex-1 text-center bg-linear-to-r from-green-500 to-green-600 py-2 rounded-full text-sm hover:opacity-90"
                >
                  View Resume
                </Link>

                <button
                  onClick={() => handleDelete(resume._id)}
                  disabled={loadingId === resume._id}
                  className={`px-3 py-2 rounded-full cursor-pointer ${
                    loadingId === resume._id
                      ? "bg-gray-700"
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

export default GeneratedResume;
