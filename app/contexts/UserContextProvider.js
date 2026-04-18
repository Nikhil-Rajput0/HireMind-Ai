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
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/getMe",
          { withCredentials: true },
        );

        setUserData(res.data.user);
      } catch (err) {
        toast.error(err.response?.data?.message);
      }
    };
    getData();
  }, [setUserData]);
  return (
    <userContext.Provider
      value={{ inputValue, setInputValue, otp, setOtp, userData, setUserData }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
