import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex w-1/10 aspect-auto">
        <Image src="/photo.webp" alt="Photo 2" width={4480} height={6720} />
      </div>
    </>
  );
}
