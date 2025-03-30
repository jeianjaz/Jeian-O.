"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Works", href: "#works" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <header className="fixed top-6 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex justify-center items-center bg-white/90 backdrop-blur-md shadow-lg rounded-full py-2 px-6 max-w-sm mx-auto border border-gray-100">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="relative text-black font-medium text-base"
                  onMouseEnter={() => setActiveItem(item.name)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  {item.name}
                  {activeItem === item.name && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
