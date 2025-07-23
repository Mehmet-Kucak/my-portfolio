"use client";

import { useRef, useEffect, useState, useCallback } from "react";

export function AnimatedGridBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const gridSize = 50;
      const lineWidth = 2;

      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = lineWidth;
      ctx.beginPath();

      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.stroke();

      const spotlightRadius = 150;
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        spotlightRadius
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.15)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();

      const minX = Math.max(
        0,
        Math.floor((mouseRef.current.x - spotlightRadius) / gridSize) * gridSize
      );
      const maxX = Math.min(
        width,
        Math.ceil((mouseRef.current.x + spotlightRadius) / gridSize) * gridSize
      );
      const minY = Math.max(
        0,
        Math.floor((mouseRef.current.y - spotlightRadius) / gridSize) * gridSize
      );
      const maxY = Math.min(
        height,
        Math.ceil((mouseRef.current.y + spotlightRadius) / gridSize) * gridSize
      );

      for (let x = minX; x <= maxX; x += gridSize) {
        ctx.moveTo(x, Math.max(0, mouseRef.current.y - spotlightRadius));
        ctx.lineTo(x, Math.min(height, mouseRef.current.y + spotlightRadius));
      }

      for (let y = minY; y <= maxY; y += gridSize) {
        ctx.moveTo(Math.max(0, mouseRef.current.x - spotlightRadius), y);
        ctx.lineTo(Math.min(width, mouseRef.current.x + spotlightRadius), y);
      }

      ctx.stroke();

      const edgeGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.3,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.7
      );
      edgeGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      edgeGradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = edgeGradient;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
    },
    []
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    drawGrid(ctx, canvas.width, canvas.height);

    animationRef.current = requestAnimationFrame(animate);
  }, [drawGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Set initial mouse position to center
      mouseRef.current = {
        x: rect.width / 2,
        y: rect.height / 2,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      }
    };

    const handleResize = () => {
      updateCanvasSize();
    };

    updateCanvasSize();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-50">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: "transparent" }}
      />
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
  iconFilter = "invert(100%) brightness(0.25)",
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
  const animationIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 1,
        rootMargin: "100px",
      }
    );

    observer.observe(canvas);

    return () => {
      observer.unobserve(canvas);
    };
  }, []);

  // Canvas dimensions setup with debouncing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout: NodeJS.Timeout;

    const resize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Reinitialize icons if they exist and canvas size changed significantly
        if (iconsRef.current.length > 0) {
          const { width, height } = canvas;
          iconsRef.current.forEach((icon) => {
            // Keep icons within new bounds
            icon.x = Math.min(icon.x, width - icon.size);
            icon.y = Math.min(icon.y, height - icon.size);
          });
        }
      }, 100);
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Animation loop with visibility control
  const animate = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !isVisible || !isLoaded) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Limit frame rate to 60fps and skip frames if dt is too small
      if (dt < 16) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const { width, height } = canvas;

      // Use faster clearing method
      ctx.clearRect(0, 0, width, height);

      // Batch canvas operations for better performance
      ctx.globalAlpha = 0.6;
      ctx.filter = iconFilter;

      for (const icon of iconsRef.current) {
        // Update position and rotation
        icon.x += icon.vx * dt;
        icon.y += icon.vy * dt;
        icon.rotation += icon.rotSpeed * dt;

        // Boundary collision with more efficient checks
        if (icon.x <= 0 || icon.x + icon.size >= width) {
          icon.x = Math.max(0, Math.min(width - icon.size, icon.x));
          icon.vx *= -1;
        }

        if (icon.y <= 0 || icon.y + icon.size >= height) {
          icon.y = Math.max(0, Math.min(height - icon.size, icon.y));
          icon.vy *= -1;
        }

        // Draw with minimal state changes
        ctx.save();
        ctx.translate(icon.x + icon.size / 2, icon.y + icon.size / 2);
        ctx.rotate(icon.rotation);
        ctx.drawImage(
          icon.img,
          -icon.size / 2,
          -icon.size / 2,
          icon.size,
          icon.size
        );
        ctx.restore();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    },
    [isVisible, isLoaded, iconFilter]
  );

  // Icon loading and initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsLoaded(false);

    const files = ICON_SETS[iconType] || [];
    if (files.length === 0) return;

    const imgs = files.slice(0, iconCount).map((f) => {
      const img = new Image();
      img.src = `/icons/${iconType}/${f}`;

      img.onerror = () => {
        console.warn(`Failed to load icon: ${f}`);
      };

      return img;
    });

    Promise.allSettled(
      imgs.map(
        (img) =>
          new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;

            setTimeout(() => reject(new Error("Image load timeout")), 5000);
          })
      )
    )
      .then(() => {
        const validImages = imgs.filter(
          (img) => img.complete && img.naturalHeight > 0
        );

        if (validImages.length === 0) return;

        iconsRef.current = Array.from({ length: iconCount }).map((_, i) => ({
          img: validImages[i % validImages.length],
          x: Math.random() * Math.max(0, window.innerWidth),
          y: Math.random() * Math.max(0, window.innerHeight),
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: size,
          rotation: 0,
          rotSpeed: ((i % 5) - 2) * rotationSpeed,
        }));

        setIsLoaded(true);
      })
      .catch((error) => {
        console.warn("Some icons failed to load:", error);
        setIsLoaded(true);
      });
  }, [iconType, iconCount, speed, size, rotationSpeed]);

  // Start/stop animation based on visibility and loading state
  useEffect(() => {
    if (isVisible && isLoaded) {
      lastTimeRef.current = performance.now();
      animationIdRef.current = requestAnimationFrame(animate);
    } else if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, [isVisible, isLoaded, animate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 overflow-hidden will-change-transform transform-gpu"
      style={{
        width: "100%",
        height: "100%",
        contain: "layout style paint",
      }}
      // Add accessibility
      role="presentation"
      aria-hidden="true"
    />
  );
}
