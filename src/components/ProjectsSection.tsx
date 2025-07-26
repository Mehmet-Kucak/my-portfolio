"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useResponsiveProjects } from "@/hooks/useResponsiveProjects";
import ProjectCard from "./ProjectCard";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = useResponsiveProjects();
  const [projects, setProjects] = useState<
    {
      title: string;
      description: string;
      image: string;
      technologies: string[];
      githubUrl: string;
      liveUrl: string;
    }[]
  >([]);

  // Swipe handling state
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const PROJECT_AMOUNT = 4;
  useEffect(() => {
    const newArr = [];
    for (let i = 1; i <= PROJECT_AMOUNT; i++) {
      newArr.push({
        title: t(`projects.project${i}.title`),
        description: t(`projects.project${i}.description`),
        image: t(`projects.project${i}.image`),
        technologies: t(`projects.project${i}.technologies`).split("|"),
        githubUrl: t(`projects.project${i}.githubUrl`),
        liveUrl: t(`projects.project${i}.liveUrl`),
      });
    }

    setProjects(newArr);
  }, [t]);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const getCurrentProjects = () => {
    const startIndex = currentPage * projectsPerPage;
    return projects.slice(startIndex, startIndex + projectsPerPage);
  };

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Touch-only gesture handlers (mobile devices only)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    setIsSwipeActive(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Check if this is a horizontal swipe (more horizontal than vertical movement)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
      e.preventDefault(); // Prevent scrolling during horizontal swipe
      setIsSwipeActive(true);
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current || e.changedTouches.length !== 1) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;

      // Swipe thresholds
      const minDistance = 50;
      const maxTime = 500;
      const maxVerticalDistance = 100;

      // Check if it's a valid horizontal swipe
      const isHorizontalSwipe =
        Math.abs(deltaX) > minDistance &&
        Math.abs(deltaY) < maxVerticalDistance &&
        deltaTime < maxTime;

      if (isHorizontalSwipe && totalPages > 1) {
        if (deltaX > 0) {
          // Swipe right - go to previous page
          prevPage();
        } else {
          // Swipe left - go to next page
          nextPage();
        }
      }

      touchStartRef.current = null;
      setIsSwipeActive(false);
    },
    [nextPage, prevPage, totalPages]
  );

  return (
    <div className="w-full h-full flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center lg:text-left mx-auto lg:mx-0">
          {t("projects.title")}
        </h2>
        <div className="hidden sm:flex items-center text-sm text-gray-400">
          <span>
            {t("projects.pagnation", {
              currentPage: currentPage + 1,
              totalPages: totalPages,
            })}
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`flex-1 max-h-[calc(100vh-180px)] ${
          isSwipeActive ? "select-none" : ""
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="sm:hidden h-full flex flex-col justify-center space-y-0">
          {getCurrentProjects().map((project, index) => (
            <div key={`${currentPage}-${index}`} className="flex-1">
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                index={index}
              />
            </div>
          ))}
        </div>

        <div className="hidden sm:block h-full">
          <div className="h-full grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {getCurrentProjects().map((project, index) => (
              <ProjectCard
                key={`${currentPage}-${index}`}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex-shrink-0 mt-auto sm:mt-auto">
          <div className="flex items-center justify-between">
            <div className="block sm:hidden text-xs text-gray-400">
              {t("projects.pagnation", {
                currentPage: currentPage + 1,
                totalPages: totalPages,
              })}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto sm:ml-0 sm:mx-auto">
              <button
                onClick={prevPage}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 transition-all duration-200 group"
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
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      currentPage === index
                        ? "bg-blue-500 scale-125"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 transition-all duration-200 group"
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
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="hidden lg:block text-xs text-gray-400">
              {t("projects.totalLength", {
                length: projects.length,
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
