import { Metadata } from "next/types";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mehmet Kucak - Fullstack Developer",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
