"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { sampleArcs } from "./Arc";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

const globeConfig = {
  pointSize: 4,
  globeColor: "#092d79",
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
    <section className="relative min-h-screen w-full bg-white flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-12 pt-10 pb-8 overflow-hidden">
      {/* Background */}

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* World Map SVG Overlay */}
      <div
        className="absolute inset-0 w-full h-full z-0 opacity-[0.15]"
        style={{
          backgroundImage: "url('/Contact/World Map.svg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      {/* Top Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-7xl mx-auto mb-6 text-center"
      >

        <h1 className="text-4xl md:text-5xl font-bold text-[#152351] mb-4 tracking-tight">
          Contact Our Team
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
          We&apos;re here to help with your flight simulation audio needs. Fill out the form and we&apos;ll get back to you.
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start relative z-10">
        {/* Left column - Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center lg:items-start w-full max-w-2xl"
        >
          <div className="w-full bg-white/95 p-6 md:p-7 rounded-3xl shadow-sm border border-blue-50 z-20 relative overflow-hidden">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#3271b1]"></div>

            <h2 className="text-2xl font-bold text-[#152351] mb-5 relative">
              Send us a Message
            </h2>
            <ContactForm />
          </div>

          {/* Mobile Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-xs aspect-square relative lg:hidden mx-auto mt-8"
          >
            <World globeConfig={globeConfig} data={sampleArcs} />
          </motion.div>
        </motion.div>

        {/* Right column - Globe (Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:flex w-full flex-col items-center lg:items-end space-y-8 sticky top-24"
        >
          <div className="w-full max-w-md lg:max-w-xl aspect-square relative cursor-grab">
            <World globeConfig={globeConfig} data={sampleArcs} />
          </div>
        </motion.div>
      </div>

      {/* Enhanced Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 w-full max-w-7xl mx-auto mt-8 mb-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { icon: MessageSquare, label: "Support", desc: "Technical help", gradient: "from-blue-500 to-sky-500" },
            { icon: Mail, label: "Sales", desc: "License inquiries", gradient: "from-sky-500 to-cyan-500" },
            { icon: Phone, label: "General", desc: "General questions", gradient: "from-cyan-500 to-blue-500" },
            { icon: MapPin, label: "Visit Us", desc: "Office HQ", gradient: "from-blue-600 to-sky-600" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative flex flex-col items-center p-6 rounded-2xl bg-[#1e4b79] border border-slate-700 hover:border-sky-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-sky-500/20 overflow-hidden"
            >
              <div className={`relative h-14 w-14 rounded-full bg-[#1a2b63] flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-all duration-300 group-hover:bg-sky-500/20 group-hover:text-sky-300`}>
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-white text-lg mb-1 relative">{item.label}</h3>
              <p className="text-sm text-slate-400 relative">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
