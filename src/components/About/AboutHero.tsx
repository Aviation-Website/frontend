"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import "../Home/StepsSection/StepsSection.css";

type SectionId =
  | "cockpit"
  | "fuselage"
  | "leftWing"
  | "rightWing"
  | "tail"
  | "engineLeft"
  | "engineRight";

type SectionConfig = {
  id: SectionId;
  label: string;
  short: string;
  description: string;
};

const SECTIONS: SectionConfig[] = [
  {
    id: "cockpit",
    label: "Cockpit & Flight Deck",
    short: "Control center",
    description:
      "Where pilots command the aircraft, manage navigation, and monitor every system in real time.",
  },
  {
    id: "fuselage",
    label: "Fuselage",
    short: "Passenger cabin",
    description:
      "The main body of the aircraft, housing passengers, crew, avionics, and cargo bays.",
  },
  {
    id: "leftWing",
    label: "Left Wing",
    short: "Lift generator",
    description:
      "One of the primary lifting surfaces, carefully shaped to keep the aircraft stable in the air.",
  },
  {
    id: "rightWing",
    label: "Right Wing",
    short: "Lift generator",
    description:
      "Mirrors the left wing to balance lift, fuel storage, and control surfaces.",
  },
  {
    id: "engineLeft",
    label: "Left Engine",
    short: "Thrust source",
    description:
      "High-bypass turbofan providing efficient thrust for takeoff, climb, and cruise.",
  },
  {
    id: "engineRight",
    label: "Right Engine",
    short: "Thrust source",
    description:
      "Pairs with the left engine to deliver balanced power and redundancy.",
  },
  {
    id: "tail",
    label: "Tail & Empennage",
    short: "Stability",
    description:
      "The vertical and horizontal stabilizers keep the aircraft balanced in yaw and pitch.",
  },
];

const sectionById: Record<SectionId, SectionConfig> = SECTIONS.reduce(
  (acc, section) => {
    acc[section.id] = section;
    return acc;
  },
  {} as Record<SectionId, SectionConfig>
);

