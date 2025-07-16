import Image from "next/image";
import BlobImage from "@/components/BlobImage";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center px-20 py-10">
      {/* <div className="flex w-3/5 h-auto">
        <Image
          src="/photo.webp"
          alt="Photo 2"
          width={1925}
          height={1925}
          className="rounded-full"
        />
      </div> */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-6xl">Hi, I'm Mehmet!</h1>
          <p>
            I’m Mehmet Kucak, a full‑stack developer who brings ideas to life
            with pixel‑perfect React and Next.js frontends backed by rock‑solid
            Node.js and PostgreSQL architectures. Whether it’s crafting slick
            user interfaces, designing scalable APIs, or optimizing performance
            end‑to‑end, I turn complex problems into seamless digital
            experiences. Let’s build something extraordinary together.
          </p>
        </div>
        <BlobImage src="/photo.webp" alt="Photo" />
      </div>
    </main>
  );
}
