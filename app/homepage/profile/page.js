import Image from "next/image";
import profile from "../../../public/profile.png";
import { FaRegEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

export const metadata = {
  title: `HireMind Ai | Profile`,
  description: "Update or View your Profile there at free of cost.",
};

function Page() {
  return (
    <section className="grid grid-cols-[1fr_2fr] pl-10 pt-10 items-center">
      <div className="flex items-center justify-center">
        <Image
          alt="Your Profile"
          height={"auto"}
          src={profile}
          className="h-60 w-60 cursor-pointer"
        />
      </div>
      <div className="flex gap-3 flex-col text-gray-800">
        <div className="flex flex-col">
          <h3>Name</h3>
          <div className="flex items-center gap-2">
            <p>Guest User</p>
            <button className="cursor-pointer">
              <FaRegEdit className="text-green-900" />
            </button>
          </div>
        </div>
        <div>
          <h3>Email</h3>
          <div className="flex items-center gap-2">
            <p>guest@gmail.com</p>
            <button className="cursor-pointer">
              <FaRegEdit className="text-green-900" />
            </button>
          </div>
        </div>
        <div>
          <h3>About</h3>
          <div className="flex items-center gap-2">
            <p>I&apos;M a Full stack developer.</p>
            <button className="cursor-pointer">
              <FaRegEdit className="text-green-900" />
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default Page;
