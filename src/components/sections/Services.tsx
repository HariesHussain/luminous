"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { Service } from "@/types";
import gsap from "@/lib/gsap";

interface ServicesProps {
  isPreloaderComplete?: boolean;
}

interface ServiceCardProps {
  service: Service;
  variants: any;
}

// Sub-component: ServiceCard (with Mobile-Tap & Desktop-Hover support)
const ServiceCard: React.FC<ServiceCardProps> = ({ service, variants }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Motion values to track cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs configuration for premium hover lag
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsTapped(false); // Reset tap state when mouse leaves on desktop
      }}
      onTouchStart={() => setIsTapped(!isTapped)}
      variants={variants}
      data-cursor-text="VIEW"
      className={`group relative overflow-hidden flex flex-col justify-between p-8 border border-gold/15 rounded-none bg-transparent hover:bg-[#1A1A1A] hover:border-gold/50 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isTapped ? "bg-[#1A0A0A] border-gold/40" : ""
      }`}
      style={{ cursor: "none" }} // Hide default cursor on card hover
    >
      {/* Subtle gold shimmer line that travels left to right across top border on hover */}
      <span className="absolute top-[-1px] left-0 h-[1px] w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full" />

      <div>
        {/* Decorative Roman Numeral */}
        <span className="font-display text-4xl text-gold/45 group-hover:text-gold/85 transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] block mb-4">
          {service.numeral}
        </span>

        {/* Service Name */}
        <h3 className="font-display font-semibold text-2xl text-cream leading-tight">
          {service.name}
        </h3>

        {/* Description */}
        <p className="font-body font-light text-cream/60 text-sm mt-3 leading-relaxed">
          {service.description}
        </p>
      </div>

      <div>
        {/* Price & Duration (Luxury Menu Layout) */}
        <div className="flex items-center w-full mt-8 gap-4">
          <span className="font-display font-medium text-xl text-gold shrink-0">
            {service.price}
          </span>
          <div className="flex-1 border-b border-dashed border-gold/10 self-end mb-1.5" />
          <span className="font-body font-light text-xs text-cream/30 shrink-0">
            {service.duration.toLowerCase().replace("mins", "min")}
          </span>
        </div>
      </div>

      {/* Subtle "tap hint" on mobile (hidden when tapped) */}
      <span 
        className={`${
          isTapped ? "hidden" : "md:hidden"
        } absolute bottom-4 right-4 text-[9px] text-gold/30 tracking-widest uppercase select-none pointer-events-none`}
      >
        Tap
      </span>

      {/* Mobile-Specific Slide Up Image on Tap */}
      {service.cursorImage && (
        <motion.div
          className="md:hidden absolute inset-x-0 bottom-0 h-40 overflow-hidden"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ 
            y: isTapped ? "0%" : "100%",
            opacity: isTapped ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={service.cursorImage}
            alt={service.name}
            fill
            className="object-cover"
            style={{ filter: "saturate(0.7) contrast(1.05)" }}
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
        </motion.div>
      )}

      {/* Floating Image Reveal (hidden on mobile, visible on tablet/desktop) */}
      {service.cursorImage && (
        <motion.div
          className="hidden md:block absolute pointer-events-none z-20"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-70%", // Image floats above cursor
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          exit={{
            opacity: 0,
            scale: 0.85,
          }}
          transition={{
            duration: isHovered ? 0.3 : 0.2, // Faster exit than entry
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="relative w-48 h-32 overflow-hidden border border-gold/30 bg-charcoal">
            <Image
              src={service.cursorImage}
              alt={service.name}
              fill
              sizes="192px"
              className="object-cover"
              style={{ filter: "saturate(0.75) contrast(1.05)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export const Services: React.FC<ServicesProps> = ({ isPreloaderComplete = true }) => {
  const underlineRef = useRef<HTMLDivElement | null>(null);

  // GSAP scroll-drawn underline triggered by preloader completion
  useGSAP(() => {
    if (!isPreloaderComplete || !underlineRef.current) return;
    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: underlineRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  }, [isPreloaderComplete]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="services" className="scroll-mt-20 py-16 md:py-24 lg:py-32 bg-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          {/* Section Label (consistency with other sections, slide from left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={isPreloaderComplete ? { opacity: 1, x: 0 } : {}}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-[9px] tracking-[0.15em] md:text-xs md:tracking-[0.2em] font-body uppercase mb-4 select-none"
          >
            <span className="text-cream/40 font-light font-body">02</span>
            <span className="text-gold/40 font-body">——</span>
            <span className="text-gold font-normal font-body">OUR CRAFT</span>
          </motion.div>

          {/* Title (rise up) */}
          <div className="overflow-hidden py-1">
            <motion.h2 
              initial={{ opacity: 0, y: "100%" }}
              whileInView={isPreloaderComplete ? { opacity: 1, y: 0 } : {}}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-display font-light text-4xl md:text-5xl text-cream relative pb-6 tracking-wide"
            >
              Our Craft
              {/* GSAP scroll-drawn underline */}
              <div 
                ref={underlineRef}
                className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gold origin-center"
              />
            </motion.h2>
          </div>
        </div>

        {/* Services Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView={isPreloaderComplete ? "visible" : "hidden"}
          viewport={{ once: true, margin: "-80px" }}
        >
          {siteConfig.services.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              variants={cardVariants} 
            />
          ))}
        </motion.div>

      </div>

      {/* Seamless transition bleed to Gallery section (to-[#0A0A0A]) */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none z-[1]" />
    </section>
  );
};

export default Services;
