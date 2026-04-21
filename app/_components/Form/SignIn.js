"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function SignIn() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/login`,
        {
          email: inputValue.email,
          password: inputValue.password,
        },
        { withCredentials: true },
      );
      toast.success(res.data.message);
      window.location.href = "/homepage";
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form
      suppressHydrationWarning={true}
      className="flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className=" text-gray-600">
          Your Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          name="email"
          value={inputValue.email}
          onChange={handleChange}
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
          value={inputValue.password}
          onChange={handleChange}
          required
          className="bg-gray-200 px-3 py-1 shadow-2xl/50 focus:outline-green-400 ring-1 ring-green-400 rounded-2xl"
        />
      </div>
      <div className="flex items-center gap-3">
        <p className="text-[12px] sm:text-[14px]">
          Don&apos;t remember Password
        </p>
        <Link
          href={"/authentication/forgetPassword"}
          className="text-[14px] underline text-green-600"
        >
          Forget Password
        </Link>
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`w-full text-center py-2 ${loading ? "bg-gray-300" : "bg-green-400"}  rounded-full ${loading ? "" : "hover:bg-green-500"}  font-medium ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        {loading ? "Submitting..." : <span>Sign in&rarr;</span>}
      </button>
      <div className="flex items-center gap-2 pt-3 pb-3">
        <input id="check" type="checkbox" name="remember-me" />
        <label htmlFor="check">Remember me</label>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm sm:text-md">Don&apos;t have an account?</p>
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
