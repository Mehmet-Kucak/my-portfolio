import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Metadata } from "next/types";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mehmet Kucak - Fullstack Developer",
  description: "",
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
    <html lang={locale}>
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
      </body>
    </html>
  );
}
