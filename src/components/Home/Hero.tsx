"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen min-h-[400px] overflow-hidden font-montserrat">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/Hero/HomeHero.png"
          alt="Aviation Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
        <div className="max-w-2xl space-y-2 md:space-y-4 pt-20 md:pt-0">
          {/* AVIATION */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-[#003049] uppercase tracking-tighter leading-none"
          >
            AVIATION
          </motion.h1>

          {/* COMMUNICATION */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-md"
          >
            COMMUNICATION
          </motion.h2>

          {/* Powered by AI */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="bg-[#003049] inline-block px-6 py-2 md:px-8 md:py-4 transform -skew-x-6 mt-4"
          >
            <span className="text-xl md:text-2xl lg:text-3xl font-black text-white uppercase transform skew-x-6">
              Powered by AI
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="pt-8"
          >
            <a
              href="/register"
              className="inline-block bg-white text-[#003049] text-lg md:text-xl font-bold py-3 px-8 md:py-4 md:px-10 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 uppercase tracking-wider"
            >
              Train Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
