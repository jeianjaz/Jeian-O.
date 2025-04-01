"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md mx-auto md:ml-0"
          >
            <div className="absolute inset-0 border-2 border-black -rotate-3 rounded-lg"></div>
            <div className="absolute inset-0 border-2 border-black rotate-3 rounded-lg"></div>
            <div className="relative rounded-lg overflow-hidden border-2 border-black">
              <Image
                src="/assets/pfpforportfolio.jpg"
                alt="Jeian Jasper O."
                width={400}
                height={400}
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="group relative">
              {/* Glow effect layers */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300 z-0"></div>
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-500/50 transition-colors duration-300"></div>
              
              {/* Content */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative z-10">
                <div className="mb-4">
                  <p className="text-xl leading-relaxed">
                    Hello! I&apos;m <span className="font-bold text-blue-600">Jeian</span>, a <span className="bg-blue-100 px-2 py-0.5 rounded-md">junior-year college</span> student and passionate Frontend Developer focused on building modern web experiences.
                  </p>
                </div>
                
                <div className="pl-4 border-l-2 border-blue-200 mb-4">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    I&apos;m deepening my knowledge of <span className="font-medium">React</span>, <span className="font-medium">Next.js</span>, and <span className="font-medium">Tailwind CSS</span>, creating intuitive, accessible, and high-performance user interfaces.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700 leading-relaxed">
                    I&apos;m always exploring new technologies, especially AI-driven development and innovative tools that enhance efficiency. When I&apos;m not coding, I enjoy diving into design trends and working on personal projects to sharpen my skills.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
