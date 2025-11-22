"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "motion/react";

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
    <section className="relative min-h-screen w-full bg-white flex flex-col lg:flex-row items-center justify-center px-4 py-20">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left column */}
        <div className="flex flex-col items-center lg:items-start space-y-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-900 text-center lg:text-left leading-tight">
            Train Pilots on{" "}
            <span className="bg-blue-700 bg-clip-text text-transparent">
              Aviation Phrases
            </span>
          </h2>

          <div className="w-full max-w-xl aspect-square relative cursor-grab">
            <World globeConfig={globeConfig} data={sampleArcs} />
          </div>
        </div>

        {/* Right column */}
        <div className="w-full flex flex-col items-center lg:items-end space-y-8">
          <div className="w-full max-w-lg rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white shadow-lg p-8">
            <p className="text-sm font-semibold tracking-wide text-blue-500 uppercase">
              Fleet Training Visualizer
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              Track every phrase, every route, everywhere.
            </p>

            <div className="relative mt-10 h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.6),_transparent_70%)]" />
              <motion.div
                className="absolute w-24 h-24"
                animate={{
                  x: [0, 160, 320, 160, 0],
                  y: [0, -40, 0, 40, 0],
                  rotate: [0, 8, -6, 12, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/Navbar/plane.svg"
                  alt="Animated plane"
                  width={96}
                  height={96}
                  className="drop-shadow-[0_10px_30px_rgba(59,130,246,0.45)]"
                />
              </motion.div>

              <motion.div
                className="absolute bottom-10 left-6 h-1 w-32 rounded-full bg-blue-400/40"
                animate={{ opacity: [0.2, 1, 0.2], scaleX: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-6 left-20 h-1 w-48 rounded-full bg-cyan-400/30"
                animate={{ opacity: [0.1, 0.8, 0.1], scaleX: [0.5, 1.1, 0.6] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
