import BlobImage from "@/components/BlobImage";
import ChangingText from "@/components/ChangingText";
import MainTabs from "@/components/Tabs";
import TechCard from "@/components/TechCard";
import { useTranslations } from "next-intl";
import { lazy, Suspense } from "react";

const LanguageSelector = lazy(() =>
  import("@/components/LangSelector").then((module) => ({
    default: module.default,
  }))
);
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
const ScrollDownIndicator = lazy(() =>
  import("@/components/ScrollDown").then((module) => ({
    default: module.default,
  }))
);
const currentAge = new Date().getFullYear() - 2007;

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="snap-container">
      <section id="home" className="snap-section w-screen h-screen relative">
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50">
          <LanguageSelector />
        </div>
        <Suspense fallback={null}>
          <AnimatedGridBg />
        </Suspense>
        <div className="relative flex flex-col lg:flex-row items-center justify-center h-full w-full px-4 sm:px-8 md:px-12 lg:px-20 py-8 lg:py-0">
          <div className="text-center mt-10 lg:text-left lg:mb-0 lg:flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {t("hero.title")}
            </h1>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 lg:mt-0">
              {t("hero.subTitle")}
              <ChangingText>{t("hero.roles")}</ChangingText>
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
              {t("hero.description")}
            </p>
          </div>

          <div className="flex-shrink-0 lg:h-full  mb-8 lg:mb-0">
            <BlobImage src="/photo.webp" alt="Photo" priority={true} />
          </div>
        </div>
        <ScrollDownIndicator targetId="about" />
      </section>

      <section
        id="about"
        className="relative snap-section w-screen h-screen flex items-center"
      >
        <Suspense fallback={null}>
          <AnimatedIconBg
            iconType="section1"
            iconFilter="invert(100%) brightness(0.1)"
          />
        </Suspense>
        <div className="w-full h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-center lg:text-left">
            {t("about.title")}
          </h2>
          <div className="w-full text-sm sm:text-base lg:text-lg">
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

            <div className="hidden lg:flex justify-between items-stretch gap-6 xl:gap-10">
              <p className="flex-1 bg-white/5 backdrop-blur-xs p-2 rounded-2xl">
                {t("about.content1", { age: new Date().getFullYear() - 2007 })}
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
        <ScrollDownIndicator targetId="tech" />
      </section>

      <section
        id="tech"
        className="relative snap-section w-screen h-screen flex items-center"
      >
        <Suspense fallback={null}>
          <AnimatedIconBg
            iconType="section2"
            iconFilter="invert(100%) brightness(0.1)"
          />
        </Suspense>
        <div className="w-full h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-center lg:text-left">
            Tech Stack
          </h2>
          <MainTabs
            items={[
              {
                id: "frontend",
                label: "Front End",
                content: (
                  <div className="w-full h-full flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center sm:justify-start px-2 sm:px-4 pb-2 sm:pb-4">
                    <TechCard
                      index={1}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/react.svg"
                          alt="React Icon"
                        />
                      }
                    />
                    <TechCard
                      index={2}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/javascript.svg"
                          alt="JS Icon"
                        />
                      }
                    />
                    <TechCard
                      index={3}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/typescript.svg"
                          alt="TS Icon"
                        />
                      }
                    />
                    <TechCard
                      index={4}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/html5.svg"
                          alt="HTML5 Icon"
                        />
                      }
                    />
                    <TechCard
                      index={5}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/css.svg"
                          alt="CSS Icon"
                        />
                      }
                    />
                    <TechCard
                      index={6}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/tailwindcss.svg"
                          alt="TailwindCSS Icon"
                        />
                      }
                    />
                  </div>
                ),
              },
              {
                id: "backend",
                label: "Back End",
                content: (
                  <div className="w-full h-full flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center sm:justify-start px-2 sm:px-4 pb-2 sm:pb-4">
                    <TechCard
                      index={1}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/nodedotjs.svg"
                          alt="NodeJS Icon"
                        />
                      }
                    />
                    <TechCard
                      index={2}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/expressdotcom.svg"
                          alt="ExpressJS Icon"
                        />
                      }
                    />
                    <TechCard
                      index={3}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/python.svg"
                          alt="Python Icon"
                        />
                      }
                    />
                  </div>
                ),
              },
              {
                id: "databases",
                label: "Databases",
                content: (
                  <div className="w-full h-full flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center sm:justify-start px-2 sm:px-4 pb-2 sm:pb-4">
                    <TechCard
                      index={1}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/postgresql.svg"
                          alt="PostgreSQL Icon"
                        />
                      }
                    />
                    <TechCard
                      index={2}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/firebase.svg"
                          alt="Firebase Icon"
                        />
                      }
                    />
                  </div>
                ),
              },
              {
                id: "cloud-devops",
                label: "Cloud/DevOps",
                content: (
                  <div className="w-full h-full flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center sm:justify-start px-2 sm:px-4 pb-2 sm:pb-4">
                    <TechCard
                      index={1}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/googlecloud.svg"
                          alt="Google Cloud Icon"
                        />
                      }
                    />
                    <TechCard
                      index={2}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/firebase.svg"
                          alt="Firebase Icon"
                        />
                      }
                    />
                    <TechCard
                      index={3}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/supabase.svg"
                          alt="Supabase Icon"
                        />
                      }
                    />
                    <TechCard
                      index={4}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/vercel.svg"
                          alt="Vercel Icon"
                        />
                      }
                    />
                    <TechCard
                      index={5}
                      icon={
                        <img
                          className="filter invert w-full h-full object-contain"
                          src="/icons/section2/git.svg"
                          alt="Git Icon"
                        />
                      }
                    />
                  </div>
                ),
              },
            ]}
            defaultTab={"frontend"}
          />
        </div>
      </section>
    </main>
  );
}
