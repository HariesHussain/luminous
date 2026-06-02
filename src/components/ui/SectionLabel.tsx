"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionLabelProps {
  number: string;
  text: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ number, text, className = "" }) => {
  return (
    <motion.div
      className={`flex items-center gap-3 text-[9px] tracking-[0.15em] md:text-xs md:tracking-[0.25em] font-body text-gold uppercase ${className}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="opacity-60">{number}</span>
      <span className="h-[1px] w-6 bg-gold/30" />
      <span className="font-semibold">{text}</span>
    </motion.div>
  );
};

export default SectionLabel;
