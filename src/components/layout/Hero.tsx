"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import SparkleButton from "@/components/ui/SparkleButton";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Jeian Jasper O.
        </h1>
        <h2 className="text-5xl md:text-6xl font-medium mb-10">
          Frontend Developer
        </h2>
        <TextReveal 
          text="Hey I'm Jeian! I'm a frontend developer passionate about creating beautiful and functional web experiences."
          className="text-xl md:text-2xl max-w-2xl mx-auto mb-12"
        />
        <div className="mt-10">
          <SparkleButton>
            View My Work
          </SparkleButton>
        </div>
      </motion.div>
    </section>
  );
}
