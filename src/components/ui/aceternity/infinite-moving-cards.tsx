"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    icon: React.ReactNode;
    name: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  const getSpeed = () => {
    switch (speed) {
      case "fast":
        return "30s";
      case "normal":
        return "45s";
      case "slow":
        return "60s";
      default:
        return "45s";
    }
  };

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      if (scrollerRef.current) {
        scrollerRef.current.appendChild(duplicatedItem);
      }
    });

    setStart(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20 max-w-7xl overflow-hidden", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
          direction === "right" ? "flex-row-reverse" : "flex-row"
        )}
        style={{
          animationDuration: getSpeed(),
        }}
      >
        {items.map((item, idx) => (
          <li
            className="w-[100px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[150px]"
            key={idx}
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="text-4xl">{item.icon}</div>
              <p className="text-xs font-semibold text-slate-300">{item.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
