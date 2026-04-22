"use client";
import { useEffect, useState } from "react";
import userContext from "./UserContext";
import toast from "react-hot-toast";
import axios from "axios";

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    photo: "",
  });
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
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/users/getMe", {
        withCredentials: true,
      });

      setUserData(res.data.user);
      console.log(res.data?.user?.interviews);
      setInterview(res.data?.user?.interviews);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };
  useEffect(() => {
    getData();
  }, [setUserData, interview]);

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
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
