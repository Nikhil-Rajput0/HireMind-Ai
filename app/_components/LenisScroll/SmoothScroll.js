"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

let lenis; // global instance

export default function SmoothScroll() {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1,
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // ✅ Handle anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');

    const handleClick = (e) => {
      e.preventDefault();

      const targetId = e.currentTarget.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        lenis.scrollTo(target, {
          // offset: -30, // 🔥 adjust according to your navbar height
          duration: 1,
        });
      }
    };

    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleClick);
    });

    // cleanup
    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleClick);
      });
      lenis.destroy();
    };
  }, []);

  return null;
}
