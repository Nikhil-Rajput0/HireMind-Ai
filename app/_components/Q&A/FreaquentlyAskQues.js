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
      className="flex flex-col items-center justify-center max-w-3xl mx-auto lg:py-8 py-5"
    >
      <div>
        <h3 className="text-center text-md lg:text-3xl pb-4 text-[#40650c] font-semibold">
          Frequently Asked Questions
        </h3>
      </div>
      <div>
        {questions.map((item, index) => (
          <div
            key={index}
            className="pb-2 lg:px-0 px-10 text-sm lg:text-[16px]"
          >
            <div
              suppressHydrationWarning={true}
              onClick={() => toggleQuestions(index)}
              className="flex items-center cursor-pointer justify-between lg:w-125 w-full px-3 py-2 bg-white border border-gray-400 shadow-xl rounded-t-lg text-gray-900 font-medium"
            >
              <span className="font-medium">{item.heading}</span>
              <button
                onClick={() => toggleQuestions(index)}
                aria-label="Expand menu"
                className="lg:w-8 w-4 cursor-pointer"
                suppressHydrationWarning={true}
              >
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {activeIndex === index && (
              <div className="px-3  text-xs lg:text-[16px] py-2 lg:w-125 w-full bg-white border border-gray-400 shadow-xl text-gray-900 transition-all duration-700">
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
