import ReviewsSlider from "./ReviewsSlider";

function Reviews() {
  return (
    <section id="reviews">
      <div>
        <h3 className="text-center text-3xl pb-4 text-[#40650c] font-semibold">
          Reviews
        </h3>
      </div>
      <div className="py-5">
        <div className="py-1 whitespace-nowrap flex">
          <ReviewsSlider />
          <ReviewsSlider />
          <ReviewsSlider />
          <ReviewsSlider />
          <ReviewsSlider />
          <ReviewsSlider />
          <ReviewsSlider />
        </div>
      </div>
    </section>
  );
}

export default Reviews;
