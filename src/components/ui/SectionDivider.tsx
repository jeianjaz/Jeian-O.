"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionDividerProps {
  className?: string;
  variant?: "wave" | "angle" | "curve" | "zigzag" | "minimal";
  invert?: boolean;
  color?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  className = "",
  variant = "minimal",
  invert = false,
  color = "#ffffff",
}) => {
  // SVG paths for different divider styles
  const getDividerPath = () => {
    switch (variant) {
      case "wave":
        return (
          <path
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill={color}
            fillOpacity="1"
          />
        );
      case "angle":
        return (
          <path
            d="M0,160L1440,0L1440,320L0,320Z"
            fill={color}
            fillOpacity="1"
          />
        );
      case "curve":
        return (
          <path
            d="M0,224L1440,64L1440,320L0,320Z"
            fill={color}
            fillOpacity="1"
          />
        );
      case "zigzag":
        return (
          <path
            d="M0,160L120,144C240,128,480,96,720,106.7C960,117,1200,171,1320,197.3L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            fill={color}
            fillOpacity="1"
          />
        );
      case "minimal":
      default:
        return (
          <path
            d="M0,192L1440,224L1440,320L0,320Z"
            fill={color}
            fillOpacity="1"
          />
        );
    }
  };

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <motion.svg
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100px",
          transform: invert ? "rotate(180deg)" : "rotate(0deg)",
        }}
        viewBox="0 0 1440 320"
      >
        {getDividerPath()}
      </motion.svg>
    </div>
  );
};

export default SectionDivider;
