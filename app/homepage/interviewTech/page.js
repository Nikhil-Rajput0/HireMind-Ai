import InterviewHeader from "@/app/_components/Interview Header/InterviewHeader";

export const metadata = {
  title: `HireMind Ai | Tech Interview`,
  description: "Give Interview to real Ai Technical Hr.",
};

function Page() {
  return (
    <section>
      <div>
        <InterviewHeader type="Technical Interview" interviewType="technical" />
        <div className="mb-[70vh] flex items-center justify-between px-13 py-2 mt-5 bg-slate-100 border border-slate-200 shadow-xl font-medium text-slate-900">
          <div className="flex flex-col items-center pl-7">
            <h3 className="text-blue-600">Name</h3>
            <p>First Interview</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-blue-600">Role</h3>
            <p>Software Engineer</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-blue-600">Score</h3>
            <p className="text-green-600 font-bold">10</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-blue-600">Output</h3>
            <p className="text-green-600 font-bold">Outstanding</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-green-500 cursor-pointer px-3 py-2 flex items-center rounded-full ">
              View Score
            </button>
            <button className="bg-red-500 cursor-pointer text-gray-100 px-3 py-2 flex items-center rounded-full ">
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
