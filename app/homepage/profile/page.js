import Image from "next/image";
import profile from "@/public/profile.png";
import { FaRegEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import UpdateUser from "@/app/_components/ProfileHandler/UpdateUser";
import UpdatePassword from "@/app/_components/ProfileHandler/UpdatePassword";
import UserProfile from "@/app/_components/ProfileHandler/UserProfile";

export const metadata = {
  title: `HireMind Ai | Profile`,
  description: "Update or View your Profile there at free of cost.",
};

function Page() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:pl-10 lg:pt-10 pt-15 px-5 lg:px-40">
      <UserProfile />
      <div className="flex flex-col bg-gray-800 rounded-lg px-2">
        <div>
          <h3 className="text-gray-300 pt-3 pb-3 text-2xl text-center">
            Account settings
          </h3>
        </div>
        <UpdateUser />
        <div className="w-full bg-gray-300 h-px"></div>
        <div>
          <h3 className="text-gray-300 pt-3 pb-3 text-2xl text-center">
            Change Password
          </h3>
        </div>
        <UpdatePassword />
      </div>
    </section>
  );
}

export default Page;
