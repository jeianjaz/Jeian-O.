"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
  highlightClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  highlightClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full max-w-4xl mx-auto overflow-hidden",
        containerClassName
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 transition duration-300",
          highlightClassName
        )}
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(120, 120, 255, 0.15), transparent 40%)`,
        }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
