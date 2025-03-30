"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/components/ui/utils";

type CarouselProps = {
  items: {
    id: number;
    title: string;
    description: string;
    image: string;
    link?: string;
    technologies?: string[];
  }[];
  className?: string;
};

export const Carousel = ({
  items,
  className,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [isAnimating, items.length]);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  }, [isAnimating, items.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext]);

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    }),
  };

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="absolute inset-0 pointer-events-none glow-effect" />
      
      <AnimatePresence initial={false} mode="wait" custom={direction} onExitComplete={() => setIsAnimating(false)}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          exit="exit"
          className="w-full h-full"
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10" />
            <div className="relative w-full h-full">
              <Image
                src={items[currentIndex].image}
                alt={items[currentIndex].title}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-bold text-white mb-2">{items[currentIndex].title}</h3>
              <p className="text-white/80 mb-4">{items[currentIndex].description}</p>
              {items[currentIndex].technologies && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {items[currentIndex].technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {items[currentIndex].link && (
                <a
                  href={items[currentIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-colors"
                >
                  View Project
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center z-30 hover:bg-white/40 transition-colors"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center z-30 hover:bg-white/40 transition-colors"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setDirection(index > currentIndex ? 1 : -1);
              setIsAnimating(true);
              setCurrentIndex(index);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
