"use client";

import { SeamlessNavbar } from "@/components/ui/aceternity/seamless-navbar";
import { FloatingDock } from "@/components/ui/aceternity/floating-dock";
import { IconUser, IconCode, IconBriefcase, IconMail } from "@tabler/icons-react";

const navItems = [
  { title: "About", icon: <IconUser className="w-5 h-5" />, href: "#about" },
  { title: "Skills", icon: <IconCode className="w-5 h-5" />, href: "#skills" },
  { title: "Projects", icon: <IconBriefcase className="w-5 h-5" />, href: "#projects" },
  { title: "Contact", icon: <IconMail className="w-5 h-5" />, href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="z-50">
      {/* Seamless top navigation for desktop */}
      <SeamlessNavbar 
        items={navItems} 
        className="hidden md:block" 
      />
      
      {/* Keep floating dock only for mobile */}
      <div className="md:hidden">
        <FloatingDock 
          items={navItems} 
          mobileClassName="shadow-xl border border-cyan-500/20 bg-black/80 backdrop-blur-md text-white" 
        />
      </div>
    </header>
  );
}
