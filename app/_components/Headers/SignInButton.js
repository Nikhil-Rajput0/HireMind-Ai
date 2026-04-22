import Link from "next/link";
import React from "react";

function SignInButton() {
  return (
    <Link
      suppressHydrationWarning={true}
      href={"/homepage"}
      className="hidden text-black lg:block px-3 py-2 border rounded-full border-gray-400 cursor-pointer hover:bg-gray-100"
    >
      Sign In &rarr;
    </Link>
  );
}

export default SignInButton;
