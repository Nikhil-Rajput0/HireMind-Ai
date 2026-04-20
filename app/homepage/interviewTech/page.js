import InterviewHeader from "@/app/_components/Interview Header/InterviewHeader";
import HrInterview from "@/app/_components/InterviewsCollection/HrInterview";

export const metadata = {
  title: `HireMind Ai | Tech Interview`,
  description: "Give Interview to real Ai Technical Hr.",
};

function Page() {
  return (
    <section>
      <div>
        <InterviewHeader type="Technical Interview" interviewType="technical" />
        <HrInterview />
      </div>
    </section>
  );
}

export default Page;
