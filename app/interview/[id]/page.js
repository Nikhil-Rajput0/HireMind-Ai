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
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const speakText = (text, callback) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 0.9;

    utterance.onstart = () => setSpeaking(true);

    utterance.onend = () => {
      setSpeaking(false);
      if (callback) callback(); // start listening after speaking
    };

    window.speechSynthesis.cancel(); // stop previous
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(transcript);

      // 🔥 Auto submit after speaking
      setTimeout(() => {
        submitAnswer(transcript);
      }, 500);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const getQuestions = async () => {
    if (isFinished) return;
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/question`,
        { id },
        { withCredentials: true },
      );
      if (!isFinished) {
        const q = res.data.question;
        setQuestions(q);
        speechSynthesis.cancel();
        speechSynthesis.speak(new SpeechSynthesisUtterance(q));
      }
      speakText(q, startListening);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const submitAnswer = async (finalAnswer) => {
    if (!questions || !finalAnswer) {
      toast.error("Question or answer missing.");
    }

    if (!finalAnswer) return;
    setProcessing(true);
    try {
      const evalRes = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/evaluate`,
        { question: questions, answer: finalAnswer },
        { withCredentials: true },
      );

      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/interviews/save`,
        {
          interviewId: id,
          question: questions,
          answer: finalAnswer,
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
    } finally {
      setProcessing(false);
    }
  };

  const finishInterview = async (e) => {
    setIsFinished(true);
    speechSynthesis.cancel();
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
        {/* QUESTION AREA */}
        <div className="flex flex-1 text-gray-100 pt-18">
          <div className="w-screen">
            <div className="text-center text-lg pb-8">
              {loading ? (
                <div className="absolute pt-13 inset-0 flex items-start justify-center">
                  <div className="w-20 h-20 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <p>{questions}</p>

                  {/* 🔥 STATUS INDICATORS */}
                  <div className="mt-3 text-sm text-gray-400">
                    {speaking && <p>🔊 AI speaking...</p>}
                    {listening && <p>🎤 Listening...</p>}
                    {processing && <p>⚙️ Evaluating...</p>}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="flex items-end sticky right-0 left-0 bottom-0">
          <div className="flex items-center w-full gap-2">
            <textarea
              disabled={listening}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full h-[15vh] resize-none rounded-lg overflow-hidden ring-1 ring-green-300 focus:outline-green-500 text-gray-100 px-8 py-4"
              placeholder="Your answer will appear here..."
            />

            {/* 🎤 MIC BUTTON */}
            <button
              onClick={startListening}
              className={`py-2 px-4 rounded-full text-white ${
                listening ? "bg-red-500" : "bg-purple-600"
              }`}
            >
              {listening ? "🎤 Listening..." : "🎤 Speak"}
            </button>

            {/* 🔊 REPLAY BUTTON */}
            <button
              onClick={() => speakText(questions, startListening)}
              className="py-2 px-4 rounded-full bg-blue-500 text-white"
            >
              🔊 Replay
            </button>

            {/* SUBMIT */}
            <button
              onClick={() => submitAnswer(answer)}
              className="py-2 rounded-full cursor-pointer hover:bg-green-600 px-4 flex items-center justify-center bg-green-500 font-medium"
            >
              Submit
            </button>

            {/* FINISH */}
            <button
              onClick={finishInterview}
              className="py-2 px-4 cursor-pointer hover:bg-red-600 rounded-full flex items-center justify-center bg-red-500 font-medium text-white"
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
