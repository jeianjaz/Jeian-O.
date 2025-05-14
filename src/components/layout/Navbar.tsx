"use client";

import { FloatingDock } from "@/components/ui/aceternity/floating-dock";
import { IconUser, IconCode, IconBriefcase, IconMail } from "@tabler/icons-react";

const navItems = [
  { title: "About", icon: <IconUser className="w-5 h-5" />, href: "#about" },
  { title: "Skills", icon: <IconCode className="w-5 h-5" />, href: "#skills" },
  { title: "Projects", icon: <IconBriefcase className="w-5 h-5" />, href: "#works" },
  { title: "Contact", icon: <IconMail className="w-5 h-5" />, href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="z-50">
      <FloatingDock 
        items={navItems} 
        desktopClassName="shadow-xl border border-[#7AD63D]/20 bg-[#1e1c29]/90 backdrop-blur-md text-white" 
        mobileClassName="shadow-xl border border-[#7AD63D]/20 bg-[#1e1c29]/90 backdrop-blur-md text-white" 
      />
    </header>
  );
}
