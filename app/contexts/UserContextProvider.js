"use client";
import { useState } from "react";
import userContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [otp, setOtp] = useState("");
  return (
    <userContext.Provider value={{ inputValue, setInputValue, otp, setOtp }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
