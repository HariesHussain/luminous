"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, range = 45 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isListening = false;
    let rect: DOMRect | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!rect) {
        rect = el.getBoundingClientRect();
      }
      const { clientX, clientY } = e;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
      } else {
        setPosition({ x: 0, y: 0 });
        removeListener();
      }
    };

    const addListener = () => {
      if (!isListening) {
        rect = el.getBoundingClientRect();
        window.addEventListener("mousemove", handleMouseMove);
        isListening = true;
      }
    };

    const removeListener = () => {
      if (isListening) {
        window.removeEventListener("mousemove", handleMouseMove);
        isListening = false;
        rect = null;
      }
    };

    const handleMouseEnter = () => {
      addListener();
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
      removeListener();
    };

    // Invalidate cached rect on scroll or resize to prevent alignment shift
    const invalidateRect = () => {
      rect = null;
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", invalidateRect, { passive: true });
    window.addEventListener("resize", invalidateRect, { passive: true });

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", invalidateRect);
      window.removeEventListener("resize", invalidateRect);
      removeListener();
    };
  }, [range]);

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export default React.memo(Magnetic);
