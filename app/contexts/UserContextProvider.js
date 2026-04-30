"use client";
import { useEffect, useState } from "react";
import userContext from "./UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
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
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState({});

  const router = useRouter();
  const pathname = usePathname();

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://hiremind-ai-backend.onrender.com/api/v1/users/getMe",
        {
          withCredentials: true,
        },
      );

      setUserData(res.data.user);
      setInterview(res.data?.user?.interviews || []);
      setGeneratedResume(res.data?.user?.resumes || []);
    } catch (err) {
      if (pathname.startsWith("/homepage")) {
        router.push("/authentication/signIn");
      }
    } finally {
      setLoading(false);
    }
  };

  const getPlans = async () => {
    try {
      const res = await axios.get(
        "https://hiremind-ai-backend.onrender.com/api/v1/plans/plan",
        { withCredentials: true },
      );
      setPlans(res.data?.plan);
      console.log(res.data?.plan);
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    getData();
    getPlans();
  }, [pathname]);

  if (loading)
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-md">
          <div className="flex flex-col items-center gap-6">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              }}
              className="w-16 h-16 rounded-full border-4 border-green-400 border-t-transparent"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white text-lg font-medium"
            >
              Preparing your dashboard...
            </motion.p>

            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 via-emerald-300 to-green-400"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "linear",
                }}
              />
            </div>

            <p className="text-gray-400 text-sm">
              Waking up server (first visit may take a few seconds)
            </p>
          </div>
        </div>
      </AnimatePresence>
    );

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
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
