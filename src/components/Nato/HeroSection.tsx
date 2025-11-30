"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#002d4b]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
        
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-white via-blue-100 to-gray-400 tracking-tight">
            NATO Phonetic Alphabet
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The universal language of the skies. Ensure clarity and precision in
            your radio transmissions with the International Radiotelephony
            Spelling Alphabet.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
