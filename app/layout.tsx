import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PreloadProvider } from "@/components/ui/preloader";
import { AudioProvider } from "@/components/providers/audio-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adhrshya Samavakyam Magazine26",
  description: "Government Engineering College Wayanad - Adhrshya Samavakyam / Magazine 26",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AudioProvider>
          <PreloadProvider>
            {children}
          </PreloadProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
