import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import FooterBar from "../_components/Footer/FooterBar";

function Page() {
  return (
    <section className="bg-[#c0bfbf] pb-20">
      <header className="px-40 py-10 flex items-center justify-between">
        <div>
          <Image alt="Logo" src={logo} height={120} width={120} />
        </div>
        <Link
          href={"/"}
          className="px-5 py-3 ring-1 bg-green-500 text-white ring-green-400 hover:ring-green-300 cursor-pointer shadow-2xl rounded-full"
        >
          &larr;Back to home
        </Link>
      </header>
      <main className="px-40 flex flex-col gap-5 pt-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-bold">
            HireMind Ai: Terms and condition
          </h3>
          <p className="text-[15px]">
            Welcome to HireMind AI. By accessing or using our platform, you
            agree to be bound by these Terms and Conditions. If you do not
            agree, please do not use our services.
          </p>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-xl font-semibold">1.Use of Services</h3>
            <p className="text-[15px]">
              HireMind AI provides AI-powered tools including:
            </p>
            <ul className="pl-4 list-disc list-inside">
              <li>Mock interviews</li>
              <li>Resume generation</li>
              <li>Resume analysis and scoring</li>
            </ul>
            <p className="text-[15px]">
              You agree to use these services only for lawful purposes and in a
              responsible manner.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">2.User Accounts</h3>
            <ul className="pl-4 list-disc list-inside">
              <li>
                You may be required to create an account to access certain
                features.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials.
              </li>
              <li>You agree to provide accurate and up-to-date information.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">3.Acceptable Use</h3>
            <p className="text-[15px]">You agree not to:</p>
            <ul className="pl-4 list-disc list-inside">
              <li>Use the platform for illegal or harmful activities</li>
              <li>Upload false, misleading, or harmful content</li>
              <li>Attempt to hack, disrupt, or misuse the system</li>
              <li>Copy, distribute, or exploit content without permission</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">4.Intellectual Property</h3>
            <p className="text-[15px]">
              All content, features, and functionality on HireMind AI—including
              text, design, and AI systems—are the property of HireMind AI and
              are protected by applicable laws.
            </p>

            <p className="text-[15px]">
              You may not reproduce or redistribute any part of the platform
              without permission.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              5.AI-Generated Content Disclaimer
            </h3>
            <p className="text-[15px]">
              HireMind AI provides AI-generated outputs such as:
            </p>
            <ul className="pl-4 list-disc list-inside">
              <li>Interview responses</li>
              <li>Resume suggestions</li>
              <li>Resume scores</li>
            </ul>
            <p className="text-[15px]">
              These are for guidance purposes only and do not guarantee job
              placement or accuracy.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">6.Limitation of Liability</h3>
            <p className="text-[15px]">HireMind AI is not responsible for:</p>
            <ul className="pl-4 list-disc list-inside">
              <li>Job outcomes or hiring decisions</li>
              <li>Errors or inaccuracies in AI-generated content</li>
              <li>Any loss or damage resulting from use of the platform</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">7.Termination</h3>
            <p className="text-[15px]">We reserve the right to:</p>
            <ul className="pl-4 list-disc list-inside">
              <li>Suspend or terminate accounts</li>
              <li>Restrict access to services</li>
            </ul>
            <p className="text-[15px]">if users violate these terms.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">8.Changes to Terms</h3>
            <p className="text-[15px]">
              We may update these Terms and Conditions at any time. Changes will
              be effective once posted on this page.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">9.Third-Party Services</h3>
            <p className="text-[15px]">
              Our platform may use third-party tools or services. We are not
              responsible for their policies or actions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">10.Governing Law</h3>
            <p className="text-[15px]">
              These Terms shall be governed by and interpreted in accordance
              with the laws of your jurisdiction.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">11.Contact Us</h3>
            <p className="text-[15px]">
              If you have any questions regarding these Terms, contact us at:
            </p>
            <p className="underline text-[15px]">nikhilrajpu236@gmail.com</p>
          </div>
        </div>
      </main>
      <footer>
        <FooterBar />
      </footer>
    </section>
  );
}

export default Page;
