"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

interface AboutProps {
  isPreloaderComplete?: boolean;
}

export const About: React.FC<AboutProps> = ({ isPreloaderComplete = true }) => {
  const [sectionRef, hasRevealed] = useScrollReveal(0.1);

  // Stats counting values triggered by scroll reveal and preloader status
  const yearsCount = useCountUp(siteConfig.aboutStats.years, 1.6, isPreloaderComplete && hasRevealed);
  const clientsCount = useCountUp(siteConfig.aboutStats.clients, 1.6, isPreloaderComplete && hasRevealed);

  // Clean the pull quote text of any quotation marks just in case they are present
  const cleanPullQuote = siteConfig.aboutPullQuote.replace(/["“”]/g, "");

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="scroll-mt-20 pt-[clamp(60px,8vw,100px)] pb-16 md:pb-24 lg:pb-32 bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Pull-Quote & Label */}
          <div className="lg:col-span-6 pl-8 border-l-4 border-gold relative min-h-[140px]">
            {/* Section Entry Label (consistency with other sections) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={isPreloaderComplete ? { opacity: 1, x: 0 } : {}}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 text-[9px] tracking-[0.15em] md:text-xs md:tracking-[0.2em] font-body uppercase mb-8 select-none"
            >
              <span className="text-cream/40 font-light font-body">01</span>
              <span className="text-gold/40 font-body">——</span>
              <span className="text-gold font-normal font-body">THE MAISON</span>
            </motion.div>

            {/* Decorative opening quote behind text */}
            <span className="absolute font-display text-[8rem] text-gold/15 select-none pointer-events-none top-0 left-0 leading-none z-0">
              “
            </span>

            <div className="overflow-hidden">
              <motion.blockquote 
                initial={{ opacity: 0, y: "100%" }}
                whileInView={isPreloaderComplete ? { opacity: 1, y: 0 } : {}}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="relative z-10 font-display italic text-[clamp(1.4rem,5vw,2rem)] md:text-[clamp(2rem,4vw,3.5rem)] text-cream leading-tight font-light"
              >
                {cleanPullQuote}
              </motion.blockquote>
            </div>
          </div>

          {/* Right Column: Brand Story */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={isPreloaderComplete ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-6 flex flex-col gap-8 text-cream/80 text-base font-body font-light leading-relaxed tracking-wide pt-12 lg:pt-0"
          >
            <p>{siteConfig.aboutBody[0]}</p>
            <p>{siteConfig.aboutBody[1]}</p>
            
            {/* Extended gold divider width to w-16 */}
            <hr className="w-16 h-px bg-gold border-none my-2 opacity-50" />
            
            <p>{siteConfig.aboutBody[2]}</p>
          </motion.div>
        </div>

        {/* Bottom Credential Bar (Full-width, Mobile-Safe 3-Column layout) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={isPreloaderComplete ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="grid grid-cols-3 border-t border-gold/10 pt-8 mt-8 gap-0 w-full"
        >
          {/* Stat 1: Years Experience */}
          <div className="flex flex-col items-center text-center px-2 border-r border-gold/10">
            <span className="font-display text-3xl md:text-5xl text-gold leading-none">
              {yearsCount}
              <sup className="text-sm md:text-base font-body text-gold/60 ml-0.5">yrs</sup>
            </span>
            <span className="font-body text-[9px] md:text-xs tracking-[0.2em] text-cream/40 uppercase mt-2">
              Years <br className="md:hidden" /> Experience
            </span>
          </div>

          {/* Stat 2: Clients Served */}
          <div className="flex flex-col items-center text-center px-2 border-r border-gold/10">
            <span className="font-display text-3xl md:text-5xl text-gold leading-none">
              {clientsCount >= 15000 ? "15k+" : `${Math.floor(clientsCount / 1000)}k+`}
            </span>
            <span className="font-body text-[9px] md:text-xs tracking-[0.2em] text-cream/40 uppercase mt-2">
              Clients <br className="md:hidden" /> Served
            </span>
          </div>

          {/* Stat 3: Award Winning */}
          <div className="flex flex-col items-center text-center px-2">
            <span className="font-display text-3xl md:text-5xl text-gold leading-none">
              ★
            </span>
            <span className="font-body text-[9px] md:text-xs tracking-[0.2em] text-cream/40 uppercase mt-2">
              Award <br className="md:hidden" /> Winning
            </span>
          </div>
        </motion.div>

      </div>

      {/* Seamless transition bleed to Services section */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-[#1A1A1A] pointer-events-none z-[1]" />
    </section>
  );
};

export default About;
