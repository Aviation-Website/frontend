"use client";

import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

const globeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
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

const sampleArcs = [
  {
    order: 1,
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 51.5074,
    endLng: -0.1278,
    arcAlt: 0.3,
    color: "#38bdf8",
  },
  {
    order: 2,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.2,
    color: "#60a5fa",
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.4,
    color: "#93c5fd",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-800 text-center mb-8 md:mb-12 leading-tight">
          Train Pilots on{" "}
          <span className="bg-linear-to-r bg-blue-800 bg-clip-text text-transparent">
            Aviation Phrases
          </span>
        </h1>

        {/* Globe */}
        <div className="w-full max-w-4xl aspect-square relative">
          <World globeConfig={globeConfig} data={sampleArcs} />
        </div>
      </div>
    </section>
  );
}
