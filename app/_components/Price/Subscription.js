"use client";
import react, { useState } from "react";
import { BsCoin } from "react-icons/bs";
import { TbReload } from "react-icons/tb";
import { FaInfinity } from "react-icons/fa6";
import { LuAlarmClockOff } from "react-icons/lu";
import SubscriptionCard from "./SubscriptionCard";

function Subscription() {
  const [activeTab, setActiveTab] = useState("credits");

  const tabs = [
    { id: "credits", label: "Credits Only", icon: <BsCoin size={20} /> },
    { id: "subscription", label: "Subscription", icon: <TbReload size={20} /> },
    { id: "lifetime", label: "Lifetime", icon: <FaInfinity size={20} /> },
  ];

  const plans = {
    credits: [
      {
        type: "Basic",
        priceRs: "3000",
        priceDollar: "20.0",
        quantity: "100 credits",
        btnText: "Get Credits",
      },
      {
        type: "Standard",
        priceRs: "5000",
        priceDollar: "35.0",
        quantity: "200 credits",
        btnText: "Get Credits",
        isPopular: true,
      },
      {
        type: "Best Deal",
        priceRs: "6500",
        priceDollar: "45.0",
        quantity: "350 credits",
        btnText: "Get Credits",
      },
    ],
    subscription: [
      {
        type: "Monthly",
        priceRs: "1500",
        priceDollar: "10.0",
        quantity: "Unlimited/month",
        btnText: "Subscribe",
      },
      {
        type: "Quarterly",
        priceRs: "4000",
        priceDollar: "28.0",
        quantity: "Unlimited/3 months",
        btnText: "Subscribe",
      },
      {
        type: "Yearly",
        priceRs: "12000",
        priceDollar: "85.0",
        quantity: "Unlimited/year",
        btnText: "Subscribe",
        isPopular: true,
      },
    ],
    lifetime: [
      {
        type: "Enterprise",
        priceRs: "30000",
        priceDollar: "175.0",
        quantity: "Unlimited + Priority",
        btnText: "Get Lifetime",
        isPopular: true,
      },
    ],
  };

  return (
    <section id="price" className="py-10 lg:px-40 px-12">
      <div className="text-center text-lg lg:text-3xl pb-6 text-[#40650c] font-semibold">
        Buy Your Plan
      </div>
      <div className="flex flex-col gap-5  items-center">
        <div className="flex border border-gray-300 bg-gray-200 rounded-full items-center justify-between lg:w-120 w-full">
          <div className="lg:flex-1 flex items-center lg:justify-center justify-between text-xs lg:text-md">
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
        <div className="pt-3 hidden lg:block">
          <div className="flex bg-gray-100 rounded-full px-8 py-2 items-center justify-center">
            <div>
              <h3 className="flex items-center justify-center gap-1 text-[14px] font-normal text-gray-700 after:content-['|'] after:w-px after:text-gray-800 after:pl-3 after:pr-3">
                <TbReload />
                30-Day Money Back
              </h3>
            </div>
            <div>
              <h3 className="flex items-center justify-center gap-1 text-[14px] font-normal text-gray-700  after:content-['|'] after:w-px after:text-gray-800 after:pl-3 after:pr-3">
                <LuAlarmClockOff /> Credits Never Expires
              </h3>
            </div>
            <div>
              <h3 className="flex items-center justify-center gap-1 text-[14px] font-normal text-gray-700">
                <BsCoin />
                20 Credits&rarr; 1 Interview
              </h3>
            </div>
          </div>
        </div>
        <div className="pt-3">
          <div className="grid grid-cols-1 lg:flex items-center lg:justify-center lg:gap-4 gap-8">
            {plans[activeTab].map((plan, index) => (
              <SubscriptionCard
                key={index}
                type={plan.type}
                priceRs={plan.priceRs}
                priceDollar={plan.priceDollar}
                quantity={plan.quantity}
                btnText={plan.btnText}
                bgColor={plan.isPopular ? "bg-green-600" : ""}
                btnColor={plan.isPopular ? "bg-white" : ""}
                textColor={plan.isPopular ? "text-black" : ""}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscription;
