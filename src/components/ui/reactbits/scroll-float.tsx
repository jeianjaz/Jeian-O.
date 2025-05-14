"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const ScrollFloat = ({
  children,
  className,
  direction = "up",
  distance = 100,
  delay = 0,
  threshold = [0.1, 1],
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  delay?: number;
  threshold?: [number, number];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate initial and final values based on direction
  const getInitialValue = () => {
    switch (direction) {
      case "up":
        return distance;
      case "down":
        return -distance;
      case "left":
        return distance;
      case "right":
        return -distance;
      default:
        return distance;
    }
  };

  // Transform values based on scroll progress
  const y = useTransform(
    scrollYProgress,
    threshold,
    direction === "up" || direction === "down" ? [getInitialValue(), 0] : [0, 0]
  );
  
  const x = useTransform(
    scrollYProgress,
    threshold,
    direction === "left" || direction === "right" ? [getInitialValue(), 0] : [0, 0]
  );

  const opacity = useTransform(scrollYProgress, threshold, [0, 1]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y, x, opacity }}
        transition={{ delay }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};
