import React, { useState } from "react";

function ResetPassword() {
  const [userData, setUserData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-gray-300">
          New Password
        </label>
        <input
          id="password"
          type="text"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="***********"
          className="bg-gray-300 px-3 py-1 shadow-xl focus:outline-green-400 rounded-2xl "
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="passwordConfirm" className="text-gray-300">
          Confirm password
        </label>
        <input
          id="passwordConfirm"
          type="text"
          name="passwordConfirm"
          value={userData.passwordConfirm}
          onChange={handleChange}
          placeholder="***********"
          className="bg-gray-300 px-3 py-1 shadow-xl focus:outline-green-400 rounded-2xl "
        />
      </div>
    </form>
  );
}

export default ResetPassword;
