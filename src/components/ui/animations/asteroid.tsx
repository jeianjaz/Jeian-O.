"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AsteroidProps {
  className?: string;
  size?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export const Asteroid: React.FC<AsteroidProps> = ({
  className = "",
  size = 40, // Reduced default size from 80 to 40
  position = "bottom-right",
}) => {
  // Define position classes
  const positionClasses = {
    "top-left": "top-10 left-10",
    "top-right": "top-10 right-10",
    "bottom-left": "bottom-10 left-10",
    "bottom-right": "bottom-10 right-10",
  };

  // Animation for floating and rotating
  const floatAndRotate = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 360],
      transition: {
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        },
        rotate: {
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} z-10 pointer-events-none ${className}`}
      variants={floatAndRotate}
      animate="animate"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ opacity: { duration: 0.8 } }}
    >
      <Image
        src="/assets/asteroid.png"
        alt="Asteroid"
        width={size}
        height={size}
        className="w-auto h-auto opacity-60" // Added opacity to make it less obtrusive
        priority={false}
      />
    </motion.div>
  );
};
