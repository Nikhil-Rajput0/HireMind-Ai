"use client";
import { CiCreditCard1, CiStar } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const headerLink = [
  { href: "#features", type: "Features", ico: <BsStars /> },
  { href: "#reviews", type: "Reviews", ico: <CiStar /> },
  { href: "#price", type: "Price", ico: <CiCreditCard1 /> },
  { href: "#help", type: "Help", ico: <MdOutlineQuestionAnswer /> },
  { href: "#support", type: "Support", ico: <BiSupport /> },
];

function Header() {
  const [activeLink, setActiveLink] = useState("");
  const [active, setActive] = useState(false);

  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    target.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });

    window.history.pushState(null, "", href);
    setActiveLink(href);
    setActive(false);
  };

  return (
    <>
      <ul className="hidden lg:flex gap-8 flex-1 mx-auto justify-center items-center">
        {headerLink.map((el) => (
          <li key={el.href}>
            <a
              suppressHydrationWarning={true}
              href={el.href}
              onClick={(e) => handleScroll(e, el.href)}
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

      <div className="relative lg:hidden">
        <button
          type="button"
          suppressHydrationWarning={true}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 999999,
            padding: "10px",
            touchAction: "manipulation",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActive(!active);
          }}
          className="text-[30px] cursor-pointer relative touch-manipulation "
        >
          {active ? <IoClose /> : <IoMenu />}
        </button>

        <AnimatePresence>
          {active && (
            <motion.ul
              suppressHydrationWarning={true}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease: "linear", duration: 1 }}
              style={{
                touchAction: "manipulation",
                WebkitOverflowScrolling: "touch",
              }}
              onAnimationComplete={() => {
                if (!active) document.body.style.overflow = "auto";
              }}
              className="absolute top-12 -right-10 w-[80vw] min-h-screen bg-green-300 flex flex-col items-center gap-8 py-10 z-50 shadow-lg"
            >
              <Link
                href={"/homepage"}
                onClick={() => setActive(false)}
                className="block px-6 py-3 border rounded-full border-gray-300 cursor-pointer hover:bg-green-800 bg-green-600 text-white"
              >
                Sign In &rarr;
              </Link>

              {headerLink.map((el) => (
                <li key={el.href}>
                  <a
                    href={el.href}
                    onClick={(e) => handleScroll(e, el.href)}
                    className={`flex items-center gap-2 text-[18px] font-medium ${
                      activeLink === el.href ? "text-[#19ca09]" : "text-black"
                    }`}
                  >
                    {el.ico}
                    {el.type}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Header;
