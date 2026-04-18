"use client";

import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import questions from "./Questions";

function FreaquentlyAskQues() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestions = (index) => {
    setActiveIndex(activeIndex == index ? null : index);
  };

  return (
    <section
      id="help"
      className="flex flex-col items-center justify-center max-w-3xl mx-auto py-8"
    >
      <div>
        <h3 className="text-center text-3xl pb-4 text-[#40650c] font-semibold">
          Frequently Asked Questions
        </h3>
      </div>
      <div>
        {questions.map((item, index) => (
          <div key={index} className="pb-2">
            <div
              onClick={() => toggleQuestions(index)}
              className="flex items-center cursor-pointer justify-between w-125 px-3 py-2 bg-white border border-gray-400 shadow-xl rounded-t-lg text-gray-900 font-medium"
            >
              <span className="font-medium">{item.heading}</span>
              <button aria-label="Expand menu" className="w-8 cursor-pointer">
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {activeIndex === index && (
              <div className="px-3 py-2 w-125 bg-white border border-gray-400 shadow-xl text-gray-900 text-[15px] transition-all duration-700">
                {item.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
export default FreaquentlyAskQues;
