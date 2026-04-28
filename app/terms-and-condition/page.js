"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import FooterBar from "../_components/Footer/FooterBar";

export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white">
      <header className="lg:px-40 px-5 py-6 flex items-center justify-between backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-50">
        <Image alt="Logo" src={logo} height={90} width={90} />

        <Link
          href="/"
          className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </header>

      <main className="lg:px-40 px-5 py-16 flex justify-center">
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 lg:p-12 animate-fadeIn">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-gray-400 text-sm mt-1">Last updated: 2025</p>
          </div>

          <p className="text-gray-300 mb-6 text-sm lg:text-base">
            Welcome to HireMind AI. By accessing or using our platform, you
            agree to these Terms and Conditions.
          </p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <Section title="1. Use of Services">
              <p>HireMind AI provides AI-powered tools including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Mock interviews</li>
                <li>Resume generation</li>
                <li>Resume analysis and scoring</li>
              </ul>
              <p className="mt-2">
                You agree to use these services responsibly and legally.
              </p>
            </Section>

            <Section title="2. User Accounts">
              <ul className="list-disc pl-5 space-y-1">
                <li>Create an account for access</li>
                <li>Keep credentials secure</li>
                <li>Provide accurate information</li>
              </ul>
            </Section>

            <Section title="3. Acceptable Use">
              <p>You agree NOT to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Use the platform illegally</li>
                <li>Upload harmful or misleading content</li>
                <li>Hack or disrupt the system</li>
                <li>Copy or exploit content</li>
              </ul>
            </Section>

            <Section title="4. Intellectual Property">
              All platform content, design, and AI systems belong to HireMind AI
              and are legally protected.
            </Section>

            <Section title="5. AI Disclaimer">
              AI-generated outputs (resumes, interviews, scores) are for
              guidance only and do not guarantee job success.
            </Section>

            <Section title="6. Limitation of Liability">
              <ul className="list-disc pl-5 space-y-1">
                <li>No responsibility for job outcomes</li>
                <li>No guarantee of AI accuracy</li>
                <li>No liability for damages</li>
              </ul>
            </Section>

            <Section title="7. Termination">
              We may suspend or terminate accounts for violations.
            </Section>

            <Section title="8. Changes to Terms">
              Terms may be updated anytime. Continued use means acceptance.
            </Section>

            <Section title="9. Third-Party Services">
              We may use third-party tools. Their policies apply separately.
            </Section>

            <Section title="10. Governing Law">
              These terms are governed by applicable laws in your jurisdiction.
            </Section>

            <Section title="11. Contact">
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
