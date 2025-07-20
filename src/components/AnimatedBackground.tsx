"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useState, useRef, useEffect, useReducer, useCallback } from "react";
import Image from "next/image";

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

export function AnimatedGradientBg() {
  return (
    <motion.div
      className="absolute inset-0 -z-50"
      style={{
        background:
          "linear-gradient(45deg, #000000, #010101, #111111, #121212)",
        backgroundSize: "400% 400%",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{
        duration: 20,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
}

interface FloatingIcon {
  id: number;
  iconPath: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotationSpeed: number;
  rotation: number;
}

interface AnimatedIconBgProps {
  iconType: string;
  iconCount?: number;
  minDistance?: number;
  speed?: number;
}

// Icon configuration - maps icon types to their SVG filenames
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

function generateOptimizedPositions(
  width: number,
  height: number,
  iconCount: number,
  minDistance: number
): { x: number; y: number }[] {
  const gridSize = minDistance;
  const cols = Math.floor(width / gridSize);
  const rows = Math.floor(height / gridSize);

  const availablePositions: { x: number; y: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      availablePositions.push({
        x: col * gridSize + Math.random() * (gridSize * 0.6),
        y: row * gridSize + Math.random() * (gridSize * 0.6),
      });
    }
  }

  // Shuffle and take the first iconCount positions
  for (let i = availablePositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availablePositions[i], availablePositions[j]] = [
      availablePositions[j],
      availablePositions[i],
    ];
  }

  return availablePositions.slice(
    0,
    Math.min(iconCount, availablePositions.length)
  );
}

function useIconPaths(iconType: string) {
  const [availableIcons, setAvailableIcons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const iconSet = ICON_SETS[iconType] || [];
    const iconPaths = iconSet.map(
      (iconFile) => `/icons/${iconType}/${iconFile}`
    );
    setAvailableIcons(iconPaths);
    setIsLoading(false);
  }, [iconType]);

  return { availableIcons, isLoading };
}

export function AnimatedIconBg({
  iconType,
  iconCount = 50,
  minDistance = 120,
  speed = 0.1,
}: AnimatedIconBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const iconsRef = useRef<FloatingIcon[]>([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isClient, setIsClient] = useState(false);

  const { availableIcons, isLoading } = useIconPaths(iconType);

  const throttledUpdate = useCallback(() => {
    forceUpdate();
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      isClient &&
      dimensions.width > 0 &&
      dimensions.height > 0 &&
      availableIcons.length > 0 &&
      !isLoading
    ) {
      const adaptiveIconCount = Math.min(
        iconCount,
        Math.floor((dimensions.width * dimensions.height) / 8000)
      );

      const positions = generateOptimizedPositions(
        dimensions.width,
        dimensions.height,
        adaptiveIconCount,
        minDistance
      );

      iconsRef.current = positions.map((pos, i) => ({
        id: i,
        iconPath: availableIcons[i % availableIcons.length],
        x: pos.x,
        y: pos.y,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: 25 + (i % 3) * 8,
        opacity: 0.15 + (i % 4) * 0.01,
        rotationSpeed: ((i % 5) - 2) * 0.05,
        rotation: 0,
      }));

      forceUpdate();
    }
  }, [
    isClient,
    dimensions.width,
    dimensions.height,
    availableIcons,
    isLoading,
    iconCount,
    minDistance,
    speed,
  ]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateDimensions = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (containerRef.current) {
          const { width, height } =
            containerRef.current.getBoundingClientRect();
          setDimensions((prev) => {
            if (
              Math.abs(prev.width - width) > 50 ||
              Math.abs(prev.height - height) > 50
            ) {
              return { width, height };
            }
            return prev;
          });
        }
      }, 150);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isClient || iconsRef.current.length === 0) return;

    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current;

      if (deltaTime >= frameInterval) {
        const speedMultiplier = Math.min(deltaTime * 0.06, 1);

        iconsRef.current = iconsRef.current.map((icon) => {
          let newX = icon.x + icon.vx * speedMultiplier;
          let newY = icon.y + icon.vy * speedMultiplier;
          let newVx = icon.vx;
          let newVy = icon.vy;

          if (newX <= 0 || newX >= dimensions.width - icon.size) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(dimensions.width - icon.size, newX));
          }
          if (newY <= 0 || newY >= dimensions.height - icon.size) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(dimensions.height - icon.size, newY));
          }

          return {
            ...icon,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: icon.rotation + icon.rotationSpeed * speedMultiplier,
          };
        });

        throttledUpdate();
        lastTimeRef.current = currentTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient, dimensions.width, dimensions.height, throttledUpdate]);

  if (!isClient || isLoading || availableIcons.length === 0) {
    return null;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
      {iconsRef.current.map((iconData) => (
        <div
          key={iconData.id}
          className="absolute pointer-events-none"
          style={{
            transform: `translate(${iconData.x}px, ${iconData.y}px) rotate(${iconData.rotation}deg)`,
            width: iconData.size,
            height: iconData.size,
            opacity: iconData.opacity,
            willChange: "transform",
          }}
        >
          <Image
            src={iconData.iconPath}
            alt="Floating icon"
            width={iconData.size}
            height={iconData.size}
            className="w-full h-full object-contain filter brightness-0 invert opacity-70"
            loading="eager"
            unoptimized
            priority={true}
          />
        </div>
      ))}
    </div>
  );
}
