import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Metadata } from "next/types";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const leagueSpartan = localFont({
  src: "/fonts/LeagueSpartan.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mehmetkucak.com"),
  title: {
    default: "Mehmet Kucak - Full Stack Developer & Software Engineer",
    template: "%s | Mehmet Kucak",
  },
  description:
    "18-year-old full-stack developer from Turkey specializing in React, Next.js, TypeScript, and Node.js. Building innovative web applications with modern technologies. Available for freelance projects and collaborations.",
  applicationName: "Mehmet Kucak Portfolio",
  authors: [{ name: "Mehmet Kucak", url: "https://mehmetkucak.com" }],
  generator: "Next.js",
  keywords: [
    "Mehmet Kucak",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Tailwind CSS",
    "PostgreSQL",
    "Firebase",
    "Supabase",
    "Turkey Developer",
    "Freelance Developer",
    "Web Applications",
    "Portfolio Website",
    "Responsive Design",
    "Modern Web Development",
    "AI Integration",
    "Aydın Turkey",
    "Turkish Developer",
  ],
  creator: "Mehmet Kucak",
  publisher: "Mehmet Kucak",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Mehmet Kucak - Full Stack Developer & Software Engineer",
    description:
      "18-year-old full-stack developer from Turkey creating innovative web applications with React, Next.js, and modern technologies. Check out my projects and get in touch!",
    url: "https://mehmetkucak.com",
    siteName: "Mehmet Kucak Portfolio",
    images: [
      {
        url: "/photo.webp",
        width: 1925,
        height: 1925,
        alt: "Profile photo",
        type: "image/webp",
      },
      {
        url: "/projects/gameoflife.webp",
        width: 1363,
        height: 629,
        alt: "Screenshot of Conway's Game of Life project",
        type: "image/webp",
      },
      {
        url: "/projects/gastrokesif.webp",
        width: 512,
        height: 226,
        alt: "Screenshot of Turkish Local Cuisines Mobile App project",
        type: "image/webp",
      },
      {
        url: "/projects/portfolio.webp",
        width: 1362,
        height: 607,
        alt: "Screenshot of Personal Portfolio project",
        type: "image/webp",
      },
      {
        url: "/projects/redditclone.webp",
        width: 1365,
        height: 368,
        alt: "Screenshot of Reddit Clone App project",
        type: "image/webp",
      },
    ],
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehmet Kucak - Full Stack Developer & Software Engineer",
    description:
      "18-year-old full-stack developer from Turkey building innovative web applications with React, Next.js, and modern technologies.",
    creator: "@mehmetkucak0",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mehmetkucak.com",
    languages: {
      "en-US": "https://mehmetkucak.com",
      "tr-TR": "https://mehmetkucak.com",
    },
  },
  category: "Technology",
  classification: "Developer Portfolio",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={leagueSpartan.className}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/photo.webp"
          fetchPriority="high"
        />
      </head>
      <body className={`antialiased`}>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
