"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // PROPER MOBILE DISABLE - Check touch support, not just width
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    ) {
      return; // NO LENIS ON MOBILE - CRITICAL
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false, // Already good
      touchMultiplier: 0, // EXTRA SAFETY
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Iframe fix improved
    const iframe = document.getElementById("hero-video");
    lenis.on("scroll", () => {
      if (iframe) iframe.style.pointerEvents = "none";
      clearTimeout(window.iframeTimeout);
      window.iframeTimeout = setTimeout(() => {
        if (iframe) iframe.style.pointerEvents = "auto";
      }, 150);
    });

    return () => {
      if (lenis) lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return null;
}
