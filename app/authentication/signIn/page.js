import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import SignIn from "@/app/_components/Form/SignIn";

export const metadata = {
  title: `HireMind Ai | Sign In`,
  description: "Sign in on Hiremind Ai platform to continue.",
};

function Page() {
  return (
    <section className="bg-[#d5d2d2] pb-20 px-40">
      <header className=" py-10 flex items-center justify-between">
        <div>
          <Image alt="Logo" src={logo} height={120} width={120} />
        </div>
        <Link
          href={"/"}
          className="px-5 py-3 ring-1 bg-green-500 text-white ring-green-400 hover:ring-green-300 cursor-pointer shadow-2xl rounded-full"
        >
          &larr;Back to home
        </Link>
      </header>
      <main className="flex flex-col gap-3 w-100 ring-1 mx-auto bg-white ring-green-300 shadow-2xl px-10 py-5 backdrop-blur-3xl rounded-lg">
        <h3 className="text-3xl font bold text-green-500 text-center">
          Sign In
        </h3>
        <SignIn />
      </main>
    </section>
  );
}

export default Page;
