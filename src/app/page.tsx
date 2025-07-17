import Image from "next/image";
import BlobImage from "@/components/BlobImage";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <main>
      <section className="relative w-full h-svh">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-between h-full w-full px-[200px]">
          <div>
            <h1 className="text-6xl text-white">Hi, I'm Mehmet!</h1>
            <p className="mt-4 text-gray-300 max-w-xl">
              I’m Mehmet Kucak, a full‑stack developer who brings ideas to life
              with pixel‑perfect React and Next.js frontends backed by
              rock‑solid Node.js and PostgreSQL architectures. Whether it’s
              crafting slick user interfaces, designing scalable APIs, or
              optimizing performance end‑to‑end, I turn complex problems into
              seamless digital experiences. Let’s build something extraordinary
              together.
            </p>
          </div>
          <BlobImage src="/photo.webp" alt="Photo" />
        </div>
      </section>
      <section className="w-[60px] m-0 p-0">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis,
          modi impedit. Minima eaque quos mollitia autem nemo molestias ratione,
          tempora sit odit veritatis, non pariatur, debitis earum minus eum
          iusto?
        </p>
      </section>
    </main>
  );
}
