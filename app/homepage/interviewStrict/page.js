import InterviewHeader from "@/app/_components/Interview Header/InterviewHeader";
import HrInterview from "@/app/_components/InterviewsCollection/HrInterview";

export const metadata = {
  title: `HireMind Ai | Strict Interview`,
  description: "Give Interview to real Strict Ai Hr.",
};

function Page() {
  return (
    <section>
      <div>
        <InterviewHeader type="Strict Interview" interviewType="strict" />
        <HrInterview />
      </div>
    </section>
  );
}

export default Page;
