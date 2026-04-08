"use client";
import React, { useEffect, useState } from "react";

function Form() {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    mobile: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInputValue({ name: "", email: "", mobile: "", notes: "" });
    console.log(inputValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e);
    setInputValue((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  return (
    <div className="p-5 rounded-lg backdrop-blur-md bg-white/70 border border-white/20 shadow-2xl">
      <form className="flex flex-col gap-3 p-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1  px-1 py-1 overflow-hidden">
          <label htmlFor="full-name" className="text-[#555]">
            Full name
          </label>
          <input
            id="full-name"
            value={inputValue.name}
            onChange={handleChange}
            className="bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 py-1 px-3 rounded-md"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-2 ">
          <div className="flex flex-col gap-1 px-1 py-1 overflow-hidden">
            <label htmlFor="mail" className="text-[#555]">
              Email
            </label>
            <input
              id="mail"
              name="email"
              value={inputValue.email}
              onChange={handleChange}
              className="bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 py-1 px-3 rounded-md"
              placeholder="Enter your Mail"
              required
            />
          </div>
          <div className="flex flex-col gap-1 px-1 py-1 overflow-hidden">
            <label htmlFor="phone" className="text-[#555]">
              Phone
            </label>
            <input
              id="phone"
              name="mobile"
              value={inputValue.mobile}
              onChange={handleChange}
              className="bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 py-1 px-3 rounded-md"
              type="tel"
              placeholder="Enter your Mobile No."
              required
            />
          </div>
        </div>
        <div className="px-1 overflow-hidden">
          <label htmlFor="message" className="text-[#555]">
            Message
          </label>
          <textarea
            className="bg-white/50 text-[#444] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none py-1 px-3 w-full rounded-md "
            id="message"
            name="notes"
            value={inputValue.notes}
            onChange={handleChange}
            placeholder="Write your message here"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="pt-2">
          <button className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
