"use client";
import Slider from "./Slider";

export default function AutoSlider() {
  return (
    <section className="relative py-20 overflow-hidden bg-[#e0e0e0]">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-200/40 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            Trusted by candidates preparing for
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-3">
            Top Tech Companies
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-20 bg-linear-to-r from-gray-100 to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-20 bg-linear-to-l from-gray-100 to-transparent z-10" />

          <Slider />
        </div>
      </div>
    </section>
  );
}
