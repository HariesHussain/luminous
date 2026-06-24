"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteConfigContext } from "@/context/SiteConfigContext";
import { getWhatsAppURL } from "@/lib/whatsapp";
import EditableText from "@/components/ui/EditableText";

interface NavbarProps {
  isVisible?: boolean;
}

const useScrolled = (threshold = 80) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
};

export const Navbar: React.FC<NavbarProps> = ({ isVisible = true }) => {
  const isScrolled = useScrolled(80);
  const [isOpen, setIsOpen] = useState(false);
  const { config } = useSiteConfigContext();

  const navLinks = [
    { name: "The Maison", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#testimonials" },
  ];

  const mobileContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const waURL = getWhatsAppURL(
    config.whatsapp?.number || "919876543210",
    config.whatsapp?.bookingMessage || "Hello, I would like to book an appointment."
  );

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-out ${
          isScrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-md py-3 border-b border-[#C9A84C]/15 shadow-lg"
            : "bg-transparent py-4 md:py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between h-14 md:h-auto">
          {/* Logo (Left) */}
          <a
            href="/"
            className="font-display font-light text-[#F5F0E8] hover:text-[#C9A84C] transition-colors duration-300 text-[clamp(0.85rem,4vw,1rem)] tracking-[0.25em] md:text-2xl md:tracking-[0.25em]"
          >
            <EditableText fieldKey="name" as="span">
              {config.name}
            </EditableText>
          </a>

          {/* Desktop Nav Links (Center) */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] font-body text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Booking / CTA & Toggle (Right) */}
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href={waURL}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-book-btn px-5 py-2 text-xs uppercase tracking-[0.2em] font-body hidden md:flex"
            >
              <EditableText fieldKey="bookingCTA" as="span">
                Book Now
              </EditableText>
            </a>

            {/* Mobile Menu Toggle (3 thin lines, no icons) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[#F5F0E8] hover:text-[#C9A84C] transition-colors duration-300 focus:outline-none z-50 p-2 ml-auto flex flex-col gap-y-1.5"
              aria-label="Toggle menu"
            >
              <span className="w-6 h-px bg-cream" />
              <span className="w-6 h-px bg-cream" />
              <span className="w-6 h-px bg-cream" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav overlay with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between p-8 pt-24 md:hidden"
          >
            {/* Close button top-right: × symbol */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-cream hover:text-gold transition-colors duration-300 p-2 z-50 font-display text-4xl leading-none"
              aria-label="Close menu"
            >
              ×
            </button>

            {/* Nav links stacked vertically, centered */}
            <motion.div
              variants={mobileContainerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center justify-center flex-1 gap-8"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={mobileLinkVariants}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl uppercase tracking-[0.15em] font-display text-cream hover:text-gold transition-colors duration-300 block text-center"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Bottom: Book Now full-width gold button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col gap-6 pt-6 border-t border-white/10"
            >
              <a
                href={waURL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 bg-gold text-[#0A0A0A] text-xs uppercase tracking-[0.2em] font-body font-semibold hover:bg-gold-light transition-all duration-300"
              >
                Book Now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
