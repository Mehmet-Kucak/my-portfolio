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
  title: "Mehmet Kucak - Fullstack Developer",
  description: "Mehmet Kucak - Fullstack Developer",
  icons: {
    icon: "/favicon.svg",
  },
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
