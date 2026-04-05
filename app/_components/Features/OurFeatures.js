"use client";

import FeaturesCard from "./FeaturesCard";
import speechRecogLogo from "../../../public/sppech.jpeg";
import interviewLogo from "../../../public/ai-interview.jpeg";
import resumeGenLogo from "../../../public/resume-gen.jpeg";
import resumeAnalyseLogo from "../../../public/resume-ana.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

function OurFeatures() {
  return (
    <section id="features" className="py-15 px-40">
      <div>
        <h3 className="text-center text-3xl pb-4 text-[#40650c] font-semibold">
          Our Features
        </h3>
      </div>
      <Swiper
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
          slideShadows: false,
        }}
        modules={[EffectCoverflow]}
        className="w-full py-10 [perspective:1200px]"
      >
        <SwiperSlide className="!w-[400px] py-2">
          <FeaturesCard
            type="Speech Recognition"
            heading="Blazing Fast Transcription"
            image={speechRecogLogo}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis ex a tempus aliquam. Fusce tincidunt, felis ac rutrum dignissim, nulla felis tempus "
          />
        </SwiperSlide>

        <SwiperSlide className="!w-[400px] !h-[450px]">
          <FeaturesCard
            type="Real Ai Interview"
            heading="Interview With Best Ai HR"
            image={interviewLogo}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis ex a tempus aliquam. Fusce tincidunt, felis ac rutrum dignissim, nulla felis tempus "
          />
        </SwiperSlide>
        <SwiperSlide className="!w-[400px]">
          <FeaturesCard
            type="Resume Generator"
            heading="Generate the Best Resume"
            image={resumeGenLogo}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis ex a tempus aliquam. Fusce tincidunt, felis ac rutrum dignissim, nulla felis tempus "
          />
        </SwiperSlide>
        <SwiperSlide className="!w-[400px]">
          <FeaturesCard
            type="Resume Analyzer"
            heading="Generate score of Resume"
            image={resumeAnalyseLogo}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis ex a tempus aliquam. Fusce tincidunt, felis ac rutrum dignissim, nulla felis tempus "
          />
        </SwiperSlide>
        <SwiperSlide className="!w-[400px] !h-[450px]">
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
