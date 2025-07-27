"use client";
import React, { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ScrollDownIndicatorProps {
  targetId?: string;
  className?: string;
  "aria-label"?: string;
}

export default function ScrollDownIndicator({
  targetId,
  className = "",
  "aria-label": ariaLabel,
}: ScrollDownIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Hide indicator when user scrolls manually
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Hide when user has scrolled more than 10% of viewport height
      if (scrollPosition > windowHeight * 0.1) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback(() => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    } else {
      // If no target, scroll down by one viewport height
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  }, [targetId]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  if (!isVisible) return null;

  const defaultAriaLabel = targetId
    ? `Scroll to ${targetId} section`
    : "Scroll down to next section";

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, 0, 15, 15],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
        times: [0, 0.2, 0.8, 1],
      }}
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer will-change-transform group ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel || defaultAriaLabel}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 rounded-full "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white drop-shadow-sm"
          aria-hidden="true"
        >
          <path d="M7 7l5 5l5 -5" />
          <path d="M7 13l5 5l5 -5" />
        </svg>
      </motion.div>

      {/* Screen reader instructions */}
      <span className="sr-only">
        {targetId
          ? `Press Enter or Space to scroll to the ${targetId} section`
          : "Press Enter or Space to scroll down to the next section"}
      </span>
    </motion.div>
  );
}
