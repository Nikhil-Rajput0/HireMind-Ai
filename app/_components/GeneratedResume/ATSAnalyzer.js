"use client";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import userContext from "@/app/contexts/UserContext";

export default function ATSAnalyzer() {
  const [file, setFile] = useState(null);
  const [job, setJob] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUserData, userData } = useContext(userContext);

  // Validate DOCX file
  const isValidDocx = (file) => {
    const validType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    const isValid = file.type === validType || file.name.endsWith(".docx");

    if (!isValid) {
      toast.error("Only DOCX files are allowed");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return false;
    }

    return true;
  };

  // Handle file selection from input
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isValidDocx(selectedFile)) {
      setFile(selectedFile);
      toast.success(`"${selectedFile.name}" selected`);
    }
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidDocx(droppedFile)) {
      setFile(droppedFile);
      toast.success(`"${droppedFile.name}" selected`);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please upload a DOCX resume");
      return;
    }

    if (!job.trim()) {
      toast.error("Please paste a job description");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Analyzing your resume...");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", job);

    if (userData.credits < 20) return null;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/resume/analyze`,
        formData,
        { withCredentials: true },
      );

      if (res.data.status === "success") {
        setResult(res.data.data);
        toast.success("Analysis completed!", { id: loadingToast });
      } else {
        toast.error(res.data.message || "Analysis failed", {
          id: loadingToast,
        });
      }

      const userRes = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_UI}api/v1/users/updateCredits`,
        { credits: userData.credits },
        { withCredentials: true },
      );

      setUserData(userRes.data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || "Analysis failed", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setJob("");
    setResult(null);
    toast.success("Form reset");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ATS Resume Analyzer</h1>
        {result && (
          <button
            onClick={resetAnalysis}
            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Analyze Another
          </button>
        )}
      </div>

      {!result ? (
        <>
          <input
            id="file-input"
            type="file"
            accept=".docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("file-input")?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer
              ${
                file
                  ? "border-green-500 bg-green-500/10"
                  : "border-gray-600 hover:border-green-400 hover:bg-gray-800/50"
              }`}
          >
            {file ? (
              <div>
                <div className="text-green-400 text-4xl mb-2">✓</div>
                <p className="text-green-400 font-medium">{file.name}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Click or drag to change file
                </p>
              </div>
            ) : (
              <div>
                <div className="text-gray-400 text-4xl mb-2">📄</div>
                <p className="text-gray-400">Drag & Drop DOCX Resume Here</p>
                <p className="text-gray-500 text-sm mt-2">or click to browse</p>
                <p className="text-gray-600 text-xs mt-4">
                  Only DOCX files (Max 5MB)
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 mb-2 font-medium">
              Job Description *
            </label>
            <textarea
              placeholder="Paste the job description here..."
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none transition"
              rows={6}
            />
            <p className="text-gray-500 text-xs mt-1">
              {job.length} characters
            </p>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading || !file || !job.trim()}
            className="mt-6 w-full bg-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </>
            ) : (
              "Analyze Resume →"
            )}
          </button>
        </>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-linear-to-br from-green-600 to-green-800 p-6 rounded-xl text-center">
              <p className="text-green-200 text-sm">ATS Score</p>
              <p className="text-3xl font-bold">{result.atsScore || 0}%</p>
              <div className="w-full bg-green-900 rounded-full h-2 mt-2">
                <div
                  className="bg-green-300 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${result.atsScore || 0}%` }}
                />
              </div>
            </div>
            <div className="bg-linear-to-br from-blue-600 to-blue-800 p-6 rounded-xl text-center">
              <p className="text-blue-200 text-sm">Match Score</p>
              <p className="text-3xl font-bold">{result.matchScore || 0}%</p>
              <div className="w-full bg-blue-900 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-300 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${result.matchScore || 0}%` }}
                />
              </div>
            </div>
          </div>

          {result.sections && (
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Section Scores</h3>
              <div className="grid gap-3">
                {Object.entries(result.sections).map(([k, v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{k}</span>
                      <span className="text-gray-400">{v}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.missingKeywords?.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl">
              <h3 className="text-red-400 font-bold text-lg mb-3">
                Missing Keywords
              </h3>
              <div className="flex gap-2 flex-wrap">
                {result.missingKeywords.map((k, i) => (
                  <span
                    key={i}
                    className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.strengths?.length > 0 && (
            <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl">
              <h3 className="text-green-400 font-bold text-lg mb-3">
                Strengths
              </h3>
              {result.strengths.map((s, i) => (
                <p key={i} className="text-green-300">
                  ✓ {s}
                </p>
              ))}
            </div>
          )}

          {result.improvements?.length > 0 && (
            <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-xl">
              <h3 className="text-blue-400 font-bold text-lg mb-3">
                Improvements
              </h3>
              {result.improvements.map((imp, i) => (
                <p key={i} className="text-blue-300">
                  → {imp}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
