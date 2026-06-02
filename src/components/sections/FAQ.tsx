"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gold/15 last:border-none py-6">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left gap-6 group focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-display font-light text-lg md:text-xl text-cream group-hover:text-gold transition-colors duration-300">
          {question}
        </span>
        <span className="text-gold text-xl transition-transform duration-300 shrink-0 select-none">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-body font-light text-cream/70 text-sm md:text-base leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section 
      id="faq" 
      className="scroll-mt-20 py-16 md:py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-[9px] tracking-[0.15em] md:text-xs md:tracking-[0.2em] font-body uppercase select-none"
          >
            <span className="text-cream/40 font-light font-body">05</span>
            <span className="text-gold/40 font-body">——</span>
            <span className="text-gold font-normal font-body">ATELIER FAQ</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-light text-[#F5F0E8] tracking-wide"
          >
            Maison Inquiries
          </motion.h2>
        </div>

        {/* Accordion List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="border-t border-gold/15"
        >
          {siteConfig.faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </motion.div>

      </div>

      {/* Seamless transition bleed to BookingCTA section (to-[#0A0A0A]) */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none z-[1]" />
    </section>
  );
};

export default FAQ;
