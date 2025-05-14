"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const GlowingEffect = ({
  children,
  containerClassName,
  className,
  borderClassName,
  backgroundClassName,
  glowClassName,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  borderClassName?: string;
  backgroundClassName?: string;
  glowClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const updatePosition = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOpacity(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", updatePosition);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", updatePosition);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative", containerClassName)}
    >
      <div
        className={cn(
          "relative rounded-xl border border-white/10 bg-black p-4 z-10",
          className
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500",
          { "opacity-100": isHovered },
          borderClassName
        )}
        style={{
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      />
      <div
        className={cn(
          "absolute inset-[1px] rounded-xl bg-black",
          backgroundClassName
        )}
      />
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500",
          { "opacity-100": isHovered },
          glowClassName
        )}
        style={{
          boxShadow: `0px 0px 80px 30px rgba(120, 120, 255, 0.15)`,
          opacity,
        }}
      />
    </div>
  );
};
