"use client";

import Image from "next/image";
import { HeroHighlight } from "@/components/ui/aceternity/hero-highlight";
import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/ui/animations/scroll-reveal";

// Import the shooting stars background with client-side only rendering
const ShootingStarsBackground = dynamic(
  () => import("@/components/ui/aceternity/shooting-stars-background").then(mod => mod.ShootingStarsBackground),
  { ssr: false }
);
import { ClientSparkles } from "@/components/ui/aceternity/client-sparkles";
import { GlowingEffect } from "@/components/ui/aceternity/glowing-effect";
import { AnimatedHeading, ScrollFloat } from "@/components/ui/animations/scroll-float";
import { TextAnimator } from "@/components/ui/aceternity/text-animator";

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
        {/* Hero section with animated heading */}
        <div className="mb-20">
          <AnimatedHeading 
            className="text-4xl md:text-6xl font-bold text-center text-white" 
            tag="h1"
            underline={true}
          >
            About Me
          </AnimatedHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo column with glowing effect */}
          <ScrollReveal direction="none" duration={0.8} className="relative">
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
          </ScrollReveal>

          {/* Content column */}
          <div className="space-y-8">
            {/* Introduction with rotating text */}
            <div>
              <ScrollFloat direction="up" distance={20} duration={0.6} className="mb-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Hello, I&apos;m Jeian
                </h2>
              </ScrollFloat>
              
              <div className="flex items-center mb-6">
                <TextAnimator 
                  words={skills} 
                  className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 inline-block text-transparent bg-clip-text"
                  interval={3000}
                />
              </div>
              
              <ScrollFloat
                className="text-lg text-gray-300 leading-relaxed"
                distance={20}
                direction="up"
                delay={0.2}
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
              
              <ScrollFloat
                direction="up"
                distance={20}
                delay={0.3}
                className="mt-8"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">Personal Note</h3>
                <p className="text-gray-300 italic border-l-2 border-white/20 pl-4">
                  &quot;I&apos;m always exploring new technologies, especially AI-driven development and innovative tools 
                  that enhance efficiency. When I&apos;m not coding, I enjoy diving into design trends and working 
                  on personal projects to sharpen my skills.&quot;
                </p>
              </ScrollFloat>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
