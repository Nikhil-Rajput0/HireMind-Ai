import Image from "next/image";
import logo from "@/public/logo.png";
import Header from "@/app/_components/Headers/Header";
import SignInButton from "@/app/_components/Headers/SignInButton";
import Hero from "@/app/_components/Hero/Hero";
import OurFeatures from "@/app/_components/Features/OurFeatures";
import AutoSlider from "@/app/_components/CompaniesSlider/AutoSlider";
import Reviews from "@/app/_components/Reviews/Reviews";
import Subscription from "@/app/_components/Price/Subscription";
import Contact from "@/app/_components/Contacts/Contact";
import FooterBar from "@/app/_components/Footer/FooterBar";
import FreaquentlyAskQues from "@/app/_components/Q&A/FreaquentlyAskQues";

export default function Page() {
  return (
    <>
      <header className="fixed top-0 w-full z-50 px-4 md:px-10 py-4">
        <nav
          className="
      max-w-7xl mx-auto
      flex items-center justify-between
      px-5 py-3
      rounded-full
      bg-white/70 backdrop-blur-xl
      border border-gray-200/60
      shadow-sm
    "
        >
          <Image alt="Logo" src={logo} width={120} height={120} />

          <Header />
          <SignInButton />
        </nav>
      </header>
      <main>
        <Hero />
        <AutoSlider />
        <OurFeatures />
        <Reviews />
        <Subscription />
        <FreaquentlyAskQues />
        <Contact />
      </main>
      <footer>
        <FooterBar />
      </footer>
    </>
  );
}
