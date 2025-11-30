import React from "react";
import { Navbar, Footer } from "@/components";
import { HeroSection } from "@/components/Nato/HeroSection";
import { TranslatorSection } from "@/components/Nato/TranslatorSection";
import { ReferenceGrid } from "@/components/Nato/ReferenceGrid";

export default function NatoPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] font-sans text-white selection:bg-blue-500/30">
      <Navbar />
      <HeroSection />
      <TranslatorSection />
      <ReferenceGrid />
      <Footer />
    </div>
  );
}
