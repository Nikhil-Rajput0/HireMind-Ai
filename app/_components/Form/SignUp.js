"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

function SignUp() {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    setInputValue({ name: "", email: "", password: "", passwordConfirm: "" });

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }
    router.push("/homepage");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="UserName" className=" text-gray-600">
          Username
        </label>
        <input
          id="UserName"
          type="text"
          placeholder="nikhil"
          value={inputValue.name}
          name="name"
          onChange={handleChange}
          required
          className="bg-gray-200 px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-2xl ring-1 ring-green-400"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className=" text-gray-600">
          Your Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          value={inputValue.email}
          name="email"
          onChange={handleChange}
          required
          className="bg-gray-200 px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-2xl ring-1 ring-green-400"
        />
      </div>
      <div className="flex flex-col gap-1 pb-3">
        <label htmlFor="password" className=" text-gray-600">
          Create a password
        </label>
        <input
          id="password"
          type="password"
          placeholder="pass@123"
          value={inputValue.password}
          onChange={handleChange}
          name="password"
          autoComplete="new-password"
          required
          className="bg-gray-200 px-3 py-1 shadow-2xl/50 focus:outline-green-400 ring-1 ring-green-400 rounded-2xl"
        />
      </div>
      <div className="flex flex-col gap-1 pb-3">
        <label htmlFor="passwordConfirm" className=" text-gray-600">
          Confirm Password
        </label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder="pass@123"
          value={inputValue.passwordConfirm}
          onChange={handleChange}
          name="passwordConfirm"
          autoComplete="new-password"
          required
          className="bg-gray-200 px-3 py-1 shadow-2xl/50 focus:outline-green-400 ring-1 ring-green-400 rounded-2xl"
        />
      </div>
      <button
        type="submit"
        href={"/homepage"}
        className="w-full text-center py-2 bg-green-400 rounded-full hover:bg-green-500 font-medium cursor-pointer"
      >
        Sign Up&rarr;
      </button>
      <div className="flex items-center gap-2 pt-3 pb-3 text-[11px]">
        <input id="check" type="checkbox" required name="checked" />
        <label htmlFor="check">
          By clicking you are agree with all terms and conditions.
        </label>
      </div>
      <div className="flex items-center gap-2">
        <p>Already have an account?</p>
        <Link
          href={"/authentication/signIn"}
          className="text-green-600 underline"
        >
          {" "}
          Sign In now{" "}
        </Link>
      </div>
    </form>
  );
}

export default SignUp;
