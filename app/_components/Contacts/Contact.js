// Contact.js
"use client";
import { motion } from "framer-motion";
import ContactOptions from "./ContactOptions";
import Form from "./Form";

function Contact() {
  return (
    <section
      id="support"
      className="px-2 text-sm md:text-md sm:px-9 md:px-0 py-6 overflow-hidden pb-20"
    >
      <div className="text-center py-4 md:py-12 lg:pt-12 lg:pb-9 text-[27px] lg:text-[4vw] uppercase">
        <h3 className="text-center text-lg lg:text-3xl text-[#21650c] font-semibold">
          Drop Your Issue
        </h3>
      </div>
      <motion.div
        suppressHydrationWarning={true}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "100px" }}
        className=" lg:px-32 lg:py-4"
      >
        <div className=" px-10">
          <div className="md:grid md:grid-cols-2 items-center">
            <ContactOptions />
            <Form />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
