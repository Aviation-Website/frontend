"use client";

import dynamic from "next/dynamic";
import { Plane, ArrowRight } from "lucide-react";
import { sampleArcs } from "./Arc";
import { ContactForm } from "./ContactForm";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

const globeConfig = {
  pointSize: 4,
  globeColor: "#092d79", // Brighter realistic ocean blue
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.2,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

export function ContactHero() {
  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col lg:flex-row items-center justify-center px-4 pt-4 md:pt-16 pb-40 overflow-hidden">
      {/* Background World Map SVG */}
      <div
        className="absolute inset-0 w-full h-full z-0 opacity-15"
        style={{
          backgroundImage: "url('/Hero/World Map.svg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      {/* Content */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center relative z-10">
        {/* Left column */}
        <div className="flex flex-col items-center lg:items-start w-full max-w-2xl">
          <div className="w-full bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-2xl border border-blue-50 z-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#3271b1]"></div>
            <h2 className="text-3xl font-bold text-[#152351] mb-8 text-center">Contact Us</h2>
            <ContactForm />
          </div>
          
          {/* Mobile Globe */}
          <div className="w-full max-w-xs aspect-square relative lg:hidden mx-auto mt-8">
            <World globeConfig={globeConfig} data={sampleArcs} />
          </div>
        </div>

        {/* Right column */}
        <div className="hidden lg:flex w-full flex-col items-center lg:items-end space-y-8">
          <div className="w-full max-w-md lg:max-w-xl aspect-square relative cursor-grab">
            <World globeConfig={globeConfig} data={sampleArcs} />
          </div>
        </div>
      </div>
    </section>
  );
}
