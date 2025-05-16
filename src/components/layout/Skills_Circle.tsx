"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState, memo } from "react";
import dynamic from "next/dynamic";
import { OGLParticles } from "@/components/ui/animations/ogl-particles";

import { 
  IconBrandHtml5, 
  IconBrandCss3, 
  IconBrandJavascript, 
  IconBrandTypescript, 
  IconBrandReact, 
  IconBrandNextjs, 
  IconBrandTailwind, 
  IconBrandFirebase, 
  IconBrandFigma, 
  IconBrandGit, 
  IconBrandGithub,
  IconBrandVite,
  IconBrandSupabase,
  IconTestPipe,
  IconBrandRedux
} from "@tabler/icons-react";

// Dynamically import the ShootingStarsBackground for better performance
const DynamicShootingStars = dynamic(
  () => import("@/components/ui/aceternity/shooting-stars-background").then(mod => mod.ShootingStarsBackground),
  { ssr: false, loading: () => <div className="min-h-screen bg-black" /> }
);

interface Skill {
  id: string;
  name: string;
  icon: React.ReactNode;
  orbitIndex: number;
  initialAngle: number;
}

// Memoized Skill Icon component with performance optimizations
const SkillIcon = memo(({ skill, angle, radius }: { skill: Skill; angle: number; radius: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate position based on angle and radius
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius;
  
  // Reduce hover animation complexity on mobile for better performance
  const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        x,
        y,
        zIndex: isHovered ? 50 : 10,
        transform: 'translate(-50%, -50%)',
      }}
      whileHover={{ scale: isMobile ? 1.1 : 1.15 }}
      transition={{ 
        type: "spring", 
        stiffness: isMobile ? 200 : 300, 
        damping: isMobile ? 20 : 15,
        duration: isMobile ? 0.3 : 0.2 // Faster transitions on mobile for better performance
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center">
        {/* Simple skill icon with minimal styling */}
        <div 
          className="rounded-full flex items-center justify-center overflow-hidden transition-all duration-300"
          style={{ 
            width: isMobile ? 40 : 56,
            height: isMobile ? 40 : 56,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            border: isHovered ? '2px solid rgba(255, 255, 255, 0.9)' : '1px solid rgba(255, 255, 255, 0.4)',
          }}
        >
          <div className="flex items-center justify-center">
            <div className="w-7 h-7 flex items-center justify-center">
              {skill.icon}
            </div>
          </div>
        </div>
        
        {/* Skill name - only visible on hover */}
        {isHovered && (
          <motion.div 
            className="absolute mt-2 bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 56 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm font-medium text-white">
              {skill.name}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});
SkillIcon.displayName = 'SkillIcon';

export default function SkillsCircle() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [orbitAngles, setOrbitAngles] = useState<number[]>([0, 0, 0]);
  
  // Define skills
  useEffect(() => {
    // Frontend skills (first orbit)
    const frontendSkills = [
      { name: "HTML", icon: <IconBrandHtml5 className="w-6 h-6 text-[#E34F26]" />, orbitIndex: 0, initialAngle: 0 },
      { name: "CSS", icon: <IconBrandCss3 className="w-6 h-6 text-[#1572B6]" />, orbitIndex: 0, initialAngle: 60 },
      { name: "JavaScript", icon: <IconBrandJavascript className="w-6 h-6 text-[#F7DF1E]" />, orbitIndex: 0, initialAngle: 120 },
      { name: "TypeScript", icon: <IconBrandTypescript className="w-6 h-6 text-[#3178C6]" />, orbitIndex: 0, initialAngle: 180 },
      { name: "React", icon: <IconBrandReact className="w-6 h-6 text-[#61DAFB]" />, orbitIndex: 0, initialAngle: 240 },
      { name: "Next.js", icon: <IconBrandNextjs className="w-6 h-6 text-white" />, orbitIndex: 0, initialAngle: 300 },
    ];
    
    // Additional frontend and tools (second orbit)
    const toolsSkills = [
      { name: "Tailwind", icon: <IconBrandTailwind className="w-6 h-6 text-[#06B6D4]" />, orbitIndex: 1, initialAngle: 0 },
      { name: "Redux", icon: <IconBrandRedux className="w-6 h-6 text-[#764ABC]" />, orbitIndex: 1, initialAngle: 45 },
      { name: "Vite", icon: <IconBrandVite className="w-6 h-6 text-[#646CFF]" />, orbitIndex: 1, initialAngle: 90 },
      { name: "Firebase", icon: <IconBrandFirebase className="w-6 h-6 text-[#FFCA28]" />, orbitIndex: 1, initialAngle: 135 },
      { name: "Supabase", icon: <IconBrandSupabase className="w-6 h-6 text-[#3ECF8E]" />, orbitIndex: 1, initialAngle: 180 },
      { name: "Jest", icon: <IconTestPipe className="w-6 h-6 text-[#C21325]" />, orbitIndex: 1, initialAngle: 225 },
      { name: "Git", icon: <IconBrandGit className="w-6 h-6 text-[#F05032]" />, orbitIndex: 1, initialAngle: 270 },
      { name: "GitHub", icon: <IconBrandGithub className="w-6 h-6 text-white" />, orbitIndex: 1, initialAngle: 315 },
    ];
    
    // Design tools (third orbit)
    const designSkills = [
      { name: "Figma", icon: <IconBrandFigma className="w-6 h-6 text-[#F24E1E]" />, orbitIndex: 2, initialAngle: 0 },
    ];
    
    // Add IDs to all skills
    const allSkills = [
      ...frontendSkills.map((skill, i) => ({ ...skill, id: `frontend-${i}` })),
      ...toolsSkills.map((skill, i) => ({ ...skill, id: `tools-${i}` })),
      ...designSkills.map((skill, i) => ({ ...skill, id: `design-${i}` })),
    ];
    
    setSkills(allSkills);
  }, []);
  
  // Detect if device is mobile for performance optimizations
  const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Animation loop for orbiting motion with performance optimizations
  useEffect(() => {
    let rafId: number;
    let lastTimestamp = 0;
    
    // Throttle animation based on device capability
    // Use 30fps for mobile, 60fps for desktop
    const frameInterval = isMobile ? 33.33 : 16.67;
    
    // Slower rotation speeds on mobile for better performance
    const rotationSpeeds = isMobile 
      ? [0.15, -0.12, 0.08]  // Mobile (slower)
      : [0.25, -0.2, 0.15];  // Desktop (faster)
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      
      // Update angles at a throttled rate based on device
      if (deltaTime > frameInterval) {
        setOrbitAngles(prev => [
          (prev[0] + rotationSpeeds[0]) % 360,  // First orbit clockwise
          (prev[1] + rotationSpeeds[1]) % 360,  // Second orbit counter-clockwise
          (prev[2] + rotationSpeeds[2]) % 360   // Third orbit clockwise
        ]);
        lastTimestamp = timestamp;
      }
      
      rafId = requestAnimationFrame(animate);
    };
    
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile]); // Include isMobile in the dependency array
  
  // Calculate orbit radii - responsive for different screen sizes
  const baseOrbitRadii = [160, 240, 320];
  
  // Scale down orbit radii for mobile devices even more aggressively
  const orbitRadii = isMobile 
    ? baseOrbitRadii.map(radius => radius * 0.4) // 60% smaller on mobile
    : baseOrbitRadii;
  
  return (
    <div id="skills" className="relative min-h-screen w-full overflow-hidden py-20 flex items-center justify-center">
      {/* Particles background with mouse interaction and rotation enabled */}
      <OGLParticles 
        count={150}
        color="#ffffff"
        mouseInteraction={true}
        rotation={true}
        className="opacity-90"
      />
      
      {/* Space background with shooting stars */}
      <DynamicShootingStars
        quantity={50}
        starSize={1}
        className="absolute inset-0 z-0"
      />
      
      <div className="container mx-auto max-w-6xl z-10 px-4 relative">
        {/* Section heading */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-center text-white mb-10 md:mb-20"
        >
          My Skills
        </motion.h1>
        
        {/* Skills circle container */}
        <div className="relative flex items-center justify-center mb-8 md:mb-16 h-[400px] md:h-[600px]">
          {/* Orbit circles */}
          <div className="absolute border border-white/10 rounded-full" style={{ width: orbitRadii[0] * 2, height: orbitRadii[0] * 2 }} />
          <div className="absolute border border-white/10 rounded-full" style={{ width: orbitRadii[1] * 2, height: orbitRadii[1] * 2 }} />
          <div className="absolute border border-white/10 rounded-full" style={{ width: orbitRadii[2] * 2, height: orbitRadii[2] * 2 }} />
          
          {/* Simple white center circle */}
          <div className="absolute w-4 h-4 md:w-6 md:h-6 rounded-full bg-white"></div>
          
          {/* Skills */}
          {skills.map((skill) => {
            const orbitRadius = orbitRadii[skill.orbitIndex];
            const orbitAngle = orbitAngles[skill.orbitIndex];
            const angle = (skill.initialAngle + orbitAngle) % 360;
            
            return (
              <SkillIcon 
                key={skill.id} 
                skill={skill} 
                angle={angle} 
                radius={orbitRadius} 
              />
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-300 max-w-2xl mx-auto">
            My skills orbit as a constellation, representing my evolving tech universe. Hover over any skill to learn more.
          </p>
        </div>
      </div>
    </div>
  );
}
