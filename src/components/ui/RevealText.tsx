"use client";

import React from "react";
import { motion } from "framer-motion";
import { LUXURY_EASE } from "@/lib/animations";

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: string | number;
  className?: string;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  delay = 0,
  duration = 1.2,
  yOffset = "100%",
  className = "",
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
      <motion.div
        initial={{ y: yOffset }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration, delay, ease: LUXURY_EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealText;
