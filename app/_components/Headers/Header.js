"use client";
import { CiCreditCard1 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { useState } from "react";

const headerLink = [
  { href: "#features", type: "Features", ico: <BsStars /> },
  { href: "#reviews", type: "Reviews", ico: <CiStar /> },
  { href: "#price", type: "Price", ico: <CiCreditCard1 /> },
  { href: "#help", type: "Help", ico: <MdOutlineQuestionAnswer /> },
  { href: "#support", type: "Support", ico: <BiSupport /> },
];

function Header() {
  const [activeLink, setActiveLink] = useState("");
  return (
    <ul className="flex gap-8 flex-1 mx-auto justify-center items-center">
      {headerLink.map((el) => (
        <li key={el.href}>
          <a
            href={el.href}
            onClick={(e) => {
              e.preventDefault();

              const target = document.querySelector(el.href);
              if (!target) return;

              window.lenis?.scrollTo(target, {
                duration: 1.2,
              });

              window.history.pushState(null, "", el.href);

              setActiveLink(el.href);
            }}
            className={`flex items-center gap-1 text-[16px] font-medium ${
              activeLink === el.href ? "text-[#19ca09]" : ""
            }`}
          >
            {el.ico}
            {el.type}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Header;
