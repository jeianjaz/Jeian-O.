"use client";

import { motion } from "framer-motion";
import { Sparkles } from "@/components/ui/aceternity/sparkles";
import { ShootingStarsBackground } from "@/components/ui/aceternity/shooting-stars-background";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden gradient-bg-hero"
    >
      <ShootingStarsBackground quantity={20} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight text-white">
              <Sparkles 
                className="inline-block" 
                colors={["#7AD63D", "#9fe76a", "#5ca82f", "#ffffff"]}
              >
                Jeian Jasper O.
              </Sparkles>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-xl md:text-3xl text-gray-300 mb-12">
              Hey I'm Jeian, I'm a frontend developer with a strong passion for building web applications with great user experiences.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="#contact"
              className="bg-[#7AD63D] hover:bg-[#5ca82f] text-[#12111a] px-8 py-4 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
            
            <motion.a
              href="#works"
              className="border border-[#7AD63D] text-[#7AD63D] hover:bg-[#7AD63D]/10 px-8 py-4 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
