"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignIn() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    router.push("/homepage");
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className=" text-gray-600">
          Your Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          name="email"
          required
          className="bg-gray-200 px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-2xl ring-1 ring-green-400"
        />
      </div>
      <div className="flex flex-col gap-1 pb-3">
        <label htmlFor="password" className=" text-gray-600">
          Your password
        </label>
        <input
          id="password"
          type="password"
          placeholder="pass@123"
          name="password"
          required
          className="bg-gray-200 px-3 py-1 shadow-2xl/50 focus:outline-green-400 ring-1 ring-green-400 rounded-2xl"
        />
      </div>
      <div className="flex items-center gap-3">
        <p className="text-[14px]">Don&apos;t remember Password</p>
        <Link href={"#"} className="text-[14px] underline text-green-600">
          Forget Password
        </Link>
      </div>
      <button
        type="submit"
        href={"/homepage"}
        className="w-full text-center py-2 bg-green-400 rounded-full hover:bg-green-500 font-medium cursor-pointer"
      >
        Sign in&rarr;
      </button>
      <div className="flex items-center gap-2 pt-3 pb-3">
        <input id="check" type="checkbox" name="remember-me" />
        <label htmlFor="check">Remember me</label>
      </div>
      <div className="flex items-center gap-2">
        <p>Don&apos;t have an account?</p>
        <Link
          href={"/authentication/signUp"}
          className="text-green-600 underline"
        >
          {" "}
          Sign Up now{" "}
        </Link>
      </div>
    </form>
  );
}

export default SignIn;
