import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollToTop from "@/components/ui/ScrollToTop";

// Using Roboto as B612 might not be available in Next.js Google Fonts
// But we'll add B612 via CSS import for aviation authenticity
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "AirSpeak - Aviation Communication Training",
  description: "Master aviation communication with real-world scenarios and interactive training modules designed for professional pilots.",
  icons: {
    icon: "/Logo/favico.png",
  },
  openGraph: {
    title: "AirSpeak - Master Aviation Communication",
    description: "Train with exact, book-standard phraseology for professional pilots. Interactive scenarios, AI voices, and structured learning.",
    url: "https://aviation-app.netlify.app",
    siteName: "AirSpeak",
    images: [
      {
        url: "/Logo/Logo-OG.svg",
        width: 1200,
        height: 630,
        alt: "AirSpeak - Aviation Communication Training Platform",
        type: "image/svg+xml",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AirSpeak - Aviation Communication Training",
    description: "Master aviation communication with AI-powered training. Perfect for pilots and trainees.",
    images: ["/Logo/Logo-OG.svg"],
    creator: "@AirSpeakApp",
  },
  metadataBase: new URL("https://aviation-app.netlify.app"),
  keywords: [
    "aviation",
    "communication",
    "training",
    "pilots",
    "phraseology",
    "ATC",
    "aircraft",
    "simulation",
    "professional training",
  ],
  authors: [{ name: "AirSpeak Team" }],
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
    canonical: "https://aviation-app.netlify.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${montserrat.variable} antialiased`} style={{ fontFamily: '"B612", sans-serif' }}>
        <SmoothScroll />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
