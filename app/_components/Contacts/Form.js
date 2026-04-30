"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Form() {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/supports/createSupport`,
        {
          name: inputValue.name,
          email: inputValue.email,
          phone: Number(inputValue.phone),
          message: inputValue.notes,
        },
        { withCredentials: true },
      );
      toast.success(res.data?.message);
      setInputValue({ name: "", email: "", phone: "", notes: "" });
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  return (
    <div className="p-2 md:p-5 rounded-lg backdrop-blur-md bg-white/70 border border-white/20 shadow-2xl">
      <form
        className="flex flex-col gap-3 p-2"
        onSubmit={handleSubmit}
        suppressHydrationWarning={true}
      >
        <div className="flex flex-col gap-1  px-1 py-1 overflow-hidden">
          <label htmlFor="full-name" className="text-[#555]">
            Full name
          </label>
          <input
            suppressHydrationWarning={true}
            id="full-name"
            value={inputValue.name}
            onChange={handleChange}
            className="bg-white/50 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 py-1 px-3 rounded-md"
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
              suppressHydrationWarning={true}
              id="mail"
              name="email"
              value={inputValue.email}
              onChange={handleChange}
              className="bg-white/50 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 py-1 px-3 rounded-md"
              placeholder="Enter your Mail"
              required
            />
          </div>
          <div className="flex flex-col gap-1 px-1 py-1 overflow-hidden">
            <label htmlFor="phone" className="text-[#555]">
              Phone
            </label>
            <input
              suppressHydrationWarning={true}
              id="phone"
              name="phone"
              value={inputValue.phone}
              onChange={handleChange}
              className="bg-white/50 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 py-1 px-3 rounded-md"
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
            suppressHydrationWarning={true}
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
          <button
            type="submit"
            suppressHydrationWarning={true}
            className={`w-full ${loading ? "bg-gray-200" : "bg-green-600"} ${loading ? "text-black" : "text-white"} font-semibold py-3 rounded-xl ${loading ? "" : "hover:bg-green-700"} transition flex items-center justify-center gap-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
