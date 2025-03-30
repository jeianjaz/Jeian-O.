"use client";

import React from "react";
import { cn } from "./utils";

interface SparkleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const SparkleButton: React.FC<SparkleButtonProps> = ({
  children,
  className,
  onClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#ffffff_50%,#000000_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-white px-6 py-2 text-sm font-medium backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
};

export default SparkleButton;
