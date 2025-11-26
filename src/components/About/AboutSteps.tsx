"use client";

import React from "react";
import { motion } from "motion/react";
import Stepper, { Step } from "@/components/Stepper";

export default function AboutSteps() {
  return (
    <motion.section
      className="relative w-full overflow-hidden bg-slate-950 text-slate-50 min-h-[460px] font-montserrat"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/About/about-hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-[#002d4b]/90" />

      <div className="relative mx-auto flex max-w-[1380px] flex-col gap-10 px-4 py-20 sm:py-24 lg:py-28 md:flex-row md:items-center ">
        <div className="space-y-6 md:w-1/2">
          <motion.p
            className="inline-flex items-center rounded-full bg-[#002d4b] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white ring-1 ring-white"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            About US
          </motion.p>
          <motion.h1
            className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Make every flight With a clear{" "}
            <span className="relative inline-flex text-5xl items-center rounded-2xl bg-white px-3 py-1 mt-4 text-[#002d4b] shadow-[0_12px_40px_rgba(56,189,248,0.6)] font-black ">
              Audio Lines
            </span>
          </motion.h1>
          <motion.p
            className="max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            These four phases show how FlightSounds supports pilots with focused, low-distraction
            audio from pre-flight to debrief.
          </motion.p>

        </div>

        <motion.div
          className="md:w-1/2 md:ml-auto lg:w-5/12"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <Stepper
            initialStep={1}
            autoPlay
            autoPlayIntervalMs={2000}
            pauseOnInteraction
            stepCircleContainerClassName="bg-slate-950/60 border border-blue-500/40 shadow-[0_20px_60px_rgba(15,23,42,0.9)] backdrop-blur-md"
            stepContainerClassName="justify-between"
            contentClassName="space-y-3 text-left text-slate-100"
            footerClassName=""
            backButtonText="Previous"
            nextButtonText="Next phase"
            backButtonProps={{
              className:
                "text-xs font-medium text-slate-300 transition-colors hover:text-white",
            }}
          >
            <Step>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
                Phase 1 · Pre-flight focus
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Calm audio cues for weather, NOTAMs, and route overview so pilots build a clear
                mental picture before engine start.
              </p>
            </Step>
            <Step>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
                Phase 2 · Taxi &amp; takeoff
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Short, prioritized prompts that support checklists and runway awareness without
                adding extra cockpit noise.
              </p>
            </Step>
            <Step>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
                Phase 3 · En-route awareness
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Subtle reminders for fuel, terrain, and airspace so pilots stay ahead of the
                airplane while listening to ATC.
              </p>
            </Step>
            <Step>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
                Phase 4 · Approach &amp; debrief
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Final approach cues and quick post-flight highlights so each lesson is captured
                and easy to replay later.
              </p>
            </Step>
          </Stepper>
        </motion.div>
      </div>
    </motion.section>
  );
}
