"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glareEnabled?: boolean;
  border?: boolean;
  hoverScale?: number;
  borderColor?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = "",
  intensity = 15,
  glareEnabled = true,
  border = true,
  hoverScale = 1.02,
  borderColor = "rgba(0, 0, 0, 0.1)",
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position and intensity
    const rotateXValue = (mouseY / (rect.height / 2)) * -intensity;
    const rotateYValue = (mouseX / (rect.width / 2)) * intensity;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    
    // Calculate glare position
    const glareX = (e.clientX - rect.left) / rect.width * 100;
    const glareY = (e.clientY - rect.top) / rect.height * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? hoverScale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Border effect */}
      {border && (
        <motion.div
          className="absolute inset-0 rounded-inherit"
          style={{
            border: `1px solid ${borderColor}`,
            borderRadius: "inherit",
            opacity: isHovered ? 1 : 0.5,
            zIndex: 1,
          }}
          animate={{
            boxShadow: isHovered 
              ? `0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px ${borderColor}`
              : `0 2px 10px -5px rgba(0, 0, 0, 0.05), 0 0 0 1px ${borderColor}`
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Glare effect */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 80%)`,
            zIndex: 2,
            opacity: isHovered ? 1 : 0,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Content */}
      <div className="relative z-0">{children}</div>
    </motion.div>
  );
};

export default AnimatedCard;
