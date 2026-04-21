import React from "react";
import OurFeatures from "../_components/Features/OurFeatures";
import Reviews from "../_components/Reviews/Reviews";
import Subscription from "../_components/Price/Subscription";
import Hero from "../_components/Hero/Hero";
import FreaquentlyAskQues from "../_components/Q&A/FreaquentlyAskQues";
import Contact from "../_components/Contacts/Contact";

function Page() {
  return (
    <>
      <div className="lg:pl-9 lg:-mt-25 -mt-15">
        <Hero />
      </div>
      <OurFeatures />
      <Reviews />
      <Subscription />
      <FreaquentlyAskQues />
      <Contact />
    </>
  );
}

export default Page;
