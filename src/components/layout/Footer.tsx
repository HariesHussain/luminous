"use client";

import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { getWhatsAppURL } from "@/lib/whatsapp";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const instagramUrl = siteConfig.socials.find((s) => s.platform === "Instagram")?.url || "https://instagram.com";
  const facebookUrl = siteConfig.socials.find((s) => s.platform === "Facebook")?.url || "https://facebook.com";

  const waURL = getWhatsAppURL(
    siteConfig.whatsapp.number,
    "Hello LUMINOUS, I found you through your website and would like to book an appointment."
  );

  return (
    <footer className="bg-[#0A0A0A] text-cream pt-20 pb-10 border-t border-gold/20">
      
      {/* 3-Column Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        {/* Left Column: Logo + Tagline */}
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-display font-light tracking-[0.25em] text-cream">
            {siteConfig.name}
          </h2>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-body">
            {siteConfig.tagline}
          </p>
          <span className="text-xs text-cream/50 font-body font-light leading-relaxed mt-2 max-w-xs">
            An elite sanctuary dedicated to the craft of couture styling, skin rejuvenation, and beauty artistry.
          </span>
        </div>

        {/* Center Column: Nav Links */}
        <div className="flex flex-col md:items-center gap-4 mt-2 md:mt-0">
          <span className="text-xs tracking-[0.25em] font-body text-gold uppercase font-semibold block md:text-center">
            Atelier Directory
          </span>
          <nav className="flex flex-col md:items-center gap-2.5 font-body text-xs text-cream/70">
            <a href="/" className="hover:text-gold transition-colors duration-300">
              Home
            </a>
            <a href="#about" className="hover:text-gold transition-colors duration-300">
              The Maison
            </a>
            <a href="#services" className="hover:text-gold transition-colors duration-300">
              Services
            </a>
            <a href="#gallery" className="hover:text-gold transition-colors duration-300">
              Gallery
            </a>
            <a 
              href={waURL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-1.5 md:justify-center hover:text-gold transition-all duration-300 font-medium text-gold"
            >
              <span className="opacity-0 w-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:w-auto group-hover/btn:translate-x-0 transition-all duration-300 ease-out">
                →
              </span>
              Book Appointment
            </a>
          </nav>
        </div>

        {/* Right Column: Social Icons */}
        <div className="flex flex-col md:items-end gap-4">
          <span className="text-xs tracking-[0.25em] font-body text-gold uppercase font-semibold block">
            Keep in Touch
          </span>
          <div className="flex gap-4 items-center">
            {/* Instagram Link with SVG */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-gold/20 hover:border-gold/60 hover:bg-gold/5 rounded-full flex items-center justify-center text-cream/70 hover:text-gold transition-all duration-300"
              aria-label="Instagram Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* Facebook Link with SVG */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-gold/20 hover:border-gold/60 hover:bg-gold/5 rounded-full flex items-center justify-center text-cream/70 hover:text-gold transition-all duration-300"
              aria-label="Facebook Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-gold/10 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-cream/40 font-body">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span>&copy; {currentYear} {siteConfig.name} · All rights reserved.</span>
            <a
              href="https://harieshussain.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300 normal-case text-cream/40 tracking-[0.1em]"
            >
              Made by Haries Hussain
            </a>
          </div>
          <div className="flex gap-6">
            <a href="/" className="hover:text-gold transition-colors duration-300">Privacy Policy</a>
            <a href="/" className="hover:text-gold transition-colors duration-300">Terms of Service</a>
          </div>
        </div>

        {/* Visually hidden NAP block for search engine crawler local SEO */}
        <address className="sr-only">
          {siteConfig.name}, {siteConfig.address}, Tel: {siteConfig.phone}
        </address>
      </div>
    </footer>
  );
};

export default Footer;
