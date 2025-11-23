"use client";

import dynamic from "next/dynamic";
import { Plane, ArrowRight } from "lucide-react";
import { sampleArcs } from "./Arc";

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

export function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col lg:flex-row items-center justify-center px-4 pt-4 md:pt-16 pb-40 overflow-hidden">
      {/* Background World Map SVG */}
      <div
        className="absolute inset-0 w-full h-full z-0 opacity-15"
        style={{
          backgroundImage: "url('/Hero/World Map.svg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center relative z-10">
        {/* Left column */}
        <div className="flex flex-col items-center lg:items-start space-y-2">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-[#152351] text-center lg:text-left leading-tight">
            Train Pilots on{" "}
            <span className="bg-[#3271b1] bg-clip-text text-transparent">
              Aviation Phrases
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 text-center lg:text-left max-w-2xl leading-relaxed font-medium">
            Master aviation communication with real-world scenarios and interactive training modules designed for professional pilots.
          </p>

          {/* Mobile Globe */}
          <div className="w-full max-w-xs aspect-square relative lg:hidden mx-auto">
            <World globeConfig={globeConfig} data={sampleArcs} />
          </div>

          <div className="flex flex-row gap-2 w-full justify-center sm:justify-start sm:w-auto mt-4">
            <a
              href="/register"
              className="group relative px-4 py-2 md:px-8 md:py-4 text-sm md:text-base bg-[#3271b1] text-white font-bold rounded-xl hover:bg-[#285a8c] transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              <Plane className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-45 transition-transform duration-300" />
              Start Training
            </a>
            <a
              href="/about"
              className="group px-4 py-2 md:px-8 md:py-4 text-sm md:text-base bg-transparent text-[#152351] font-bold rounded-xl border-2 border-[#152351] hover:bg-[#152351] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              Learn More
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
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
