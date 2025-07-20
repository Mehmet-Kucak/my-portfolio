import BlobImage from "@/components/BlobImage";
import ChangingText from "@/components/ChangingText";
import ScrollDownIndicator from "@/components/ScrollDown";
import LanguageSelector from "@/components/LangSelector";
import { useTranslations } from "next-intl";
import { lazy, Suspense } from "react";

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

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="snap-container">
      <section id="home" className="snap-section w-full relative">
        <div className="absolute top-4 right-4 z-50">
          <LanguageSelector />
        </div>
        <Suspense fallback={null}>
          <AnimatedGridBg />
        </Suspense>
        <div className="relative flex items-center justify-between h-full w-full px-20">
          <div>
            <h1 className="text-6xl font-extrabold text-white">
              {t("hero.title")}
            </h1>
            <h1 className="text-4xl font-bold text-white">
              {t("hero.subTitle")}
              <ChangingText>{t("hero.roles")}</ChangingText>
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-xl">
              {t("hero.description")}
            </p>
          </div>
          <BlobImage src="/photo.webp" alt="Photo" priority={true} />
          <ScrollDownIndicator targetId="about" />
        </div>
      </section>
      <section
        id="about"
        className="relative snap-section w-full flex items-center"
      >
        <Suspense fallback={null}>
          <AnimatedIconBg iconType="section1" />
        </Suspense>
        <div className="w-full px-20 ">
          <h2 className="text-4xl mb-6">About Me</h2>
          <p>
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
        <ScrollDownIndicator targetId="tech" />
      </section>
      <section
        id="tech"
        className="relative snap-section w-full flex items-center"
      >
        <Suspense fallback={null}>
          <AnimatedIconBg iconType="section2" />
        </Suspense>
        <div className="w-full px-20 ">
          <h2 className="text-4xl mb-6">Tech Stack</h2>
          <p>
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
