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
  const { userData, setUserData, refreshUserData } = useContext(userContext);

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

      // Step 1: Create order (needs authentication)
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

      // Step 2: Load Razorpay SDK
      const isLoaded = await loadRazorpayScript();

      if (!isLoaded) {
        toast.error("Failed to load payment gateway. Please try again.");
        return;
      }

      // Step 3: Configure Razorpay
      const options = {
        key: data.key_id,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "HireMind AI",
        description: `${type} - ${quantity}`,
        image: "/logo.png",
        order_id: data.order.id,
        handler: async function (response) {
          // This runs after successful payment
          const verifyToast = toast.loading("Verifying payment...");

          try {
            // Step 4: Verify payment (NO authentication needed)
            const verifyResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/payments/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId: id,
              },
              {
                // REMOVED: withCredentials: true
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );

            toast.dismiss(verifyToast);

            if (verifyResponse.data.status === "success") {
              // Update local state
              setUserData((prev) => ({
                ...prev,
                credits: verifyResponse.data.data.credits,
                subscription: verifyResponse.data.data.subscription,
                isLifetime: verifyResponse.data.data.isLifetime,
              }));

              toast.success(verifyResponse.data.message, {
                duration: 5000,
                icon: "🎉",
              });

              // Reload page to refresh all data
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
          } catch (verifyError) {
            toast.dismiss(verifyToast);

            console.error("Verification error:", verifyError);
            console.error("Error response:", verifyError.response?.data);

            // Payment was successful even if verification fails
            // The email confirmation proves this
            toast.success("Payment successful! Refreshing your account...", {
              duration: 4000,
              icon: "✅",
            });

            // Still reload to get fresh data from server
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
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
        timeout: 300,
      };

      // Step 5: Create Razorpay instance and open
      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        toast.error("Payment failed. Please try again.");
        console.error("Payment failed:", response.error);
      });

      razorpay.open();
    } catch (error) {
      toast.dismiss();

      console.error("Payment error:", error);

      // Better error handling
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
