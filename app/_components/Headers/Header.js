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
      {/*Desktop*/}
      <ul className="hidden lg:flex gap-8 flex-1 justify-center items-center">
        {headerLink.map((el) => (
          <li key={el.href}>
            <a
              href={el.href}
              onClick={(e) => handleScroll(e, el.href)}
              className={`
          relative flex items-center gap-2 text-sm font-medium
          text-gray-600 hover:text-gray-900
          transition
        `}
            >
              {el.ico}
              {el.type}

              <span
                className={`
            absolute -bottom-1 left-0 h-0.5 w-0
            bg-green-500
            transition-all duration-300
            ${activeLink === el.href ? "w-full" : "group-hover:w-full"}
          `}
              />
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile*/}
      <div className="relative lg:hidden text-black">
        <button
          type="button"
          suppressHydrationWarning={true}
          style={{
            position: "fixed",
            top: "8px",
            zIndex: 999999,
            padding: "10px",
            touchAction: "manipulation",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActive(!active);
          }}
          className="text-[30px] cursor-pointer touch-manipulation right-5 md:right-10"
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
              transition={{ ease: "linear", duration: 0.4 }}
              style={{
                touchAction: "manipulation",
                WebkitOverflowScrolling: "touch",
              }}
              onAnimationComplete={() => {
                if (!active) document.body.style.overflow = "auto";
              }}
              className="absolute top-9 -right-10 w-[80vw] min-h-[80vh] bg-green-300 flex flex-col items-center gap-8 py-10 z-50 shadow-lg"
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
