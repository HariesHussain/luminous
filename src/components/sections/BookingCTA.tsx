"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSiteConfigContext } from "@/context/SiteConfigContext";
import { getWhatsAppURL } from "@/lib/whatsapp";
import Magnetic from "../ui/Magnetic";
import EditableText from "../ui/EditableText";

export const BookingCTA: React.FC = () => {
  const { config } = useSiteConfigContext();

  const waURL = getWhatsAppURL(
    config.whatsapp?.number || "919876543210",
    "Hello LUMINOUS, I would like to reserve an Atelier Session. Please confirm availability and pricing for your services."
  );

  return (
    <section 
      id="booking" 
      className="scroll-mt-20 py-16 md:py-24 lg:py-32 bg-[#0A0A0A] relative overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(45, 10, 20, 0.4) 0%, transparent 70%), #0A0A0A"
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[#0A0A0A]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center gap-6"
      >
        {/* Decorative Top Line */}
        <div className="w-16 h-px bg-gold mx-auto mb-2" />

        {/* Double-line Headline */}
        <h2 className="leading-none tracking-wide text-center">
          <span className="block font-display font-light text-cream text-[clamp(2.5rem,6vw,5.5rem)]">
            <EditableText fieldKey="ctaHeadline1" as="span">
              Ready for Your
            </EditableText>
          </span>
          <span className="block font-display italic font-semibold text-gold text-[clamp(2.5rem,6vw,5.5rem)] mt-2">
            <EditableText fieldKey="ctaHeadline2" as="span">
              Transformation?
            </EditableText>
          </span>
        </h2>

        {/* Subtext description */}
        <div className="max-w-md font-body font-light text-cream/60 text-sm md:text-base leading-relaxed mt-2">
          <EditableText fieldKey="ctaSubtext" as="p">
            Experience styling elevated to visual poetry. Arrange your consultation with our master practitioners today.
          </EditableText>
        </div>

        {/* Booking CTA Button Container */}
        <div className="mt-6 flex flex-col items-center gap-6 w-full">
          <Magnetic>
            <motion.a
              href={waURL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-12 py-5 w-auto min-w-[280px] max-w-[360px] mx-auto text-center bg-gold text-[#0A0A0A] text-xs uppercase tracking-[0.25em] font-body font-semibold hover:bg-gold-light shadow-xl hover:shadow-2xl transition-colors duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10">
                <EditableText fieldKey="bookingCTA" as="span">
                  {config.bookingCTA}
                </EditableText>
              </span>
              <div className="absolute inset-0 bg-cream scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-10" />
            </motion.a>
          </Magnetic>

          {/* Concierge details block */}
          <div className="flex flex-col items-center gap-2 text-center mt-2">
            <span className="font-body font-light text-xs text-cream/40 tracking-wider">
              or call{" "}
              <a 
                href={`tel:${(config.phone || "").replace(/\s+/g, "")}`}
                className="text-gold border-b border-gold/20 hover:border-gold/80 transition-colors"
              >
                <EditableText fieldKey="phone" as="span">
                  {config.phone}
                </EditableText>
              </a>
            </span>
            <span className="font-body font-light text-xs text-cream/30 tracking-wider">
              or visit us at{" "}
              <EditableText fieldKey="address" as="span">
                {config.address}
              </EditableText>
            </span>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default BookingCTA;
