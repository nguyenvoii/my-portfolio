import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nguyễn Voi",
  description: "Where Logic Meets Melody - Building Digital Experiences, Strumming Real Ones. Personal portfolio of a developer and guitarist.",
  keywords: ["developer", "guitarist", "portfolio", "web development", "music"],
  authors: [{ name: "Nguyễn Voi" }],
  openGraph: {
    title: "Nguyễn Voi - Developer & Guitarist",
    description: "Where Logic Meets Melody - Building Digital Experiences, Strumming Real Ones",
    type: "website",
  },
  icons: {
    icon: "/avatar.jpg",
    apple: "/avatar.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}