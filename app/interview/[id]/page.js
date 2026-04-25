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
      if (callback) callback();
    };

    window.speechSynthesis.cancel();
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
        speakText(q, startListening);
      }
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
      return;
    }

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
    <section className="bg-black min-h-screen">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md text-white bg-gray-700 px-4 sm:px-6 md:px-10 py-2">
        <nav className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              alt="Logo"
              src={logo}
              className="w-20 sm:w-24 md:w-28 h-auto"
            />
          </Link>
          <HeaderMain />
        </nav>
      </header>

      <div className="flex flex-col max-w-4xl w-full mx-auto min-h-screen px-4 sm:px-6 md:px-8 py-6 pt-24 sm:pt-28">
        <div className="flex flex-1 text-gray-100">
          <div className="w-full">
            <div className="text-center text-base sm:text-lg md:text-xl pb-6 sm:pb-8">
              {loading ? (
                <div className="flex justify-center items-start pt-10">
                  <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <p>{questions}</p>

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

        <div className="sticky bottom-0 left-0 right-0 mt-auto pb-4">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-2xl blur-sm opacity-75"></div>

            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-6">
              <div className="relative group mb-4">
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl blur transition duration-1000 ${listening ? "opacity-75 animate-pulse" : "opacity-25 group-hover:opacity-50"}`}
                ></div>

                <textarea
                  disabled={listening}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="relative w-full min-h-[120px] sm:min-h-[160px] md:min-h-[180px] resize-none rounded-xl bg-slate-800 border border-slate-600 text-gray-100 px-4 sm:px-6 py-4 focus:outline-none"
                  placeholder="✨ Your answer will appear here..."
                />

                {listening && (
                  <div className="absolute top-3 right-3 text-red-400 text-xs">
                    🎤 Recording...
                  </div>
                )}
              </div>

              {/* BUTTONS */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                <button
                  onClick={startListening}
                  disabled={listening}
                  className="bg-purple-600 cursor-pointer text-white rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5"
                >
                  🎤 {listening ? "Listening..." : "Speak"}
                </button>

                <button
                  onClick={() => speakText(questions, startListening)}
                  className="bg-blue-500 cursor-pointer text-white rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5"
                >
                  🔊 Replay
                </button>

                <button
                  onClick={() => submitAnswer(answer)}
                  disabled={!answer.trim()}
                  className="bg-green-500 cursor-pointer text-white rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5 disabled:opacity-50"
                >
                  ✅ Submit
                </button>

                <button
                  onClick={finishInterview}
                  className="bg-red-500 cursor-pointer text-white rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5"
                >
                  ❌ Finish
                </button>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row justify-between text-xs text-gray-400 gap-2">
                <span>{listening ? "Mic Active" : "Ready"}</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
