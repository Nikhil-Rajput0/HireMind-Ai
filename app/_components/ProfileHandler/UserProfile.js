"use client";
import Image from "next/image";
import profile from "@/public/profile.png";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import userContext from "@/app/contexts/UserContext";
import { div } from "framer-motion/client";

function UserProfile() {
  const { userData } = useContext(userContext);

  return (
    <>
      <div className="absolute hidden sm:block inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-30 group-hover:opacity-60 transition" />

      <div className="relative hidden sm:flex items-start justify-center">
        {userData?.email ? (
          <div className="flex items-start justify-center">
            <Image
              quality={75}
              loading="eager"
              alt="Your Profile"
              width={240}
              height={240}
              src={userData.photo || profile}
              className="absolute rounded-full"
            />
          </div>
        ) : (
          <div className="hidden absolute pt-13 inset-0 md:flex items-start justify-center">
            <div className="w-20 h-20 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfile;
