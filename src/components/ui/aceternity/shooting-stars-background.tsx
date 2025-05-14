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

  useEffect(() => {
    // Generate fixed stars
    const generatedStars = Array.from({ length: quantity * 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * starSize + 0.1,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setStars(generatedStars);

    // Generate shooting stars
    const generateShootingStar = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 50,
      length: Math.random() * 10 + 10,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    });

    const initialShootingStars = Array.from({ length: quantity }, () =>
      generateShootingStar()
    );
    setShootingStars(initialShootingStars);

    // Periodically add new shooting stars
    const interval = setInterval(() => {
      setShootingStars((prev) => {
        const newStar = generateShootingStar();
        return [...prev.slice(-quantity + 1), newStar];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [quantity, starSize]);

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
