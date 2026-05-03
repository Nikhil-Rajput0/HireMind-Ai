// components/ResumeForm.jsx
"use client";
import userContext from "@/app/contexts/UserContext";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResumeForm({ resume, setResume, setScore }) {
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const { setUserData, userData } = useContext(userContext);
  const router = useRouter();

  // Check if user has access
  const hasAccess = () => {
    if (userData?.isLifetime) return true;
    if (userData?.subscription?.isActive) return true;
    if (userData?.credits >= 20) return true;
    return false;
  };

  // Get access display info
  const getAccessDisplay = () => {
    if (userData?.isLifetime) {
      return {
        text: "👑 Lifetime",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
      };
    }
    if (userData?.subscription?.isActive) {
      return {
        text: "✨ Subscription",
        color: "text-green-400",
        bg: "bg-green-400/10",
      };
    }
    return {
      text: `💰 ${userData?.credits || 0} credits`,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    };
  };

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const handleAI = async () => {
    // Check access
    if (!hasAccess()) {
      toast.error("Not enough credits! Please purchase credits or subscribe.");
      router.push("/homepage#price");
      return;
    }

    setAiLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/resume/generate`,
        {
          resume,
        },
        { withCredentials: true },
      );

      setResume((prev) => ({
        ...prev,
        ...res.data.data,
      }));

      // Update credits if returned from backend
      if (res.data.data?.credits !== undefined) {
        setUserData((prev) => ({
          ...prev,
          credits: res.data.data.credits,
        }));
      }

      toast.success(res.data?.message || "Resume improved by AI!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to improve resume";

      if (err.response?.status === 402) {
        toast.error(errorMessage);
        router.push("/#price");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = async () => {
    // Validate required fields
    if (!resume.name || !resume.role) {
      toast.error("Name and Role are required");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/resume/save`,
        {
          resumeData: resume,
        },
        { withCredentials: true },
      );

      // Set ATS score if returned
      if (res.data?.resume?.score !== undefined) {
        setScore(res.data.resume.score);
      }

      // Update user data with latest info
      if (res.data?.user) {
        setUserData((prev) => ({
          ...prev,
          credits: res.data.user.credits,
        }));
      }

      toast.success(res.data?.message || "Resume saved successfully!");
      router.push("/homepage/generateResume");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save resume");
    } finally {
      setLoading(false);
    }
  };

  const access = getAccessDisplay();

  return (
    <div className="bg-gray-900 p-6 rounded-xl space-y-4">
      {/* Credits/Plan Status */}
      <div
        className={`${access.bg} rounded-lg px-4 py-2 flex items-center justify-between`}
      >
        <span className={`${access.color} text-sm font-medium`}>
          {access.text}
        </span>
        {!hasAccess() && (
          <button
            onClick={() => router.push("/#price")}
            className="text-xs bg-white/20 text-white px-3 py-1 rounded-full hover:bg-white/30 transition"
          >
            Get Credits →
          </button>
        )}
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">
            Full Name *
          </label>
          <input
            name="name"
            placeholder="John Doe"
            value={resume.name}
            onChange={handleChange}
            className="w-full p-2.5 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none transition text-white placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">
            Role/Position *
          </label>
          <input
            name="role"
            placeholder="Full Stack Developer"
            value={resume.role}
            onChange={handleChange}
            className="w-full p-2.5 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none transition text-white placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">
            Professional Summary
          </label>
          <textarea
            name="summary"
            placeholder="Brief overview of your professional background..."
            value={resume.summary}
            onChange={handleChange}
            rows={3}
            className="w-full p-2.5 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none transition text-white placeholder-gray-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">
            Skills <span className="text-gray-500">(comma separated)</span>
          </label>
          <input
            placeholder="React, Node.js, MongoDB, TypeScript"
            onChange={(e) =>
              setResume((prev) => ({
                ...prev,
                skills: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              }))
            }
            className="w-full p-2.5 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none transition text-white placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">
            Experience <span className="text-gray-500">(comma separated)</span>
          </label>
          <input
            placeholder="Google - Software Engineer (2020-2023), Freelance Developer (2018-2020)"
            onChange={(e) =>
              setResume((prev) => ({
                ...prev,
                experience: e.target.value
                  .split(",")
                  .map((exp) => exp.trim())
                  .filter(Boolean),
              }))
            }
            className="w-full p-2.5 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none transition text-white placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-1">
            Projects <span className="text-gray-500">(comma separated)</span>
          </label>
          <input
            placeholder="E-commerce Platform, Chat Application, Portfolio Website"
            onChange={(e) =>
              setResume((prev) => ({
                ...prev,
                projects: e.target.value
                  .split(",")
                  .map((p) => p.trim())
                  .filter(Boolean),
              }))
            }
            className="w-full p-2.5 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none transition text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleAI}
          disabled={aiLoading}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
            ${
              aiLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 active:scale-[0.98]"
            }`}
        >
          {aiLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Enhancing...
            </>
          ) : (
            <>🤖 AI Improve</>
          )}
        </button>

        <button
          onClick={handleSave}
          disabled={loading}
          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
            ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 active:scale-[0.98]"
            }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </>
          ) : (
            <>💾 Save Resume</>
          )}
        </button>
      </div>

      {/* Credit Cost Info */}
      <div className="text-center text-gray-500 text-xs pt-1">
        {userData?.isLifetime || userData?.subscription?.isActive ? (
          <span className="text-green-400">
            Unlimited access • No credit deduction
          </span>
        ) : (
          <span>20 credits per AI improvement</span>
        )}
      </div>
    </div>
  );
}
