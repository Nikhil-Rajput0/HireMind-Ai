import Link from "next/link";

function SignInButton() {
  return (
    <Link
      href="/homepage"
      className="
        hidden lg:inline-flex items-center gap-2
        px-5 py-2.5
        rounded-full
        bg-gray-900 text-white
        text-sm font-medium
        shadow-sm
        hover:bg-black
        hover:shadow-md
        transition-all
      "
    >
      Sign In →
    </Link>
  );
}

export default SignInButton;
