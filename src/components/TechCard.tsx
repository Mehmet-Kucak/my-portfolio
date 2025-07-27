"use client";
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface TechCardProps {
  icon: React.ReactNode;
  index: number;
  title?: string;
  description?: string;
  onClick?: () => void;
}

export default function TechCard({
  icon,
  index,
  title = "Technology",
  description,
  onClick,
}: TechCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInteraction = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleInteraction();
      }
    },
    [handleInteraction]
  );

  const isInteractive = Boolean(onClick);

  const CardContent = (
    <div className="relative z-10 h-full w-full flex flex-col items-center justify-center">
      <motion.div
        className="size-full p-2 sm:p-3 md:p-4 rounded-xl flex items-center justify-center"
        animate={{
          rotateY: isHovered || isFocused ? 180 : 0,
          scaleX: isHovered || isFocused ? -1 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        style={{
          willChange: "transform",
        }}
      >
        {icon}
      </motion.div>
    </div>
  );

  const MotionCard = (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.01, 0.5),
        ease: [0.23, 1, 0.32, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        flex relative aspect-square bg-gradient-to-br from-gray-900/80 to-gray-800/60 
        backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden group
        w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32
        ${isInteractive ? "cursor-pointer" : "cursor-default"}
        transition-all duration-200
        hover:border-gray-600/70 hover:shadow-lg hover:shadow-blue-500/10
        ${isHovered || isFocused ? "scale-105" : "scale-100"}
      `}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      {...(isInteractive && {
        role: "button",
        tabIndex: 0,
        "aria-label": description ? `${title}: ${description}` : title,
        onClick: handleInteraction,
        onKeyDown: handleKeyDown,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
      })}
      {...(!isInteractive && {
        role: "img",
        "aria-label": description ? `${title}: ${description}` : title,
      })}
    >
      {isInteractive && isFocused && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900 pointer-events-none" />
      )}

      {CardContent}

      {(title || description) && (isHovered || isFocused) && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap border border-gray-700">
            {description || title}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </motion.div>
  );

  return MotionCard;
}
