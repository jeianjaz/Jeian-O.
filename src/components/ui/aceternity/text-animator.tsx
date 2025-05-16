"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextAnimator = ({
  words,
  className,
  interval = 3000,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // isAnimating is used in the animation logic but not directly in rendering
  const [, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 500); // Half a second for the fade out/in animation
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className={cn("relative h-[1.5em] overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
