"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import questions from "./Questions";
import { motion, AnimatePresence } from "framer-motion";

function FrequentlyAskQues() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestions = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="help" className="relative py-20 px-4 lg:px-20 bg-[#e0e0e0]">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          Support
        </p>
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-3">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {questions.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className="
                group
                bg-white/70 backdrop-blur-xl
                border border-gray-200/60
                rounded-xl
                shadow-sm
                hover:shadow-md
                transition-all duration-300 cursor-pointer
              "
            >
              <button
                onClick={() => toggleQuestions(index)}
                className="
                  w-full flex items-center justify-between
                  px-5 py-4 text-left cursor-pointer
                "
              >
                <span className="text-sm cursor-pointer md:text-base font-medium text-gray-900">
                  {item.heading}
                </span>

                <FaChevronDown
                  className={`
                    transition-transform duration-300
                    ${isOpen ? "rotate-180 text-green-500" : "text-gray-400"}
                  `}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 text-sm md:text-base text-gray-600 leading-relaxed">
                      {item.text}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FrequentlyAskQues;
