"use client";

import { useState, useEffect } from "react";
import { SeamlessNavbar } from "@/components/ui/aceternity/seamless-navbar";
import { FloatingDock } from "@/components/ui/aceternity/floating-dock";
import { IconUser, IconCode, IconBriefcase, IconMail, IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { title: "About", icon: <IconUser className="w-5 h-5" />, href: "#about" },
  { title: "Skills", icon: <IconCode className="w-5 h-5" />, href: "#skills" },
  { title: "Projects", icon: <IconBriefcase className="w-5 h-5" />, href: "#projects" },
  { title: "Contact", icon: <IconMail className="w-5 h-5" />, href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="z-50">
      {/* Seamless top navigation for desktop */}
      <SeamlessNavbar 
        items={navItems} 
        className="hidden md:block" 
      />
      
      {/* Mobile navigation */}
      <div className="md:hidden">
        {/* Hamburger button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-black/80 backdrop-blur-md border border-cyan-500/20"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? 
            <IconX className="w-6 h-6 text-white" /> : 
            <IconMenu2 className="w-6 h-6 text-white" />
          }
        </button>
        
        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 flex flex-col items-center justify-center"
            >
              <nav className="flex flex-col items-center space-y-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * navItems.indexOf(item) }}
                  >
                    <span className="text-cyan-500">{item.icon}</span>
                    <span>{item.title}</span>
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Keep floating dock for quick access */}
        <FloatingDock 
          items={navItems} 
          mobileClassName="shadow-xl border border-cyan-500/20 bg-black/80 backdrop-blur-md text-white" 
        />
      </div>
    </header>
  );
}
