import Link from "next/link";
import { FaCruzeiroSign } from "react-icons/fa6";

function SideBar() {
  return (
    <div className="flex flex-col justify-between h-[90%]">
      <div className="flex flex-col gap-6 z-120">
        <div className="px-3 ">
          <div className="inline-flex gap-1 items-center text-lg bg-green-500 text-gray-100 rounded-full px-3 py-2">
            <FaCruzeiroSign />:<p>100</p>
          </div>
        </div>
        <ul className="flex flex-col text-[15px] gap-1 text-black font-medium">
          <Link href={"/homepage/interviewHr"}>
            <li className="ring-1 ring-gray-200 px-2 py-2 shadow-sm cursor-pointer hover:-translate-y-px hover:bg-gray-200">
              Hr Interview
            </li>
          </Link>
          <Link href={"/homepage/interviewTech"}>
            <li className="ring-1 ring-gray-200 px-2 py-2 shadow-sm cursor-pointer hover:-translate-y-px hover:bg-gray-200">
              Technical Interview
            </li>
          </Link>
          <Link href={"/homepage/interviewStrict"}>
            <li className="ring-1 ring-gray-200 px-2 py-2 shadow-sm cursor-pointer hover:-translate-y-px hover:bg-gray-200">
              Strict Interview
            </li>
          </Link>
          <Link href={"/homepage/generateResume"}>
            <li className="ring-1 ring-gray-200 px-2 py-2 shadow-sm cursor-pointer hover:-translate-y-px hover:bg-gray-200">
              Resume Generator
            </li>
          </Link>
          <Link href={"/homepage/analyseResume"}>
            <li className="ring-1  ring-gray-200 px-2 py-2 shadow-sm cursor-pointer hover:-translate-y-px hover:bg-gray-200">
              Resume Analyzer
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-2 text-gray-700 font-medium px-3 pt-30">
        <p>Free</p>
        <span>User</span>
      </div>
    </div>
  );
}

export default SideBar;
