"use client";

import React from "react";
import { motion } from "framer-motion";

interface GoldLineProps {
  className?: string;
  delay?: number;
}

export const GoldLine: React.FC<GoldLineProps> = ({ className = "", delay = 0 }) => {
  return (
    <div className={`relative w-full h-[1px] overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0.5 }}
      />
    </div>
  );
};

export default GoldLine;
