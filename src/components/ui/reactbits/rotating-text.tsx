"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const RotatingText = ({
  words,
  className,
  duration = 2000,
  animationType = "fade",
}: {
  words: string[];
  className?: string;
  duration?: number;
  animationType?: "fade" | "slide" | "flip";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // isAnimating is used to control the timing of animations
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, duration / 2);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  const getAnimationVariants = () => {
    switch (animationType) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case "slide":
        return {
          initial: { y: 20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -20, opacity: 0 },
        };
      case "flip":
        return {
          initial: { rotateX: 90, opacity: 0 },
          animate: { rotateX: 0, opacity: 1 },
          exit: { rotateX: -90, opacity: 0 },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <span className={cn("inline-block relative", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: duration / 2000 }}
          className="inline-block"
          style={{ 
            transformStyle: "preserve-3d",
            transformOrigin: "center center"
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
