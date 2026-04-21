"use client";
import FeaturesCard from "./FeaturesCard";
import speechRecogLogo from "@/public/sppech.jpg";
import interviewLogo from "@/public/ai-interview.jpg";
import resumeGenLogo from "@/public/resume-gen.jpg";
import resumeAnalyseLogo from "@/public/resume-ana.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

function OurFeatures() {
  return (
    <section
      id="features"
      className="pb-6 lg:py-15 pt-6 lg:pt-15 lg:px-40"
      suppressHydrationWarning
    >
      <div>
        <h1 className="text-center text-lg lg:text-3xl pb-4 text-[#40650c] font-semibold">
          Our Features
        </h1>
      </div>
      <Swiper
        suppressHydrationWarning={true}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        coverflowEffect={{
          rotate: 25,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="w-full py-10 perspective-distant"
      >
        <SwiperSlide
          className="lg:w-100! w-80! py-2"
          suppressHydrationWarning={true}
        >
          <FeaturesCard
            type="Speech Recognition"
            heading="Blazing Fast Transcription"
            image={speechRecogLogo}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis ex a tempus aliquam. Fusce tincidunt, felis ac rutrum dignissim, nulla felis tempus "
          />
        </SwiperSlide>
        <SwiperSlide
          className="lg:w-100! w-80! !h-[450px]"
          suppressHydrationWarning={true}
        >
          <FeaturesCard
            type="Real Ai Interview"
            heading="Interview With Best Ai HR"
            image={interviewLogo}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis ex a tempus aliquam. Fusce tincidunt, felis ac rutrum dignissim, nulla felis tempus "
          />
        </SwiperSlide>
        <SwiperSlide
          className="lg:w-100! w-80!"
          suppressHydrationWarning={true}
        >
          <FeaturesCard
            type="Resume Generator"
            heading="Generate the Best Resume"
            image={resumeGenLogo}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis ex a tempus aliquam. Fusce tincidunt, felis ac rutrum dignissim, nulla felis tempus "
          />
        </SwiperSlide>
        <SwiperSlide
          className="lg:w-100! w-80!"
          suppressHydrationWarning={true}
        >
          <FeaturesCard
            type="Resume Analyzer"
            heading="Generate score of Resume"
            image={resumeAnalyseLogo}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis ex a tempus aliquam. Fusce tincidunt, felis ac rutrum dignissim, nulla felis tempus "
          />
        </SwiperSlide>
        <SwiperSlide
          className="lg:w-100! w-80! !h-[450px]"
          suppressHydrationWarning={true}
        >
          <FeaturesCard
            type="Speech Recognition"
            heading="Blazing Fast Transcription"
            image={speechRecogLogo}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis ex a tempus aliquam. Fusce tincidunt, felis ac rutrum dignissim, nulla felis tempus "
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default OurFeatures;
