import { BiSolidAnalyse } from "react-icons/bi";
import { GiClawString } from "react-icons/gi";
import { MdLaptopChromebook } from "react-icons/md";
import { PiGogglesBold } from "react-icons/pi";
import { RiAiGenerate2 } from "react-icons/ri";

const navItems = [
  {
    name: "HR Interview",
    href: "/homepage/interviewHr",
    icon: <PiGogglesBold />,
  },
  {
    name: "Technical",
    href: "/homepage/interviewTech",
    icon: <MdLaptopChromebook />,
  },
  {
    name: "Strict Mode",
    href: "/homepage/interviewStrict",
    icon: <GiClawString />,
  },
  {
    name: "Resume Generator",
    href: "/homepage/generateResume",
    icon: <RiAiGenerate2 />,
  },
  {
    name: "ATS Analyzer",
    href: "/homepage/analyseResume",
    icon: <BiSolidAnalyse />,
  },
];

export default navItems;
