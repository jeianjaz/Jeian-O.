"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SparkPosition {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const ClickSpark = ({
  colors = ["#FFC700", "#FF0099", "#00FFD1", "#7CFFCB", "#FFFFFF"],
  particleCount = 20,
  particleSize = 6,
  duration = 600,
}: {
  colors?: string[];
  particleCount?: number;
  particleSize?: number;
  duration?: number;
}) => {
  const [sparks, setSparks] = useState<SparkPosition[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newSparks = Array.from({ length: particleCount }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      setSparks((prev) => [...prev, ...newSparks]);

      // Clean up sparks after animation completes
      setTimeout(() => {
        setSparks((prev) => prev.filter((spark) => !newSparks.includes(spark)));
      }, duration);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [colors, particleCount, duration]);

  return (
    <>
      {sparks.map((spark) => (
        <SparkParticle
          key={spark.id}
          x={spark.x}
          y={spark.y}
          color={spark.color}
          size={particleSize}
          duration={duration}
        />
      ))}
    </>
  );
};

const SparkParticle = ({
  x,
  y,
  color,
  size,
  duration,
}: {
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
}) => {
  // Random direction and distance
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 100 + 50;
  const finalX = Math.cos(angle) * distance;
  const finalY = Math.sin(angle) * distance;

  return (
    <motion.div
      style={{
        position: "fixed",
        x,
        y,
        zIndex: 9999,
        pointerEvents: "none",
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        x: x + finalX,
        y: y + finalY,
        opacity: 0,
        scale: 0,
      }}
      transition={{
        duration: duration / 1000,
        ease: "easeOut",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: `0 0 ${size / 2}px ${color}`,
        }}
      />
    </motion.div>
  );
};
