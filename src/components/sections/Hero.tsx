"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useSiteConfigContext } from "@/context/SiteConfigContext";
import { getWhatsAppURL } from "@/lib/whatsapp";
import Magnetic from "../ui/Magnetic";
import EditableText from "../ui/EditableText";

interface HeroProps {
  isPreloaderComplete?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isPreloaderComplete = true }) => {
  const { config, isEditMode, updateImageField } = useSiteConfigContext();

  // custom Framer Motion background image scroll parallax
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], ["0%", "30%"]);

  // custom cinematic variants for animation precision
  const heroItemVariants = (delay: number) => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  });

  const waURL = getWhatsAppURL(
    config.whatsapp?.number || "919876543210",
    "Hello LUMINOUS, I would like to arrange a consultation. Could you please share your available time slots?"
  );

  const heroImageUrl =
    config.heroImage ||
    config.ogImage ||
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1800&auto=format&fit=crop";

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] pt-20 overflow-hidden"
    >
      {/* Background image with parallax overlay */}
      <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
        <motion.div className="w-full h-full relative scale-110" style={{ y: imageY }}>
          <div className="relative w-full h-full group">
            <Image
              src={heroImageUrl}
              alt="Atelier interior"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={true}
              className="w-full h-full"
              unoptimized={heroImageUrl.startsWith("http") || heroImageUrl.startsWith("blob:")}
            />
            {isEditMode && (
              <label className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer text-sm font-bold transition-all duration-300 z-30">
                ✏️ Replace Hero Background
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) updateImageField("heroImage", e.target.files[0]);
                  }}
                />
              </label>
            )}
          </div>
        </motion.div>
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.95) 100%)"
          }}
        />
      </div>

      {/* top-left vertical line tension element for editorial framing */}
      <div className="absolute top-28 left-6 md:left-12 z-20 hidden sm:flex flex-col items-center gap-2 pointer-events-none">
        <div className="h-16 w-px bg-[#C9A84C]/40" />
        <span className="font-body text-xs text-[#C9A84C]/40 font-light tracking-widest">01</span>
      </div>

      {/* top-right rotated city tension element for editorial framing */}
      <div className="absolute top-36 right-6 md:right-12 z-20 hidden sm:block pointer-events-none">
        <span className="block font-body font-light text-xs text-[#F5F0E8]/30 tracking-[0.3em] origin-right translate-x-1/2 rotate-90 whitespace-nowrap">
          HYDERABAD, IN
        </span>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Tagline */}
        <motion.div
          className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#C9A84C] mb-6 font-body font-light"
          initial="hidden"
          animate={isPreloaderComplete ? "visible" : "hidden"}
          variants={heroItemVariants(0)}
        >
          <EditableText fieldKey="tagline" as="p">
            {config.tagline}
          </EditableText>
        </motion.div>

        {/* Big Serif Heading */}
        <h1 className="text-5xl md:text-8xl font-display font-light text-[#F5F0E8] leading-[1.1] mb-8 tracking-wide">
          {(config.heroHeadline as string[])?.map((line: string, idx: number) => (
            <div key={idx} className="overflow-hidden block py-1">
              <motion.span
                variants={heroItemVariants(idx * 0.12)}
                initial="hidden"
                animate={isPreloaderComplete ? "visible" : "hidden"}
                className="block"
              >
                <EditableText
                  fieldKey={`heroHeadline[${idx}]`}
                  as="span"
                  nested
                >
                  {line}
                </EditableText>
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.div
          className="max-w-xl text-sm md:text-base font-body text-[#F5F0E8]/70 leading-relaxed font-light mb-12"
          initial="hidden"
          animate={isPreloaderComplete ? "visible" : "hidden"}
          variants={heroItemVariants(0.28)}
        >
          <EditableText fieldKey="heroSubtitle" as="p">
            {config.heroSubtitle}
          </EditableText>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial="hidden"
          animate={isPreloaderComplete ? "visible" : "hidden"}
          variants={heroItemVariants(0.45)}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <Magnetic>
            <motion.a
              href={waURL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, filter: "brightness(1.08)" }}
              whileTap={{ scale: 0.98 }}
              className="shimmer-btn px-8 py-4 bg-[#C9A84C] text-[#0A0A0A] text-xs uppercase tracking-[0.25em] font-body font-semibold hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10">Arrange Consultation</span>
            </motion.a>
          </Magnetic>
          <a
            href="#services"
            className="relative text-xs uppercase tracking-[0.25em] font-body text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors duration-300 py-2 group"
          >
            Explore Services
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F5F0E8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <motion.span
          className="text-[9px] tracking-[0.25em] text-[#F5F0E8] uppercase font-body"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll
        </motion.span>
        <div className="w-[1px] h-10 bg-[#F5F0E8]/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 bottom-0 bg-[#C9A84C]"
            style={{ transformOrigin: "top" }}
            animate={{
              scaleY: [0, 1, 0],
              y: ["0%", "0%", "100%"]
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 1]
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
