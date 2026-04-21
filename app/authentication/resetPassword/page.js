import ResetPassword from "@/app/_components/Form/ResetPassword";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";
import FooterBar from "@/app/_components/Footer/FooterBar";

function Page() {
  return (
    <section>
      <div className="bg-[#d5d2d2] pb-20 lg:px-40 w-full px-5">
        <header className=" py-10 flex items-center justify-between  sm:w-[60vw] sm:mx-auto sm:px-0">
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
        <main className="flex flex-col gap-3 w-full sm:w-100 ring-1 mx-auto bg-white ring-green-300 shadow-2xl px-5 sm:px-10 py-5 backdrop-blur-3xl rounded-lg">
          <h3 className="text-2xl sm:text-3xl font bold text-green-500 text-center">
            Reset Password
          </h3>
          <ResetPassword />
        </main>
      </div>
      <footer>
        <FooterBar />
      </footer>
    </section>
  );
}

export default Page;
