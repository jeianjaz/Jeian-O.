"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CardContainer, CardBody, CardItem } from "@/components/ui/aceternity/3d-card";
import { OGLParticles } from "@/components/ui/animations/ogl-particles";

// Import the shooting stars background with client-side only rendering
const ShootingStarsBackground = dynamic(
  () => import("@/components/ui/aceternity/shooting-stars-background").then(mod => mod.ShootingStarsBackground),
  { ssr: false }
);

// Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image?: string; // Optional image path
}

// Client-only Projects component
export default function ClientProjects() {
  // Projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "Space-Themed Portfolio",
      description: "My personal portfolio website featuring a space theme with interactive particles, smooth animations, and responsive design.",
      tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "OGL"],
      link: "", // Currently in development
      github: "", // Not yet on GitHub
      image: "/assets/portfolio-preview.png" // Placeholder for now
    },
    {
      id: 2,
      title: "IriQ Smart Irrigation System",
      description: "An IoT-based smart irrigation system that uses ESP32 microcontrollers, soil moisture sensors, and a cloud dashboard for automated plant watering.",
      tags: ["IoT", "ESP32", "Next.js", "Supabase", "PostgreSQL"],
      link: "https://github.com/jeianjaz/IriQ",
      github: "https://github.com/jeianjaz/IriQ",
      image: "/assets/SSIRIQ.png"
    },
    {
      id: 3,
      title: "Pulse - Healthcare Platform",
      description: "An AI-driven healthcare platform for remote patient monitoring and predictive health analysis with secure video consultations and interactive dashboards.",
      tags: ["React", "AI", "Twilio", "Tailwind CSS", "TypeScript"],
      link: "https://github.com/jeianjaz/Pulse",
      github: "https://github.com/jeianjaz/Pulse",
      image: "/assets/pulsess.png"
    },
    {
      id: 4,
      title: "HealthCB - Community Health Portal",
      description: "A comprehensive healthcare platform for Barangay Sta. Monica that streamlines medical services and connects patients with healthcare professionals.",
      tags: ["Next.js", "React", "TailwindCSS", "DaisyUI", "Vercel"],
      link: "https://health-care-nine-virid.vercel.app/",
      github: "https://github.com/jeianjaz/HealthCB",
      image: "/assets/healthcbss.png"
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 relative min-h-screen">
      {/* Particles background with mouse interaction and rotation disabled */}
      <OGLParticles 
        count={130}
        color="#ffffff"
        mouseInteraction={false}
        rotation={false}
        className="opacity-80"
      />
      
      {/* Space background with shooting stars */}
      <ShootingStarsBackground
        quantity={100}
        starSize={1}
        className="absolute inset-0 z-0"
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section heading */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Projects
        </motion.h2>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Project card component with 3D effect
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="h-full"
    >
      <CardContainer className="w-full h-full">
        <CardBody className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden h-full relative">
          {/* Project image */}
          <div className="relative h-48 w-full overflow-hidden">
            {project.image ? (
              <CardItem translateZ={20} className="h-full w-full">
                <img 
                  src={project.image} 
                  alt={`${project.title} screenshot`}
                  className="object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </CardItem>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-0">
                <span className="text-white/30 text-sm">Project Image</span>
              </div>
            )}
          </div>
          
          {/* Project content */}
          <div className="p-6">
            <CardItem
              translateZ={50}
              as="h3" 
              className="text-xl font-bold text-white mb-2"
            >
              {project.title}
            </CardItem>
            
            <CardItem
              translateZ={40}
              as="p" 
              className="text-gray-400 text-sm mb-4"
            >
              {project.description}
            </CardItem>
            
            {/* Tags */}
            <CardItem translateZ={30} className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                >
                  {tag}
                </span>
              ))}
            </CardItem>
            
            {/* Links */}
            <CardItem translateZ={20} className="flex gap-4">
              <Link 
                href={project.link} 
                target="_blank"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Live Demo
              </Link>
              <Link 
                href={project.github} 
                target="_blank"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                GitHub Repo
              </Link>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}
