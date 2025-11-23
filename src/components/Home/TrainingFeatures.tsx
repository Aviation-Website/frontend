"use client";

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Plane, Mic2, BarChart3, Users, MessageSquare } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    title: "Beginner-Friendly Sets",
    description: "Short, easy-to-master phrase sets designed specifically for student pilots starting their journey.",
    icon: MessageSquare
  },
  {
    title: "A220 Cockpit Calls",
    description: "Specialized training for A220 systems and flows, featuring exact manufacturer phraseology.",
    icon: Plane
  },
  {
    title: "Pro Voice-Over Scripts",
    description: "High-quality voice recordings from professional controllers and pilots for realistic ear training.",
    icon: Mic2
  },
  {
    title: "Level-Based Training",
    description: "Structured progression system that advances from basic calls to complex emergency scenarios.",
    icon: BarChart3
  },
  {
    title: "Multiplayer Roleplay",
    description: "Connect with other pilots or instructors for live, interactive ATC simulation sessions.",
    icon: Users
  }
];

export const TrainingFeatures = () => {
  return (
    <section className="py-24 bg-white text-[#003049] overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          {/* Floating Plane Decoration */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              x: [0, 10, 0],
              rotate: [-10, 0, -10]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-12 right-10 md:-right-4 text-blue-200 opacity-60 hidden md:block"
          >
            <Plane className="w-16 h-16" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#003049] font-semibold text-sm mb-6"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Comprehensive Curriculum</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-montserrat mb-6"
          >
            Everything You Need to <br />
            <span className="text-blue-600">Sound Like a Pro</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            From your first radio check to complex instrument approaches, we cover every aspect of aviation communication.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Features List */}
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#003049] text-white flex items-center justify-center shrink-0 shadow-lg">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-montserrat mb-1">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-4xl aspect-square">
              {/* Decorative circle behind image */}
              <div className="absolute inset-0 bg-blue-50 rounded-full scale-90 -z-10" />
              
              <Image
                src="/Hero/Shape2.png"
                alt="Aviation Training Features"
                fill
                className="object-contain drop-shadow-2xl bg-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
