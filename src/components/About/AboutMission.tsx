"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const ORBIT_FEATURES = [
  {
    id: "pilots",
    title: "Pilots & trainees",
    body: "Rehearse flows, callouts, and briefings in a cockpit-real soundscape that matches the aircraft you fly.",
    position: "top-left",
  },
  {
    id: "sim-builders",
    title: "Sim builders",
    body: "Wrap your home or training sims in drop-in audio packs tuned for glass cockpits, legacy panels, and everything in between.",
    position: "top-right",
  },
  {
    id: "training-teams",
    title: "Training teams",
    body: "Keep scripts, scenarios, and audio consistent across lessons so every student hears the same standard.",
    position: "bottom-left",
  },
  {
    id: "instructors",
    title: "Instructors",
    body: "Bookmark, replay, and refine training audio between sessions to highlight what matters most.",
    position: "bottom-right",
  },
];

export default function AboutMission() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ORBIT_FEATURES.length);
    }, 3000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white py-8 sm:py-12">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,45,75,0.07),transparent_60%),radial-gradient(circle_at_bottom,rgba(0,45,75,0.04),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mx-auto mb-6 max-w-3xl text-center">
      
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Audio training out of the box.
            <br />
            <span className="text-sky-600">Ready before you start the engines.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            AirSpeak gives you ready-to-fly training audio: cockpit voices, ATC, and ambience that
            drop straight into your simulator or classroom scenarios.
          </p>
        </div>

        {/* Radial Layout Container */}
        <div className="relative mx-auto max-w-7xl">
          {/* Connecting Lines (Desktop) */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <svg className="h-full w-full text-sky-200" viewBox="0 0 1000 600" preserveAspectRatio="none">
              {/* Center to Top-Left */}
              <path d="M500 300 L200 150" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="200" cy="150" r="4" fill="#38bdf8" />

              {/* Center to Top-Right */}
              <path d="M500 300 L800 150" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="800" cy="150" r="4" fill="#38bdf8" />

              {/* Center to Bottom-Left */}
              <path d="M500 300 L200 450" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="200" cy="450" r="4" fill="#38bdf8" />

              {/* Center to Bottom-Right */}
              <path d="M500 300 L800 450" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="800" cy="450" r="4" fill="#38bdf8" />
            </svg>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr_1fr] lg:gap-12 lg:h-[650px] items-center">

            {/* Left Column Cards */}
            <div className="flex flex-col gap-y-12 lg:gap-y-40 lg:items-end">
              {/* Top Left */}
              <FeatureCard
                feature={ORBIT_FEATURES[0]}
                isActive={activeIndex === 0}
                onClick={() => setActiveIndex(0)}
                className="lg:translate-y-16"
              />
              {/* Bottom Left */}
              <FeatureCard
                feature={ORBIT_FEATURES[2]}
                isActive={activeIndex === 2}
                onClick={() => setActiveIndex(2)}
                className="lg:-translate-y-16"
              />
            </div>

            {/* Center Image */}
            <div className="relative z-10 flex justify-center py-4 lg:py-0">
              <div className="relative w-full aspect-square rounded-full bg-[#002d4b] p-0 shadow-2xl ring-1 ring-white/10 overflow-hidden flex flex-col items-center justify-center group">
                
                {/* Rotating Earth Map Background */}
                <div className="absolute inset-0 opacity-90">
                  <div className="absolute inset-0 bg-[#002440]" /> {/* Deep Space/Ocean Base */}
                  
                  {/* Moving Map Layer */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <motion.div 
                      className="flex h-full items-center"
                      animate={{ x: ["-50%", "0%"] }}
                      transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                      style={{ width: "200%" }}
                    >
                      {/* Detailed World Map Pattern (Repeated Twice) */}
                      {[0, 1].map((i) => (
                        <svg key={i} viewBox="0 0 200 100" className="h-full w-1/2 text-sky-300 fill-current shrink-0" preserveAspectRatio="none">
                           {/* Americas */}
                           <path d="M35,15 c-2,0 -5,3 -6,6 c-1,3 1,6 0,9 c-1,3 -4,4 -5,7 c-1,3 1,5 3,6 c2,1 4,4 3,7 c-1,3 -3,5 -2,8 c1,3 4,4 7,3 c3,-1 5,-4 6,-7 c1,-3 3,-2 5,-1 c2,1 4,0 5,-3 c1,-3 -1,-5 -3,-7 c-2,-2 -1,-4 1,-5 c2,-1 5,-2 6,-5 c1,-3 -1,-6 -4,-7 c-3,-1 -6,-2 -8,-4 c-2,-2 -5,-4 -8,-7 z" className="opacity-70" />
                           
                           {/* Europe/Africa */}
                           <path d="M92,12 c-4,0 -7,3 -6,7 c1,4 -2,7 -4,10 c-2,3 -1,6 2,8 c3,2 5,5 4,9 c-1,4 2,7 5,8 c3,1 6,-1 8,-4 c2,-3 5,-2 7,0 c2,2 4,1 5,-2 c1,-3 -1,-5 -3,-7 c-2,-2 -1,-4 2,-5 c3,-1 5,-3 4,-6 c-1,-3 -4,-4 -7,-5 c-3,-1 -6,-2 -9,-3 c-3,-1 -6,0 -8,0 z" className="opacity-70" />
                           
                           {/* Asia */}
                           <path d="M128,12 c-3,2 -5,6 -3,9 c2,3 0,7 -2,10 c-2,3 1,6 4,7 c3,1 6,0 8,-3 c2,-3 5,-2 7,1 c2,3 5,2 6,-1 c1,-3 -1,-6 -4,-7 c-3,-1 -5,-3 -4,-6 c1,-3 4,-4 7,-5 c3,-1 5,-3 3,-6 c-2,-3 -6,-2 -9,-1 c-3,1 -6,0 -9,-2 c-3,-2 -6,-4 -10,-5 z" className="opacity-70" />
                           
                           {/* Australia/Indo */}
                           <path d="M155,62 c-3,0 -5,3 -4,6 c1,3 4,4 6,2 c2,-2 5,-1 6,2 c1,3 4,2 6,-1 c2,-3 0,-6 -3,-7 c-3,-1 -6,0 -8,-2 c-2,-2 -5,-3 -7,-6 z" className="opacity-70" />

                           {/* Greenland/Islands */}
                           <path d="M75,8 c-2,0 -3,2 -2,4 c1,2 3,3 5,2 c2,-1 3,-3 2,-5 c-1,-2 -3,-1 -5,-1 z" className="opacity-60" />
                           
                           {/* Scattered Islands */}
                           <circle cx="175" cy="25" r="1" className="opacity-50" />
                           <circle cx="115" cy="55" r="0.8" className="opacity-40" />
                           <circle cx="25" cy="45" r="1.2" className="opacity-40" />
                           <circle cx="145" cy="75" r="0.8" className="opacity-40" />
                           <circle cx="55" cy="85" r="1" className="opacity-40" />
                        </svg>
                      ))}
                    </motion.div>
                  </div>

                  {/* 3D Sphere Effects (Gloss & Shadow) */}
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.2),transparent_50%)] mix-blend-overlay" />
                  <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_30px_rgba(0,0,100,0.6),inset_10px_10px_40px_rgba(255,255,255,0.15)]" />
                  
                  {/* Subtle Grid */}
                  <svg className="absolute inset-0 h-full w-full opacity-20 mix-blend-overlay" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="99" fill="none" stroke="#fff" strokeWidth="0.5" />
                    <path d="M100,0 v200 M0,100 h200" stroke="#fff" strokeWidth="0.2" strokeDasharray="4 4" />
                  </svg>
                </div>

                {/* Atmosphere Glow */}
                <div className="absolute inset-0 rounded-full bg-sky-400/10 blur-xl" />

                {/* Plane Image */}
                <motion.div
                  className="relative z-20"
                  initial={{ rotate: 0 }} 
                  animate={{ 
                    y: [-3, 3, -3],
                    x: [-1, 1, -1],
                    rotate: [0, -1, 1, 0] 
                  }}
                  transition={{ 
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Image
                    src="/About/plane-svgrepo-com.svg"
                    alt="FlightSounds Plane"
                    className="h-32 w-32 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                    width={128}
                    height={128}
                  />
                </motion.div>

                {/* Synchronized Text */}
                <div className="relative z-20 mt-2 h-12 w-full px-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center text-center"
                    >
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#38bdf8] font-bold drop-shadow-lg shadow-black">
                        Current Focus
                      </span>
                      <span className="text-sm font-bold text-white sm:text-base drop-shadow-md">
                        {ORBIT_FEATURES[activeIndex].title}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Column Cards */}
            <div className="flex flex-col gap-y-12 lg:gap-y-40 lg:items-start">
              {/* Top Right */}
              <FeatureCard
                feature={ORBIT_FEATURES[1]}
                isActive={activeIndex === 1}
                onClick={() => setActiveIndex(1)}
                className="lg:translate-y-16"
              />
              {/* Bottom Right */}
              <FeatureCard
                feature={ORBIT_FEATURES[3]}
                isActive={activeIndex === 3}
                onClick={() => setActiveIndex(3)}
                className="lg:-translate-y-16"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, isActive, onClick, className = "" }: { feature: typeof ORBIT_FEATURES[0], isActive: boolean, onClick: () => void, className?: string }) {
  return (
    <motion.div
      className={`relative w-full max-w-none cursor-pointer overflow-hidden rounded-2xl bg-white border p-8 shadow-lg transition-all duration-300 ${isActive
        ? "border-2 border-sky-500 ring-4 ring-sky-500/20 scale-105 z-20"
        : "border border-sky-300 hover:border-2 hover:border-sky-500 hover:ring-4 hover:ring-sky-500/10 hover:scale-105 z-10"
        } ${className}`}
      onClick={onClick}
      whileHover={{ y: -4 }}
    >
      <div className={`absolute top-0 left-0 h-1.5 w-full ${isActive ? "bg-sky-500" : "bg-transparent"}`} />

      <h3 className={`text-lg font-bold uppercase tracking-wider ${isActive ? "text-sky-600" : "text-slate-900"}`}>
        {feature.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        {feature.body}
      </p>

      {/* Active Indicator */}
      {isActive && (
        <motion.div
          layoutId="active-glow"
          className="absolute inset-0 -z-10 bg-sky-50/50"
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}
