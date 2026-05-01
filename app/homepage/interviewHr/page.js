import InterviewHeader from "@/app/_components/Interview Header/InterviewHeader";
import HrInterview from "@/app/_components/InterviewsCollection/HrInterview";

export const metadata = {
  title: `Hr Interview`,
  description: "Give Interview to real Ai Hr.",
};

function Page() {
  return (
    <section>
      <div>
        <InterviewHeader type="Hr Interview" interviewType="hr" />
        <HrInterview type="hr" />
      </div>
    </section>
  );
}

export default Page;
