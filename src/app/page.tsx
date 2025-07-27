import BlobImage from "@/components/BlobImage";
import ChangingText from "@/components/ChangingText";
import { useTranslations } from "next-intl";
import { lazy, Suspense } from "react";
import ScrollDownIndicator from "@/components/ScrollDown";
import LanguageSelector from "@/components/LangSelector";
import StructuredData from "@/components/StructuredData";
import Image from "next/image";

const AnimatedIconBg = lazy(() =>
  import("@/components/AnimatedBackground").then((module) => ({
    default: module.AnimatedIconBg,
  }))
);
const AnimatedGridBg = lazy(() =>
  import("@/components/AnimatedBackground").then((module) => ({
    default: module.AnimatedGridBg,
  }))
);
const Tabs = lazy(() =>
  import("@/components/Tabs").then((module) => ({
    default: module.default,
  }))
);
const TechCard = lazy(() =>
  import("@/components/TechCard").then((module) => ({
    default: module.default,
  }))
);
const ProjectsSection = lazy(() =>
  import("@/components/ProjectsSection").then((module) => ({
    default: module.default,
  }))
);
const ContactSection = lazy(() =>
  import("@/components/ContactSection").then((module) => ({
    default: module.default,
  }))
);
const currentAge = new Date().getFullYear() - 2007;

const techStacks = {
  frontend: [
    {
      name: "React",
      title: "React",
      description:
        "A powerful JavaScript library for building dynamic user interfaces with reusable components",
      icon: "/icons/section2/react.svg",
    },
    {
      name: "Next.js",
      title: "Next.js",
      description:
        "Full-stack React framework with server-side rendering, routing, and performance optimizations",
      icon: "/icons/section2/nextdotjs.svg",
    },
    {
      name: "JavaScript",
      title: "JavaScript",
      description:
        "The programming language that powers interactive web experiences and modern applications",
      icon: "/icons/section2/javascript.svg",
    },
    {
      name: "TypeScript",
      title: "TypeScript",
      description:
        "JavaScript with static type definitions for safer, more maintainable code",
      icon: "/icons/section2/typescript.svg",
    },
    {
      name: "HTML5",
      title: "HTML5",
      description:
        "The latest standard for structuring and presenting content on the web",
      icon: "/icons/section2/html5.svg",
    },
    {
      name: "CSS",
      title: "CSS",
      description:
        "Stylesheet language for creating beautiful, responsive designs and animations",
      icon: "/icons/section2/css.svg",
    },
    {
      name: "Tailwind CSS",
      title: "Tailwind CSS",
      description:
        "Utility-first CSS framework for rapid UI development with consistent design systems",
      icon: "/icons/section2/tailwindcss.svg",
    },
  ],
  backend: [
    {
      name: "Node.js",
      title: "Node.js",
      description:
        "JavaScript runtime for building fast, scalable server-side applications",
      icon: "/icons/section2/nodedotjs.svg",
    },
    {
      name: "Next.js",
      title: "Next.js",
      description:
        "Full-stack framework enabling both frontend and backend development in one platform",
      icon: "/icons/section2/nextdotjs.svg",
    },
    {
      name: "Express.js",
      title: "Express.js",
      description:
        "Minimal and flexible Node.js framework for building robust web APIs and applications",
      icon: "/icons/section2/expressdotcom.svg",
    },
    {
      name: "Python",
      title: "Python",
      description:
        "Versatile programming language perfect for data processing, automation, and backend services",
      icon: "/icons/section2/python.svg",
    },
  ],
  databases: [
    {
      name: "PostgreSQL",
      title: "PostgreSQL",
      description:
        "Advanced open-source relational database known for reliability and powerful features",
      icon: "/icons/section2/postgresql.svg",
    },
    {
      name: "Firestore",
      title: "Firestore",
      description:
        "Google's flexible NoSQL document database with real-time synchronization and offline support",
      icon: "/icons/section2/firebase.svg",
    },
  ],
  cloudDevops: [
    {
      name: "Google Cloud",
      title: "Google Cloud",
      description:
        "Comprehensive cloud platform for hosting, computing, and scaling applications globally",
      icon: "/icons/section2/googlecloud.svg",
    },
    {
      name: "Firebase",
      title: "Firebase",
      description:
        "Complete app development platform with hosting, authentication, and real-time features",
      icon: "/icons/section2/firebase.svg",
    },
    {
      name: "Supabase",
      title: "Supabase",
      description:
        "Open-source Firebase alternative with PostgreSQL, real-time subscriptions, and auth",
      icon: "/icons/section2/supabase.svg",
    },
    {
      name: "Vercel",
      title: "Vercel",
      description:
        "Frontend cloud platform optimized for Next.js with instant deployments and edge functions",
      icon: "/icons/section2/vercel.svg",
    },
    {
      name: "Git",
      title: "Git",
      description:
        "Industry-standard version control system for tracking code changes and collaboration",
      icon: "/icons/section2/git.svg",
    },
  ],
};

