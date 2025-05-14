"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "@/components/ui/aceternity/3d-card";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string;
  technologies: string[];
  featured?: boolean;
  category: string;
}

export default function Works() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Project data with updated descriptions and categories
  const projects: Project[] = [
    {
      id: 1,
      title: "Personal Portfolio Website",
      description: "A modern, responsive portfolio built with Next.js and Tailwind CSS featuring smooth animations and interactive elements.",
      image: "/assets/project1.jpg",
      link: "https://github.com",
      github: "https://github.com",
      technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      featured: true,
      category: "frontend"
    },
    {
      id: 2,
      title: "Task Management Dashboard",
      description: "A comprehensive task manager with drag-and-drop functionality, priority sorting, and customizable categories.",
      image: "/assets/project2.jpg",
      link: "https://github.com",
      github: "https://github.com",
      technologies: ["TypeScript", "React", "Firebase", "Material UI"],
      featured: true,
      category: "fullstack"
    },
    {
      id: 3,
      title: "Data Visualization Platform",
      description: "An interactive data visualization tool that transforms complex datasets into intuitive charts and graphs.",
      image: "/assets/project3.jpg",
      link: "https://github.com",
      technologies: ["D3.js", "React", "Node.js", "Express"],
      category: "frontend"
    },
  ];

  // Filter categories
  const categories = [
    { id: "all", name: "All Projects" },
    { id: "frontend", name: "Frontend" },
    { id: "fullstack", name: "Full Stack" },
    { id: "design", name: "UI/UX Design" },
  ];
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <>
      <div className="h-16 md:h-24"></div>
      
      <section id="works" className="py-20 px-4 relative overflow-hidden">
        {/* Background elements for space theme */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-[#030014] opacity-80"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-green-500 opacity-[0.05] blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-green-400 opacity-[0.04] blur-3xl"></div>
          
          {/* Additional stars for this section */}
          <div className="absolute w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  backgroundColor: 'white',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `sparkle-fade-in-out ${Math.random() * 3 + 2}s infinite ${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto max-w-6xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              My Projects
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
              Explore some of my recent projects showcasing my skills and expertise in web development.
            </p>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === category.id ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-[#030014] text-gray-300 hover:bg-[#0f0d1a] border border-[#1a1730]'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Projects grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex"
                >
                  <CardContainer className="w-full">
                    <CardBody className="bg-[#030014] rounded-xl overflow-hidden border border-[#1a1730] group shadow-lg shadow-green-900/5">
                      <div className="relative h-full flex flex-col">
                        {/* Featured badge */}
                        {project.featured && (
                          <CardItem
                            translateZ={20}
                            as="div"
                            className="absolute top-4 right-4 z-10"
                          >
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                              Featured
                            </span>
                          </CardItem>
                        )}
                        
                        {/* Project image */}
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30"></div>
                        </div>
                        
                        {/* Project content */}
                        <div className="flex-1 p-6 flex flex-col">
                          <CardItem translateZ={50} as="h3" className="text-xl font-bold mb-2 text-white">
                            {project.title}
                          </CardItem>
                          
                          <CardItem translateZ={30} as="p" className="text-gray-300 mb-4 flex-grow line-clamp-2">
                            {project.description}
                          </CardItem>
                          
                          {/* Technologies */}
                          <CardItem translateZ={40} as="div" className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech: string) => (
                              <span key={tech} className="px-2 py-1 bg-[#2a2839] rounded-full text-xs font-medium text-gray-300">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-[#2a2839] rounded-full text-xs font-medium text-gray-300">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </CardItem>
                          
                          {/* Action buttons */}
                          <CardItem translateZ={50} as="div" className="flex gap-2">
                            {project.github && (
                              <Link 
                                href={project.github} 
                                target="_blank"
                                className="flex items-center justify-center p-2 bg-[#2a2839] rounded-full hover:bg-[#3a3849] transition-colors"
                              >
                                <IconBrandGithub className="w-5 h-5 text-white" />
                              </Link>
                            )}
                            <Link 
                              href={project.link} 
                              target="_blank"
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                            >
                              <span>View Project</span>
                              <IconExternalLink className="w-4 h-4" />
                            </Link>
                          </CardItem>
                        </div>
                      </div>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-300 text-lg">No projects found in this category.</p>
              <button
                onClick={() => setActiveFilter("all")}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                View All Projects
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
