import { FaRegCreditCard } from "react-icons/fa";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { FaLaptop } from "react-icons/fa";
import { SiAnswer } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import robotImage from "@/public/robotInterview.png";

function Hero() {
  return (
    <section className="px-10 py-10 pt-25 lg:pt-35 bg-linear-to-r from-green-100 to-green-300 text-black">
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_2fr] gap-5">
        <div className="relative">
          <div className="flex items-center gap-1">
            <FaLaptop className="text-[18px] text-blue-500" />
            <p className="text-[18px] md:text-[20px] lg:text-[18px] text-green-500 leading-12">
              Full Ai Interviewer support
            </p>
          </div>
          <div className="flex gap-10 justify-between">
            <div>
              <div className="flex gap-3 items-center">
                <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-4xl font-bold">
                  Your Real-Time
                </h1>
                <SiAnswer className="w-13 h-13 text-gray-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold leading-10 md:leading-15 lg:leading-10">
                <span className="text-green-600">AI</span> Interview
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold space-x-1 pb-5">
                HR/ Technical
              </h1>
            </div>
            <div className="hidden sm:block lg:hidden">
              <Image
                loading="eager"
                alt="Robot using laptop image"
                src={robotImage}
                height={180}
                className="top-0 right-0 absolute object-contain bg-transparent"
                priority
              />
            </div>
          </div>
          <p className="pb-5 text-[17px] md:text-[21px] lg:text-[17px] text-gray-600 leading-6">
            Automatically connect your call with Ai, Hr so that you can practice
            more and more Interviews. You can also get your resume score by
            simply uploading or resume.
          </p>
          <div className="md:flex lg:block md:gap-5 lg:gap-0">
            <div className="flex gap-3 sm:gap-5 items-center pt-2">
              <Link
                href={"/homepage"}
                className="text-sm @max-xs:text-md border-none flex items-center justify-center py-4 z-0 w-full md:w-auto lg:w-full md:px-8 lg:px-0 hover:bg-green-600 cursor-pointer bg-green-700 rounded-full font-medium text-white"
              >
                Try For Free &rarr;
              </Link>
              <div>
                <div className="flex gap-1 items-center">
                  <FaRegCreditCard className="text-[12px] sm:text-[15px]" />
                  <p className="text-[12px] sm:text-[15px] text-gray-700">
                    No Credit Card Required
                  </p>
                </div>
                <p className="text-[12px] sm:text-[15px] text-[#7c8a73]">
                  Credits,Subscription,Lifetime
                </p>
              </div>
            </div>
            <div className="flex gap-3 py-8 items-center">
              <div className="flex">
                <CiFaceSmile className="text-[40px] mr-[-20] z-1" />
                <CiFaceSmile className="text-[40px] mr-[-20] z-2" />
                <CiFaceSmile className="text-[40px] z-3" />
              </div>
              <div>
                <p className="text-sm @max-xs:text-md">
                  Used By <span className="font-bold ">10,000+</span> peoples
                </p>
                <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1">
                  <div className="flex items-center">
                    <MdOutlineStarPurple500 className="text-yellow-500 text-[12px] @max-xs:text-[13px]" />
                    <MdOutlineStarPurple500 className="text-yellow-500 text-[12px] @max-xs:text-[13px]" />
                    <MdOutlineStarPurple500 className="text-yellow-500 text-[12px] @max-xs:text-[13px]" />
                    <MdOutlineStarPurple500 className="text-yellow-500 text-[12px] @max-xs:text-[13px]" />
                    <MdOutlineStarPurple500 className="text-yellow-500 text-[12px] @max-xs:text-[13px]" />
                  </div>
                  <div>
                    <p className="text-gray-800 text-[10px] @max-xs:text-[13px] font-medium">
                      <span className="text-black font-bold">4.86</span>/5000+
                      reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center sm:px-6">
            <div
              id="video-container"
              className="aspect-video w-full border-none shadow-xl/20 mb-5 bg-white rounded-xl"
            >
              <iframe
                id="hero-video"
                className="h-full w-full object-fill rounded-lg cursor-pointer"
                width={"auto"}
                height="auto"
                src="https://www.youtube-nocookie.com/embed/gUqece4_dh8?si=LlJ8foYhkTXdZB40"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <button
              suppressHydrationWarning={true}
              className="px-5 py-2 rounded-full bg-yellow-500 mx-auto"
            >
              Video For Mobile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
