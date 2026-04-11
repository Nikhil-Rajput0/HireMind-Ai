"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    // make globally accessible
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let timeout;

    const iframe = document.getElementById("hero-video");

    lenis.on("scroll", () => {
      // disable iframe while scrolling
      if (iframe) iframe.style.pointerEvents = "none";

      clearTimeout(timeout);

      // enable after scroll stops
      timeout = setTimeout(() => {
        if (iframe) iframe.style.pointerEvents = "auto";
      }, 150);
    });
    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
