"use client";
import userContext from "@/app/contexts/UserContext";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function InterviewDetailsForm({ interviewType }) {
  const { formData, setFormData, userData, setUserData } =
    useContext(userContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      interviewType,
    }));
  }, [interviewType, setFormData]);

  const hasAccess = () => {
    if (userData?.isLifetime) return true;
    if (userData?.subscription?.isActive) return true;
    if (userData?.credits >= 20) return true;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!hasAccess()) {
      toast.error("Not enough credits! Please purchase credits or subscribe.");
      setLoading(false);
      router.push("/homepage#price");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/create`,
        {
          user: formData.user,
          name: formData.name,
          interviewType,
          role: formData.role,
          difficulty: formData.difficulty,
        },
        { withCredentials: true },
      );

      if (res.data.data?.credits !== undefined) {
        setUserData((prev) => ({
          ...prev,
          credits: res.data.data.credits,
        }));
      }

      router.push(`/interview/${res.data.data.interview._id}`);
      toast.success(res.data?.message || "Interview started!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      if (error.response?.status === 402) {
        toast.error(errorMessage);
        router.push("/homepage#price");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form
      className="text-black z-50 lg:mr-5 mr-0 absolute top-45 lg:top-43 right-0 flex flex-col gap-2 w-[90vw] lg:w-[35vw] bg-gray-900 py-10 px-8 rounded-xl"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-gray-100">
          Name Of Interview
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="eg: First Interview"
          required
          className="bg-gray-300 text-black px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-xl shadow-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="interviewType" className="text-gray-100">
          Type
        </label>
        <input
          id="interviewType"
          name="interviewType"
          value={formData.interviewType}
          onChange={handleChange}
          disabled
          placeholder="eg: First Interview"
          required
          className="bg-gray-300 text-black px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-xl shadow-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="role" className="text-gray-100">
          Role
        </label>
        <input
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="eg: First Interview"
          required
          className="bg-gray-300 text-black px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-xl shadow-sm"
        />
      </div>
      <div className="flex gap-4 items-center py-3">
        <label htmlFor="name" className="text-gray-100">
          Difficulty:
        </label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="bg-gray-300 text-black py-2 px-3 rounded-xl"
        >
          <option value="">Select an option</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hardest</option>
        </select>
      </div>

      <div className="text-gray-300 text-sm text-center bg-gray-800 rounded-lg py-2 px-3">
        {userData?.isLifetime ? (
          <span className="text-yellow-400">
            👑 Lifetime Access - Unlimited Interviews
          </span>
        ) : userData?.subscription?.isActive ? (
          <span className="text-green-400">
            ✨ {userData.subscription.planName} Plan Active - Unlimited
          </span>
        ) : (
          <span>
            💰{" "}
            <span className="text-white font-bold">
              {userData?.credits || 0}
            </span>{" "}
            credits
            <span className="text-gray-400"> (20 credits/interview)</span>
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        } font-bold rounded-full px-3 py-2 flex items-center justify-center cursor-pointer transition-all duration-200`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
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
            Starting...
          </span>
        ) : (
          "Start Interview"
        )}
      </button>
    </form>
  );
}

export default InterviewDetailsForm;
