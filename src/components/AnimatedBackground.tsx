"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { FC, useRef, useEffect } from "react";

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const baseGrid = `
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 2px,
      transparent 2px, transparent 50px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 2px,
      transparent 2px, transparent 50px
    )
  `;

  const highlightGrid = `
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 2px,
      transparent 2px, transparent 50px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 2px,
      transparent 2px, transparent 50px
    )
  `;

  const spotlightMask = useMotionTemplate`
    radial-gradient(
      circle at ${mouseX}px ${mouseY}px,
      black 0%,
      transparent 200px
    )
  `;

  const edgeMask = `
    radial-gradient(
      circle at center,
      black 1%,
      transparent 100%
    )
  `;

  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set(width / 2);
    mouseY.set(height / 2);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: baseGrid,
          WebkitMaskImage: edgeMask,
          maskImage: edgeMask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage: edgeMask,
          maskImage: edgeMask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: highlightGrid,
            WebkitMaskImage: spotlightMask,
            WebkitMaskRepeat: "no-repeat",
            maskImage: spotlightMask,
            maskRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}
