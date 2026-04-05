import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

function ContactOptions() {
  return (
    <div className="hidden md:block px-2">
      <h3 className="text-4xl pb-3 text-[#000033] font-semibold">
        Get In Touch
      </h3>
      <p className="font-light text-md leading-5 tracking-normal text-[#666]">
        Feel free to reach out! Whether you have a question or just want to drop
        a message, I&apos;ll do my best to get back to you.
      </p>
      <div className="flex flex-col ">
        <div className="flex  gap-4 items-center pt-7">
          <IoLocationOutline className="text-5xl border-2 text-green-400 border-green-400 p-1" />
          <div className="leading-5">
            <h4 className="text-transparent bg-clip-text bg-linear-to-r from-[#0958a8] via-[#30aa11] to-[#98aa11] text-xl font-semibold">
              Location
            </h4>
            <p className="text-[#666] font-normal text-[12px] ">
              Sri Muktsar Sahib, punjab, India
            </p>
          </div>
        </div>
        <div className="flex  gap-4 items-center pt-7">
          <IoMailOutline className="text-5xl border-2 text-pink-400 border-pink-400 p-1" />
          <div className="leading-5">
            <h4 className="text-transparent bg-clip-text bg-linear-to-r from-[#0958a8] via-[#30aa11] to-[#98aa11] text-xl font-semibold">
              Email
            </h4>
            <p className="text-[#666] font-normal text-[12px] ">
              nikhilrajpu236@gmail.com
            </p>
          </div>
        </div>
        <div className="flex  gap-4 items-center pt-7">
          <FaPhoneAlt className="text-5xl border-2 text-blue-800 border-blue-800 p-1" />
          <div className="leading-5">
            <h4 className="text-transparent bg-clip-text bg-linear-to-r from-[#0958a8] via-[#30aa11] to-[#98aa11] text-xl font-semibold">
              Phone
            </h4>
            <p className="text-[#666] font-normal text-[12px] ">
              +91 8360359804
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactOptions;
