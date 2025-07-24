"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  index,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer w-full h-85/100"
    >
      <div className="relative w-full h-full min-h-[280px] max-h-[400px] sm:min-h-[320px] sm:max-h-[450px] lg:min-h-[360px] lg:max-h-[500px] bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-2/5 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Hover Action Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 border border-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
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
                  className="w-5 h-5 text-white"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                </svg>
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-500/20 backdrop-blur-sm rounded-full hover:bg-blue-500/30 transition-all duration-200 border border-blue-400/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
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
                  className="w-5 h-5 text-blue-300"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                  <path d="M11 13l9 -9" />
                  <path d="M15 4h5v5" />
                </svg>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between h-3/5 p-4 sm:p-5 lg:p-6">
          <div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200 line-clamp-1">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-2 line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>

          <div>
            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {technologies.slice(0, 8).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 text-xs bg-gray-700/60 text-gray-200 rounded-md border border-gray-600/40 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 8 && (
                <span className="px-2 py-1 text-xs bg-blue-600/20 text-blue-300 rounded-md border border-blue-800/30">
                  +{technologies.length - 5}
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs sm:text-sm">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                    </svg>
                    <span className="hidden sm:inline">Code</span>
                  </a>
                )}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                    <span className="hidden sm:inline">Demo</span>
                  </a>
                )}
              </div>

              {/* Hover indicator */}
              <motion.div
                className="w-2 h-2 rounded-full bg-blue-500"
                animate={{
                  scale: isHovered ? 1.2 : 0.8,
                  opacity: isHovered ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
