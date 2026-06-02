"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Preloader from "@/components/preloader/Preloader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";

const About = dynamic(() => import("@/components/sections/About"), { ssr: true });
const Services = dynamic(() => import("@/components/sections/Services"), { ssr: true });
const Gallery = dynamic(() => import("@/components/sections/Gallery"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: true });
const FAQ = dynamic(() => import("@/components/sections/FAQ"), { ssr: true });
const BookingCTA = dynamic(() => import("@/components/sections/BookingCTA"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });

export default function Home() {
  // CHANGED: introduced isPreloaderComplete state and client-mount tracker to prevent hydration errors
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // CHANGED: lock/unlock body overflow based on preloader complete status
  useEffect(() => {
    if (mounted && !isPreloaderComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted, isPreloaderComplete]);

  return (
    <main className="relative min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      {/* Cinematic Brand Reveal Preloader (rendered client-only to ensure zero hydration issues) */}
      <AnimatePresence mode="wait">
        {mounted && !isPreloaderComplete && (
          <Preloader key="preloader" onComplete={() => setIsPreloaderComplete(true)} />
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      {/* CHANGED: updated transition parameters and animation reveals mapped to preloader state */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPreloaderComplete ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col min-h-screen"
      >
        {/* CHANGED: passed isPreloaderComplete as prop to Navbar, Hero, About, and Services for animations coordination */}
        <Navbar isVisible={isPreloaderComplete} />
        <Hero isPreloaderComplete={isPreloaderComplete} />
        <About isPreloaderComplete={isPreloaderComplete} />
        <Services isPreloaderComplete={isPreloaderComplete} />
        <Gallery />
        <Testimonials />
        <FAQ />
        <BookingCTA />
        <Footer />
      </motion.div>
    </main>
  );
}
