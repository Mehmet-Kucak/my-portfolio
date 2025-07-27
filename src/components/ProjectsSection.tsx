"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useResponsiveProjects } from "@/hooks/useResponsiveProjects";
import ProjectCard from "./ProjectCard";
import { useTranslations } from "next-intl";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

export default function ProjectsSection() {
  const t = useTranslations("HomePage");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const projectsPerPage = useResponsiveProjects();
  const [projects, setProjects] = useState<Project[]>([]);

  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const PROJECT_AMOUNT = 4;

  useEffect(() => {
    try {
      const newArr: Project[] = [];
      for (let i = 1; i <= PROJECT_AMOUNT; i++) {
        const project = {
          title: t(`projects.project${i}.title`),
          description: t(`projects.project${i}.description`),
          image: t(`projects.project${i}.image`),
          technologies: t(`projects.project${i}.technologies`)
            .split("|")
            .filter((tech) => tech.trim()),
          githubUrl: t(`projects.project${i}.githubUrl`),
          liveUrl: t(`projects.project${i}.liveUrl`),
        };

        if (project.title && project.description) {
          newArr.push(project);
        }
      }

      if (newArr.length === 0) {
        throw new Error("No valid projects found");
      }

      setProjects(newArr);
      setError(null);
    } catch (err) {
      setError("Failed to load projects");
      console.error("Error loading projects:", err);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const getCurrentProjects = useCallback(() => {
    const startIndex = currentPage * projectsPerPage;
    return projects.slice(startIndex, startIndex + projectsPerPage);
  }, [currentPage, projectsPerPage, projects]);

  const nextPage = useCallback(() => {
    if (totalPages > 1) {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }
  }, [totalPages]);

  const prevPage = useCallback(() => {
    if (totalPages > 1) {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }
  }, [totalPages]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 0 && page < totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (totalPages <= 1) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prevPage();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextPage();
          break;
        case "Home":
          e.preventDefault();
          goToPage(0);
          break;
        case "End":
          e.preventDefault();
          goToPage(totalPages - 1);
          break;
      }
    },
    [nextPage, prevPage, goToPage, totalPages]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 1 || totalPages <= 1) return;

      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
      setIsSwipeActive(false);
    },
    [totalPages]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current || e.touches.length !== 1 || totalPages <= 1)
        return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      const isHorizontalSwipe =
        Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30;

      if (isHorizontalSwipe) {
        e.preventDefault(); // Prevent scrolling during horizontal swipe
        setIsSwipeActive(true);
      }
    },
    [totalPages]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (
        !touchStartRef.current ||
        e.changedTouches.length !== 1 ||
        totalPages <= 1
      )
        return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;

      // Improved swipe thresholds
      const minDistance = 60;
      const maxTime = 600;
      const maxVerticalDistance = 120;

      const isValidSwipe =
        Math.abs(deltaX) > minDistance &&
        Math.abs(deltaY) < maxVerticalDistance &&
        deltaTime < maxTime &&
        Math.abs(deltaX) > Math.abs(deltaY);

      if (isValidSwipe) {
        if (deltaX > 0) {
          prevPage();
        } else {
          nextPage();
        }
      }

      touchStartRef.current = null;
      setIsSwipeActive(false);
    },
    [nextPage, prevPage, totalPages]
  );

  const generateProjectId = useCallback(
    (title: string, index: number) => {
      return `project-${title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}-${currentPage}-${index}`;
    },
    [currentPage]
  );

  // Loading state
  if (isLoading) {
    return (
      <section
        ref={sectionRef}
        className="w-full h-full flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6"
        aria-label="Projects section loading"
      >
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          <span className="ml-3 text-gray-400">Loading projects...</span>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        ref={sectionRef}
        className="w-full h-full flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6"
        aria-label="Projects section error"
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-red-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Failed to Load Projects
          </h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // Empty state
  if (projects.length === 0) {
    return (
      <section
        ref={sectionRef}
        className="w-full h-full flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6"
        aria-label="No projects available"
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            No Projects Found
          </h2>
          <p className="text-gray-400">
            Projects will appear here once they&apos;re available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="w-full h-full flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6"
      aria-labelledby="projects-heading"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0">
        <h1
          id="projects-heading"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-left mx-auto lg:mx-0 font-bold text-white"
          itemProp="name"
        >
          {t("projects.title")}
        </h1>

        {/* Hidden microdata for portfolio */}
        <div style={{ display: "none" }}>
          <span itemProp="description">
            A comprehensive collection of full-stack web development projects
          </span>
          <span
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
          >
            <span itemProp="name">Mehmet Kucak</span>
            <span itemProp="url">https://mehmetkucak.com</span>
          </span>
          <span itemProp="genre">Web Development Portfolio</span>
          <span itemProp="inLanguage">en</span>
          <span itemProp="inLanguage">tr</span>
        </div>

        {totalPages > 1 && (
          <div className="hidden sm:flex items-center text-sm text-gray-400">
            <span role="status" aria-live="polite">
              {t("projects.pagnation", {
                currentPage: currentPage + 1,
                totalPages: totalPages,
              })}
            </span>
          </div>
        )}
      </header>

      {/* Projects Grid */}
      <div
        ref={containerRef}
        className={`flex-1 max-h-[calc(100vh-180px)] ${
          isSwipeActive ? "select-none" : ""
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label={`Projects page ${currentPage + 1} of ${totalPages}`}
        aria-live="polite"
        itemProp="mainEntity"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        {/* Mobile Layout */}
        <div className="block sm:hidden h-full">
          <div className="h-full grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
            {getCurrentProjects().map((project, index) => (
              <div
                key={`${currentPage}-${index}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="h-full w-full"
              >
                <span itemProp="position" style={{ display: "none" }}>{`${
                  currentPage * projectsPerPage + index + 1
                }`}</span>
                <div itemProp="item" className="h-full w-full">
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies}
                    githubUrl={project.githubUrl}
                    liveUrl={project.liveUrl}
                    index={index}
                    injectStructuredData={true}
                    projectId={generateProjectId(project.title, index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block h-full">
          <div className="h-full grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {getCurrentProjects().map((project, index) => (
              <div
                key={`${currentPage}-${index}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="h-full w-full"
              >
                <span itemProp="position" style={{ display: "none" }}>{`${
                  currentPage * projectsPerPage + index + 1
                }`}</span>
                <div itemProp="item" className="h-full w-full">
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies}
                    githubUrl={project.githubUrl}
                    liveUrl={project.liveUrl}
                    index={index}
                    injectStructuredData={true}
                    projectId={generateProjectId(project.title, index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden microdata for ItemList */}
        <div style={{ display: "none" }}>
          <span itemProp="name">Portfolio Projects</span>
          <span itemProp="description">
            Collection of web development projects
          </span>
          <span itemProp="numberOfItems">{projects.length}</span>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <footer className="flex-shrink-0 mt-4">
          <div className="flex items-center justify-between">
            {/* Mobile pagination info */}
            <div className="block sm:hidden text-xs text-gray-400">
              <span role="status" aria-live="polite">
                {t("projects.pagnation", {
                  currentPage: currentPage + 1,
                  totalPages: totalPages,
                })}
              </span>
            </div>

            {/* Pagination Controls */}
            <nav
              className="flex items-center space-x-2 sm:space-x-3 ml-auto sm:ml-0 sm:mx-auto"
              aria-label="Projects pagination"
              role="navigation"
            >
              <button
                onClick={prevPage}
                disabled={totalPages <= 1}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous page"
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
                  className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors"
                  aria-hidden="true"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              {/* Page Indicators */}
              <div
                className="flex items-center space-x-1"
                role="tablist"
                aria-label="Page indicators"
              >
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      currentPage === index
                        ? "bg-blue-500 scale-125"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                    aria-current={currentPage === index ? "page" : undefined}
                    role="tab"
                    aria-selected={currentPage === index}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={totalPages <= 1}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next page"
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
                  className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </nav>

            {/* Total projects count */}
            <div className="hidden lg:block text-xs text-gray-400">
              <span role="status">
                {t("projects.totalLength", {
                  length: projects.length,
                })}
              </span>
            </div>
          </div>
        </footer>
      )}
    </section>
  );
}
