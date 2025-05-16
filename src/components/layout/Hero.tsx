"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "@/components/ui/aceternity/sparkles";
import dynamic from "next/dynamic";
import React, { useState, useEffect, memo } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { OGLParticles } from "@/components/ui/animations/ogl-particles";
import { ScrollReveal } from "@/components/ui/animations/scroll-reveal";

// Import ShootingStarsBackground with dynamic loading to improve initial load time
const ShootingStarsBackground = dynamic(
  () => import("@/components/ui/aceternity/shooting-stars-background").then(mod => mod.ShootingStarsBackground),
  { ssr: false }
);

// Memoize the Hero component to prevent unnecessary re-renders
const Hero = memo(function Hero() {
  const [text, setText] = useState("FRONT-END DEVELOPER");
  
  useEffect(() => {
    const texts = ["FRONT-END DEVELOPER", "UI/UX DESIGNER"];
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setText(texts[currentIndex]);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden gradient-bg-hero"
    >
      {/* Particles background with rotation enabled and mouse interaction disabled */}
      <OGLParticles 
        count={120}
        color="#ffffff"
        mouseInteraction={false}
        rotation={true}
        className="opacity-80"
      />
      
      {/* Shooting stars background */}
      <ShootingStarsBackground quantity={15} />
      
      <div className="container mx-auto px-4 relative z-10 will-change-transform">
        <div className="flex flex-col items-center justify-center text-center">
          <ScrollReveal direction="up" duration={0.8} className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              <Sparkles 
                className="inline-block" 
                colors={["#7AD63D", "#9fe76a", "#5ca82f", "#ffffff"]}
              >
                Jeian Jasper O.
              </Sparkles>
            </h1>
            <div className="relative mt-8 mb-10 md:mb-8 text-white text-center min-h-[2.5em] sm:min-h-[2em]">
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={text}
                  className="w-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {text}
                </motion.h2>
              </AnimatePresence>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" duration={0.8} delay={0.3} className="mt-4">
            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Hey I&apos;m Jeian, a frontend developer passionate about creating web applications with exceptional user experiences.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" duration={0.8} delay={0.6} className="flex flex-wrap justify-center">
            <motion.a
              href="#projects"
              style={{
                backgroundColor: '#000000',
                color: '#7AD63D',
                border: '1px solid rgba(122, 214, 61, 0.3)',
                padding: '16px 40px',
                borderRadius: '8px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                width: '250px'
              }}
              whileHover={{
                scale: 1.03,
                borderColor: 'rgba(122, 214, 61, 0.6)'
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span>View My Work</span>
              <IconArrowRight 
                style={{ width: '20px', height: '20px', color: '#7AD63D' }}
                stroke={2}
              />
            </motion.a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
});

export default Hero;
