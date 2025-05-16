"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Create a client-only version of the component
const ClientOnlyStars = ({
  className,
  quantity = 15,
  starSize = 1,
}: {
  className?: string;
  quantity?: number;
  starSize?: number;
}) => {
  const [stars, setStars] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
    }[]
  >([]);

  const [shootingStars, setShootingStars] = useState<
    {
      id: number;
      x: number;
      y: number;
      length: number;
      opacity: number;
      duration: number;
      delay: number;
    }[]
  >([]);

  // Pre-generate stars for faster initial render
  const [initialized, setInitialized] = useState(false);
  
  // Generate stars immediately on component mount
  useEffect(() => {
    if (initialized) return;
    
    // Generate fixed stars - reduce quantity for better performance
    const generatedStars = Array.from({ length: quantity * 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * starSize + 0.1,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setStars(generatedStars);

    // Generate shooting stars with optimized values
    const generateShootingStar = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 50,
      length: Math.random() * 8 + 8, // Slightly smaller for better performance
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 1.5 + 1, // Slightly faster for better performance
      delay: Math.random() * 3, // Reduced delay for faster initial appearance
    });

    // Generate initial shooting stars immediately
    const initialShootingStars = Array.from({ length: Math.min(quantity, 8) }, () =>
      generateShootingStar()
    );
    setShootingStars(initialShootingStars);
    setInitialized(true);
    
    // Use requestAnimationFrame for smoother animations
    let lastUpdate = 0;
    let rafId: number;
    
    const updateStars = (timestamp: number) => {
      // Only update every 2 seconds
      if (timestamp - lastUpdate > 2000) {
        setShootingStars((prev) => {
          const newStar = generateShootingStar();
          return [...prev.slice(-Math.min(quantity, 8) + 1), newStar];
        });
        lastUpdate = timestamp;
      }
      rafId = requestAnimationFrame(updateStars);
    };
    
    rafId = requestAnimationFrame(updateStars);
    return () => cancelAnimationFrame(rafId);
  }, [quantity, starSize, initialized]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-black pointer-events-none",
        className
      )}
    >
      {/* Fixed stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.length}px`,
            height: "1px",
            opacity: 0,
            background: `linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, ${star.opacity}))`,
            transform: "rotate(-45deg)",
            animation: `shooting-star ${star.duration}s linear ${star.delay}s forwards`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes shooting-star {
          0% {
            transform: translateX(0) rotate(-45deg);
            opacity: 0;
          }
          5% {
            opacity: ${shootingStars[0]?.opacity || 0.5};
          }
          80% {
            opacity: ${shootingStars[0]?.opacity || 0.5};
          }
          100% {
            transform: translateX(200px) rotate(-45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Export a client-only version of the component
export const ShootingStarsBackground = dynamic(() => Promise.resolve(ClientOnlyStars), {
  ssr: false,
});
