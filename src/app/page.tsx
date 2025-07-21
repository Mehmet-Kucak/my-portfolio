import BlobImage from "@/components/BlobImage";
import ChangingText from "@/components/ChangingText";
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
          <div className="text-center lg:text-left  lg:mb-0 lg:flex-1">
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

          <div className="flex-shrink-0 mb-8 lg:mb-0">
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
          <AnimatedIconBg iconType="section1" />
        </Suspense>
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 py-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-center lg:text-left">
            {t("about.title")}
          </h2>
          <div className="w-full text-sm sm:text-base lg:text-lg">
            <div className="flex flex-col lg:hidden space-y-6">
              <p>{t("about.content1", { age: currentAge })}</p>
              <p>{t("about.content2")}</p>
              <p>{t("about.content3")}</p>
              <p>{t("about.content4")}</p>
            </div>

            <div className="hidden lg:flex justify-between items-start gap-6 xl:gap-10">
              <p className="flex-1">
                {t("about.content1", { age: new Date().getFullYear() - 2007 })}
              </p>
              <p className="flex-1">{t("about.content2")}</p>
              <p className="flex-1">{t("about.content3")}</p>
              <p className="flex-1">{t("about.content4")}</p>
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
          <AnimatedIconBg iconType="section2" />
        </Suspense>
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 py-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-center lg:text-left">
            Tech Stack
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptatibus at natus provident quidem placeat reiciendis incidunt
            pariatur eaque cupiditate officiis. Id, reprehenderit mollitia,
            perspiciatis doloremque ut quisquam modi eveniet, exercitationem
            magnam rerum ullam necessitatibus perferendis? Temporibus, sequi
            sint adipisci necessitatibus ullam voluptates eligendi et sunt
            repellat reiciendis a voluptas qui molestiae dolore porro ad tempore
            fugit!
          </p>
        </div>
      </section>
    </main>
  );
}
