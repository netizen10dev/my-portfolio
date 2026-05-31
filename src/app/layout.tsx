import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import { ModalProvider } from "@/app/_context/ModalContext";
import ContactModal from "@/app/_components/ContactModal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Harvey Specter — H.Studio",
  description: "H.Studio is a full-service creative studio creating beautiful digital experiences and products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${playfair.variable}`}>
      <body>
        <ModalProvider>
          {children}
          <ContactModal />
        </ModalProvider>
        <SanityLive />
      </body>
    </html>
  );
}
