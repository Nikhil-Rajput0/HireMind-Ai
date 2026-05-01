// components/Subscription.js
"use client";
import React, { useContext, useState, useEffect } from "react";
import { BsCoin } from "react-icons/bs";
import { TbReload } from "react-icons/tb";
import { FaInfinity } from "react-icons/fa6";
import { LuAlarmClockOff } from "react-icons/lu";
import SubscriptionCard from "./SubscriptionCard";
import userContext from "@/app/contexts/UserContext";
import axios from "axios";

function Subscription() {
  const [activeTab, setActiveTab] = useState("credits");
  const { plans, setPlans, userData } = useContext(userContext);

  const tabs = [
    { id: "credits", label: "Credits", icon: <BsCoin size={20} /> },
    { id: "subscription", label: "Subscription", icon: <TbReload size={20} /> },
    { id: "lifetime", label: "Lifetime", icon: <FaInfinity size={20} /> },
  ];

  // Show current credits/plan status
  const getUserPlanStatus = () => {
    if (userData?.isLifetime) {
      return "👑 Lifetime Member - Unlimited Access";
    } else if (userData?.subscription?.isActive) {
      return `✨ ${userData.subscription.planName} Plan Active`;
    } else if (userData?.credits > 0) {
      return `💰 ${userData.credits} Credits Available`;
    }
    return "Choose a plan to get started";
  };

  return (
    <section id="price" className="py-10 lg:px-40 text-gray-800">
      <div className="text-center">
        <div className="text-lg lg:text-3xl pb-3 text-[#40650c] font-semibold">
          Buy Your Plan
        </div>
        <div className="text-sm text-gray-600 pb-6">{getUserPlanStatus()}</div>
      </div>

      <div className="flex flex-col gap-5 items-center">
        {/* Tabs */}
        <div className="flex border border-gray-300 bg-gray-200 rounded-full items-center justify-between w-auto">
          <div className="lg:flex-1 flex items-center lg:justify-center justify-between text-xs lg:text-md w-full">
            {tabs.map((tab) => (
              <button
                suppressHydrationWarning={true}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`lg:px-6 px-2.5 py-3 cursor-pointer flex gap-2 items-center rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-green-600 text-white shadow-lg scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Info Bar */}
        <div className="pt-3 hidden lg:block">
          <div className="flex bg-gray-100 rounded-full px-8 py-2 items-center justify-center">
            <div>
              <h3 className="flex items-center justify-center gap-1 text-[14px] font-normal text-gray-700 after:content-['|'] after:w-px after:text-gray-800 after:pl-3 after:pr-3">
                <TbReload />
                30-Day Money Back
              </h3>
            </div>
            <div>
              <h3 className="flex items-center justify-center gap-1 text-[14px] font-normal text-gray-700 after:content-['|'] after:w-px after:text-gray-800 after:pl-3 after:pr-3">
                <LuAlarmClockOff /> Credits Never Expires
              </h3>
            </div>
            <div>
              <h3 className="flex items-center justify-center gap-1 text-[14px] font-normal text-gray-700">
                <BsCoin />
                20 Credits → 1 Interview
              </h3>
            </div>
          </div>
        </div>

        <div className="pt-3 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex items-center justify-center lg:gap-4 gap-8">
            {plans
              .filter((plan) => plan.planType === activeTab)
              .map((plan, index) => (
                <SubscriptionCard
                  key={plan._id}
                  id={plan._id}
                  type={plan.type}
                  price={plan.price}
                  priceDollar={plan.priceDollar}
                  quantity={plan.quantity}
                  btnText={plan.btnText}
                  bgColor={plan.isPopular ? "bg-green-600" : "bg-white"}
                  btnColor={plan.isPopular ? "bg-white text-green-700" : ""}
                  textColor={plan.isPopular ? "text-white" : ""}
                  delay={index * 0.1}
                />
              ))}
          </div>
        </div>

        <div className="pt-8 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            🔒 Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </section>
  );
}

export default Subscription;
