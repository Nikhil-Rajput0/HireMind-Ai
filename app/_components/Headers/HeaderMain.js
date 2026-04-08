import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiDollar } from "react-icons/ci";
import { MdSupportAgent } from "react-icons/md";

function HeaderMain() {
  return (
    <div>
      <ul className="flex items-center justify-between gap-10 text-lg font-medium">
        <li>
          <Link href={"/homepage"} className="flex gap-1 items-center">
            <IoHomeOutline />
            Home
          </Link>
        </li>
        <li className="flex gap-1 items-center">
          <Link href={"/homepage/profile"} className="flex gap-1 items-center">
            <CgProfile />
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
