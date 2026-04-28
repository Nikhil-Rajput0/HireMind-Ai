"use client";
import FooterBar from "../_components/Footer/FooterBar";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white">
      <header className="lg:px-40 px-5 py-6 flex items-center justify-between backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-50">
        <Image alt="Logo" src={logo} height={90} width={90} />

        <Link
          href={"/"}
          className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </header>

      <main className="lg:px-40 px-5 py-16 flex justify-center">
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 lg:p-12 animate-fadeIn">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-sm">Last updated: 2025</p>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            <span className="font-semibold text-white">Disclaimer:</span> In
            case of any discrepancy, the English version will prevail.
          </p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <Section title="1. Introduction">
              Welcome to HireMind AI. Your privacy is important to us. This
              policy explains how we collect and use your data.
            </Section>

            <Section title="2. Information We Collect">
              <List title="Personal Information">
                <li>Name</li>
                <li>Email Address</li>
                <li>Account Credentials</li>
              </List>

              <List title="Usage Data">
                <li>Pages visited</li>
                <li>Features used</li>
                <li>AI interactions</li>
              </List>

              <List title="Uploaded Content">
                <li>Resumes</li>
                <li>Interview responses</li>
              </List>
            </Section>

            <Section title="3. How We Use Your Information">
              <ul className="list-disc pl-5 space-y-1">
                <li>Improve services</li>
                <li>Generate resumes</li>
                <li>AI mock interviews</li>
                <li>Enhance UX</li>
                <li>Ensure security</li>
              </ul>
            </Section>

            <Section title="4. Data Security">
              We apply strong security practices, but no system is 100% secure.
            </Section>

            <Section title="5. Data Sharing">
              We do not sell your data. We only share when legally required.
            </Section>

            <Section title="6. Cookies">
              Cookies help us improve performance and user experience.
            </Section>

            <Section title="7. Third-Party Services">
              We use trusted providers for hosting and analytics.
            </Section>

            <Section title="8. Your Rights">
              <ul className="list-disc pl-5 space-y-1">
                <li>Access your data</li>
                <li>Request deletion</li>
                <li>Stop using the service anytime</li>
              </ul>
            </Section>

            <Section title="9. Updates">
              This policy may change. Updates will be posted here.
            </Section>

            <Section title="10. Contact">
              📧{" "}
              <span className="underline text-green-400">
                nikhilrajpu236@gmail.com
              </span>
            </Section>
          </div>
        </div>
      </main>
      <FooterBar />
    </section>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl lg:text-2xl font-semibold text-white">{title}</h2>
      <div className="text-sm lg:text-base text-gray-300">{children}</div>
    </div>
  );
}

function List({ title, children }) {
  return (
    <div className="mt-3">
      <p className="font-semibold text-white mb-1">🔹 {title}</p>
      <ul className="list-disc pl-5 space-y-1 text-gray-300">{children}</ul>
    </div>
  );
}
