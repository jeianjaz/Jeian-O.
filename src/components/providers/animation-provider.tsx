"use client";

import React from "react";
import { ClickSpark } from "@/components/ui/animations/click-spark";
import { OGLParticles } from "@/components/ui/animations/ogl-particles";

interface AnimationProviderProps {
  children: React.ReactNode;
  enableClickSpark?: boolean;
  enableParticles?: boolean;
  particlesMouseInteraction?: boolean;
}

export const ClickSparkProvider = ({ 
  children,
  enableClickSpark = true,
  enableParticles = true,
  particlesMouseInteraction = false,
}: AnimationProviderProps) => {
  return (
    <>
      {children}
      {enableClickSpark && <ClickSpark color="white" size={8} />}
      {enableParticles && (
        <OGLParticles 
          count={40} /* Reduced particle count for better performance */
          mouseInteraction={particlesMouseInteraction}
          rotation={true}
          color="#ffffff"
          className="opacity-50" /* Reduced opacity */
        />
      )}
    </>
  );
};
