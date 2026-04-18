"use client";
import Link from "next/link";
import { useState } from "react";

function InterviewDetailsForm({ interviewType }) {
  const [formData, setFormData] = useState({
    name: "",
    interviewType,
    role: "",
    difficulty: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form
      className="z-50 mr-5 absolute top-35 right-0 flex flex-col gap-2 w-[35vw] bg-gray-900 py-10 px-8 rounded-xl"
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
          className="bg-gray-300 px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-xl shadow-sm"
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
          readOnly
          placeholder="eg: First Interview"
          required
          className="bg-gray-300 px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-xl shadow-sm"
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
          className="bg-gray-300 px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-xl shadow-sm"
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
          <option>Easy</option>
          <option>Medium</option>
          <option>Hardest</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-500 font-bold rounded-full px-3 py-2 flex items-center justify-center cursor-pointer hover:bg-green-600"
      >
        Start Interview
      </button>
    </form>
  );
}

export default InterviewDetailsForm;
