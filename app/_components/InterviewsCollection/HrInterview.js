"use client";
import userContext from "@/app/contexts/UserContext";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { IoTrashBin } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

function HrInterview() {
  const { interview, setInterview } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/${id}`,
        { withCredentials: true },
      );
      setInterview((prevInterviews) =>
        prevInterviews.filter((interview) => interview._id !== id),
      );
      toast.success("Data successfully deleted");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (!interview) {
    return (
      <div className="mb-60">
        <p className="pl-10 text-lg pt-10 lg:pt-5 lg:pl-20">
          You have not attend any interview. Please proceed to start a new
          interview😃.{" "}
        </p>
      </div>
    );
  }
  return (
    <>
      {interview.map((interview) => {
        return (
          <div
            key={interview._id}
            className="w-full flex flex-col items-center mb-60 px-13 py-2 mt-5 bg-slate-100 border border-slate-200 shadow-xl font-medium text-slate-900"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-center pl-7">
                <h3 className="text-blue-600">Name</h3>
                <p>{interview.name}</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-blue-600">Type</h3>
                <p>{interview.interviewType}</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-blue-600">Role</h3>
                <p>{interview.role}</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-blue-600">Status</h3>
                <p className="flex items-center">
                  {interview.status === "pending" ? (
                    <span>⌛</span>
                  ) : (
                    <span>✅</span>
                  )}
                  {interview.status}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-blue-600">Score</h3>
                <p className="text-green-600 font-bold">
                  {interview.totalScore}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-blue-600">Feedback</h3>
                <p className="text-green-600 font-bold">
                  {interview.overallFeedback}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  aria-disabled={loading}
                  href={`/homepage/result/${interview._id}`}
                  className="bg-green-500 cursor-pointer px-3 py-2 flex items-center rounded-full "
                >
                  View Score
                </Link>
                <button
                  onClick={() => handleDelete(interview._id)}
                  className={`${loading ? "bg-gray-200" : "bg-red-500"} ${loading ? "cursor-not-allowed" : "cursor-pointer"} px-3 text-gray-100  py-2 flex items-center rounded-full `}
                >
                  <IoTrashBin /> Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default HrInterview;
