// components/AnimatedBackgroundOptimized.tsx
"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef, useEffect } from "react";

export function AnimatedGridBg() {
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
      rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 2px,
      transparent 2px, transparent 50px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 2px,
      transparent 2px, transparent 50px
    )
  `;

  const spotlightMask = useMotionTemplate`
    radial-gradient(
      circle at ${mouseX}px ${mouseY}px,
      black 0%,
      transparent 150px
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
    <div ref={containerRef} className="absolute inset-0 -z-50">
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

interface Icon {
  img: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
}

const ICON_SETS: Record<string, string[]> = {
  section1: [
    "binary.svg",
    "braces.svg",
    "bug.svg",
    "database.svg",
    "file-code.svg",
    "layers.svg",
    "rocket.svg",
    "sparkles.svg",
    "square-terminal.svg",
    "graduation-cap.svg",
    "sun.svg",
    "student.svg",
    "spiral.svg",
    "read-cv-logo.svg",
    "planet.svg",
    "moon.svg",
    "lightbulb.svg",
  ],
  section2: [
    "css.svg",
    "firebase.svg",
    "git.svg",
    "googlecloud.svg",
    "html5.svg",
    "javascript.svg",
    "nodedotjs.svg",
    "postgresql.svg",
    "python.svg",
    "react.svg",
    "supabase.svg",
    "typescript.svg",
    "vercel.svg",
  ],
};

export function AnimatedIconBg({
  iconType,
  iconCount = 25,
  speed = 0.02,
  rotationSpeed = 0,
  size = 40,
  iconFilter = "invert(100%) brightness(0.1)",
}: {
  iconType: string;
  iconCount?: number;
  speed?: number;
  rotationSpeed?: number;
  size?: number;
  iconFilter?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconsRef = useRef<Icon[]>([]);

  // 1) Set up canvas dimensions
  useEffect(() => {
    const canvas = canvasRef.current!;
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // 2) Load images, initialize icons, and start the loop
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const files = ICON_SETS[iconType] || [];
    const imgs = files.slice(0, iconCount).map((f) => {
      const img = new Image();
      img.src = `/icons/${iconType}/${f}`;
      return img;
    });

    Promise.all(
      imgs.map((img) => new Promise((res) => (img.onload = res)))
    ).then(() => {
      const { width, height } = canvas;
      const count = Math.min(iconCount, Math.floor((width * height) / 8000));
      iconsRef.current = Array.from({ length: count }).map((_, i) => ({
        img: imgs[i % imgs.length],
        x: Math.random() * (width - 30),
        y: Math.random() * (height - 30),
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: size,
        rotation: 0,
        rotSpeed: ((i % 5) - 2) * rotationSpeed,
      }));

      let last = performance.now();
      const loop = (now: number) => {
        const dt = now - last;
        last = now;
        ctx.clearRect(0, 0, width, height);

        for (const ic of iconsRef.current) {
          ic.x += ic.vx * dt;
          ic.y += ic.vy * dt;
          ic.rotation += ic.rotSpeed * dt;

          if (ic.x < 0) {
            ic.x = 0;
            ic.vx *= -1;
          } else if (ic.x + ic.size > width) {
            ic.x = width - ic.size;
            ic.vx *= -1;
          }
          if (ic.y < 0) {
            ic.y = 0;
            ic.vy *= -1;
          } else if (ic.y + ic.size > height) {
            ic.y = height - ic.size;
            ic.vy *= -1;
          }

          ctx.save();
          ctx.translate(ic.x + ic.size / 2, ic.y + ic.size / 2);
          ctx.rotate(ic.rotation);
          ctx.globalAlpha = 0.6;
          // apply the new iconFilter prop here
          ctx.filter = iconFilter;
          ctx.drawImage(ic.img, -ic.size / 2, -ic.size / 2, ic.size, ic.size);
          ctx.restore();
        }

        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });
  }, [iconType, iconCount, speed, size, rotationSpeed, iconFilter]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 overflow-hidden will-change-transform transform-gpu"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
