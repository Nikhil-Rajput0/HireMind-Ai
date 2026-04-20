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
      <header
        style={{ zIndex: 400 }}
        className="fixed top-0 z-50 bg-linear-to-r from-green-100 to-green-300 backdrop-blur-xl w-full px-4 md:px-10 py-4"
      >
        <nav className="flex w-full px-4 py-2 bg-white justify-between items-center rounded-full relative z-50 shadow-sm">
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
