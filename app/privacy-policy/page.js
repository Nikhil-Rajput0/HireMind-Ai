import FooterBar from "../_components/Footer/FooterBar";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

export default function Page() {
  return (
    <section className="bg-[#ecebeb]">
      <header className="lg:px-40 px-5 py-10 flex items-center justify-between">
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
      <main className="lg:px-40 px-5 pt-10 text-black pb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl lg:text-3xl font-bold">
            HireMind Ai Privacy Notice
          </h2>
          <p className="text[14px] text-gray-900 pb-3">
            <span className="font-semibold">Disclaimer:</span> In the event of
            any discrepancy or conflict, the English version will prevail over
            the translation.
          </p>
        </div>
        <hr className="py-3" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <p className="text-xl lg:text-2xl font-bold">1. Introduction</p>
            <span className="text-[14px] lg:text-[16px] text-gray-900">
              Welcome to HireMind AI. Your privacy is important to us. This
              Privacy Policy explains how we collect, use, and protect your
              information when you use our platform. By using HireMind AI, you
              agree to the terms of this policy.
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xl lg:text-2xl font-bold">
              2. Information We Collect
            </p>
            <div className="text-[15px] text-gray-900 flex flex-col gap-1">
              <p>We may collect the following types of information:</p>

              <p className="text-[14px] lg:text-[16px] font-bold">
                🔹 Personal Information
              </p>
              <ul className="pl-7 text-[14px] lg:text-[16px] list-disc list-inside">
                <li> Name</li>
                <li>Email Address</li>
                <li>Account credentials </li>
              </ul>
              <p className="text-[14px] lg:text-[16px] font-bold">
                🔹 Usage Data
              </p>
              <ul className="pl-7 text-[14px] lg:text-[16px] list-disc list-inside">
                <li>Pages Visited</li>
                <li>Features used (interviews, resume tools)</li>
                <li>Interaction with AI features </li>
              </ul>
              <p className="text-[14px] lg:text-[16px] font-bold">
                🔹 Uploaded Content{" "}
              </p>
              <ul className="pl-7 text-[14px] lg:text-[16px] list-disc list-inside">
                <li>Resumes</li>
                <li>Interview responses (text or voice)</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xl lg:text-2xl  font-bold">
              3. How We Use Your Information
            </p>
            <div className="text-[14px] lg:text-[16px] text-gray-900 flex flex-col gap-1">
              <p className="text-[15px]">We use your information to:</p>
              <ul className="pl-7 text-[14px] lg:text-[16px] list-disc list-inside">
                <li>Provide and improve our services</li>
                <li>Generate resumes and analyze them</li>
                <li>Conduct AI-based mock interviews </li>
                <li>Enhance user experience</li>
                <li> Ensure platform security</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xl lg:text-2xl font-bold">4. Data Security</p>
            <p className="text-[14px] lg:text-[16px] text-gray-900">
              We take appropriate security measures to protect your data.
              However, no online platform is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xl lg:text-2xl  font-bold">5. Data Sharing</p>
            <div className="text-[14px] lg:text-[16px] text-gray-900 flex flex-col gap-1">
              <p className="text-[15px]">
                We do not sell, trade, or rent your personal information to
                third parties.
              </p>
              <p className="text-[15px]"> We may share data only: </p>
              <ul className="pl-7 text-[14px] lg:text-[16px] list-disc list-inside">
                <li>To comply with legal obligations</li>
                <li>To protect our rights and users</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xl lg:text-2xl  font-bold">6. Cookies</p>
            <div className="text-[16px] text-gray-900 flex flex-col gap-1">
              <p className="text-[15px]">HireMind AI may use cookies to: </p>
              <ul className="pl-7 text-[14px] lg:text-[16px] list-disc list-inside">
                <li>Improve performance </li>
                <li>Understand user behavior </li>
                <li>You can disable cookies in your browser settings.</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xl lg:text-2xl  font-bold">
              7. Third-Party Services
            </p>
            <p className="text-[14px] lg:text-[16px] text-gray-900">
              We may use trusted third-party services (e.g., hosting,
              analytics). These services may collect limited data as required
              for functionality.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xl lg:text-2xl  font-bold">8. Your Rights</p>
            <div className="text-[16px] text-gray-900 flex flex-col gap-1">
              <p className="text[15px]">You have the right to: </p>
              <ul className="pl-7 text-[14px] lg:text-[16px] list-disc list-inside">
                <li>Access your data</li>
                <li>Request deletion of your data</li>
                <li> Stop using the service at any time</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xl lg:text-2xl  font-bold">
              9. Changes to This Policy
            </p>
            <p className="text-[14px] lg:text-[16px] text-gray-900">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xl lg:text-2xl  font-bold">10. Contact Us</p>
            <div className="text-[14px] lg:text-[16px] text-gray-900 flex flex-col gap-1">
              <p> If you have any questions, </p>
              <p>
                contact us at: 📧{" "}
                <span className="underline">nikhilrajpu236@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <FooterBar />
      </footer>
    </section>
  );
}
