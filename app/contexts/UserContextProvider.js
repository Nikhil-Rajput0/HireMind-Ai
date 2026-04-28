"use client";
import { useEffect, useState } from "react";
import userContext from "./UserContext";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    interviewType: "",
    role: "",
    difficulty: "",
  });

  const [interview, setInterview] = useState([]);
  const [generatedResume, setGeneratedResume] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  // 🔥 rotating messages
  const messages = [
    "Preparing your dashboard...",
    "Analyzing your data...",
    "Optimizing your experience...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  // 🔁 rotate messages while fetching
  useEffect(() => {
    if (!isFetching) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isFetching]);

  const getData = async () => {
    setIsFetching(true);

    try {
      const res = await axios.get(
        "https://hiremind-ai-backend.onrender.com/api/v1/users/getMe",
        {
          withCredentials: true,
          timeout: 5000,
        },
      );

      setUserData(res.data.user);
      setInterview(res.data?.user?.interviews || []);
      setGeneratedResume(res.data?.user?.resumes || []);
    } catch (err) {
      if (err.response?.status === 401) {
        if (pathname.startsWith("/homepage")) {
          router.push("/authentication/signIn");
        }
      }

      console.log("Auth skipped (cold start / timeout)");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <userContext.Provider
      value={{
        inputValue,
        setInputValue,
        otp,
        setOtp,
        userData,
        setUserData,
        formData,
        setFormData,
        interview,
        setInterview,
        generatedResume,
        setGeneratedResume,
        isFetching,
      }}
    >
      {/* 🔥 PREMIUM LOADER */}
      <AnimatePresence>
        {isFetching && (
          <>
            {/* TOP PROGRESS BAR */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-0.5 z-50 backdrop-blur-sm"
            >
              <motion.div className="h-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400 to-transparent"
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-blue-400/30 to-transparent blur-sm"
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </motion.div>
            </motion.div>

            {/* FLOATING MESSAGE */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs text-white tracking-wide"
                >
                  {messages[messageIndex]}
                </motion.p>

                <p className="text-[10px] text-gray-400 text-center mt-1">
                  First load may take a few seconds
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
