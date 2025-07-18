import BlobImage from "@/components/BlobImage";
import AnimatedBackground from "@/components/AnimatedBackground";
import ChangingText from "@/components/ChangingText";
import ScrollDownIndicator from "@/components/ScrollDown";

export default function Home() {
  return (
    <main className="snap-container">
      <section id="home" className="snap-section w-full relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-between h-full w-full px-20">
          <div>
            <h1 className="text-6xl text-white">Hi, I'm Mehmet!</h1>
            <h1 className="text-4xl text-white">
              I'm a <ChangingText />
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl">
              I'm Mehmet Kucak, a full-stack developer passionate about creating
              exceptional web experiences. I work with React, Next.js, and
              Node.js to build applications that are both beautiful and
              functional. Let's build something great together.
            </p>
          </div>
          <BlobImage src="/photo.webp" alt="Photo" />
          <ScrollDownIndicator targetId="about" />
        </div>
      </section>
      <section
        id="about"
        className="snap-section w-full px-20 flex items-center"
      >
        <div>
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
      </section>
    </main>
  );
}
