"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeroHighlight } from "@/components/ui/aceternity/hero-highlight";
import dynamic from "next/dynamic";

// Import the shooting stars background with client-side only rendering
const ShootingStarsBackground = dynamic(
  () => import("@/components/ui/aceternity/shooting-stars-background").then(mod => mod.ShootingStarsBackground),
  { ssr: false }
);
import { RotatingText } from "@/components/ui/reactbits/rotating-text";
import { ScrollFloat } from "@/components/ui/reactbits/scroll-float";
import { ClientSparkles } from "@/components/ui/aceternity/client-sparkles";
import { LampEffect } from "@/components/ui/aceternity/lamp-effect";
import { GlowingEffect } from "@/components/ui/aceternity/glowing-effect";

export default function About() {
  // Rotating text options for skills
  const skills = ["Frontend Developer", "UI/UX Enthusiast", "Web Designer", "Next.js Developer"];
  
  return (
    <section id="about" className="relative min-h-screen w-full overflow-hidden py-20 flex items-center justify-center">
      {/* Space background with shooting stars */}
      <ShootingStarsBackground
        quantity={100}
        starSize={1}
        className="absolute inset-0 z-0"
      />
      
      <div className="container mx-auto max-w-6xl z-10 px-4">
        {/* Hero section */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-center text-white mb-20"
        >
          About Me
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo column with glowing effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="relative"
          >
            <GlowingEffect>
              <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/assets/pfpforportfolio.jpg"
                  alt="Jeian Jasper O."
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  priority
                />
                <ClientSparkles
                  className="absolute inset-0 z-10"
                  colors={["#FFFFFF"]}
                  minSize={1}
                  maxSize={2}
                  sparklesEnabled={true}
                />
              </div>
            </GlowingEffect>
          </motion.div>

          {/* Content column */}
          <div className="space-y-8">
            {/* Introduction with rotating text */}
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
              >
                Hello, I'm Jeian
              </motion.h2>
              
              <div className="flex items-center mb-6">
                <span className="text-xl text-gray-300 mr-2">I'm a</span>
                <RotatingText 
                  words={skills} 
                  className="text-xl font-semibold text-white"
                  duration={2000}
                />
              </div>
              
              <ScrollFloat
                className="text-lg text-gray-300 leading-relaxed"
                distance={10}
                direction="up"
              >
                <p>
                  A junior-year college student passionate about creating modern web experiences. 
                  I specialize in building intuitive, accessible, and high-performance user interfaces 
                  using cutting-edge technologies.
                </p>
              </ScrollFloat>
            </div>
            
            {/* Skills and interests */}
            <div className="mt-8">
              <HeroHighlight className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-4">What I Do</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Develop responsive and accessible web applications</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Create intuitive user interfaces with modern design principles</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Build performant web experiences with Next.js and React</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Implement animations and interactive elements for engaging UX</span>
                  </li>
                </ul>
              </HeroHighlight>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">Personal Note</h3>
                <p className="text-gray-300 italic border-l-2 border-white/20 pl-4">
                  "I'm always exploring new technologies, especially AI-driven development and innovative tools 
                  that enhance efficiency. When I'm not coding, I enjoy diving into design trends and working 
                  on personal projects to sharpen my skills."
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
