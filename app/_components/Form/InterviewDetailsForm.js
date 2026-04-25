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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      router.push(`/interview/${res.data.data.interview._id}`);
      toast.success(res.data?.message);

      const userRes = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/updateCredits`,
        { credits: userData.credits },
        { withCredentials: true },
      );

      setUserData(userRes.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message);
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
      <button
        disabled={loading}
        type="submit"
        className={`${loading ? "bg-gray-200" : "bg-green-500"} font-bold rounded-full px-3 py-2 flex items-center justify-center cursor-pointer ${loading ? "" : "hover:bg-green-600"}`}
      >
        Start Interview
      </button>
    </form>
  );
}

export default InterviewDetailsForm;
