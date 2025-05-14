"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

// Sparkles component for adding sparkle effects to elements

interface Sparkle {
  id: string;
  createdAt: number;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
    color: string;
    scale: number;
    opacity: number;
  };
}

export const Sparkles = ({
  children,
  className,
  colors = ["#FFC700", "#FF0099", "#00FFD1", "#7CFFCB"],
  minSize = 10,
  maxSize = 20,
  glow = true,
  sparklesEnabled = true,
}: {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  glow?: boolean;
  sparklesEnabled?: boolean;
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (!sparklesEnabled) return;

    const generateSparkle = (): Sparkle => {
      const sparkle = {
        id: Math.random().toString(36).slice(2),
        createdAt: Date.now(),
        size: Math.floor(Math.random() * (maxSize - minSize) + minSize),
        style: {
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          zIndex: 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          scale: Math.random() * 0.6 + 0.4,
          opacity: Math.random() * 0.8 + 0.2,
        },
      };
      return sparkle;
    };

    const interval = setInterval(() => {
      const now = Date.now();
      const sparkle = generateSparkle();
      
      setSparkles((prevSparkles) => {
        // Remove sparkles older than 1 second
        const filteredSparkles = prevSparkles.filter(
          (sparkle) => now - sparkle.createdAt < 1000
        );
        return [...filteredSparkles, sparkle];
      });
    }, 300);

    return () => clearInterval(interval);
  }, [colors, maxSize, minSize, sparklesEnabled]);

  return (
    <div className={cn("relative inline-block", className)}>
      {sparklesEnabled &&
        sparkles.map((sparkle) => (
          <SparkleInstance
            key={sparkle.id}
            size={sparkle.size}
            color={sparkle.style.color}
            style={{
              top: sparkle.style.top,
              left: sparkle.style.left,
              zIndex: sparkle.style.zIndex,
              transform: `scale(${sparkle.style.scale})`,
              opacity: sparkle.style.opacity,
            }}
            glow={glow}
          />
        ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const SparkleInstance = ({
  size,
  color,
  style,
  glow,
}: {
  size: number;
  color: string;
  style: React.CSSProperties;
  glow: boolean;
}) => {
  const [rotation] = useState(Math.random() * 360);

  return (
    <span
      className="absolute block animate-sparkle-fade-in-out"
      style={{
        ...style,
        pointerEvents: "none",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          rotate: `${rotation}deg`,
          filter: glow ? `drop-shadow(0 0 4px ${color})` : "none",
        }}
      >
        <path
          d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
          fill={color}
        />
      </svg>
    </span>
  );
};
