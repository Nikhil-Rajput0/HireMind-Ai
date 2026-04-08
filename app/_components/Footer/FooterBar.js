import Link from "next/link";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function FooterBar() {
  return (
    <>
      <div className="bg-gray-900 px-40 min-h-[50vh] py-20 grid grid-cols-[2fr_1fr_1fr] gap-10">
        <div>
          <h3 className="pb-3 text-[22px] text-green-600">About Us</h3>
          <p className="text-[15px] font-normal text-gray-300">
            These platform is made up for students and freshers to get there
            dream job. start with free version and then upgarde to premium
            version like lifetime Subscription at just 3000.
          </p>
        </div>
        <div>
          <h3 className="pb-3 text-[22px] text-green-600">Links</h3>
          <div className="flex flex-col text-gray-300">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-and-condition">Terms and Conditions</Link>
            <a href="#support">Contact</a>
          </div>
        </div>
        <div>
          <h3 className="pb-3 text-[22px] text-green-600">Social Links</h3>
          <div className="flex gap-2 items-center">
            <a
              href="https://linkedin.com/in/nikhil-rajput-a14716275"
              target="_blank"
            >
              <FaLinkedin className="text-[30px] text-[#03c0c0]" />
            </a>
            <a
              href="https://github.com/Nikhil-Rajput0"
              target="_blank"
              className="text-[30px] text-red-800"
            >
              <FaGithub />
            </a>
            <a
              href="https://x.com/Nikhilrajput236"
              target="_blank"
              className="text-[30px] text-cyan-400"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      <div className="py-4 flex justify-center bg-gray-900 text-[#fafafa]">
        <h3 className="">
          &copy;{new Date().getFullYear()} by Hiremind AI. Built with ❤️ by
          Nikhil Kumar Singh
        </h3>
      </div>
    </>
  );
}

export default FooterBar;
