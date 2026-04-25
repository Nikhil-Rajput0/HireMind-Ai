"use client";
import { useEffect, useState } from "react";
import userContext from "./UserContext";
import toast from "react-hot-toast";
import axios from "axios";

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

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users/getMe", {
        withCredentials: true,
      });

      setUserData(res.data.user);
      setInterview(res.data?.user?.interviews);
      setGeneratedResume(res.data?.user?.resumes);
    } catch (err) {
      toast.error(err.response?.data?.message);
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
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
