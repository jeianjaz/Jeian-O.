"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback, memo } from "react";
import Link from "next/link";

type NavbarItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

interface SeamlessNavbarProps {
  items: NavbarItem[];
  className?: string;
}

// Create the navbar component with proper typing
function NavbarComponent({ items, className }: SeamlessNavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  // Use useCallback to memoize the scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 50);
    
    // Don't highlight any nav item when in the Hero section
    if (scrollPosition < 100) {
      setActiveSection("");
      return;
    }
    
    // Special case for Contact section - if we're near the bottom
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollPosition + clientHeight >= scrollHeight - 400) {
      const sections = items.map(item => item.href.replace('#', ''));
      setActiveSection(sections[sections.length - 1]); // Set last nav item as active
      return;
    }
    
    // Find active section based on scroll position
    const sections = items.map(item => item.href.replace('#', ''));
    let foundActive = false;
    
    // Check if any section is in the ideal viewport position
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // If the section is in view (with generous buffer for better UX)
        if (rect.top <= 200 && rect.bottom >= 0) {
          setActiveSection(section);
          foundActive = true;
          break;
        }
      }
    }
    
    // If no section is in the ideal position, check if we're near the bottom
    if (!foundActive) {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;
      
      // More aggressive detection for the Contact section
      if (scrollTop + clientHeight >= scrollHeight - (scrollHeight * 0.4)) {
        setActiveSection(sections[sections.length - 1]);
      }
    }
  }, [items]);
  
  useEffect(() => {
    // Add passive: true to optimize scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call to set correct state on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ willChange: "transform, opacity" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-all duration-300",
        scrolled 
          ? "bg-black/60 backdrop-blur-lg border-b border-cyan-500/20" 
          : "bg-transparent",
        className
      )}
    >
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-center">
        {/* Navigation links - centered with revamped design */}
        <div className="hidden md:flex items-center space-x-2 relative bg-black/60 backdrop-blur-md rounded-2xl p-1.5 border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
          {items.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "relative px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300",
                  isActive 
                    ? "text-white" 
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  // Immediately set this as the active section
                  setActiveSection(item.href.replace('#', ''));
                  // Then scroll to it
                  document.querySelector(item.href)?.scrollIntoView({
                    behavior: "smooth"
                  });
                }}
              >
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10">{item.title}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-xl border border-cyan-400/50 shadow-lg shadow-cyan-500/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    style={{ willChange: "transform, opacity" }}
                  />
                )}
              </Link>
            );
          })}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <span className="sr-only">Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// Memoize the component and set display name
export const SeamlessNavbar = memo(NavbarComponent);
SeamlessNavbar.displayName = "SeamlessNavbar";
