import Link from "next/link";
import React from "react";

function SignInButton() {
  return (
    <Link
      href={"/authentication/signIn"}
      className="px-3 py-4 border rounded-full border-gray-400 cursor-pointer hover:bg-gray-100"
    >
      Sign In &rarr;
    </Link>
  );
}

export default SignInButton;
