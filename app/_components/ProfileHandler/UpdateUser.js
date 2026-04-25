"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import profile from "@/public/profile.png";
import userContext from "@/app/contexts/UserContext";

function UpdateUser() {
  const { userData, setUserData } = useContext(userContext);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  //  Get user data

  //  Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", userData.name);

      if (photo) {
        formData.append("photo", photo);
      }

      const res = await axios.patch(
        "http://localhost:8000/api/v1/users/updateMe",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      toast.success(res.data.message);
      setUserData(res.data.user);
      setPhoto(null);
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
      {/* NAME */}
      <input
        type="text"
        value={userData.name}
        placeholder="loading..."
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        className="bg-gray-300 text-black px-3 py-1 w-full lg:w-[25vw] shadow-xl focus:outline-green-400 rounded-2xl "
      />

      {/* EMAIL */}
      <input
        type="email"
        value={userData.email}
        disabled
        placeholder="loading..."
        className="bg-gray-300 text-black px-3 py-1 w-full lg:w-[25vw] shadow-xl focus:outline-green-400 rounded-2xl "
      />

      {/* IMAGE */}
      <div className=" flex items-center gap-4">
        {userData.email ? (
          <Image
            quality={75}
            loading="eager"
            src={photo ? URL.createObjectURL(photo) : userData.photo || profile}
            alt="profile"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="pt-13 inset-0 flex items-start justify-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          hidden
          id="photo"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <label htmlFor="photo" className="text-green-600 cursor-pointer">
          Upload Photo
        </label>
      </div>

      {/* BUTTON */}
      <div className="flex items-end justify-end pt-3">
        <button
          disabled={loading}
          className={`w-full text-black lg:w-[25vw] text-center py-2 ${loading ? "bg-gray-300" : "bg-green-400"}  rounded-full ${loading ? "" : "hover:bg-green-500"}  font-medium ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading ? "Uploading..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

export default UpdateUser;
