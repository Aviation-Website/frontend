import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/ui/SmoothScroll";

// Using Roboto as B612 might not be available in Next.js Google Fonts
// But we'll add B612 via CSS import for aviation authenticity
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "AirSpeak - Aviation Communication Training",
  description: "Master aviation communication with real-world scenarios and interactive training modules designed for professional pilots.",
  icons: {
    icon: "/Logo/favico.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`} style={{ fontFamily: '"B612", sans-serif' }}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
