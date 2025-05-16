"use client";

import React, { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Plane, Vec2 } from 'ogl';

interface OGLParticlesProps {
  count?: number;
  color?: string;
  mouseInteraction?: boolean;
  rotation?: boolean;
  className?: string;
}

export function OGLParticles({
  count = 100,
  color = '#ffffff',
  mouseInteraction = false,
  rotation = true,
  className = '',
}: OGLParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef<Vec2 | null>(null);
  const timeRef = useRef<number>(0);
  const particlesRef = useRef<Transform[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Detect if device is mobile for performance optimizations
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      typeof navigator !== 'undefined' ? navigator.userAgent : ''
    );
    
    // Reduce particle count on mobile
    const actualCount = isMobile ? Math.floor(count / 2) : count;

    // Initialize renderer with optimized settings
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.5), // Reduced DPR for better performance
      alpha: true,
      antialias: false, // Disable antialiasing for better performance
    });
    rendererRef.current = renderer;

    const { gl } = renderer;
    containerRef.current.appendChild(gl.canvas);

    // Handle resize
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (camera) {
        camera.perspective({
          aspect: gl.canvas.width / gl.canvas.height,
        });
      }
    };

    // Initialize camera
    const camera = new Camera(gl, {
      fov: 45,
      aspect: gl.canvas.width / gl.canvas.height,
      near: 0.01,
      far: 100,
    });
    camera.position.z = 5;

    // Initialize scene
    const scene = new Transform();

    // Initialize mouse
    let updateMouse: ((e: MouseEvent) => void) | null = null;
    if (mouseInteraction) {
      mouseRef.current = new Vec2();
      
      updateMouse = (e: MouseEvent) => {
        if (!mouseRef.current) return;
        // Convert mouse position to normalized device coordinates (-1 to +1)
        mouseRef.current.set(
          (e.clientX / window.innerWidth) * 2 - 1,
          (e.clientY / window.innerHeight) * -2 + 1
        );
      };

      window.addEventListener('mousemove', updateMouse, false);
    }

    // Create particle material
    const program = new Program(gl, {
      vertex: /* glsl */`
        attribute vec3 position;
        attribute vec4 random;
        
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uMouseStrength;
        uniform float uRotation;
        
        varying vec4 vRandom;
        
        void main() {
          vRandom = random;
          
          // Get particle position
          vec3 pos = position;
          
          // Apply time-based rotation if enabled
          if (uRotation > 0.0) {
            float angle = uTime * random.w * 0.3;
            float radius = length(pos.xy);
            float c = cos(angle);
            float s = sin(angle);
            pos.x = radius * c;
            pos.y = radius * s;
          }
          
          // Apply mouse interaction if enabled
          if (uMouseStrength > 0.0) {
            vec2 mouseDir = uMouse - pos.xy;
            float mouseDist = length(mouseDir);
            float mouseEffect = max(0.0, 1.0 - mouseDist * 2.0);
            pos.xy += normalize(mouseDir) * mouseEffect * uMouseStrength * random.z;
          }
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = random.y * 5.0;
        }
      `,
      fragment: /* glsl */`
        precision highp float;
        
        uniform vec3 uColor;
        
        varying vec4 vRandom;
        
        void main() {
          // Create circular particle
          float distToCenter = length(gl_PointCoord - vec2(0.5));
          if (distToCenter > 0.5) discard;
          
          // Apply color with random alpha
          gl_FragColor = vec4(uColor, vRandom.x * 0.7 + 0.3);
        }
      `,
      transparent: true,
      depthTest: false,
    });

    // Parse color to RGB
    const hexToRGB = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b];
    };

    const colorRGB = color.startsWith('#') 
      ? hexToRGB(color) 
      : [1, 1, 1]; // Default to white if invalid format

    // Set uniforms
    program.uniforms = {
      uTime: { value: 0 },
      uColor: { value: colorRGB },
      uMouse: { value: [0, 0] },
      uMouseStrength: { value: mouseInteraction ? 0.1 : 0 },
      uRotation: { value: rotation ? 1.0 : 0.0 },
    };

    // Create particles
    const createParticles = () => {
      // Clear existing particles
      if (particlesRef.current.length > 0) {
        particlesRef.current.forEach(particle => {
          scene.removeChild(particle);
        });
        particlesRef.current = [];
      }

      // Create a simple plane geometry for particles - optimized for performance
      const geometry = new Plane(gl, {
        width: 0.05,
        height: 0.05,
        widthSegments: 1,
        heightSegments: 1,
      });

      // Add random attribute for each particle
      const randomData = new Float32Array(actualCount * 4);
      for (let i = 0; i < actualCount; i++) {
        // Random values for size, alpha, mouse effect strength, and rotation speed
        randomData[i * 4 + 0] = Math.random(); // Alpha multiplier
        randomData[i * 4 + 1] = Math.random() * 0.8 + 0.2; // Size multiplier
        randomData[i * 4 + 2] = Math.random() * 0.5 + 0.5; // Mouse effect strength
        randomData[i * 4 + 3] = Math.random() * 2 - 1; // Rotation direction and speed
      }
      geometry.addAttribute('random', { size: 4, data: randomData });

      // Create and position particles - use actualCount for mobile optimization
      for (let i = 0; i < actualCount; i++) {
        const particle = new Transform();
        
        // Random position in a sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = Math.random() * 4 + 1;
        
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi) * 0.2; // Flatten z-axis
        
        const mesh = new Mesh(gl, { geometry, program });
        particle.addChild(mesh);
        scene.addChild(particle);
        particlesRef.current.push(particle);
      }
    };

    // Animation loop with frame throttling for better performance
    let lastFrameTime = 0;
    const frameInterval = isMobile ? 1000/30 : 1000/60; // 30fps on mobile, 60fps on desktop
    
    const animate = (time: number) => {
      const now = time;
      const elapsed = now - lastFrameTime;
      
      // Only update animation if enough time has passed (frame throttling)
      if (elapsed > frameInterval) {
        lastFrameTime = now - (elapsed % frameInterval);
        timeRef.current = time * 0.001; // Convert to seconds
        
        // Update uniforms
        program.uniforms.uTime.value = timeRef.current;
        
        if (mouseInteraction && mouseRef.current) {
          program.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];
        }
        
        // Render
        renderer.render({ scene, camera });
      }
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resize();
    createParticles();
    window.addEventListener('resize', resize);
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      window.removeEventListener('resize', resize);
      
      if (mouseInteraction && updateMouse) {
        window.removeEventListener('mousemove', updateMouse);
      }
      
      if (gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(gl.canvas);
      }
      
      // Clean up renderer resources
      try {
        // In OGL, we don't need to explicitly dispose the renderer
        // Just make sure we remove the canvas and clear references
        rendererRef.current = null;
      } catch (error) {
        console.warn('Error cleaning up renderer:', error);
      }
    };
  }, [count, color, mouseInteraction, rotation]);

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      style={{ position: 'absolute', width: '100%', height: '100%' }}
    />
  );
}
