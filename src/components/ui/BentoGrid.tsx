"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedCard from "./AnimatedCard";

interface BentoGridItemProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  glareEnabled?: boolean;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  title,
  description,
  icon,
  className = "",
  children,
  href,
  header,
  footer,
  colSpan = 1,
  rowSpan = 1,
  glareEnabled = true,
}) => {
  const gridItemClasses = `col-span-${colSpan} row-span-${rowSpan} ${className}`;
  
  const content = (
    <AnimatedCard 
      className={`h-full rounded-xl overflow-hidden ${className}`}
      glareEnabled={glareEnabled}
    >
      <div className="h-full p-4 flex flex-col">
        {header && <div className="mb-4">{header}</div>}
        {!header && icon && (
          <div className="mb-4 inline-flex p-2 rounded-lg bg-black/5">
            {icon}
          </div>
        )}
        {title && (
          <motion.h3 
            className="text-lg font-medium mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h3>
        )}
        {description && (
          <motion.p 
            className="text-sm text-gray-700 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
        )}
        {children && <div className="flex-grow">{children}</div>}
        {footer && <div className="mt-auto pt-4">{footer}</div>}
      </div>
    </AnimatedCard>
  );

  if (href) {
    return (
      <a href={href} className={gridItemClasses}>
        {content}
      </a>
    );
  }

  return <div className={gridItemClasses}>{content}</div>;
};

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
  cols?: number;
  gap?: number;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  className = "",
  children,
  cols = 3,
  gap = 4,
}) => {
  return (
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-${cols} gap-${gap} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, staggerChildren: 0.1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default BentoGrid;
