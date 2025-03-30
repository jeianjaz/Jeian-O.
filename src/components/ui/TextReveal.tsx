"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  once = true,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={child}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextReveal;
