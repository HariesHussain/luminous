"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSiteConfigContext } from "@/context/SiteConfigContext";
import { GalleryItem } from "@/types";
import SectionLabel from "../ui/SectionLabel";
import EditableText from "../ui/EditableText";

export const Gallery: React.FC = () => {
  const { config, isEditMode, updateImageField } = useSiteConfigContext();

  const gallery = (config.gallery as GalleryItem[]) || [];

  // Mapping grid items to the asymmetric grid layout classes (Desktop)
  const gridLayouts = [
    { areaClass: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto", label: "large" },
    { areaClass: "md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto", label: "small-1" },
    { areaClass: "md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto", label: "small-2" },
    { areaClass: "md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto", label: "medium-1" },
    { areaClass: "md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto", label: "medium-2" },
    { areaClass: "md:col-span-1 md:row-span-1 aspect-[4/3] md:aspect-auto", label: "small-3" },
  ];

  // Specific reveal animations based on grid placement (large, right, bottom)
  const getVariants = (idx: number) => {
    if (idx === 0) {
      return {
        hidden: { opacity: 0, x: -30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
        }
      };
    }
    if (idx === 1 || idx === 2) {
      return {
        hidden: { opacity: 0, x: 30 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1],
            delay: (idx - 1) * 0.15 
          }
        }
      };
    }
    // Bottom row (idx 3, 4, 5)
    return {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.3 + (idx - 3) * 0.1
        }
      }
    };
  };

  return (
    <section id="gallery" className="scroll-mt-20 py-16 md:py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16">
          <SectionLabel number="03" text="Portfolio" />
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-light text-[#F5F0E8] tracking-wide"
          >
            Visual Artistry
          </motion.h2>
        </div>

        {/* MOBILE LAYOUT (snap horizontal scroll carousel) */}
        <div className="md:hidden">
          {/* Scrollable snap row */}
          <div 
            className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-4 scrollbar-none"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {gallery.map((item, i) => (
              <motion.div
                key={item.id}
                className="relative flex-shrink-0 w-[75vw] overflow-hidden snap-start border border-gold/15"
                style={{ aspectRatio: "3/4" }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="relative w-full h-full group/img">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    style={{ filter: "saturate(0.75) contrast(1.05)" }}
                    sizes="75vw"
                    unoptimized={item.imageUrl.startsWith("http") || item.imageUrl.startsWith("blob:")}
                  />
                  {isEditMode && (
                    <label className="absolute inset-0 bg-black/55 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white cursor-pointer text-xs font-bold transition-all duration-300 z-30">
                      ✏️ Replace Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            const objectUrl = URL.createObjectURL(e.target.files[0]);
                            const updatedGallery = [...gallery];
                            updatedGallery[i] = { ...updatedGallery[i], imageUrl: objectUrl };
                            updateImageField(`gallery[${i}].imageUrl`, e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                
                {/* Label bottom-left */}
                <div className="absolute bottom-4 left-4 z-10">
                  <EditableText
                    fieldKey={`gallery[${i}].category`}
                    as="span"
                    nested
                    className="text-gold text-[10px] tracking-[0.2em] uppercase font-body"
                  >
                    {item.category}
                  </EditableText>
                  <EditableText
                    fieldKey={`gallery[${i}].title`}
                    as="p"
                    nested
                    className="text-cream text-sm font-display italic mt-1"
                  >
                    {item.title}
                  </EditableText>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {gallery.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-cream/20" />
            ))}
          </div>
        </div>

        {/* DESKTOP LAYOUT (asymmetric Magazine Grid) */}
        <div className="hidden md:grid grid-cols-3 grid-rows-[250px_250px_250px] gap-6">
          {gallery.map((item, idx) => {
            const layout = gridLayouts[idx] || { areaClass: "", label: `item-${idx}` };
            
            return (
              <motion.div
                key={item.id}
                variants={getVariants(idx)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                whileHover="hover"
                data-cursor-text="VIEW"
                className={`relative group overflow-hidden border border-gold/15 bg-gradient-to-tr from-[#2D0A14] to-[#1A1A1A] cursor-pointer ${layout.areaClass}`}
              >
                {/* Visual Image */}
                {item.imageUrl && (
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="relative w-full h-full group/img">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        style={{ filter: 'saturate(0.7) contrast(1.05)', objectFit: "cover" }}
                        sizes="(max-w-768px) 100vw, 33vw"
                        className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-106"
                        unoptimized={item.imageUrl.startsWith("http") || item.imageUrl.startsWith("blob:")}
                      />
                      {isEditMode && (
                        <label className="absolute inset-0 bg-black/55 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white cursor-pointer text-xs font-bold transition-all duration-300 z-30">
                          ✏️ Replace Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                updateImageField(`gallery[${idx}].imageUrl`, e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                    {/* Dark multiply overlay for color harmony */}
                    <div className="absolute inset-0 bg-black/20 mix-blend-multiply pointer-events-none" />
                    {/* Editorial Color Tint Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2D0A14]/30 via-transparent to-black/40 z-1" />
                  </div>
                )}

                {/* Subtle Grain Overlay */}
                <div className="grain-overlay" />

                {/* Hover Reveal Details */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-between p-6">
                  {/* Category Indicator */}
                  <EditableText
                    fieldKey={`gallery[${idx}].category`}
                    as="span"
                    nested
                    className="text-[10px] tracking-[0.25em] font-body text-gold uppercase"
                  >
                    {item.category}
                  </EditableText>
                  
                  {/* Bottom title */}
                  <EditableText
                    fieldKey={`gallery[${idx}].title`}
                    as="h3"
                    nested
                    className="text-lg font-display text-cream font-light tracking-wide"
                  >
                    {item.title}
                  </EditableText>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Seamless transition bleed to Testimonials section */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-[#0D0D0D] pointer-events-none z-[1]" />
    </section>
  );
};

export default Gallery;
