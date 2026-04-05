"use client";
import Link from "next/link";
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
  const [activeLink, setActiveLink] = useState("#features");
  return (
    <ul className="flex gap-8 flex-1 mx-auto justify-center items-center">
      {headerLink.map((el) => (
        <li key={el.href}>
          <Link
            href={el.href}
            onClick={(e) => setActiveLink(el.href)}
            className={`flex items-center gap-1 text-[16px] font-medium ${activeLink === el.href ? "text-[#19ca09]" : ""}`}
          >
            {el.ico}
            {el.type}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Header;
