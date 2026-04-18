"use client";
import Image from "next/image";
import reviews from "../../../public/review.jpg";
import { motion } from "framer-motion";

function ReviewsSlider() {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{ ease: "linear", repeat: Infinity, duration: "25" }}
      className="pl-5 w-max"
    >
      <Image
        quality={75}
        alt="reviews"
        objectFit="cover"
        src={reviews}
        height="auto"
        width={"auto"}
        className="h-80 min-w-100 rounded-lg ring-1 ring-gray-500/50 shadow-lg/50"
      />
    </motion.div>
  );
}

export default ReviewsSlider;
