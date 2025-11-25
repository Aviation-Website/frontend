"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
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
  // Tooltip coordinates (relative to the container or SVG)
  tooltipPosition: { top: string; left: string; align: "left" | "right" | "center" };
  // Modal viewBox to zoom into the specific part (using raw SVG coordinates)
  modalViewBox: string;
};

const SECTIONS: SectionConfig[] = [
  {
    id: "cockpit",
    label: "Cockpit & Flight Deck",
    short: "Control center",
    description:
      "Where pilots command the aircraft, manage navigation, and monitor every system in real time. Features advanced avionics, fly-by-wire controls, and panoramic visibility.",
    tooltipPosition: { top: "26%", left: "53%", align: "center" }, // Above nose
    modalViewBox: "180 40 40 40", // Focused on nose/cockpit
  },
  {
    id: "fuselage",
    label: "Fuselage",
    short: "Passenger cabin",
    description:
      "The main body of the aircraft, housing passengers, crew, avionics, and cargo bays. Pressurized for comfort and built with lightweight composites.",
    tooltipPosition: { top: "49%", left: "53%", align: "center" }, // Center body
    modalViewBox: "180 40 40 160", // Full fuselage length
  },
  {
    id: "leftWing",
    label: "Left Wing",
    short: "Lift generator",
    description:
      "One of the primary lifting surfaces, carefully shaped to keep the aircraft stable in the air. Equipped with flaps, slats, and ailerons for precise control.",
    tooltipPosition: { top: "45%", left: "25%", align: "left" }, // Mid-Left Wing, Box Left
    modalViewBox: "50 80 150 90", // Full left wing
  },
  {
    id: "rightWing",
    label: "Right Wing",
    short: "Lift generator",
    description:
      "Mirrors the left wing to balance lift, fuel storage, and control surfaces. Integral fuel tanks extend range and structural integrity.",
    tooltipPosition: { top: "51%", left: "72%", align: "right" }, // Mid-Right Wing, Box Right
    modalViewBox: "200 80 150 90", // Full right wing
  },
  {
    id: "engineLeft",
    label: "Left Engine",
    short: "Thrust source",
    description:
      "High-bypass turbofan providing efficient thrust for takeoff, climb, and cruise. Designed for fuel efficiency and noise reduction.",
    tooltipPosition: { top: "58%", left: "35%", align: "left" }, // Left Engine, Box Left
    modalViewBox: "130 140 50 30", // Focused on left engine (wider and centered)
  },
  {
    id: "engineRight",
    label: "Right Engine",
    short: "Thrust source",
    description:
      "Pairs with the left engine to deliver balanced power and redundancy. Capable of powering the aircraft safely even if the other engine fails.",
    tooltipPosition: { top: "62%", left: "62%", align: "right" }, // Right Engine, Box Right
    modalViewBox: "220 140 50 30", // Focused on right engine (wider and centered)
  },
  {
    id: "tail",
    label: "Tail & Empennage",
    short: "Stability",
    description:
      "The vertical and horizontal stabilizers keep the aircraft balanced in yaw and pitch. Includes the rudder and elevators for directional control.",
    tooltipPosition: { top: "77%", left: "53%", align: "center" }, // Below tail
    modalViewBox: "170 160 60 60", // Full tail section
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
  const [activeId, setActiveId] = useState<SectionId | null>(null);
  const [selectedId, setSelectedId] = useState<SectionId | null>(null);

  const handleHover = (id: SectionId | null) => {
    setActiveId(id);
  };

  const handleClick = (id: SectionId) => {
    setSelectedId(id);
  };

  const selectedSection = selectedId ? sectionById[selectedId] : null;
  const activeSection = activeId ? sectionById[activeId] : null;

  return (
    <section className="steps-section-container relative overflow-hidden min-h-screen flex flex-col items-center py-20 px-4 lg:px-12 gap-12">
      <div className="steps-background-elements">
        <div className="grid-overlay" />
        <div className="glow-effect" />
      </div>

      {/* Top Header Section: Centered Title & Description */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Explore the anatomy of a modern airliner
          </h1>
          <p className="max-w-2xl text-base text-slate-300 sm:text-lg leading-relaxed">
            Hover over each part of the aircraft to see how the cockpit, wings, engines, and
            tail all work together to keep every flight smooth and safe.
          </p>
        </motion.div>
      </div>

      {/* Main Content Split: Controls (Left) vs Model (Right) */}
      <div className="relative z-10 w-full max-w-[1400px] flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">

        {/* Tooltips Overlay - laptops & larger screens only */}
        <div className="absolute inset-0 pointer-events-none z-[999] hidden lg:block">
          <AnimatePresence>
            {activeId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Align a ghost plane container with the real right column + plane */}
                <div className="relative w-full h-full max-w-[1400px] mx-auto flex justify-end">
                  <div className="relative w-full lg:w-[68%] h-full flex items-center justify-center">
                    <div className="relative aspect-[16/9] w-full scale-125 lg:scale-150">
                      <div
                        className="absolute flex flex-col items-center justify-center"
                        style={{
                          top: sectionById[activeId].tooltipPosition.top,
                          left: sectionById[activeId].tooltipPosition.left,
                          transform: "translate(-50%, -50%)",
                          width: 0,
                          height: 0,
                          overflow: "visible",
                        }}
                      >
                        <svg
                          className="absolute pointer-events-none overflow-visible"
                          style={{
                            top: 0,
                            left: 0,
                            width: "200px",
                            height: "200px",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <path
                            d={(() => {
                              const align = sectionById[activeId].tooltipPosition.align;
                              let anchorX = 100;
                              let anchorY = 112;

                              if (activeId === "leftWing") {
                                anchorX = 140;
                                anchorY = 145;
                              } else if (activeId === "engineLeft") {
                                anchorX = 160;
                                anchorY = 126;
                              } else if (activeId === "cockpit") {
                                anchorX = 125;
                                anchorY = 70;
                              }

                              if (align === "right") {
                                return `M ${anchorX} ${anchorY} C ${anchorX + 24} ${anchorY + 2}, ${anchorX + 40} ${anchorY - 18}, 160 64`;
                              } else if (align === "left") {
                                return `M ${anchorX} ${anchorY} C ${anchorX - 24} ${anchorY + 2}, ${anchorX - 40} ${anchorY - 18}, 40 64`;
                              } else {
                                return `M ${anchorX} ${anchorY} L ${anchorX} 52`;
                              }
                            })()}
                            stroke="white"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            className="drop-shadow-md"
                          />
                          <circle
                            cx={(() => {
                              if (activeId === "leftWing") return 140;
                              if (activeId === "engineLeft") return 160;
                              if (activeId === "cockpit") return 125;
                              return 100;
                            })()}
                            cy={(() => {
                              if (activeId === "leftWing") return 145;
                              if (activeId === "engineLeft") return 125;
                              if (activeId === "cockpit") return 70;
                              return 112;
                            })()}
                            r="4"
                            fill="white"
                          />
                        </svg>

                        <div
                          className={
                            "absolute bg-slate-900/90 border-2 border-white rounded-lg " +
                            "text-white px-5 py-3 " +
                            "shadow-[4px_4px_0px_rgba(255,255,255,0.2)] " +
                            "min-w-[220px] max-w-[300px] " +
                            (sectionById[activeId].tooltipPosition.align === "left"
                              ? "right-[50px] bottom-[30px] "
                              : "") +
                            (sectionById[activeId].tooltipPosition.align === "right"
                              ? "left-[50px] bottom-[30px] "
                              : "") +
                            (sectionById[activeId].tooltipPosition.align === "center"
                              ? "bottom-[50px] "
                              : "")
                          }
                        >
                          <h3 className="font-bold text-lg mb-1 tracking-wide">
                            {sectionById[activeId].label}
                          </h3>
                          <p className="text-xs text-sky-200 uppercase tracking-wider font-semibold">
                            {sectionById[activeId].short}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Left Column: Controls & Info */}
        <div className="w-full lg:w-[32%] flex flex-col gap-8 lg:sticky lg:top-24 lg:mt-18 relative z-20">
          {/* Quick Jump Buttons - MOVED TO TOP */}
          <div className="flex flex-col gap-3 relative z-40 max-w-[360px]">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Quick Jump:</span>
            <div className="flex flex-wrap gap-2">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleClick(section.id)}
                  onMouseEnter={() => handleHover(section.id)}
                  onMouseLeave={() => handleHover(null)}
                  className={`
                    px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border
                    ${activeId === section.id
                      ? "bg-sky-500 text-white border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                      : "bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-700 hover:border-slate-600"}
                  `}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic "Currently Exploring" Card - WHITE THEME */}
          <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 min-h-[180px] transition-all duration-300 shadow-xl">
          <p className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
            Currently Exploring
          </p>
          <AnimatePresence mode="wait">
            {activeSection ? (
              <motion.div
                key={activeSection.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{activeSection.label}</h3>
                <p className="text-sm text-sky-600 font-medium mb-3">{activeSection.short}</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeSection.description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center h-full"
              >
                <p className="text-slate-400 italic">
                  Hover over the aircraft model to view details...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Plane Model Section (Increased Size) */}
        <div className="w-full lg:w-[68%] flex justify-center items-center relative">
          <motion.div
            className="relative aspect-[16/9] w-full scale-125 lg:scale-150 origin-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            
            {/* SVG Plane */}
            <svg
            viewBox="0 0 400 340"
            className="h-full w-full drop-shadow-2xl"
          >
            <defs>
              <linearGradient id="plane-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f9fafb" />
                <stop offset="45%" stopColor="#e5edf7" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>
              <linearGradient id="cockpit-glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <linearGradient id="engine-metal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>
              {/* Stronger Hover Glow */}
              <filter id="hover-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#38bdf8" floodOpacity="1" />
              </filter>
            </defs>

            {/* Increased scale for "wider and bigger" look */}
            <g transform="translate(-44 20) scale(1.28)">
              {/* Fuselage */}
              <g
                role="button"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleHover("fuselage")}
                onMouseLeave={() => handleHover(null)}
                onClick={() => handleClick("fuselage")}
                filter={activeId === "fuselage" ? "url(#hover-glow)" : "none"}
                opacity={activeId && activeId !== "fuselage" ? 0.6 : 1}
              >
                <rect x={188} y={40} width={24} height={152} rx={12} fill="url(#plane-body)" />
                <rect x={192} y={44} width={16} height={142} rx={8} fill="#ffffff" opacity={0.4} />
                <rect x={191} y={52} width={18} height={132} rx={9} fill="#cbd5f5" opacity={0.3} />
                {/* Windows */}
                {Array.from({ length: 14 }).map((_, i) => (
                  <rect key={i} x={193} y={65 + i * 8} width={14} height={4} rx={2} fill="#1e293b" opacity={0.8} />
                ))}
                {/* Doors */}
                <rect x={190} y={86} width={6} height={18} rx={2.5} fill="none" stroke="#94a3b8" strokeWidth={1} opacity={0.85} />
                <rect x={199} y={116} width={10} height={18} rx={3} fill="none" stroke="#9ca3af" strokeWidth={1} opacity={0.85} />
                {/* Panel lines */}
                <rect x={199.5} y={50} width={3} height={132} rx={1.5} fill="#9ca3af" opacity={0.35} />
                <rect x={197} y={66} width={5} height={8} rx={1.3} fill="#e5e7eb" opacity={0.9} />
                <rect x={196} y={129} width={7} height={11} rx={1.7} fill="#e5e7eb" opacity={0.9} />
                <g stroke="#d1d5db" strokeWidth={0.7} strokeLinecap="round" opacity={0.35}>
                  <line x1={190} y1={72} x2={212} y2={72} />
                  <line x1={190} y1={94} x2={212} y2={94} />
                  <line x1={190} y1={118} x2={212} y2={118} />
                  <line x1={190} y1={140} x2={212} y2={140} />
                  <line x1={200} y1={44} x2={200} y2={38} />
                </g>
              </g>

              {/* Cockpit - No scale on hover */}
              <g
                role="button"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleHover("cockpit")}
                onMouseLeave={() => handleHover(null)}
                onClick={() => handleClick("cockpit")}
                filter={activeId === "cockpit" ? "url(#hover-glow)" : "none"}
                opacity={activeId && activeId !== "cockpit" ? 0.6 : 1}
              >
                <path d="M188 44 Q 200 18 212 44 L212 62 Q 200 56 188 62 Z" className="fill-slate-300" />
                {/* Main Windscreen */}
                <path d="M191 52 Q 200 42 209 52 L206 60 Q 200 58 194 60 Z" fill="url(#cockpit-glass)" />
                {/* Side Windows */}
                <path d="M189 54 Q 186 56 189 60 L 192 59 Z" fill="#1e293b" />
                <path d="M211 54 Q 214 56 211 60 L 208 59 Z" fill="#1e293b" />
                {/* Eyebrow Windows */}
                <g opacity={0.8}>
                  <rect x={194} y={48} width={3} height={2} rx={0.5} fill="#1e293b" />
                  <rect x={203} y={48} width={3} height={2} rx={0.5} fill="#1e293b" />
                </g>
                <g stroke="#e5e7eb" strokeWidth={0.8} strokeLinecap="round" opacity={0.4}>
                  <path d="M192 62 Q 200 60 208 62" fill="none" />
                  <line x1={196} y1={58} x2={196} y2={62} />
                  <line x1={204} y1={58} x2={204} y2={62} />
                </g>
              </g>

              {/* Left Wing */}
              <g
                role="button"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleHover("leftWing")}
                onMouseLeave={() => handleHover(null)}
                onClick={() => handleClick("leftWing")}
                filter={activeId === "leftWing" ? "url(#hover-glow)" : "none"}
                opacity={activeId && activeId !== "leftWing" ? 0.6 : 1}
              >
                <polygon points="192,86 60,142 84,160 192,114" className="fill-slate-400" />
                {/* Flaps and Slats */}
                <polygon points="176,114 92,144 104,150 176,124" fill="#1e293b" opacity={0.2} />
                <line x1={60} y1={142} x2={192} y2={86} stroke="#e2e8f0" strokeWidth={1} opacity={0.5} />
                <g stroke="#e5e7eb" strokeWidth={0.8} strokeLinecap="round" opacity={0.35}>
                  <line x1={188} y1={96} x2={96} y2={136} />
                  <line x1={184} y1={104} x2={92} y2={144} />
                  <line x1={180} y1={112} x2={96} y2={150} />
                </g>
                {/* Wingtip */}
                <path d="M60 142 L 52 154 L 70 150 Z" fill="#0ea5e9" opacity={0.9} />
                <circle cx={56} cy={148} r={1} fill="#ef4444" className="animate-pulse" /> {/* Nav Light */}
              </g>

              {/* Right Wing */}
              <g
                role="button"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleHover("rightWing")}
                onMouseLeave={() => handleHover(null)}
                onClick={() => handleClick("rightWing")}
                filter={activeId === "rightWing" ? "url(#hover-glow)" : "none"}
                opacity={activeId && activeId !== "rightWing" ? 0.6 : 1}
              >
                <polygon points="208,86 340,142 316,160 208,114" className="fill-slate-400" />
                {/* Flaps and Slats */}
                <polygon points="224,114 308,144 296,150 224,124" fill="#1e293b" opacity={0.2} />
                <line x1={340} y1={142} x2={208} y2={86} stroke="#e2e8f0" strokeWidth={1} opacity={0.5} />
                <g stroke="#e5e7eb" strokeWidth={0.8} strokeLinecap="round" opacity={0.35}>
                  <line x1={212} y1={96} x2={304} y2={136} />
                  <line x1={216} y1={104} x2={308} y2={144} />
                  <line x1={220} y1={112} x2={304} y2={150} />
                </g>
                {/* Wingtip */}
                <path d="M340 142 L 348 154 L 330 150 Z" fill="#0ea5e9" opacity={0.9} />
                <circle cx={344} cy={148} r={1} fill="#22c55e" className="animate-pulse" /> {/* Nav Light */}
              </g>

              {/* Left Engine */}
              <g
                role="button"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleHover("engineLeft")}
                onMouseLeave={() => handleHover(null)}
                onClick={() => handleClick("engineLeft")}
                filter={activeId === "engineLeft" ? "url(#hover-glow)" : "none"}
                opacity={activeId && activeId !== "engineLeft" ? 0.6 : 1}
              >
                <g>
                  <ellipse cx={150} cy={151} rx={12} ry={8.5} fill="rgba(15,23,42,0.55)" opacity={0.75} />
                  <ellipse cx={150} cy={148} rx={11} ry={8.5} fill="url(#engine-metal)" />
                  <ellipse cx={150} cy={148} rx={8} ry={6} fill="#e5e7eb" opacity={0.95} />
                  <circle cx={150} cy={148} r={3.2} fill="#020617" opacity={0.9} />
                  {/* Fan Blades */}
                  <g stroke="#0f172a" strokeWidth={0.5} opacity={0.8}>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line
                        key={i}
                        x1={150}
                        y1={148}
                        x2={150 + 6 * Math.cos((i * 30 * Math.PI) / 180)}
                        y2={148 + 6 * Math.sin((i * 30 * Math.PI) / 180)}
                      />
                    ))}
                  </g>
                </g>
                <g>
                  <ellipse cx={170} cy={159} rx={11} ry={8} fill="rgba(15,23,42,0.55)" opacity={0.7} />
                  <ellipse cx={170} cy={156} rx={10} ry={8} fill="url(#engine-metal)" />
                  <ellipse cx={170} cy={156} rx={7.2} ry={5.5} fill="#e5e7eb" opacity={0.9} />
                  <circle cx={170} cy={156} r={2.8} fill="#020617" opacity={0.88} />
                </g>
              </g>

              {/* Right Engine */}
              <g
                role="button"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleHover("engineRight")}
                onMouseLeave={() => handleHover(null)}
                onClick={() => handleClick("engineRight")}
                filter={activeId === "engineRight" ? "url(#hover-glow)" : "none"}
                opacity={activeId && activeId !== "engineRight" ? 0.6 : 1}
              >
                <g>
                  <ellipse cx={230} cy={151} rx={12} ry={8.5} fill="rgba(15,23,42,0.55)" opacity={0.75} />
                  <ellipse cx={230} cy={148} rx={11} ry={8.5} fill="url(#engine-metal)" />
                  <ellipse cx={230} cy={148} rx={8} ry={6} fill="#e5e7eb" opacity={0.95} />
                  <circle cx={230} cy={148} r={3.2} fill="#020617" opacity={0.9} />
                  {/* Fan Blades */}
                  <g stroke="#0f172a" strokeWidth={0.5} opacity={0.8}>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line
                        key={i}
                        x1={230}
                        y1={148}
                        x2={230 + 6 * Math.cos((i * 30 * Math.PI) / 180)}
                        y2={148 + 6 * Math.sin((i * 30 * Math.PI) / 180)}
                      />
                    ))}
                  </g>
                </g>
                <g>
                  <ellipse cx={250} cy={159} rx={11} ry={8} fill="rgba(15,23,42,0.55)" opacity={0.7} />
                  <ellipse cx={250} cy={156} rx={10} ry={8} fill="url(#engine-metal)" />
                  <ellipse cx={250} cy={156} rx={7.2} ry={5.5} fill="#e5e7eb" opacity={0.9} />
                  <circle cx={250} cy={156} r={2.8} fill="#020617" opacity={0.88} />
                </g>
              </g>

              {/* Tail - No movement on hover */}
              <g
                role="button"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleHover("tail")}
                onMouseLeave={() => handleHover(null)}
                onClick={() => handleClick("tail")}
                filter={activeId === "tail" ? "url(#hover-glow)" : "none"}
                opacity={activeId && activeId !== "tail" ? 0.6 : 1}
              >
                <polygon points="192,172 134,210 192,198" className="fill-slate-500" />
                <polygon points="208,172 266,210 208,198" className="fill-slate-500" />
                <path d="M196 166 L214 146 218 170 L202 190 Z" className="fill-slate-400" />
                {/* Rudder Line */}
                <line x1={216} y1={150} x2={204} y2={186} stroke="#e2e8f0" strokeWidth={0.5} opacity={0.6} />
                <g stroke="#e5e7eb" strokeWidth={0.7} strokeLinecap="round" opacity={0.35}>
                  <line x1={192} y1={178} x2={172} y2={204} />
                  <line x1={208} y1={178} x2={228} y2={204} />
                  <line x1={204} y1={170} x2={204} y2={186} />
                </g>
              </g>
            </g>
          </svg>
        </motion.div>
      </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedId && selectedSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Left: Rotating Visualization */}
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-950 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1),_transparent_70%)]" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full max-w-[300px] max-h-[300px]"
                >
                  <svg viewBox={selectedSection.modalViewBox} className="w-full h-full drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                    <defs>
                      <linearGradient id="plane-body-modal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f9fafb" />
                        <stop offset="45%" stopColor="#e5edf7" />
                        <stop offset="100%" stopColor="#9ca3af" />
                      </linearGradient>
                      <linearGradient id="cockpit-glass-modal" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#e0f2fe" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                      <linearGradient id="engine-metal-modal" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#e5e7eb" />
                        <stop offset="100%" stopColor="#4b5563" />
                      </linearGradient>
                    </defs>
                    {/* REMOVED TRANSFORM: Using raw coordinates for modal parts to ensure correct viewbox targeting */}
                    <g>
                      {/* Fuselage - Only show if active */}
                      <g style={{ display: selectedId === 'fuselage' ? 'block' : 'none' }}>
                        <rect x={188} y={40} width={24} height={152} rx={12} fill="url(#plane-body-modal)" />
                        <rect x={192} y={44} width={16} height={142} rx={8} fill="#ffffff" opacity={0.4} />
                        <rect x={191} y={52} width={18} height={132} rx={9} fill="#cbd5f5" opacity={0.3} />
                        {Array.from({ length: 14 }).map((_, i) => (
                          <rect key={i} x={193} y={65 + i * 8} width={14} height={4} rx={2} fill="#1e293b" opacity={0.8} />
                        ))}
                        <rect x={190} y={86} width={6} height={18} rx={2.5} fill="none" stroke="#94a3b8" strokeWidth={1} opacity={0.85} />
                        <rect x={199} y={116} width={10} height={18} rx={3} fill="none" stroke="#9ca3af" strokeWidth={1} opacity={0.85} />
                        <rect x={199.5} y={50} width={3} height={132} rx={1.5} fill="#9ca3af" opacity={0.35} />
                        <rect x={197} y={66} width={5} height={8} rx={1.3} fill="#e5e7eb" opacity={0.9} />
                        <rect x={196} y={129} width={7} height={11} rx={1.7} fill="#e5e7eb" opacity={0.9} />
                        <g stroke="#d1d5db" strokeWidth={0.7} strokeLinecap="round" opacity={0.35}>
                          <line x1={190} y1={72} x2={212} y2={72} />
                          <line x1={190} y1={94} x2={212} y2={94} />
                          <line x1={190} y1={118} x2={212} y2={118} />
                          <line x1={190} y1={140} x2={212} y2={140} />
                          <line x1={200} y1={44} x2={200} y2={38} />
                        </g>
                      </g>

                      {/* Cockpit - Only show if active */}
                      <g style={{ display: selectedId === 'cockpit' ? 'block' : 'none' }}>
                        <path d="M188 44 Q 200 18 212 44 L212 62 Q 200 56 188 62 Z" className="fill-slate-300" />
                        <path d="M191 52 Q 200 42 209 52 L206 60 Q 200 58 194 60 Z" fill="url(#cockpit-glass-modal)" />
                        <path d="M189 54 Q 186 56 189 60 L 192 59 Z" fill="#1e293b" />
                        <path d="M211 54 Q 214 56 211 60 L 208 59 Z" fill="#1e293b" />
                        <g opacity={0.8}>
                          <rect x={194} y={48} width={3} height={2} rx={0.5} fill="#1e293b" />
                          <rect x={203} y={48} width={3} height={2} rx={0.5} fill="#1e293b" />
                        </g>
                        <g stroke="#e5e7eb" strokeWidth={0.8} strokeLinecap="round" opacity={0.4}>
                          <path d="M192 62 Q 200 60 208 62" fill="none" />
                          <line x1={196} y1={58} x2={196} y2={62} />
                          <line x1={204} y1={58} x2={204} y2={62} />
                        </g>
                      </g>

                      {/* Left Wing - Only show if active */}
                      <g style={{ display: selectedId === 'leftWing' ? 'block' : 'none' }}>
                        <polygon points="192,86 60,142 84,160 192,114" className="fill-slate-400" />
                        <polygon points="176,114 92,144 104,150 176,124" fill="#1e293b" opacity={0.2} />
                        <line x1={60} y1={142} x2={192} y2={86} stroke="#e2e8f0" strokeWidth={1} opacity={0.5} />
                        <g stroke="#e5e7eb" strokeWidth={0.8} strokeLinecap="round" opacity={0.35}>
                          <line x1={188} y1={96} x2={96} y2={136} />
                          <line x1={184} y1={104} x2={92} y2={144} />
                          <line x1={180} y1={112} x2={96} y2={150} />
                        </g>
                        <path d="M60 142 L 52 154 L 70 150 Z" fill="#0ea5e9" opacity={0.9} />
                        <circle cx={56} cy={148} r={1} fill="#ef4444" />
                      </g>

                      {/* Right Wing - Only show if active */}
                      <g style={{ display: selectedId === 'rightWing' ? 'block' : 'none' }}>
                        <polygon points="208,86 340,142 316,160 208,114" className="fill-slate-400" />
                        <polygon points="224,114 308,144 296,150 224,124" fill="#1e293b" opacity={0.2} />
                        <line x1={340} y1={142} x2={208} y2={86} stroke="#e2e8f0" strokeWidth={1} opacity={0.5} />
                        <g stroke="#e5e7eb" strokeWidth={0.8} strokeLinecap="round" opacity={0.35}>
                          <line x1={212} y1={96} x2={304} y2={136} />
                          <line x1={216} y1={104} x2={308} y2={144} />
                          <line x1={220} y1={112} x2={304} y2={150} />
                        </g>
                        <path d="M340 142 L 348 154 L 330 150 Z" fill="#0ea5e9" opacity={0.9} />
                        <circle cx={344} cy={148} r={1} fill="#22c55e" />
                      </g>

                      {/* Left Engine - Only show if active */}
                      <g style={{ display: selectedId === 'engineLeft' ? 'block' : 'none' }}>
                        <g>
                          <ellipse cx={150} cy={151} rx={12} ry={8.5} fill="rgba(15,23,42,0.55)" opacity={0.75} />
                          <ellipse cx={150} cy={148} rx={11} ry={8.5} fill="url(#engine-metal-modal)" />
                          <ellipse cx={150} cy={148} rx={8} ry={6} fill="#e5e7eb" opacity={0.95} />
                          <circle cx={150} cy={148} r={3.2} fill="#020617" opacity={0.9} />
                          <g stroke="#0f172a" strokeWidth={0.5} opacity={0.8}>
                            {Array.from({ length: 12 }).map((_, i) => (
                              <line key={i} x1={150} y1={148} x2={150 + 6 * Math.cos((i * 30 * Math.PI) / 180)} y2={148 + 6 * Math.sin((i * 30 * Math.PI) / 180)} />
                            ))}
                          </g>
                        </g>
                        <g>
                          <ellipse cx={170} cy={159} rx={11} ry={8} fill="rgba(15,23,42,0.55)" opacity={0.7} />
                          <ellipse cx={170} cy={156} rx={10} ry={8} fill="url(#engine-metal-modal)" />
                          <ellipse cx={170} cy={156} rx={7.2} ry={5.5} fill="#e5e7eb" opacity={0.9} />
                          <circle cx={170} cy={156} r={2.8} fill="#020617" opacity={0.88} />
                        </g>
                      </g>

                      {/* Right Engine - Only show if active */}
                      <g style={{ display: selectedId === 'engineRight' ? 'block' : 'none' }}>
                        <g>
                          <ellipse cx={230} cy={151} rx={12} ry={8.5} fill="rgba(15,23,42,0.55)" opacity={0.75} />
                          <ellipse cx={230} cy={148} rx={11} ry={8.5} fill="url(#engine-metal-modal)" />
                          <ellipse cx={230} cy={148} rx={8} ry={6} fill="#e5e7eb" opacity={0.95} />
                          <circle cx={230} cy={148} r={3.2} fill="#020617" opacity={0.9} />
                          <g stroke="#0f172a" strokeWidth={0.5} opacity={0.8}>
                            {Array.from({ length: 12 }).map((_, i) => (
                              <line key={i} x1={230} y1={148} x2={230 + 6 * Math.cos((i * 30 * Math.PI) / 180)} y2={148 + 6 * Math.sin((i * 30 * Math.PI) / 180)} />
                            ))}
                          </g>
                        </g>
                        <g>
                          <ellipse cx={250} cy={159} rx={11} ry={8} fill="rgba(15,23,42,0.55)" opacity={0.7} />
                          <ellipse cx={250} cy={156} rx={10} ry={8} fill="url(#engine-metal-modal)" />
                          <ellipse cx={250} cy={156} rx={7.2} ry={5.5} fill="#e5e7eb" opacity={0.9} />
                          <circle cx={250} cy={156} r={2.8} fill="#020617" opacity={0.88} />
                        </g>
                      </g>

                      {/* Tail - Only show if active */}
                      <g style={{ display: selectedId === 'tail' ? 'block' : 'none' }}>
                        <polygon points="192,172 134,210 192,198" className="fill-slate-500" />
                        <polygon points="208,172 266,210 208,198" className="fill-slate-500" />
                        <path d="M196 166 L214 146 218 170 L202 190 Z" className="fill-slate-400" />
                        <line x1={216} y1={150} x2={204} y2={186} stroke="#e2e8f0" strokeWidth={0.5} opacity={0.6} />
                        <g stroke="#e5e7eb" strokeWidth={0.7} strokeLinecap="round" opacity={0.35}>
                          <line x1={192} y1={178} x2={172} y2={204} />
                          <line x1={208} y1={178} x2={228} y2={204} />
                          <line x1={204} y1={170} x2={204} y2={186} />
                        </g>
                      </g>
                    </g>
                  </svg>
                </motion.div>
              </div>

              {/* Right: Content */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center text-left">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedSection.label}</h2>
                <p className="text-sky-400 font-medium mb-6 uppercase tracking-wider text-sm">{selectedSection.short}</p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {selectedSection.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
