"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const Particles = ({
  className,
  // id param is kept for API compatibility
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id = "tsparticles",
  particleColor = "#FFFFFF",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  linkColor = "#FFFFFF",
  backgroundColor = "transparent",
  particleCount = 100,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  speed = 1,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interactive = true,
}: {
  className?: string;
  id?: string;
  particleColor?: string;
  linkColor?: string;
  backgroundColor?: string;
  particleCount?: number;
  speed?: number;
  interactive?: boolean;
}) => {
  // We'll use a simpler approach with CSS for now to avoid TypeScript issues
  // This component will be a placeholder until we can properly integrate TSParticles
  
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}
         style={{ background: backgroundColor }}
    >
      <div className="particles-container">
        {Array.from({ length: Math.min(particleCount, 50) }).map((_, i) => (
          <div 
            key={`particle-${i}`}
            className="particle"
            style={{
              backgroundColor: particleColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.5 + 0.3,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: float linear infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
