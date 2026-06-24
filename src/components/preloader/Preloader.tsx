"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { useSiteConfigContext } from "@/context/SiteConfigContext";
import EditableText from "../ui/EditableText";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { config } = useSiteConfigContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const brandName = (config.name as string) || "LUMINOUS";
  const brandTagline = (config.tagline as string) || "Maison de L'Atelier";

  useGSAP(() => {
    // Initial states
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center" });
    gsap.set(lettersRef.current, { y: 30, opacity: 0 });
    gsap.set(taglineRef.current, { opacity: 0, y: 10 });
    gsap.set(glowRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // t=0.0s — Gold line draws in (scaleX: 0→1 from center, transformOrigin: "center", duration: 0.6s, ease: "power2.inOut")
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, 0.0);

    // t=0.5s — Letters stagger in (y: 30→0, opacity: 0→1, stagger: 0.07s, ease: "power3.out")
    tl.to(lettersRef.current, {
      y: 0,
      opacity: 1,
      stagger: 0.07,
      ease: "power3.out",
      duration: 0.8
    }, 0.5);

    // t=1.3s — Tagline fades in (opacity: 0→1, y: 10→0, duration: 0.5s)
    tl.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, 1.3);

    // t=1.8s — Soft radial glow pulses once behind logo (opacity: 0→0.4→0, duration: 0.8s, ease: "sine.inOut")
    tl.to(glowRef.current, {
      opacity: 0.4,
      duration: 0.4,
      ease: "sine.inOut"
    }, 1.8)
    .to(glowRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "sine.inOut"
    }, 2.2);

    // t=2.2s — Gold line dissolves (scaleX: 1→1.5, opacity: 1→0, duration: 0.4s)
    tl.to(lineRef.current, {
      scaleX: 1.5,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    }, 2.2);

    // t=2.5s — Entire preloader: opacity 1→0, duration: 0.5s
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, 2.5);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      id="preloader"
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center"
    >
      {/* Gold top line */}
      <div
        ref={lineRef}
        className="w-[60%] max-w-[400px] h-px bg-[var(--color-gold)] mb-8"
      />

      {/* Logo letters */}
      <div className="flex gap-[0.15em]">
        {brandName.split("").map((letter, i) => (
          <span
            key={i}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
            className="font-display text-[clamp(2rem,6vw,4.5rem)] text-[var(--color-cream)] tracking-[0.5em] font-light"
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="font-display italic text-[var(--color-gold)] text-sm tracking-[0.4em] mt-4"
      >
        <EditableText fieldKey="tagline" as="span">
          {brandTagline}
        </EditableText>
      </p>

      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full bg-[var(--color-gold)] opacity-0 blur-[120px] pointer-events-none"
      />
    </div>
  );
};

export default Preloader;
