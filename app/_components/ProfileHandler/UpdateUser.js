"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import profile from "@/public/profile.png";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/app/loading";

function UpdateUser() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/getMe",
          { withCredentials: true },
        );

        setUserData({
          name: res.data.user.name,
          email: res.data.user.email,
        });
      } catch (error) {
        toast(error.response?.data?.message);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/v1/users/updateMe",
        { name: userData.name },
        { withCredentials: true },
      );
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form
      className="px-8 pb-10 pt-3 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-gray-300">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Loading data..."
          className="bg-gray-300 px-3 py-1 w-[25vw] shadow-xl focus:outline-green-400 rounded-2xl "
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          disabled
          value={userData.email}
          readOnly
          placeholder="Loading data..."
          className="bg-gray-300 px-3 py-1 w-[25vw] shadow-xl focus:outline-green-400 rounded-2xl "
        />
      </div>
      <div className="flex flex-col gap-5 pt-2">
        <div className=" flex items-center gap-6">
          <Image
            alt="Your Profile"
            height={"auto"}
            src={profile}
            className="h-20 w-20"
          />
          <Link
            className="text-lg text-green-600 underline cursor-pointer"
            href={"#"}
          >
            Upload photo
          </Link>
        </div>
      </div>
      <div className="flex items-end justify-end">
        <button
          disabled={loading}
          type="submit"
          className={`w-[25vw] text-center py-2 ${loading ? "bg-gray-300" : "bg-green-400"}  rounded-full ${loading ? "" : "hover:bg-green-500"}  font-medium ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading ? "Submitting..." : <span>Save Changes&rarr;</span>}
        </button>
      </div>
    </form>
  );
}

export default UpdateUser;
