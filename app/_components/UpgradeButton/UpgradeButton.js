"use client";
import userContext from "@/app/contexts/UserContext";
import React, { useContext } from "react";

function UpgradeButton() {
  const { userData } = useContext(userContext);
  return (
    <div className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-xs inline-flex text-gray-400">
          {Boolean(userData?.subscription?.isActive) ? (
            <span>{null}</span>
          ) : (
            <span className="text-xs inline-flex text-gray-400">Plan</span>
          )}
        </p>
        {(userData?.subscription?.isActive || userData?.isLifetime) && (
          <p className="flex-1 w-full text-xs text-gray-400">
            {userData?.subscription?.isActive ? (
              <span className="text-xs inline-flex text-gray-400">
                {`Plan Expires on ${new Date(
                  userData?.subscription?.expiryDate,
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}`}
              </span>
            ) : userData?.isLifetime ? (
              <span className="text-xs inline-flex text-gray-400">
                Lifetime Member
              </span>
            ) : null}
          </p>
        )}
      </div>
      <p className="text-sm font-semibold text-green-400">
        {userData?.role == "admin"
          ? "Admin"
          : Boolean(userData?.subscription?.isActive) || userData?.isLifetime
            ? "Premium User💵"
            : "FREE USER"}
      </p>

      <button
        onClick={() => {
          if (
            Boolean(userData?.subscription?.isActive) ||
            userData?.isLifetime
          ) {
            toast.success("You are already subscribed 😇");
            return;
          }
          router.push("/homepage#price");
        }}
        className="mt-3 w-full bg-linear-to-r from-green-500 to-emerald-400 text-black py-2 rounded-lg text-sm font-semibold hover:scale-105 transition cursor-pointer"
      >
        {Boolean(userData?.subscription?.isActive) || userData?.isLifetime
          ? "Subscribed"
          : "Upgrade 🚀"}
      </button>
    </div>
  );
}

export default UpgradeButton;
