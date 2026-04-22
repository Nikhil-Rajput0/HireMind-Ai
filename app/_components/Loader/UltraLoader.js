"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/public/logo.png";

export default function UltraLoader() {
  const [text, setText] = useState("");
  const fullText = "Preparing your AI interview...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient z-[9999]">
      {/* Logo Glow */}
      <div className="logo-glow mb-5">
        <Image src={logo} alt="HireMind AI" width={100} height={100} />
      </div>

      {/* App Name */}
      <h1 className="text-white text-2xl font-bold tracking-wide animate-fadeIn">
        HireMind AI
      </h1>

      {/* Typing Text */}
      <p className="text-white/80 mt-2 text-sm h-5">{text}</p>

      {/* Progress Bar */}
      <div className="w-40 h-1 bg-white/20 rounded-full mt-5 overflow-hidden">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}
