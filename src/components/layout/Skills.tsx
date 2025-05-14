"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Import the shooting stars background with client-side only rendering
const ShootingStarsBackground = dynamic(
  () => import("@/components/ui/aceternity/shooting-stars-background").then(mod => mod.ShootingStarsBackground),
  { ssr: false }
);
import { LampEffect } from "@/components/ui/aceternity/lamp-effect";
import SkillsRadar from "./Skills_Radar";

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen w-full overflow-hidden">
      {/* Space background with shooting stars */}
      <ShootingStarsBackground
        quantity={100}
        starSize={1}
        className="absolute inset-0 z-0"
      />
      
      <div className="container mx-auto max-w-6xl z-10 px-4 py-20">
        
        {/* Skill Radar Visualization */}
        <div className="w-full">
          <SkillsRadar />
        </div>
        
        {/* Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 italic">
            &ldquo;The only way to do great work is to love what you do.&rdquo; — Steve Jobs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
