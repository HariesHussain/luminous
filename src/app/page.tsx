"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "@/components/preloader/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import BookingCTA from "@/components/sections/BookingCTA";

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
