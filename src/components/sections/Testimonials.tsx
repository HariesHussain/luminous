"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % siteConfig.testimonials.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: {
      opacity: 0,
      x: 20,
    },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const active = siteConfig.testimonials[activeIndex];

  return (
    <section 
      id="testimonials" 
      className="scroll-mt-20 py-16 md:py-24 lg:py-32 bg-[#0D0D0D] relative overflow-hidden flex flex-col items-center justify-center min-h-[450px]"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201, 168, 76, 0.04) 0%, transparent 70%), #0D0D0D"
      }}
    >
      
      {/* Giant quotation mark decoration */}
      <span className="absolute font-display text-[10rem] text-gold/10 select-none pointer-events-none top-4 left-1/2 -translate-x-1/2">
        “
      </span>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Section Label (left-aligned, slide from left) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-[9px] tracking-[0.15em] md:text-xs md:tracking-[0.2em] font-body uppercase mb-16 select-none justify-start"
        >
          <span className="text-cream/40 font-light font-body">04</span>
          <span className="text-gold/40 font-body">——</span>
          <span className="text-gold font-normal font-body">REVIEWS</span>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Slide reveal for quotes */}
          <div className="w-full relative overflow-hidden min-h-[160px] md:min-h-[120px] flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col items-center"
              >
                <p className="font-display italic text-2xl md:text-3xl text-cream leading-relaxed max-w-2xl font-light">
                  "{active.quote}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dynamic client details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`details-${activeIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-1 items-center"
            >
              <span className="font-body font-semibold text-sm tracking-[0.2em] text-gold uppercase">
                {active.name}
              </span>
              <span className="font-body font-light text-xs text-cream/40 uppercase tracking-wider">
                {active.title}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Luxury Horizontal Progress Bar (Resets on activeIndex change) */}
          <div className="w-48 h-px bg-cream/10 mx-auto mt-8 relative">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gold"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "linear" }}
              key={activeIndex}
            />
          </div>

        </div>
      </div>

      {/* Seamless transition bleed to BookingCTA section (to-[#0A0A0A]) */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none z-[1]" />
    </section>
  );
};

export default Testimonials;
