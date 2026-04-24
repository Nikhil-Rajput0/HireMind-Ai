"use client";
import ReviewsSlider from "./ReviewsSlider";

function Reviews() {
  return (
    <section
      id="reviews"
      className="relative py-20 px-4 lg:px-20 bg-[#e0e0e0] overflow-hidden"
    >
      {/* heading */}
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          Testimonials
        </p>
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-3">
          What Users Say About Us
        </h3>
      </div>

      <ReviewsSlider />
    </section>
  );
}

export default Reviews;
