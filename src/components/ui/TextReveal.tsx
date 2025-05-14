"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  preset?: "words" | "chars" | "lines" | "mask";
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  huge?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  once = true,
  preset = "words",
  delay = 0,
  duration = 0.5,
  as = "div",
  huge = false,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  // Split text based on preset
  const getTextElements = () => {
    if (preset === "words") {
      return text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={childVariants}
          custom={index}
        >
          {word}{" "}
        </motion.span>
      ));
    } else if (preset === "chars") {
      return text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={charVariants}
          custom={index}
        >
          {char === " " ? <span>&nbsp;</span> : char}
        </motion.span>
      ));
    } else if (preset === "lines") {
      return text.split("\n").map((line, index) => (
        <motion.div
          key={index}
          className="overflow-hidden"
          variants={lineContainerVariants}
        >
          <motion.span 
            className="inline-block" 
            variants={lineVariants}
          >
            {line}
          </motion.span>
        </motion.div>
      ));
    } else if (preset === "mask") {
      return (
        <div className="relative overflow-hidden">
          <motion.div
            variants={maskVariants}
            className="absolute inset-0 bg-black z-10"
          />
          <motion.span
            variants={maskTextVariants}
            className="block"
          >
            {text}
          </motion.span>
        </div>
      );
    }
  };

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: duration / 10,
        delayChildren: delay,
        duration: 0,
      },
    },
  };

  // Child variants for words
  const childVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: i * 0.02,
      },
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: i * 0.02,
      },
    }),
  };

  // Char variants
  const charVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 15,
      transition: {
        type: "spring",
        damping: 16,
        stiffness: 200,
        delay: i * 0.02,
      },
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 16,
        stiffness: 200,
        delay: i * 0.02,
      },
    }),
  };

  // Line container variants
  const lineContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  // Line variants
  const lineVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        damping: 16,
        stiffness: 100,
      },
    },
  };

  // Mask variants
  const maskVariants = {
    hidden: { scaleX: 1 },
    visible: {
      scaleX: 0,
      transformOrigin: "left",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        delay: delay,
      },
    },
  };

  // Mask text variants
  const maskTextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: delay + 0.3,
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      className={`${className} ${huge ? 'huge-text' : ''}`}
      variants={preset === "mask" ? {} : containerVariants}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      {getTextElements()}
    </Component>
  );
};

export default TextReveal;
