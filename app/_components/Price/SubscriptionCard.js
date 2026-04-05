"use client";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { motion } from "framer-motion";

function SubscriptionCard({
  type,
  priceRs,
  priceDollar,
  quantity,
  bgColor,
  btnText,
  btnColor,
  textColor,
  delay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay || 0 }}
      whileHover={{
        y: -20,
        transition: { duration: 0.2, type: "spring", stiffness: 400 },
      }}
      className={`${bgColor} rounded-lg flex flex-col items-center justify-center py-6 border-none ring-1 ring-gray-300 shadow-xl px-4`}
    >
      <div>
        <BsThreeDotsVertical className="text-[30px] text-shadow-green-950" />
      </div>
      <div>
        <p
          className={`${textColor ? "text-white" : "text-green-400 "} text[14px] pb-2`}
        >
          {type}
        </p>
      </div>
      <div>
        <p className="flex items-center text-3xl font-bold gap-[-8px] tracking-tighter">
          <LiaRupeeSignSolid className="font-extrabold" />
          {priceRs}
        </p>
      </div>
      <div>
        <p className="flex items-center text-[16px] py-4 text-gray-800 font-normal">
          (${priceDollar})
        </p>
      </div>
      <div>
        <p
          className={`text[14px] ${textColor ? "text-white" : "text-gray-600"} pb-2`}
        >
          {quantity}
        </p>
      </div>
      <div>
        <button
          className={`w-50 py-3 cursor-pointer text-cente font-medium bg-green-700 rounded-full  ${btnColor} ${textColor ? textColor : "text-white"} `}
        >
          {btnText}
          <span className={`${textColor} pl-2 font-bold`}>&rarr;</span>
        </button>
      </div>
    </motion.div>
  );
}

export default SubscriptionCard;
