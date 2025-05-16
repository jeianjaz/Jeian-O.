"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SparkProps {
  size?: number;
  color?: string;
  duration?: number;
}

interface ClickPosition {
  x: number;
  y: number;
  id: number;
}

export const ClickSpark = ({
  size = 10,
  color = "white",
  duration = 0.5,
}: SparkProps) => {
  const [sparks, setSparks] = useState<ClickPosition[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Performance optimization: Use passive event listener
    const handleClick = (e: MouseEvent) => {
      // Create a new spark at the click position
      const newSpark = {
        x: e.clientX,
        y: e.clientY,
        id: counter,
      };
      
      // Add the new spark to the array
      setSparks((prev) => [...prev, newSpark]);
      setCounter((prev) => prev + 1);
      
      // Remove the spark after animation completes to avoid memory leaks
      setTimeout(() => {
        setSparks((prev) => prev.filter((spark) => spark.id !== newSpark.id));
      }, duration * 1000 + 50);
    };

    // Add click event listener
    document.addEventListener("click", handleClick, { passive: true });
    
    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [counter, duration]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {sparks.map((spark) => (
          <SparkEffect
            key={spark.id}
            x={spark.x}
            y={spark.y}
            size={size}
            color={color}
            duration={duration}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const SparkEffect = ({
  x,
  y,
  size,
  color,
  duration,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}) => {
  // Create an array of particles for the spark effect
  const particles = Array.from({ length: 8 });
  
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      {particles.map((_, index) => {
        const angle = (index / particles.length) * 360;
        const distance = size * 2;
        
        return (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              x: 0,
              y: 0,
              opacity: 1,
            }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * distance,
              y: Math.sin((angle * Math.PI) / 180) * distance,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration,
              ease: "easeOut",
            }}
          />
        );
      })}
      
      {/* Center burst */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          backgroundColor: color,
          x: -size * 0.75,
          y: -size * 0.75,
        }}
        animate={{
          scale: 2,
          opacity: 0,
        }}
        transition={{
          duration: duration * 0.7,
          ease: "easeOut",
        }}
      />
    </div>
  );
};
