import Image from "next/image";
import logo from "../public/logo.png";
import Header from "./_components/Headers/Header";
import SignInButton from "./_components/Headers/SignInButton";
import Hero from "./_components/Hero/Hero";
import AutoSlider from "./_components/CompaniesSlider/AutoSlider";
import OurFeatures from "./_components/Features/OurFeatures";
import Reviews from "./_components/Reviews/Reviews";
import Subscription from "./_components/Price/Subscription";
import Contact from "./_components/Contacts/Contact";
import FooterBar from "./_components/Footer/FooterBar";
import FreaquentlyAskQues from "./_components/Q&A/FreaquentlyAskQues";

export default function Page() {
  return (
    <>
      <header className="bg-linear-to-r from-green-100 to-green-300 backdrop-blur-3xl z-100 right-0 leading-0 w-full px-10 py-5">
        <nav className="flex px-5 w-full py-2 bg-white border-amber-200  justify-between items-center rounded-full">
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
