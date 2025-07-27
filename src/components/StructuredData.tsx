"use client";
import { useTranslations } from "next-intl";
import {
  generateHomepageSchema,
  getProjectsFromTranslations,
} from "@/lib/structured-data";
import { useEffect } from "react";

export default function StructuredData() {
  const t = useTranslations("HomePage");

  useEffect(() => {
    try {
      // Get projects from translations
      const projects = getProjectsFromTranslations(t);

      // Generate complete schema
      const schema = generateHomepageSchema(projects);

      // Remove existing structured data script if it exists
      const existingScript = document.getElementById("structured-data");
      if (existingScript) {
        existingScript.remove();
      }

      // Create and inject new structured data script
      const script = document.createElement("script");
      script.id = "structured-data";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);

      console.log("Structured data injected:", schema);
    } catch (error) {
      console.warn("Failed to inject structured data:", error);
    }

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById("structured-data");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [t]);

  return null; // This component doesn't render anything visible
}