export default function Home() {
  const t = useTranslations("HomePage");

  const LoadingFallback = ({ className = "" }: { className?: string }) => (
    <div
      className={`animate-pulse bg-gray-700 rounded ${className}`}
      aria-hidden="true"
    />
  );

  function renderTechCards(
    techs: {
      name: string;
      icon: string;
      title?: string;
      description?: string;
      onClick?: () => void;
    }[]
  ) {
    return (
      <div
        className="w-full h-full flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center sm:justify-start px-2 sm:px-4 pb-2 sm:pb-4"
        role="list"
        aria-label="Technology stack"
      >
        {techs.map((tech, index) => (
          <div key={tech.name} role="listitem">
            <Suspense
              fallback={
                <LoadingFallback className="aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32" />
              }
            ></Suspense>
            <TechCard
              index={index + 1}
              title={tech.title}
              description={tech.description}
              icon={
                <Image
                  width={24}
                  height={24}
                  className="filter invert w-full h-full object-contain"
                  src={tech.icon}
                  alt={`${tech.name} technology icon`}
                  loading="lazy"
                />
              }
              onClick={tech.onClick}
              aria-label={tech.name}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <StructuredData />
      <main className="snap-container">
        {/* Skip to content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>

        {/* Hero Section */}
        <section
          id="home"
          className="snap-section w-screen h-screen relative"
          aria-labelledby="hero-title"
        >
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50">
            <LanguageSelector />
          </div>
          <Suspense fallback={null}>
            <AnimatedGridBg />
          </Suspense>
          <div
            id="main-content"
            className="relative flex flex-col lg:flex-row items-center justify-center h-full w-full px-4 sm:px-8 md:px-12 lg:px-20 py-8 lg:py-0"
          >
            <div className="text-center mt-10 lg:text-left lg:mb-0 lg:flex-1">
              <h1
                id="hero-title"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
              >
                {t("hero.title")}
              </h1>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 lg:mt-0">
                {t("hero.subTitle")}
                <ChangingText aria-live="polite">
                  {t("hero.roles")}
                </ChangingText>
              </h1>
              <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
                {t("hero.description")}
              </p>
            </div>

            <div
              className="flex-shrink-0 lg:h-full  mb-8 lg:mb-0"
              role="img"
              aria-label="Profile photo"
            >
              <BlobImage
                src="/photo.webp"
                alt="Profile photo"
                priority={true}
              />
            </div>
          </div>
          <ScrollDownIndicator
            targetId="about"
            aria-label="Scroll to about section"
          />
        </section>

        {/* About Section */}
        <section
          id="about"
          className="relative snap-section w-screen h-screen flex items-center"
          aria-labelledby="about-title"
        >
          <Suspense fallback={null}>
            <AnimatedIconBg
              iconType="section1"
              iconFilter="invert(100%) brightness(0.1)"
              aria-hidden="true"
            />
          </Suspense>
          <div className="w-full h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-8">
            <h2
              id="about-title"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 text-center lg:text-left"
            >
              {t("about.title")}
            </h2>

            <div
              className="w-full text-sm sm:text-base lg:text-lg"
              role="region"
              aria-labelledby="about-section"
            >
              {/* Mobile Layout */}
              <div className="flex flex-col lg:hidden space-y-6">
                <p className="bg-white/5 backdrop-blur-xs p-2 rounded-2xl">
                  {t("about.content1", { age: currentAge })}
                </p>
                <p className="bg-white/5 backdrop-blur-xs p-2 rounded-2xl">
                  {t("about.content2")}
                </p>
                <p className="bg-white/5 backdrop-blur-xs p-2 rounded-2xl">
                  {t("about.content3")}
                </p>
                <p className="bg-white/5 backdrop-blur-xs p-2 rounded-2xl">
                  {t("about.content4")}
                </p>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:flex justify-between items-stretch gap-6 xl:gap-10">
                <p className="flex-1 bg-white/5 backdrop-blur-xs p-2 rounded-2xl">
                  {t("about.content1", {
                    age: new Date().getFullYear() - 2007,
                  })}
                </p>
                <p className="flex-1 bg-white/5 backdrop-blur-xs p-2 rounded-2xl">
                  {t("about.content2")}
                </p>
                <p className="flex-1 bg-white/5 backdrop-blur-xs p-2 rounded-2xl">
                  {t("about.content3")}
                </p>
                <p className="flex-1 bg-white/5 backdrop-blur-xs p-2 rounded-2xl">
                  {t("about.content4")}
                </p>
              </div>
            </div>
          </div>
          <ScrollDownIndicator
            targetId="tech"
            aria-label="Scroll to technology section"
          />
        </section>

        {/* Technology Section */}
        <section
          id="tech"
          className="relative snap-section w-screen h-screen flex items-center"
          aria-labelledby="tech-title"
        >
          <Suspense fallback={null}>
            <AnimatedIconBg
              iconType="section2"
              iconFilter="invert(100%) brightness(0.1)"
              aria-hidden="true"
            />
          </Suspense>

          <div className="w-full h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-8">
            <h2
              id="tech-title"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 text-center lg:text-left"
            >
              {t("tech.title")}
            </h2>
            <Suspense fallback={<LoadingFallback className="w-full h-64" />}>
              <Tabs
                className=""
                items={[
                  {
                    id: "frontend",
                    label: t("tech.subtitle1"),
                    content: renderTechCards(techStacks.frontend),
                  },
                  {
                    id: "backend",
                    label: t("tech.subtitle2"),
                    content: renderTechCards(techStacks.backend),
                  },
                  {
                    id: "databases",
                    label: t("tech.subtitle3"),
                    content: renderTechCards(techStacks.databases),
                  },
                  {
                    id: "cloud-devops",
                    label: t("tech.subtitle4"),
                    content: renderTechCards(techStacks.cloudDevops),
                  },
                ]}
                defaultTab={"frontend"}
                aria-labelledby="tech-title"
              />
            </Suspense>
          </div>

          <ScrollDownIndicator
            targetId="projects"
            aria-label="Scroll to projects section"
          />
        </section>

        {/* Project Section */}
        <section
          id="projects"
          className="relative snap-section w-screen h-screen"
          aria-labelledby="projects-title"
        >
          <Suspense fallback={<LoadingFallback className="w-full h-full" />}>
            <ProjectsSection />
          </Suspense>
          <ScrollDownIndicator
            targetId="contact"
            aria-label="Scroll to contact section"
          />
        </section>

        {/* About Section */}
        <section
          id="contact"
          className="relative snap-section w-screen h-screen"
          aria-labelledby="contact-title"
        >
          <Suspense fallback={<LoadingFallback className="w-full h-full" />}>
            <ContactSection />
          </Suspense>
        </section>
      </main>
    </>
  );
}
