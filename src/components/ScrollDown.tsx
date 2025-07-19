"use client";

import { motion } from "framer-motion";

interface ScrollDownIndicatorProps {
  targetId?: string;
}

export default function ScrollDownIndicator({
  targetId,
}: ScrollDownIndicatorProps) {
  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, 0, 15, 15],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 5,
        times: [0, 0.2, 0.8, 1],
      }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.2 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 7l5 5l5 -5" />
        <path d="M7 13l5 5l5 -5" />
      </svg>
    </motion.div>
  );
}
