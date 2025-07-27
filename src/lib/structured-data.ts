import { Person, WebSite, WebPage, SoftwareApplication } from "schema-dts";

// 1. Enhanced Person Schema
export function generatePersonSchema(): Person {
  return {
    "@type": "Person",
    "@id": "https://mehmetkucak.com/",
    name: "Mehmet Kucak",
    alternateName: ["Mehmet", "Mehmet K.", "MehmetK"],
    description:
      "Full-stack developer specializing in React, Next.js, TypeScript, and Node.js. Creating modern web applications with focus on performance and user experience.",
    url: "https://mehmetkucak.com",
    image: "https://mehmetkucak.com/photo.webp",
    sameAs: [
      "https://github.com/mehmet-kucak",
      "https://linkedin.com/in/mehmetkucak",
      "https://twitter.com/mehmetkucak0",
    ],
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance Developer",
      url: "https://mehmetkucak.com",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
      addressLocality: "Aydın",
      addressRegion: "Aydın",
    },
    nationality: {
      "@type": "Country",
      name: "Turkey",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Python",
      "PostgreSQL",
      "Firebase",
      "Firestore",
      "Google Cloud Platform",
      "Supabase",
      "Vercel",
      "Git",
      "Web Development",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
      "Mobile-First Design",
      "Responsive Web Design",
      "API Development",
      "Database Design",
      "Software Architecture",
    ],
    knowsLanguage: [
      {
        "@type": "Language",
        name: "Turkish",
        alternateName: "tr",
      },
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
    ],
    birthDate: "2007",
    email: "mehmetkucak07@gmail.com",
    gender: "Male",
    homeLocation: {
      "@type": "Place",
      name: "Aydın, Turkey",
    },
  };
}

// 2. Enhanced Website Schema
export function generateWebsiteSchema(): WebSite {
  return {
    "@type": "WebSite",
    "@id": "https://mehmetkucak.com/#website",
    url: "https://mehmetkucak.com",
    name: "Mehmet Kucak - Full Stack Developer Portfolio",
    alternateName: "MehmetK Portfolio",
    description:
      "Professional portfolio showcasing full-stack web development projects, skills, and experience. Specializing in React, Next.js, TypeScript, and modern web technologies.",
    inLanguage: ["en", "tr"],
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    creator: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    mainEntity: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
  };
}

// 3. WebPage Schema for homepage
export function generateWebPageSchema(): WebPage {
  return {
    "@type": "WebPage",
    "@id": "https://mehmetkucak.com/#webpage",
    url: "https://mehmetkucak.com",
    name: "Mehmet Kucak - Full Stack Developer Portfolio",
    description:
      "Professional portfolio showcasing full-stack web development projects and skills",
    inLanguage: ["en", "tr"],
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://mehmetkucak.com/#website",
    },
    about: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    author: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    creator: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };
}

// 4. Project Data Interface
export interface ProjectData {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
  image: string;
  dateCreated?: string;
  category?: string;
}

// 5. Enhanced Software Application Schema for projects
export function generateProjectSchema(
  project: ProjectData
): SoftwareApplication {
  return {
    "@type": "SoftwareApplication",
    "@id": project.liveUrl,
    name: project.title,
    alternateName: `${project.title} by Mehmet Kucak`,
    description: project.description,
    url: project.liveUrl,
    image: `https://mehmetkucak.com${project.image}`,
    screenshot: `https://mehmetkucak.com${project.image}`,
    applicationCategory: "WebApplication",
    applicationSubCategory: project.category || "Portfolio Project",
    operatingSystem: ["Web Browser", "Cross-platform"],
    softwareVersion: "1.0.0",
    releaseNotes: "Initial release",
    datePublished: project.dateCreated || "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    creator: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    downloadUrl: project.githubUrl,
    installUrl: project.liveUrl,
    memoryRequirements: "Minimal - runs in browser",
    storageRequirements: "No local storage required",
    processorRequirements: "Any modern processor",
    softwareRequirements: "Modern web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2025-12-31",
    },
    featureList: [
      "Responsive Design",
      "Cross-browser Compatibility",
      "Modern Web Technologies",
      "Mobile-First Approach",
      "Performance Optimized",
      ...project.technologies.map((tech) => `Built with ${tech}`),
    ],
    keywords: [
      ...project.technologies.map((tech) => tech.toLowerCase()),
      "web development",
      "portfolio",
      "mehmet kucak",
    ].join(", "),
  };
}

