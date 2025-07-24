// Create this hook file: hooks/useResponsiveProjects.js
"use client";
import { useState, useEffect } from "react";

export function useResponsiveProjects() {
  const [projectsPerPage, setProjectsPerPage] = useState(4);

  useEffect(() => {
    const updateProjectsPerPage = () => {
      if (window.innerWidth < 600) {
        if (window.innerHeight > 730) {
          setProjectsPerPage(2);
        } else {
          setProjectsPerPage(1);
        }
      } else if (window.innerWidth < 1024) {
        setProjectsPerPage(2);
      } else {
        setProjectsPerPage(2);
      }
    };

    // Set initial value
    updateProjectsPerPage();

    // Add event listener
    window.addEventListener("resize", updateProjectsPerPage);

    // Cleanup
    return () => window.removeEventListener("resize", updateProjectsPerPage);
  }, []);

  return projectsPerPage;
}
