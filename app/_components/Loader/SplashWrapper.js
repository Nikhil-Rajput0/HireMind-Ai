"use client";
import { useEffect, useState } from "react";
import UltraLoader from "./UltraLoader";

export default function SplashWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <UltraLoader />}
      {!loading && children}
    </>
  );
}
