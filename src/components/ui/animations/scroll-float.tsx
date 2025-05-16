"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFloatProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  distance?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export const ScrollFloat = ({
  children,
  direction = "up",
  duration = 0.8,
  delay = 0,
  distance = 50,
  threshold = 0.1,
  className = "",
  once = true,
}: ScrollFloatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const controls = useAnimation();

  // Calculate initial and animate values based on direction
  const getDirectionalValues = () => {
    switch (direction) {
      case "up":
        return { initial: { y: distance }, animate: { y: 0 } };
      case "down":
        return { initial: { y: -distance }, animate: { y: 0 } };
      case "left":
        return { initial: { x: distance }, animate: { x: 0 } };
      case "right":
        return { initial: { x: -distance }, animate: { x: 0 } };
      default:
        return { initial: { y: distance }, animate: { y: 0 } };
    }
  };

  const { initial, animate } = getDirectionalValues();

  useEffect(() => {
    if (isInView) {
      controls.start({
        ...animate,
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.215, 0.61, 0.355, 1], // Cubic bezier for smooth animation
        },
      });
    }
  }, [isInView, controls, animate, duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ ...initial, opacity: 0 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Component for section headings with GSAP animation
export const AnimatedHeading = ({
  children,
  className = "",
  tag = "h2",
  underline = true,
}: {
  children: React.ReactNode;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  underline?: boolean;
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !headingRef.current) return;

    // Create animation for the heading
    gsap.fromTo(
      headingRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Create animation for the underline if enabled
    if (underline && underlineRef.current) {
      gsap.fromTo(
        underlineRef.current,
        {
          width: 0,
        },
        {
          width: "100%",
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [underline]);

  // Use dynamic component for heading tag
  const Component = tag;

  return (
    <div className={`overflow-hidden ${className}`}>
      <Component
        ref={headingRef}
        className="opacity-0"
      >
        {children}
      </Component>
      {underline && (
        <div
          ref={underlineRef}
          className="h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mt-2 w-0"
        />
      )}
    </div>
  );
};
