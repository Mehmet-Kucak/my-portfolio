"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface TechCardProps {
  icon: React.ReactNode;
  index: number;
}

export default function TechCard({ icon, index }: TechCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.01,
        ease: [0.23, 1, 0.32, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex relative aspect-square bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 cursor-pointer overflow-hidden group
        w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center">
        <motion.div
          className="size-full p-2 sm:p-3 md:p-4 rounded-xl flex items-center justify-center"
          animate={{
            rotateY: isHovered ? 180 : 0,
            scaleX: isHovered ? -1 : 1,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}
