"use client";
import { useState } from "react";
import InterviewDetailsForm from "../Form/InterviewDetailsForm";

function InterviewHeader({ type, interviewType }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between bg-gray-900 py-5 pt-8 lg:px-15">
        <h2 className="text-xl text-gray-200 pl-7">{type}</h2>
        <button
          onClick={() => setIsOpen((el) => !el)}
          className="bg-green-500 text-black font-medium rounded-full flex items-center justify-between py-3 px-3 cursor-pointer hover:bg-green-600"
        >
          Start Interview
        </button>
      </div>
      {isOpen && <InterviewDetailsForm interviewType={interviewType} />}
    </>
  );
}

export default InterviewHeader;
