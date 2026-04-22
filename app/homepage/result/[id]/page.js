"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { id } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const findInterview = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/${id}`,
        { withCredentials: true },
      );
      setInterviewData(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  useEffect(() => {
    findInterview();
  }, [id]);

  if (!interviewData) {
    return (
      <p className="text-center flex justify-center">Loading result....</p>
    );
  }

  return (
    <section className="pl-18 pt-4">
      <div>{interviewData.name}</div>
      <div>
        {interviewData?.conversation?.map((conversation) => (
          <p key={conversation._id}>{conversation.question}</p>
        ))}
      </div>
    </section>
  );
}

export default Page;
