"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HeaderMain from "@/app/_components/Headers/HeaderMain";
import logo from "@/public/logo.png";
import toast from "react-hot-toast";
import axios from "axios";

function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const getQuestions = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/question`,
        { id },
        { withCredentials: true },
      );
      setQuestions(res.data.question);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const submitAnswer = async (e) => {
    if (!answer) return;
    e.preventDefault();
    try {
      const evalRes = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/evaluate`,
        { questions, answer },
        { withCredentials: true },
      );

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/save`,
        {
          interviewId: id,
          question: questions,
          answer,
          feedback: evalRes.data.feedback,
          score: evalRes.data.score,
        },
        { withCredentials: true },
      );
      setAnswer("");
      getQuestions();
      toast.success(evalRes.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const finishInterview = async (e) => {
    e.preventDefault();
    try {
      const finishRes = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/finish`,
        { interviewId: id },
        { withCredentials: true },
      );
      toast.success(finishRes.data.message);
      router.push(`/homepage/result/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <section className="bg-gray-900">
      <header className="fixed top-0 right-0 mb-4 left-0 backdrop-blur-md text-white bg-gray-700 w-full px-10 py-1">
        <nav className="flex px-5 w-full py-2 justify-between items-center">
          <Link href={"/"}>
            <Image alt="Logo" src={logo} width={120} height={120} />
          </Link>
          <HeaderMain />
        </nav>
      </header>
      <div className="flex flex-col w-3xl m-auto h-screen py-8">
        <div className="flex flex-1 text-gray-100 pt-18">
          <div className="w-screen">
            <div className="text-center text-lg pb-8">
              {loading ? (
                <div className="absolute pt-13 inset-0 flex items-start justify-center">
                  <div className="w-20 h-20 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                <p>{questions}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-end sticky right-0 left-0 bottom-0">
          <div className="flex items-center w-full gap-2">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full h-[15vh] resize-none rounded-lg overflow-hidden ring-1 ring-green-300 focus:outline-green-500 text-gray-100 px-8 py-4"
            />
            <button
              onClick={submitAnswer}
              className="py-2 rounded-full cursor-pointer hover:bg-green-600 px-4 flex items-center justify-center border-none bg-green-500 font-medium"
            >
              Submit
            </button>
            <button
              onClick={finishInterview}
              className="py-2 px-4 cursor-pointer hover:bg-green-600 rounded-full flex items-center justify-center border-none bg-green-500 font-medium"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
