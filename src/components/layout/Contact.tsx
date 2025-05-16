"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { OGLParticles } from "@/components/ui/animations/ogl-particles";


// Import the shooting stars background with client-side only rendering
const ShootingStarsBackground = dynamic(
  () => import("@/components/ui/aceternity/shooting-stars-background").then(mod => mod.ShootingStarsBackground),
  { ssr: false, loading: () => <div className="min-h-screen bg-black" /> }
);

// Memoize the Contact component to prevent unnecessary re-renders
const Contact = memo(function Contact() {
  return (
    <section id="contact" className="py-20 px-4 min-h-screen flex items-center relative">
      {/* Particles background with mouse interaction and rotation disabled */}
      <OGLParticles 
        count={120}
        color="#ffffff"
        mouseInteraction={false}
        rotation={false}
        className="opacity-80"
      />
      
      {/* Space background with shooting stars */}
      <ShootingStarsBackground
        quantity={50} /* Reduced quantity for better performance */
        starSize={1}
        className="absolute inset-0 z-0"
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get In Touch</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="flex justify-center space-x-10 mb-12">
            <a 
              href="mailto:obelidor.jeianjasper@gmail.com" 
              className="flex flex-col items-center group"
            >
              <div className="bg-black/60 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-cyan-500/20 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <span className="mt-3 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">Email</span>
            </a>
            
            <a 
              href="https://github.com/jeianjaz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="bg-black/60 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-cyan-500/20 transition-all duration-300">
                <svg className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="mt-3 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">GitHub</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/jeianjasper/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="bg-black/60 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-cyan-500/20 transition-all duration-300">
                <svg className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <span className="mt-3 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">LinkedIn</span>
            </a>
          </div>
          
          <p className="text-gray-300 mt-10 max-w-lg mx-auto px-4">
            Feel free to reach out if you have any questions or would like to collaborate on a project. I&apos;m always open to discussing new opportunities and creative ideas.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

export default Contact;
