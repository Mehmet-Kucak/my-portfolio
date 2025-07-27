"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showTooltip, setShowTooltip] = useState(false);

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

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setShowTooltip(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setShowTooltip(false);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setShowTooltip(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setShowTooltip(false);
  }, []);

  const isInteractive = Boolean(onClick);
  const tooltipText = description || title;
  const tooltipId = `tooltip-${index}`;

  const CardContent = (
    <div className="relative z-10 h-full w-full flex flex-col items-center justify-center">
      <motion.div className="size-full p-2 sm:p-3 md:p-4 rounded-xl flex items-center justify-center">
        {icon}
      </motion.div>
    </div>
  );

  const Tooltip = (
    <AnimatePresence>
      {showTooltip && tooltipText && (
        <motion.div
          id={tooltipId}
          role="tooltip"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 absolute -bottom-35 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none"
        >
          <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-gray-700 max-w-xs">
            <div className="font-medium text-sm">{title}</div>
            {description && (
              <div className="text-gray-300 mt-1">{description}</div>
            )}
            {/* Tooltip arrow */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-300"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        flex relative aspect-square bg-gradient-to-br from-gray-900/80 to-gray-800/60
        backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-visible group
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
        "aria-label": tooltipText,
        "aria-describedby": showTooltip ? tooltipId : undefined,
        onClick: handleInteraction,
        onKeyDown: handleKeyDown,
        onFocus: handleFocus,
        onBlur: handleBlur,
      })}
      {...(!isInteractive && {
        role: "img",
        "aria-label": tooltipText,
        "aria-describedby": showTooltip ? tooltipId : undefined,
        tabIndex: 0,
        onFocus: handleFocus,
        onBlur: handleBlur,
      })}
    >
      {/* Focus ring */}
      {isInteractive && isFocused && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900 pointer-events-none" />
      )}

      {CardContent}
      {Tooltip}
    </motion.div>
  );

  return MotionCard;
}