// 6. Portfolio Collection Schema
export function generatePortfolioSchema(projects: ProjectData[] = []) {
  return {
    "@type": "CreativeWork",
    "@id": "https://mehmetkucak.com/#portfolio",
    name: "Mehmet Kucak's Development Portfolio",
    alternateName: "MehmetK Portfolio Projects",
    description:
      "A comprehensive collection of full-stack web development projects showcasing modern technologies and best practices",
    author: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    creator: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://mehmetkucak.com/",
    },
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    datePublished: "2024-01-01",
    genre: [
      "Web Development Portfolio",
      "Software Development",
      "Technology Showcase",
    ],
    inLanguage: ["en", "tr"],
    isFamilyFriendly: true,
    isAccessibleForFree: true,
    keywords: [
      "web development",
      "react",
      "nextjs",
      "typescript",
      "portfolio",
      "full stack developer",
      "javascript",
      "node.js",
      "postgresql",
      "tailwind css",
    ].join(", "),
    about: [
      "Web Development",
      "Software Engineering",
      "Full Stack Development",
      "React Development",
      "TypeScript Programming",
    ],
    mainEntity: {
      "@type": "ItemList",
      name: "Portfolio Projects",
      description: "Collection of web development projects",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          "@id": project.liveUrl,
          name: project.title,
          description: project.description,
          url: project.liveUrl,
        },
      })),
    },
  };
}

// 7. FAQ Schema
export function generateFAQSchema() {
  return {
    "@type": "FAQPage",
    "@id": "https://mehmetkucak.com/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "What technologies does Mehmet Kucak specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mehmet specializes in full-stack web development with React, Next.js, TypeScript, Node.js, Python, and PostgreSQL. He also works with modern tools like Tailwind CSS, Firebase, and various cloud platforms.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Mehmet Kucak for a project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Mehmet via email at mehmetkucak07@gmail.com, through LinkedIn at linkedin.com/in/mehmetkucak, or through the contact form on his website.",
        },
      },
      {
        "@type": "Question",
        name: "What type of projects does Mehmet work on?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mehmet works on full-stack web applications, including e-commerce platforms, social media applications, portfolio websites, and custom web solutions using modern technologies.",
        },
      },
      {
        "@type": "Question",
        name: "Is Mehmet available for freelance work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Mehmet is available for freelance projects. He works on web development projects ranging from small business websites to complex web applications.",
        },
      },
    ],
  };
}

// 8. Complete homepage schema with projects
export function generateHomepageSchema(projects: ProjectData[] = []) {
  const person = generatePersonSchema();
  const website = generateWebsiteSchema();
  const webpage = generateWebPageSchema();
  const portfolio = generatePortfolioSchema(projects);
  const faq = generateFAQSchema();

  // Add individual project schemas
  const projectSchemas = projects.map((project) =>
    generateProjectSchema(project)
  );

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, webpage, portfolio, faq, ...projectSchemas],
  };
}

// 9. Utility function to get projects from translations
export function getProjectsFromTranslations(
  t: (key: string) => string
): ProjectData[] {
  const projects: ProjectData[] = [];
  const PROJECT_AMOUNT = 4;

  for (let i = 1; i <= PROJECT_AMOUNT; i++) {
    try {
      const title = t(`projects.project${i}.title`);
      const description = t(`projects.project${i}.description`);

      if (title && description) {
        const project = {
          title,
          description,
          image: t(`projects.project${i}.image`),
          technologies: t(`projects.project${i}.technologies`)
            .split("|")
            .filter((tech: string) => tech.trim()),
          githubUrl: t(`projects.project${i}.githubUrl`),
          liveUrl: t(`projects.project${i}.liveUrl`),
          dateCreated: "2024-01-01",
          category: "Web Application",
        };

        projects.push(project);
      }
    } catch (error) {
      console.warn(`Failed to load project ${i}:`, error);
    }
  }

  return projects;
}

// 10. Generate structured data for currently visible projects only
export function generateVisibleProjectsSchema(
  visibleProjects: ProjectData[],
  currentPage: number = 0
) {
  if (visibleProjects.length === 0) return null;

  const projectSchemas = visibleProjects.map((project, index) => {
    const schema = generateProjectSchema(project);
    // Use a unique ID for current page context without invalid properties
    return {
      ...schema,
      "@id": `${project.liveUrl}#page-${currentPage}-${index}`,
      // Remove additionalProperty as it's not valid for SoftwareApplication
      name: `${schema.name} (Page ${currentPage + 1}, Position ${index + 1})`,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Currently Displayed Projects",
    description: `Projects shown on page ${currentPage + 1}`,
    numberOfItems: visibleProjects.length,
    itemListElement: visibleProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: projectSchemas[index],
    })),
  };
}

// 11. Enhanced project schema with additional SEO properties
export function generateEnhancedProjectSchema(
  project: ProjectData,
  additionalContext?: {
    pagePosition?: number;
    totalProjects?: number;
    isHighlighted?: boolean;
  }
): SoftwareApplication {
  const baseSchema = generateProjectSchema(project);

  if (additionalContext) {
    // Instead of using additionalProperty, modify existing valid properties
    const enhancedName = additionalContext.pagePosition
      ? `${baseSchema.name} (Project ${additionalContext.pagePosition} of ${
          additionalContext.totalProjects || 1
        })`
      : baseSchema.name;

    const enhancedDescription = additionalContext.isHighlighted
      ? `Featured Project: ${baseSchema.description}`
      : baseSchema.description;

    return {
      ...baseSchema,
      name: enhancedName,
      description: enhancedDescription,
    };
  }

  return baseSchema;
}