export default function AboutHero() {
  const [activeId, setActiveId] = useState<SectionId>("cockpit");

  const activeSection = sectionById[activeId];

  const handleActivate = (id: SectionId) => {
    setActiveId(id);
  };

  return (
    <section className="steps-section-container relative overflow-hidden">
      <div className="steps-background-elements">
        <div className="grid-overlay" />
        <div className="glow-effect" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1380px] flex-col gap-10 px-4 py-10  md:flex-row md:items-center lg:gap-16 lg:py-10 xl:gap-20 ">
        <motion.div
          className="space-y-7 md:w-5/12 lg:w-5/12 xl:w-4/12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
            Aircraft explorer
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[3.1rem]">
            Explore the anatomy of a modern airliner
          </h1>
          <p className="max-w-xl text-sm text-slate-300 sm:text-base leading-relaxed">
            Hover over each part of the aircraft to see how the cockpit, wings, engines, and
            tail all work together to keep every flight smooth and safe.
          </p>

          <div className="mt-6 rounded-3xl border border-slate-200/80 bg-slate-50/95 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition-transform transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_80px_rgba(15,23,42,0.2)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
              Currently exploring
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {activeSection.label}
            </p>
            <p className="mt-1 text-sm font-medium text-sky-700">
              {activeSection.short}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-xl">
              {activeSection.description}
            </p>
          </div>

          <div className="mt-4 hidden flex-wrap gap-2 text-xs text-slate-500 sm:flex">
            <span className="text-slate-400">Quick jump:</span>
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                onMouseEnter={() => handleActivate(section.id)}
                onFocus={() => handleActivate(section.id)}
                className={`rounded-full border px-3 py-1 transition-colors duration-150 ${activeId === section.id
                  ? "border-blue-500 bg-sky-50 text-sky-700"
                  : "border-slate-200 bg-white text-slate-500 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="md:w-7/12 lg:w-7/12 xl:w-8/12 flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative mx-auto aspect-4/4 w-full max-w-3xl overflow-hidden rounded-[2rem] pr-1">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.16),_transparent_60%)]" />
            <div className="pointer-events-none absolute inset-4 rounded-[1.7rem] opacity-70" />

            <svg
              viewBox="0 0 400 340"
              className="relative z-10 h-full w-full text-slate-600"
            >
              <defs>
                {/* Soft metallic fuselage gradient */}
                <linearGradient id="plane-body" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f9fafb" />
                  <stop offset="45%" stopColor="#e5edf7" />
                  <stop offset="100%" stopColor="#9ca3af" />
                </linearGradient>

                {/* Cockpit glass gradient */}
                <linearGradient id="cockpit-glass" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e0f2fe" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>

                {/* Engine metal */}
                <linearGradient id="engine-metal" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e5e7eb" />
                  <stop offset="100%" stopColor="#4b5563" />
                </linearGradient>

                {/* Hover glow to make active areas feel 3D and lifted */}
                <filter
                  id="hover-glow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="4"
                    floodColor="#38bdf8"
                    floodOpacity="0.75"
                  />
                </filter>
              </defs>

              {/* Top-down aircraft layout based on the reference image */}

              {/* Scale group so the aircraft appears large and centered while staying fully visible */}
              <g transform="translate(-44 20) scale(1.28)">

                {/* Fuselage (center body from nose to tail) */}
                <g
                  role="button"
                  aria-label="Fuselage"
                  className="cursor-pointer"
                  onMouseEnter={() => handleActivate("fuselage")}
                  onClick={() => handleActivate("fuselage")}
                  filter={activeId === "fuselage" ? "url(#hover-glow)" : "none"}
                >
                  {/* main tube – widened to feel closer to a real fuselage */}
                  <rect
                    x={188}
                    y={40}
                    width={24}
                    height={152}
                    rx={12}
                    fill="url(#plane-body)"
                    className="transition-opacity duration-200"
                    opacity={activeId === "fuselage" ? 1 : 0.95}
                  />
                  {/* subtle highlight along centerline */}
                  <rect
                    x={192}
                    y={44}
                    width={16}
                    height={142}
                    rx={8}
                    fill="#ffffff"
                    opacity={activeId === "fuselage" ? 0.65 : 0.4}
                  />
                  {/* soft darker belly tint */}
                  <rect
                    x={191}
                    y={52}
                    width={18}
                    height={132}
                    rx={9}
                    fill="#cbd5f5"
                    opacity={0.3}
                  />
                  {/* window row */}
                  <g
                    aria-hidden="true"
                    className="transition-opacity duration-200"
                    opacity={activeId === "fuselage" || activeId === "cockpit" ? 0.95 : 0.75}
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <rect
                        key={i}
                        x={193}
                        y={70 + i * 13}
                        width={14}
                        height={6}
                        rx={3}
                        fill="#e0f2fe"
                      />
                    ))}
                  </g>
                  {/* forward passenger door outline */}
                  <rect
                    x={190}
                    y={86}
                    width={6}
                    height={20}
                    rx={2.5}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth={1}
                    opacity={0.85}
                  />
                  {/* main cargo door outline */}
                  <rect
                    x={199}
                    y={116}
                    width={10}
                    height={20}
                    rx={3}
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth={1}
                    opacity={0.85}
                  />
                  {/* panel line down the belly */}
                  <rect
                    x={199.5}
                    y={50}
                    width={3}
                    height={132}
                    rx={1.5}
                    fill="#9ca3af"
                    opacity={0.35}
                  />
                  {/* nose gear bay doors */}
                  <rect
                    x={197}
                    y={66}
                    width={5}
                    height={8}
                    rx={1.3}
                    fill="#e5e7eb"
                    opacity={0.9}
                  />
                  {/* main gear bay doors */}
                  <rect
                    x={196}
                    y={129}
                    width={7}
                    height={11}
                    rx={1.7}
                    fill="#e5e7eb"
                    opacity={0.9}
                  />
                  <g
                    aria-hidden="true"
                    stroke="#d1d5db"
                    strokeWidth={0.7}
                    strokeLinecap="round"
                    opacity={activeId === "fuselage" ? 0.9 : 0.35}
                  >
                    <line x1={190} y1={72} x2={212} y2={72} />
                    <line x1={190} y1={94} x2={212} y2={94} />
                    <line x1={190} y1={118} x2={212} y2={118} />
                    <line x1={190} y1={140} x2={212} y2={140} />
                    <line x1={200} y1={44} x2={200} y2={38} />
                  </g>
                  {/* active fuselage tint */}
                  <rect
                    x={188}
                    y={40}
                    width={24}
                    height={152}
                    rx={12}
                    fill="#38bdf8"
                    opacity={activeId === "fuselage" ? 0.18 : 0}
                  />
                </g>

                {/* Nose & cockpit at the front */}
                <g
                  role="button"
                  aria-label="Cockpit"
                  className="cursor-pointer"
                  onMouseEnter={() => handleActivate("cockpit")}
                  onClick={() => handleActivate("cockpit")}
                  filter={activeId === "cockpit" ? "url(#hover-glow)" : "none"}
                >
                  {/* nose cone – wider, smoother bullet shape */}
                  <path
                    d="M188 44 Q 200 18 212 44 L212 62 Q 200 56 188 62 Z"
                    className={`transition-colors duration-200 ${activeId === "cockpit" ? "fill-sky-400" : "fill-slate-500"
                      }`}
                  />
                  {/* cockpit glass – larger wraparound windscreen */}
                  <path
                    d="M191 52 Q 200 40 209 52 L206 60 Q 200 58 194 60 Z"
                    fill="url(#cockpit-glass)"
                    className="transition-opacity duration-200"
                    opacity={activeId === "cockpit" ? 1 : 0.9}
                  />
                  {/* eyebrow / side windows hint */}
                  <g opacity={activeId === "cockpit" ? 0.95 : 0.7}>
                    <rect x={194} y={55} width={4} height={4} rx={1} fill="#0f172a" />
                    <rect x={202} y={55} width={4} height={4} rx={1} fill="#0f172a" />
                  </g>
                  <g
                    aria-hidden="true"
                    stroke="#e5e7eb"
                    strokeWidth={0.8}
                    strokeLinecap="round"
                    opacity={activeId === "cockpit" ? 0.95 : 0.4}
                  >
                    <path d="M192 62 Q 200 60 208 62" fill="none" />
                    <line x1={196} y1={58} x2={196} y2={62} />
                    <line x1={204} y1={58} x2={204} y2={62} />
                  </g>
                </g>

                {/* Main wings */}
                <g
                  role="button"
                  aria-label="Left wing"
                  className="cursor-pointer"
                  onMouseEnter={() => handleActivate("leftWing")}
                  onClick={() => handleActivate("leftWing")}
                  filter={activeId === "leftWing" ? "url(#hover-glow)" : "none"}
                >
                  {/* wing planform */}
                  <polygon
                    points="192,86 60,142 84,160 192,114"
                    className={`transition-colors duration-200 ${activeId === "leftWing" ? "fill-sky-400" : "fill-slate-500"
                      }`}
                  />
                  {/* inboard flap / spoiler section */}
                  <polygon
                    points="176,114 92,144 104,150 176,124"
                    fill="#0f172a"
                    opacity={0.25}
                  />
                  <g
                    aria-hidden="true"
                    stroke="#e5e7eb"
                    strokeWidth={0.8}
                    strokeLinecap="round"
                    opacity={activeId === "leftWing" ? 0.9 : 0.35}
                  >
                    <line x1={188} y1={96} x2={96} y2={136} />
                    <line x1={184} y1={104} x2={92} y2={144} />
                    <line x1={180} y1={112} x2={96} y2={150} />
                  </g>
                  {/* winglet tip */}
                  <polygon
                    points="60,142 52,154 70,150"
                    fill={activeId === "leftWing" ? "#0ea5e9" : "#1f2937"}
                    opacity={0.9}
                  />
                </g>

                <g
                  role="button"
                  aria-label="Right wing"
                  className="cursor-pointer"
                  onMouseEnter={() => handleActivate("rightWing")}
                  onClick={() => handleActivate("rightWing")}
                  filter={activeId === "rightWing" ? "url(#hover-glow)" : "none"}
                >
                  {/* wing planform */}
                  <polygon
                    points="208,86 340,142 316,160 208,114"
                    className={`transition-colors duration-200 ${activeId === "rightWing" ? "fill-sky-400" : "fill-slate-500"
                      }`}
                  />
                  {/* inboard flap / spoiler section */}
                  <polygon
                    points="224,114 308,144 296,150 224,124"
                    fill="#0f172a"
                    opacity={0.25}
                  />
                  <g
                    aria-hidden="true"
                    stroke="#e5e7eb"
                    strokeWidth={0.8}
                    strokeLinecap="round"
                    opacity={activeId === "rightWing" ? 0.9 : 0.35}
                  >
                    <line x1={212} y1={96} x2={304} y2={136} />
                    <line x1={216} y1={104} x2={308} y2={144} />
                    <line x1={220} y1={112} x2={304} y2={150} />
                  </g>
                  {/* winglet tip */}
                  <polygon
                    points="340,142 348,154 330,150"
                    fill={activeId === "rightWing" ? "#0ea5e9" : "#1f2937"}
                    opacity={0.9}
                  />
                </g>

                {/* Engine pairs under each wing */}
                <g
                  role="button"
                  aria-label="Left engine"
                  className="cursor-pointer"
                  onMouseEnter={() => handleActivate("engineLeft")}
                  onClick={() => handleActivate("engineLeft")}
                  filter={activeId === "engineLeft" ? "url(#hover-glow)" : "none"}
                >
                  {/* forward engine pair – closer to viewer */}
                  <g>
                    {/* soft shadow on tarmac */}
                    <ellipse
                      cx={150}
                      cy={151}
                      rx={12}
                      ry={8.5}
                      fill="rgba(15,23,42,0.55)"
                      opacity={0.75}
                    />
                    {/* outer cowling */}
                    <ellipse
                      cx={150}
                      cy={148}
                      rx={11}
                      ry={8.5}
                      fill="url(#engine-metal)"
                      className="transition-opacity duration-200"
                      opacity={activeId === "engineLeft" ? 1 : 0.96}
                    />
                    {/* inner lip */}
                    <ellipse cx={150} cy={148} rx={8} ry={6} fill="#e5e7eb" opacity={0.95} />
                    {/* intake core */}
                    <circle cx={150} cy={148} r={3.2} fill="#020617" opacity={0.9} />
                    {/* fan blades */}
                    <g stroke="#0f172a" strokeWidth={0.9} strokeLinecap="round" opacity={0.9}>
                      <line x1={150} y1={148} x2={150} y2={141.5} />
                      <line x1={150} y1={148} x2={155.2} y2={143.5} />
                      <line x1={150} y1={148} x2={155.2} y2={152.5} />
                      <line x1={150} y1={148} x2={150} y2={154.5} />
                      <line x1={150} y1={148} x2={144.8} y2={152.5} />
                      <line x1={150} y1={148} x2={144.8} y2={143.5} />
                    </g>
                    {/* highlight ring when active */}
                    <ellipse
                      cx={150}
                      cy={148}
                      rx={12.8}
                      ry={9.8}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth={1.6}
                      opacity={activeId === "engineLeft" ? 0.95 : 0}
                    />
                  </g>

                  {/* aft engine pair – slightly smaller and darker */}
                  <g>
                    <ellipse
                      cx={170}
                      cy={159}
                      rx={11}
                      ry={8}
                      fill="rgba(15,23,42,0.55)"
                      opacity={0.7}
                    />
                    <ellipse
                      cx={170}
                      cy={156}
                      rx={10}
                      ry={8}
                      fill="url(#engine-metal)"
                      className="transition-opacity duration-200"
                      opacity={activeId === "engineLeft" ? 0.98 : 0.92}
                    />
                    <ellipse cx={170} cy={156} rx={7.2} ry={5.5} fill="#e5e7eb" opacity={0.9} />
                    <circle cx={170} cy={156} r={2.8} fill="#020617" opacity={0.88} />
                    <g stroke="#0f172a" strokeWidth={0.85} strokeLinecap="round" opacity={0.85}>
                      <line x1={170} y1={156} x2={170} y2={150.4} />
                      <line x1={170} y1={156} x2={174.4} y2={152.4} />
                      <line x1={170} y1={156} x2={174.4} y2={159.6} />
                      <line x1={170} y1={156} x2={170} y2={161.4} />
                      <line x1={170} y1={156} x2={165.6} y2={159.6} />
                      <line x1={170} y1={156} x2={165.6} y2={152.4} />
                    </g>
                    <ellipse
                      cx={170}
                      cy={156}
                      rx={11.5}
                      ry={9.5}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth={1.4}
                      opacity={activeId === "engineLeft" ? 0.85 : 0}
                    />
                  </g>
                  <g
                    aria-hidden="true"
                    stroke="#e5e7eb"
                    strokeWidth={0.7}
                    strokeLinecap="round"
                    opacity={activeId === "engineLeft" ? 0.95 : 0.4}
                  >
                    <ellipse cx={150} cy={148} rx={9.5} ry={7} fill="none" />
                    <ellipse cx={170} cy={156} rx={8.5} ry={6.5} fill="none" />
                  </g>
                </g>

                <g
                  role="button"
                  aria-label="Right engine"
                  className="cursor-pointer"
                  onMouseEnter={() => handleActivate("engineRight")}
                  onClick={() => handleActivate("engineRight")}
                  filter={activeId === "engineRight" ? "url(#hover-glow)" : "none"}
                >
                  {/* forward engine pair */}
                  <g>
                    <ellipse
                      cx={230}
                      cy={151}
                      rx={12}
                      ry={8.5}
                      fill="rgba(15,23,42,0.55)"
                      opacity={0.75}
                    />
                    <ellipse
                      cx={230}
                      cy={148}
                      rx={11}
                      ry={8.5}
                      fill="url(#engine-metal)"
                      className="transition-opacity duration-200"
                      opacity={activeId === "engineRight" ? 1 : 0.96}
                    />
                    <ellipse cx={230} cy={148} rx={8} ry={6} fill="#e5e7eb" opacity={0.95} />
                    <circle cx={230} cy={148} r={3.2} fill="#020617" opacity={0.9} />
                    <g stroke="#0f172a" strokeWidth={0.9} strokeLinecap="round" opacity={0.9}>
                      <line x1={230} y1={148} x2={230} y2={141.5} />
                      <line x1={230} y1={148} x2={235.2} y2={143.5} />
                      <line x1={230} y1={148} x2={235.2} y2={152.5} />
                      <line x1={230} y1={148} x2={230} y2={154.5} />
                      <line x1={230} y1={148} x2={224.8} y2={152.5} />
                      <line x1={230} y1={148} x2={224.8} y2={143.5} />
                    </g>
                    <ellipse
                      cx={230}
                      cy={148}
                      rx={12.8}
                      ry={9.8}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth={1.6}
                      opacity={activeId === "engineRight" ? 0.95 : 0}
                    />
                  </g>

                  {/* aft engine pair */}
                  <g>
                    <ellipse
                      cx={250}
                      cy={159}
                      rx={11}
                      ry={8}
                      fill="rgba(15,23,42,0.55)"
                      opacity={0.7}
                    />
                    <ellipse
                      cx={250}
                      cy={156}
                      rx={10}
                      ry={8}
                      fill="url(#engine-metal)"
                      className="transition-opacity duration-200"
                      opacity={activeId === "engineRight" ? 0.98 : 0.92}
                    />
                    <ellipse cx={250} cy={156} rx={7.2} ry={5.5} fill="#e5e7eb" opacity={0.9} />
                    <circle cx={250} cy={156} r={2.8} fill="#020617" opacity={0.88} />
                    <g stroke="#0f172a" strokeWidth={0.85} strokeLinecap="round" opacity={0.85}>
                      <line x1={250} y1={156} x2={250} y2={150.4} />
                      <line x1={250} y1={156} x2={254.4} y2={152.4} />
                      <line x1={250} y1={156} x2={254.4} y2={159.6} />
                      <line x1={250} y1={156} x2={250} y2={161.4} />
                      <line x1={250} y1={156} x2={245.6} y2={159.6} />
                      <line x1={250} y1={156} x2={245.6} y2={152.4} />
                    </g>
                    <ellipse
                      cx={250}
                      cy={156}
                      rx={11.5}
                      ry={9.5}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth={1.4}
                      opacity={activeId === "engineRight" ? 0.85 : 0}
                    />
                  </g>
                  <g
                    aria-hidden="true"
                    stroke="#e5e7eb"
                    strokeWidth={0.7}
                    strokeLinecap="round"
                    opacity={activeId === "engineRight" ? 0.95 : 0.4}
                  >
                    <ellipse cx={230} cy={148} rx={9.5} ry={7} fill="none" />
                    <ellipse cx={250} cy={156} rx={8.5} ry={6.5} fill="none" />
                  </g>
                </g>

                {/* Tailplane and vertical stabilizer */}
                <g
                  role="button"
                  aria-label="Tail"
                  className="cursor-pointer"
                  onMouseEnter={() => handleActivate("tail")}
                  onClick={() => handleActivate("tail")}
                  filter={activeId === "tail" ? "url(#hover-glow)" : "none"}
                >
                  {/* horizontal stabilizer */}
                  <polygon
                    points="192,172 134,210 192,198"
                    className={`transition-colors duration-200 ${activeId === "tail" ? "fill-sky-400" : "fill-slate-600"
                      }`}
                  />
                  <polygon
                    points="208,172 266,210 208,198"
                    className={`transition-colors duration-200 ${activeId === "tail" ? "fill-sky-400" : "fill-slate-600"
                      }`}
                  />
                  {/* vertical fin seen from above */}
                  <path
                    d="M196 166 L214 146 218 170 L202 190 Z"
                    className={`transition-colors duration-200 ${activeId === "tail" ? "fill-sky-300" : "fill-slate-500"
                      }`}
                  />
                  <g
                    aria-hidden="true"
                    stroke="#e5e7eb"
                    strokeWidth={0.7}
                    strokeLinecap="round"
                    opacity={activeId === "tail" ? 0.9 : 0.35}
                  >
                    <line x1={192} y1={178} x2={172} y2={204} />
                    <line x1={208} y1={178} x2={228} y2={204} />
                    <line x1={204} y1={170} x2={204} y2={186} />
                  </g>
                </g>

                {/* Close scaled aircraft group */}
              </g>
            </svg>


          </div>
        </motion.div>
      </div>
    </section>
  );
}
