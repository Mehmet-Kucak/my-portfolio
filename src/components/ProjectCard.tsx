"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { generateProjectSchema, ProjectData } from "@/lib/structured-data";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
  injectStructuredData?: boolean;
  projectId?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  index,
  injectStructuredData = false,
  projectId,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (injectStructuredData && projectId && githubUrl && liveUrl) {
      try {
        const projectData: ProjectData = {
          title,
          description,
          image,
          technologies,
          githubUrl,
          liveUrl,
          dateCreated: "2024-01-01",
          category: "Web Application",
        };

        const schema = generateProjectSchema(projectData);

        const existingScript = document.getElementById(
          `project-schema-${projectId}`
        );
        if (existingScript) {
          existingScript.remove();
        }

        const script = document.createElement("script");
        script.id = `project-schema-${projectId}`;
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
      } catch (error) {
        console.warn(
          `Failed to inject structured data for project ${title}:`,
          error
        );
      }

      return () => {
        const scriptToRemove = document.getElementById(
          `project-schema-${projectId}`
        );
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [
    injectStructuredData,
    projectId,
    title,
    description,
    image,
    technologies,
    githubUrl,
    liveUrl,
  ]);

  const isValidImageUrl = useCallback((url: string) => {
    if (!url || typeof url !== "string" || url.trim() === "") {
      return false;
    }

    try {
      const parsedUrl = new URL(url.trim());
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return (
        url.startsWith("/") || url.startsWith("./") || url.startsWith("../")
      );
    }
  }, []);

  const validImageSrc = isValidImageUrl(image) ? image : null;

  const handleImageError = useCallback(() => {
    console.warn(`Failed to load image for project "${title}":`, image);
    setImageError(true);
  }, [image, title]);

  const isValidUrl = useCallback((url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent, url: string) => {
      e.stopPropagation();
      if (isValidUrl(url)) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        console.warn("Invalid URL provided:", url);
      }
    },
    [isValidUrl]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, url: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        if (isValidUrl(url)) {
          window.open(url, "_blank", "noopener,noreferrer");
        } else {
          console.warn("Invalid URL provided:", url);
        }
      }
    },
    [isValidUrl]
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.1, 0.5),
        ease: [0.23, 1, 0.32, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer w-full h-9/10"
      role="article"
      aria-labelledby={`project-title-${index}`}
      aria-describedby={`project-description-${index}`}
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <div className="relative w-full h-full min-h-[280px] max-h-[400px] sm:min-h-[320px] sm:max-h-[450px] lg:min-h-[360px] lg:max-h-[500px] bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-2/5 overflow-hidden">
          {validImageSrc && !imageError ? (
            <Image
              src={validImageSrc}
              alt={`Screenshot of ${title} project`}
              fill
              sizes="100%"
              className="w-full h-full object-cover transition-transform duration-400 ease-out"
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
              onError={handleImageError}
              priority={index < 2} // Prioritize first 2 images
              loading={index < 2 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyuwjA"
              itemProp="screenshot image"
            />
          ) : (
            // Enhanced fallback for broken/invalid images
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-gray-500 mx-auto mb-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xs text-gray-400">Image not available</p>
              </div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Hover Action Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {githubUrl && isValidUrl(githubUrl) && (
              <motion.button
                onClick={(e: React.MouseEvent) => handleLinkClick(e, githubUrl)}
                onKeyDown={(e: React.KeyboardEvent) =>
                  handleKeyDown(e, githubUrl)
                }
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View ${title} source code on GitHub`}
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
                  aria-hidden="true"
                >
                  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                </svg>
              </motion.button>
            )}
            {liveUrl && isValidUrl(liveUrl) && (
              <motion.button
                onClick={(e: React.MouseEvent) => handleLinkClick(e, liveUrl)}
                onKeyDown={(e: React.KeyboardEvent) =>
                  handleKeyDown(e, liveUrl)
                }
                className="p-3 bg-blue-500/20 backdrop-blur-sm rounded-full hover:bg-blue-500/30 transition-all duration-200 border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View ${title} live demo`}
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
                  aria-hidden="true"
                >
                  <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                  <path d="M11 13l9 -9" />
                  <path d="M15 4h5v5" />
                </svg>
              </motion.button>
            )}
          </motion.div>
        </div>

        <div className="h-3/5 flex flex-col justify-between flex-1 p-4 sm:p-5 lg:p-6">
          <div className="grow">
            <h3
              id={`project-title-${index}`}
              className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200 line-clamp-1"
              itemProp="name"
            >
              {title}
            </h3>
            <p
              id={`project-description-${index}`}
              className="text-xs sm:text-sm text-gray-300 mb-2 line-clamp-3 leading-relaxed"
              itemProp="description"
            >
              {description}
            </p>

            {/* Hidden microdata elements */}
            <div style={{ display: "none" }}>
              <span itemProp="applicationCategory">WebApplication</span>
              <span itemProp="operatingSystem">Web Browser</span>
              <span itemProp="softwareVersion">1.0.0</span>
              <span
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">Mehmet Kucak</span>
                <span itemProp="url">https://mehmetkucak.com</span>
              </span>
              {liveUrl && (
                <a href={liveUrl} itemProp="url installUrl">
                  {liveUrl}
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} itemProp="codeRepository downloadUrl">
                  {githubUrl}
                </a>
              )}
              <span
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <span itemProp="price">0</span>
                <span itemProp="priceCurrency">USD</span>
              </span>
              {technologies.map((tech, i) => (
                <span key={i} itemProp="featureList">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            {/* Technologies */}
            <div
              className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4"
              role="list"
              aria-label="Technologies used"
            >
              {technologies.slice(0, 8).map((tech, techIndex) => (
                <span
                  key={`${tech}-${techIndex}`}
                  role="listitem"
                  className="px-2 py-1 text-xs bg-gray-700/60 text-gray-200 rounded-md border border-gray-600/40 backdrop-blur-sm"
                  itemProp="keywords"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 8 && (
                <span
                  className="px-2 py-1 text-xs bg-blue-600/20 text-blue-300 rounded-md border border-blue-800/30"
                  aria-label={`${technologies.length - 8} more technologies`}
                >
                  +{technologies.length - 8}
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center justify-between">
              <nav
                className="flex items-center space-x-3 text-xs sm:text-sm"
                aria-label="Project links"
              >
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    aria-label={`View ${title} source code on GitHub`}
                    itemProp="codeRepository"
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
                      aria-hidden="true"
                    >
                      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                    </svg>
                    <span className="hidden sm:inline">Code</span>
                  </a>
                )}
                {liveUrl && isValidUrl(liveUrl) && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View ${title} live demo`}
                    itemProp="url"
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
                      aria-hidden="true"
                    >
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                    <span className="hidden sm:inline">Demo</span>
                  </a>
                )}
              </nav>

              {/* Hover indicator */}
              <motion.div
                className="w-2 h-2 rounded-full bg-blue-500"
                animate={{
                  scale: isHovered ? 1.2 : 0.8,
                  opacity: isHovered ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
