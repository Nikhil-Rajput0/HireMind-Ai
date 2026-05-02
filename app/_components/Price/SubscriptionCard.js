"use client";
import React, { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import userContext from "@/app/contexts/UserContext";

function SubscriptionCard({
  type,
  id,
  price,
  priceDollar,
  quantity,
  bgColor,
  btnText,
  btnColor,
  textColor,
  delay,
}) {
  const { userData } = useContext(userContext);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!userData?._id) {
      toast.error("Please login first to purchase a plan");
      return;
    }

    try {
      const loadingToast = toast.loading("Initiating payment...");

      // Create order
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/payments/create-order`,
        { planId: id },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      toast.dismiss(loadingToast);

      if (!data.order) {
        throw new Error("Failed to create order");
      }

      // Load Razorpay SDK
      const isLoaded = await loadRazorpayScript();

      if (!isLoaded) {
        toast.error("Failed to load payment gateway. Please try again.");
        return;
      }

      const options = {
        key: data.key_id,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "HireMind AI",
        description: `${type} - ${quantity}`,
        image: "/logo.png",
        order_id: data.order.id,
        handler: async function (response) {
          toast.success("Payment successful! 🎉", {
            duration: 4000,
            icon: "✅",
          });

          setTimeout(() => {
            toast.loading("Updating your account...", {
              duration: 2000,
            });
          }, 1000);

          setTimeout(() => {
            toast.dismiss();
            window.location.reload();
          }, 3000);
        },
        prefill: {
          name: userData?.name || "",
          email: userData?.email || "",
        },
        theme: {
          color: "#15803d",
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
          },
          animation: true,
          confirm_close: true,
          escape: true,
        },
        retry: {
          enabled: false,
        },
      };

      // Create Razorpay instance and open
      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        toast.error("Payment failed. Please try again.");
        console.error("Payment failed:", response.error);
      });

      razorpay.open();
    } catch (error) {
      toast.dismiss();

      console.error("Payment error:", error);

      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        if (status === 401) {
          toast.error("Please login again to continue.");
        } else if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(message || "Payment failed. Please try again.");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <motion.div
      suppressHydrationWarning={true}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay || 0 }}
      whileHover={{
        y: -20,
        transition: { duration: 0.2, type: "spring", stiffness: 400 },
      }}
      style={{ touchAction: "manipulation" }}
      className={`${bgColor} rounded-lg flex flex-col items-center justify-center py-6 border-none ring-1 ring-gray-300 shadow-xl px-4`}
      whileTap={{ scale: 0.95 }}
    >
      <div>
        <BsThreeDotsVertical className="text-[30px] text-shadow-green-950" />
      </div>
      <div>
        <p
          className={`${textColor ? "text-white" : "text-black"} text-[14px] pb-2 font-medium`}
        >
          {type}
        </p>
      </div>
      <div>
        <p className="flex items-center text-3xl font-bold gap-[-8px] tracking-tighter">
          <LiaRupeeSignSolid className="font-extrabold" />
          {price}
        </p>
      </div>
      <div>
        <p className="flex items-center text-[16px] py-4 text-gray-800 font-normal">
          (${priceDollar})
        </p>
      </div>
      <div>
        <p
          className={`text-[14px] ${textColor ? "text-white" : "text-gray-600"} pb-2`}
        >
          {quantity}
        </p>
      </div>
      <div>
        <button
          className={`w-50 py-3 cursor-pointer font-medium bg-green-700 rounded-full ${btnColor} ${
            textColor || "text-white"
          } touch-manipulation active:scale-[0.97] transition-all duration-200 hover:shadow-lg`}
          style={{ touchAction: "manipulation" }}
          onClick={handlePayment}
        >
          {btnText}
          <span className="pl-2 font-bold">&rarr;</span>
        </button>
      </div>
    </motion.div>
  );
}

export default SubscriptionCard;
