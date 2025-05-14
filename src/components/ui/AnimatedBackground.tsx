"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";

interface AnimatedBackgroundProps {
  variant?: "dots" | "lines" | "minimal" | "wave";
  color?: string;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = "minimal",
  color = "#000000",
  className = "",
}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Do something after particles are loaded
  }, []);

  // Configuration based on variant
  const getConfig = () => {
    const baseConfig = {
      fullScreen: false,
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: color,
        },
        links: {
          color: color,
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 40,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    };

    // Variant-specific configurations
    switch (variant) {
      case "dots":
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            links: {
              ...baseConfig.particles.links,
              enable: false,
            },
            number: {
              ...baseConfig.particles.number,
              value: 80,
            },
            move: {
              ...baseConfig.particles.move,
              speed: 0.5,
              direction: "top",
              random: true,
            },
            opacity: {
              value: 0.4,
            },
            size: {
              value: { min: 1, max: 4 },
            },
          },
        };
      case "lines":
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            links: {
              ...baseConfig.particles.links,
              opacity: 0.15,
              width: 0.5,
            },
            number: {
              ...baseConfig.particles.number,
              value: 60,
            },
            opacity: {
              value: 0.2,
            },
          },
        };
      case "wave":
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            links: {
              ...baseConfig.particles.links,
              enable: false,
            },
            move: {
              ...baseConfig.particles.move,
              path: {
                clamp: false,
                enable: true,
                delay: {
                  value: 0,
                },
                generator: "waves",
              },
              speed: 1.5,
            },
            number: {
              ...baseConfig.particles.number,
              value: 30,
            },
            opacity: {
              value: 0.3,
              animation: {
                enable: true,
                speed: 0.5,
                sync: false,
                minimumValue: 0.1,
              },
            },
            size: {
              value: { min: 1, max: 3 },
              animation: {
                enable: true,
                speed: 2,
                sync: false,
                minimumValue: 0.1,
              },
            },
          },
        };
      case "minimal":
      default:
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            number: {
              ...baseConfig.particles.number,
              value: 20,
            },
            opacity: {
              value: 0.2,
            },
            links: {
              ...baseConfig.particles.links,
              opacity: 0.1,
            },
            move: {
              ...baseConfig.particles.move,
              speed: 0.3,
            },
          },
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={`absolute inset-0 -z-10 ${className}`}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={getConfig()}
        className="absolute inset-0"
      />
    </motion.div>
  );
};

export default AnimatedBackground;
