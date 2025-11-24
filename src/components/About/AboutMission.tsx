"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

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
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-700">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
            Why FlightSounds exists
          </div>
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
              <div className="relative w-full aspect-square rounded-full bg-[#002d4b] p-0 shadow-2xl ring-1 ring-white/10 overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-3xl" />
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />

                {/* Image */}
                <img
                  src="/About/For pilots & trainees - visual selection.svg"
                  alt="FlightSounds Ecosystem"
                  className="relative h-full w-full object-contain drop-shadow-2xl scale-[1.08]"
                />
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
      className={`relative w-full max-w-none cursor-pointer overflow-hidden rounded-2xl border bg-white p-8 shadow-lg transition-all duration-300 ${isActive
        ? "border-sky-500 ring-4 ring-sky-500/10 scale-105 z-20"
        : "border-slate-100 hover:border-sky-200 hover:shadow-xl hover:scale-102 z-10"
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
