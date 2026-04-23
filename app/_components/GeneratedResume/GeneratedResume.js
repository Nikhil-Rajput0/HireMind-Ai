"use client";
import userContext from "@/app/contexts/UserContext";
import { useContext, useState } from "react";
import Link from "next/link";
import { IoTrashBin } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";

function GeneratedResume() {
  const [loading, setLoading] = useState(false);
  const { generatedResume, setGeneratedResume } = useContext(userContext);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/resume/${id}`,
      );
      toast.success("Resume Deleted Success");
      setGeneratedResume((prev) =>
        prev.filter((prevData) => prevData._id != id),
      );
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {generatedResume?.map((resumes) => {
        return (
          <div
            key={resumes._id}
            className="w-full flex flex-col items-center px-13 py-2 mt-5 bg-slate-100 border border-slate-200 shadow-xl font-medium text-slate-900"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-center pl-7">
                <h3 className="text-blue-600">Name</h3>
                <p>{resumes.name}</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-blue-600">Role</h3>
                <p>{resumes.role}</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-blue-600">Template</h3>
                <p className="text-green-800 font-semibold">
                  {resumes.template}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-blue-600">ATS Score</h3>
                <p className="text-green-800 font-semibold">{resumes.score}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  aria-disabled={loading}
                  href={`/myResume/${resumes._id}`}
                  className="bg-green-500 cursor-pointer px-3 py-2 flex items-center rounded-full "
                >
                  View Resume
                </Link>
                <button
                  key={resumes._id}
                  disabled={loading}
                  onClick={() => handleDelete(resumes._id)}
                  className={`${loading ? "bg-gray-200" : "bg-red-500"} ${loading ? "cursor-not-allowed" : "cursor-pointer"} px-3 text-gray-100  py-2 flex items-center rounded-full `}
                >
                  <IoTrashBin /> Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GeneratedResume;
