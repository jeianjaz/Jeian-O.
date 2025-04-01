"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Skills() {
  // First row of skills - only include actual skills from the original list
  const techStackRow1 = [
    { name: "HTML", image: "/assets/html.png", color: "#E34F26" },
    { name: "CSS", image: "/assets/css.png", color: "#1572B6" },
    { name: "JavaScript", image: "/assets/js.png", color: "#F7DF1E" },
    { name: "TypeScript", image: "/assets/ts.webp", color: "#3178C6" },
    { name: "Tailwind CSS", image: "/assets/tailwind.png", color: "#06B6D4" },
    { name: "React", image: "/assets/react.png", color: "#61DAFB" },
    { name: "Next.js", image: "/assets/nextjs.png", color: "#000000" },
    { name: "Firebase", image: "/assets/firebase.png", color: "#FFCA28" },
    // Duplicate first few items to create seamless loop
    { name: "HTML", image: "/assets/html.png", color: "#E34F26" },
    { name: "CSS", image: "/assets/css.png", color: "#1572B6" },
    { name: "JavaScript", image: "/assets/js.png", color: "#F7DF1E" },
  ];

  // Second row of skills - only include actual skills from the original list
  const techStackRow2 = [
    { name: "Figma", image: "/assets/figma.webp", color: "#F24E1E" },
    { name: "Git", image: "/assets/github.png", color: "#F05032" },
    { name: "GitHub", image: "/assets/github.png", color: "#181717" },
    // Duplicate to create seamless loop
    { name: "Figma", image: "/assets/figma.webp", color: "#F24E1E" },
    { name: "Git", image: "/assets/github.png", color: "#F05032" },
    { name: "GitHub", image: "/assets/github.png", color: "#181717" },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg mb-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="inline-block mr-2">&lt;/&gt;</span>
              Skills
            </h2>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Creative decorative elements */}
        <div className="absolute left-0 right-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-20 h-20 rounded-full bg-blue-400 blur-xl"></div>
          <div className="absolute top-40 right-1/3 w-32 h-32 rounded-full bg-purple-400 blur-xl"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 rounded-full bg-pink-400 blur-xl"></div>
        </div>

        {/* Continuous scrolling skills - first row (left to right) */}
        <div className="relative overflow-hidden py-4 mb-8">
          <motion.div
            className="flex gap-8 py-4"
            animate={{ x: [0, -1500] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear"
              }
            }}
          >
            {techStackRow1.map((tech, index) => (
              <motion.div 
                key={`${tech.name}-${index}`}
                className="flex items-center gap-3 bg-white px-6 py-3 rounded-full whitespace-nowrap shadow-md"
                style={{ border: `2px solid ${tech.color}30` }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: `0 0 15px ${tech.color}50`,
                  border: `2px solid ${tech.color}` 
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-7 h-7 relative flex items-center justify-center">
                  <Image
                    src={tech.image}
                    alt={tech.name}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Continuous scrolling skills - second row (right to left) */}
        <div className="relative overflow-hidden py-4">
          <motion.div
            className="flex gap-8 py-4"
            animate={{ x: [-1500, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25, // Slightly different speed for visual interest
                ease: "linear"
              }
            }}
          >
            {techStackRow2.map((tech, index) => (
              <motion.div 
                key={`${tech.name}-${index}`}
                className="flex items-center gap-3 bg-white px-6 py-3 rounded-full whitespace-nowrap shadow-md"
                style={{ border: `2px solid ${tech.color}30` }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: `0 0 15px ${tech.color}50`,
                  border: `2px solid ${tech.color}` 
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-7 h-7 relative flex items-center justify-center">
                  <Image
                    src={tech.image}
                    alt={tech.name}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skill level indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 italic">
            &ldquo;The only way to do great work is to love what you do.&rdquo; — Steve Jobs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
