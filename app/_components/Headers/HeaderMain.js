"use client";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiDollar } from "react-icons/ci";
import { MdSupportAgent } from "react-icons/md";
import { useContext } from "react";
import userContext from "@/app/contexts/UserContext";
import Image from "next/image";
import profile from "@/public/profile.png";

function HeaderMain() {
  const { userData } = useContext(userContext);
  return (
    <div className="hidden lg:block">
      <ul className="flex items-center justify-between gap-10 text-lg font-medium">
        <li>
          <Link href={"/homepage"} className="flex gap-1 items-center">
            <IoHomeOutline />
            Home
          </Link>
        </li>
        <li className="flex gap-1 items-center">
          <Link href={"/homepage/profile"} className="flex gap-1 items-center">
            {userData?.photo ? (
              <Image
                quality={75}
                loading="eager"
                src={userData?.photo}
                height={24}
                width={24}
                alt="User Profile"
                className="rounded-full"
              />
            ) : (
              <CgProfile />
            )}
            Profile
          </Link>
        </li>
        <li>
          <Link href={"/homepage#price"} className="flex gap-1 items-center">
            <CiDollar /> Buy Plan
          </Link>
        </li>
        <li>
          <Link href={"/homepage#support"} className="flex gap-1 items-center">
            <MdSupportAgent />
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HeaderMain;
