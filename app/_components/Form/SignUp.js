"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useState } from "react";
import axios from "axios";
import userContext from "@/app/contexts/UserContext";
import toast from "react-hot-toast";

function SignUp() {
  const { inputValue, setInputValue } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }
    if (inputValue.password !== inputValue.passwordConfirm) {
      toast.error("passwordConfirm not match");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/sendOtp`,
        {
          email: inputValue.email,
        },
        { withCredentials: true },
      );
      toast.success(res.data.message);

      Cookies.set("inputValue", JSON.stringify(inputValue), {
        expires: 1 / 144,
        sameSite: "lax",
      });

      router.push("/authentication/signUp/signUpVerify");
    } catch (error) {
      toast.error(error.reponse.data.message);
      console.log(error.response);
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
        <label htmlFor="UserName" className=" text-gray-600">
          Username
        </label>
        <input
          id="UserName"
          type="text"
          placeholder="Adam"
          value={inputValue.name}
          name="name"
          onChange={handleChange}
          required
          className="bg-gray-200 text-black px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-2xl ring-1 ring-green-400"
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
          className="bg-gray-200 text-black px-3 py-1 shadow-2xl/50 focus:outline-green-400 rounded-2xl ring-1 ring-green-400"
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
          className="bg-gray-200 text-black px-3 py-1 shadow-2xl/50 focus:outline-green-400 ring-1 ring-green-400 rounded-2xl"
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
          className="bg-gray-200 px-3 text-black py-1 shadow-2xl/50 focus:outline-green-400 ring-1 ring-green-400 rounded-2xl"
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`w-full text-center py-2 ${loading ? "bg-gray-300" : "bg-green-400"}  rounded-full ${loading ? "" : "hover:bg-green-500"}  font-medium ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        {loading ? "Submitting..." : <span>Sign Up&rarr;</span>}
      </button>
      <div className="flex items-center gap-2 pt-3 pb-3 text-[11px]">
        <input id="check" type="checkbox" required name="checked" />
        <label htmlFor="check" className="text-black">
          By clicking you are agree with all terms and conditions.
        </label>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm sm:text-md text-black">
          Already have an account?
        </p>
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
