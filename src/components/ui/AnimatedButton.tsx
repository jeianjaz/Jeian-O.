"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "ghost" | "text";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  target?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  animationPreset?: "bounce" | "pulse" | "shine" | "minimal";
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  href,
  target,
  disabled = false,
  fullWidth = false,
  animationPreset = "minimal",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Base styles
  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium transition-all duration-200
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `;

  // Size styles
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5 rounded-md",
    md: "text-base px-4 py-2 rounded-lg",
    lg: "text-lg px-6 py-3 rounded-xl",
  };

  // Variant styles
  const variantClasses = {
    primary: "bg-black text-white hover:bg-black/90",
    outline: "bg-transparent border border-black text-black hover:bg-black/5",
    ghost: "bg-transparent text-black hover:bg-black/5",
    text: "bg-transparent text-black underline-offset-4 hover:underline",
  };

  // Animation variants
  const getAnimationStyles = () => {
    switch (animationPreset) {
      case "bounce":
        return {
          rest: { scale: 1 },
          hover: { scale: 1.05 },
          tap: { scale: 0.95 },
        };
      case "pulse":
        return {
          rest: { boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" },
          hover: { boxShadow: "0 0 0 5px rgba(0, 0, 0, 0.1)" },
          tap: { boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.2)" },
        };
      case "shine":
        return {
          rest: { backgroundPosition: "200% 0" },
          hover: { backgroundPosition: "0 0" },
          tap: { scale: 0.98 },
        };
      case "minimal":
      default:
        return {
          rest: { y: 0 },
          hover: { y: -2 },
          tap: { y: 1 },
        };
    }
  };

  const animationStyles = getAnimationStyles();

  // Shine effect for the "shine" animation preset
  const shineStyles =
    animationPreset === "shine"
      ? {
          backgroundSize: "200% auto",
          backgroundImage:
            variant === "primary"
              ? "linear-gradient(to right, #000000 0%, #333333 50%, #000000 100%)"
              : undefined,
          transition: "background-position 0.5s ease-out, transform 0.2s ease-out",
        }
      : {};

  const buttonContent = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      
      {/* Animated background for hover effect */}
      {!disabled && (
        <motion.span
          className="absolute inset-0 -z-10 rounded-inherit overflow-hidden"
          initial={false}
          animate={isHovered ? "hover" : "rest"}
        >
          {animationPreset === "shine" && (
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                transform: "skewX(-20deg)",
                width: "30%",
                left: "-100%",
              }}
              animate={isHovered ? { left: "200%" } : { left: "-100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}
        </motion.span>
      )}
    </>
  );

  const motionProps = {
    initial: "rest",
    animate: isPressed ? "tap" : isHovered ? "hover" : "rest",
    variants: animationStyles,
    onHoverStart: () => !disabled && setIsHovered(true),
    onHoverEnd: () => !disabled && setIsHovered(false),
    onTapStart: () => !disabled && setIsPressed(true),
    onTap: () => !disabled && setIsPressed(false),
    onTapCancel: () => !disabled && setIsPressed(false),
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  // Combine all classes
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  // Return as link or button
  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        target={target}
        className={combinedClasses}
        style={shineStyles}
        {...motionProps}
        onClick={onClick}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={combinedClasses}
      style={shineStyles}
      disabled={disabled}
      {...motionProps}
      onClick={!disabled ? onClick : undefined}
    >
      {buttonContent}
    </motion.button>
  );
};

export default AnimatedButton;
