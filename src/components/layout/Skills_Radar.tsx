"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ShootingStarsBackground } from "@/components/ui/aceternity/shooting-stars-background";
import { LampEffect } from "@/components/ui/aceternity/lamp-effect";
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

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: "frontend" | "backend" | "design" | "tools";
  angle: number;
  distance: number;
}

export default function SkillsRadar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [radarAngle, setRadarAngle] = useState(0);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);
  
  // Generate skills with radar positions
  useEffect(() => {
    // Helper to distribute skills evenly in a section
    const distributeSkills = (
      skills: { name: string; icon: React.ReactNode; category: "frontend" | "backend" | "design" | "tools" }[],
      startAngle: number,
      endAngle: number,
      minDistance: number,
      maxDistance: number
    ) => {
      const angleStep = (endAngle - startAngle) / (skills.length || 1);
      
      return skills.map((skill, index) => {
        // Calculate exact angle for even distribution
        const angle = startAngle + angleStep * index + (angleStep / 2);
        
        // Calculate distance based on index for more organized placement
        // This creates a more structured pattern with less randomness
        const distanceRange = maxDistance - minDistance;
        const distanceStep = distanceRange / (skills.length || 1);
        const distance = minDistance + (distanceStep * index);
        
        return {
          ...skill,
          angle,
          distance
        };
      });
    };
    
    // Frontend skills (top section)
    const frontendSkills = distributeSkills(
      [
        { name: "HTML", icon: <IconBrandHtml5 className="w-8 h-8 text-[#E34F26]" />, category: "frontend" },
        { name: "CSS", icon: <IconBrandCss3 className="w-8 h-8 text-[#1572B6]" />, category: "frontend" },
        { name: "JavaScript", icon: <IconBrandJavascript className="w-8 h-8 text-[#F7DF1E]" />, category: "frontend" },
        { name: "TypeScript", icon: <IconBrandTypescript className="w-8 h-8 text-[#3178C6]" />, category: "frontend" },
        { name: "React", icon: <IconBrandReact className="w-8 h-8 text-[#61DAFB]" />, category: "frontend" },
        { name: "Redux", icon: <IconBrandRedux className="w-8 h-8 text-[#764ABC]" />, category: "frontend" },
      ],
      -30, // Start angle
      80, // End angle
      120, // Min distance
      180  // Max distance - create more variation
    );
    
    // Framework skills (right section)
    const frameworkSkills = distributeSkills(
      [
        { name: "Next.js", icon: <IconBrandNextjs className="w-8 h-8 text-white" />, category: "frontend" },
        { name: "Vite", icon: <IconBrandVite className="w-8 h-8 text-[#646CFF]" />, category: "frontend" },
        { name: "Tailwind", icon: <IconBrandTailwind className="w-8 h-8 text-[#38B2AC]" />, category: "frontend" },
      ],
      100, // Adjusted to avoid overlap
      170, 
      140, 
      200 // Varied distances
    );
    
    // Backend skills (bottom section)
    const backendSkills = distributeSkills(
      [
        { name: "Firebase", icon: <IconBrandFirebase className="w-8 h-8 text-[#FFCA28]" />, category: "backend" },
        { name: "Supabase", icon: <IconBrandSupabase className="w-8 h-8 text-[#3ECF8E]" />, category: "backend" },
        { name: "Jest", icon: <IconTestPipe className="w-8 h-8 text-[#C21325]" />, category: "backend" },
      ],
      190, // Adjusted to avoid overlap
      260, 
      160, 
      220 // Varied distances
    );
    
    // Tools & Design skills (left section)
    const toolsSkills = distributeSkills(
      [
        { name: "Git", icon: <IconBrandGit className="w-8 h-8 text-[#F05032]" />, category: "tools" },
        { name: "GitHub", icon: <IconBrandGithub className="w-8 h-8 text-white" />, category: "tools" },
        { name: "Figma", icon: <IconBrandFigma className="w-8 h-8 text-[#F24E1E]" />, category: "design" },
      ],
      280, // Adjusted to avoid overlap
      350, 
      130, 
      190 // Varied distances
    );
    
    setSkills([...frontendSkills, ...frameworkSkills, ...backendSkills, ...toolsSkills]);
  }, []);
  
  // Animate the radar scanner
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle((prevAngle) => (prevAngle + 1) % 360);
    }, 30);
    
    return () => clearInterval(interval);
  }, []);
  
  // Highlight skills when the radar scanner passes over them
  useEffect(() => {
    try {
      // Find skills within the radar beam (±15 degrees)
      const highlightedSkills = skills.filter(skill => {
        const angleDiff = Math.abs(skill.angle - radarAngle);
        return angleDiff < 15 || angleDiff > 345;
      });
      
      if (highlightedSkills.length > 0) {
        setHighlightedSkill(highlightedSkills[0].name);
      } else {
        setHighlightedSkill(null);
      }
    } catch (error) {
      console.error('Error in radar highlight effect:', error);
      // Prevent unhandled promise rejection
    }
  }, [radarAngle, skills]);
  
  return (
    <section id="skills" className="relative min-h-screen w-full overflow-hidden py-20 flex items-center justify-center">
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
          My Skills
        </motion.h1>
        
        {/* Radar container */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-square max-w-3xl mx-auto bg-transparent"
        >
          {/* Radar circles with improved styling */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Inner circles with pulsing animation */}
            <motion.div 
              className="w-[100px] h-[100px] rounded-full border border-cyan-500/20"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            
            <div className="absolute w-[200px] h-[200px] rounded-full border border-cyan-500/15 opacity-60"></div>
            <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500/10 opacity-40"></div>
            <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/5 opacity-30"></div>
            
            {/* Outer glow effect */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-cyan-500/5 blur-xl"></div>
          </div>
          
          {/* Radar grid lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Horizontal line */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            
            {/* Vertical line */}
            <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
            
            {/* Diagonal lines */}
            <div className="absolute w-[565px] h-[1px] bg-cyan-500/10 origin-center" style={{ transform: 'rotate(45deg)' }}></div>
            <div className="absolute w-[565px] h-[1px] bg-cyan-500/10 origin-center" style={{ transform: 'rotate(-45deg)' }}></div>
          </div>
          
          {/* Radar scanner with improved effects */}
          <div 
            className="absolute top-1/2 left-1/2 w-[200px] h-[2px] bg-gradient-to-r from-cyan-500/80 to-transparent origin-left"
            style={{ 
              transform: `translate(0%, -50%) rotate(${radarAngle}deg)`,
              filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))'
            }}
          >
            {/* Scanner dot with pulse effect */}
            <motion.div 
              className="absolute top-0 left-0 w-3 h-3 rounded-full bg-cyan-400"
              animate={{ boxShadow: ['0 0 5px 2px rgba(6, 182, 212, 0.5)', '0 0 10px 4px rgba(6, 182, 212, 0.7)', '0 0 5px 2px rgba(6, 182, 212, 0.5)'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            ></motion.div>
          </div>
          
          {/* Center point with pulse effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50"></div>
            <motion.div 
              className="absolute inset-0 rounded-full bg-cyan-400/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
          </div>
          
          {/* Category labels */}
          <div className="absolute inset-0">
            <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 text-cyan-400/70 text-sm font-medium">Frontend</div>
            <div className="absolute top-1/2 right-[15%] transform translate-y-[-50%] text-cyan-400/70 text-sm font-medium">Frameworks</div>
            <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 text-cyan-400/70 text-sm font-medium">Backend</div>
            <div className="absolute top-1/2 left-[15%] transform translate-y-[-50%] text-cyan-400/70 text-sm font-medium">Tools & Design</div>
          </div>
          
          {/* Skills */}
          {skills.map((skill) => {
            // Convert polar to cartesian coordinates
            const radians = (skill.angle * Math.PI) / 180;
            const x = Math.cos(radians) * skill.distance;
            const y = Math.sin(radians) * skill.distance;
            
            // Determine if this skill is highlighted
            const isHighlighted = skill.name === highlightedSkill;
            
            return (
              <motion.div
                key={skill.name}
                className="absolute top-1/2 left-1/2"
                style={{
                  x,
                  y,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  scale: isHighlighted ? 1.2 : 1,
                  filter: isHighlighted ? 'brightness(1.5)' : 'brightness(1)'
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.15, zIndex: 30 }}
              >
                <div className="flex flex-col items-center">
                  {/* Skill icon with glass effect */}
                  <div 
                    className={`w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border-2 ${isHighlighted ? 'border-cyan-400' : 'border-white/20'} flex items-center justify-center shadow-lg overflow-hidden group`}
                    style={{ 
                      boxShadow: isHighlighted ? '0 0 20px rgba(6, 182, 212, 0.6)' : '0 0 10px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Icon container */}
                    <div className="w-full h-full p-3 flex items-center justify-center relative z-10">
                      {skill.icon}
                      
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
                    </div>
                    
                    {/* Animated highlight effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                  
                  {/* Skill name with better visibility */}
                  <div className="mt-2 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    <span className={`text-xs font-medium ${isHighlighted ? 'text-cyan-300' : 'text-white'} opacity-90`}>
                      {skill.name}
                    </span>
                  </div>
                  
                  {/* Enhanced pulse animation for highlighted skills */}
                  {isHighlighted && (
                    <div className="absolute inset-0 -z-10">
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-cyan-500/20"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      ></motion.div>
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-cyan-400/10"
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-400 max-w-2xl mx-auto">
            Watch as the radar scans and detects my skills. Each skill lights up when detected by the radar beam.
          </p>
        </div>
      </div>
    </section>
  );
}
