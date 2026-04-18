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
      <div className="pl-9">
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
