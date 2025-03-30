"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Works() {
  // Project data with updated descriptions
  const projects = [
    {
      id: 1,
      title: "Personal Portfolio Website",
      description: "A modern, responsive portfolio built with Next.js and Tailwind CSS featuring smooth animations and interactive elements.",
      image: "/assets/project1.jpg",
      link: "https://github.com",
      technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: 2,
      title: "Task Management Dashboard",
      description: "A comprehensive task manager with drag-and-drop functionality, priority sorting, and customizable categories.",
      image: "/assets/project2.jpg",
      link: "https://github.com",
      technologies: ["TypeScript", "React", "Firebase", "Material UI"],
    },
    {
      id: 3,
      title: "Data Visualization Platform",
      description: "An interactive data visualization tool that transforms complex datasets into intuitive charts and graphs.",
      image: "/assets/project3.jpg",
      link: "https://github.com",
      technologies: ["D3.js", "React", "Node.js", "Express"],
    },
  ];

  return (
    <section id="works" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Works</h2>
          <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Explore some of my recent projects showcasing my skills and expertise in web development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Subtle border glow effect on hover */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/50 transition-colors duration-300"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300 z-0"></div>
              
              <div className="relative h-full flex flex-col z-10">
                {/* Project image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Project content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* View project button */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-blue-600 transition-colors duration-300 text-center"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
