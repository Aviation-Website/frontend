import React from "react";
import Stepper, { Step } from "@/components/Stepper";

export default function AboutSteps() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-slate-50 min-h-[460px]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/About/about-hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-slate-950/80" />

      <div className="relative mx-auto flex max-w-[1380px] flex-col gap-10 px-4 py-20 sm:py-24 lg:py-28 md:flex-row md:items-center">
        <div className="space-y-6 md:w-1/2">
          <p className="inline-flex items-center rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 ring-1 ring-blue-500/40">
            About US
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Make every flight With a clear{" "}
            <span className="relative inline-flex text-5xl items-center rounded-2xl bg-[#103794] px-3 py-1 mt-4 text-white shadow-[0_12px_40px_rgba(56,189,248,0.6)]">
              Audio Lines
            </span>
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
            These four phases show how FlightSounds supports pilots with focused, low-distraction
            audio from pre-flight to debrief.
          </p>

        </div>

        <div className="md:w-1/2 md:ml-auto lg:w-5/12">
          <Stepper
            initialStep={1}
            autoPlay
            autoPlayIntervalMs={2000}
            pauseOnInteraction
            stepCircleContainerClassName="bg-slate-950/80 border border-sky-500/40 shadow-[0_20px_60px_rgba(15,23,42,0.9)] backdrop-blur-md"
            stepContainerClassName="justify-between"
            contentClassName="space-y-3 text-left text-slate-100"
            footerClassName=""
            backButtonText="Previous"
            nextButtonText="Next phase"
            backButtonProps={{
              className:
                "text-xs font-medium text-slate-300 transition-colors hover:text-white",
            }}
            nextButtonProps={{
              className:
                "duration-200 flex items-center justify-center rounded-full bg-[#5227FF] py-1.5 px-4 text-xs font-semibold tracking-tight text-white shadow-[0_14px_40px_rgba(82,39,255,0.55)] hover:bg-[#6b3bff] active:bg-[#5227FF]",
            }}
          >
            <Step>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Phase 1 · Pre-flight focus
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Calm audio cues for weather, NOTAMs, and route overview so pilots build a clear
                mental picture before engine start.
              </p>
            </Step>
            <Step>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Phase 2 · Taxi &amp; takeoff
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Short, prioritized prompts that support checklists and runway awareness without
                adding extra cockpit noise.
              </p>
            </Step>
            <Step>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Phase 3 · En-route awareness
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Subtle reminders for fuel, terrain, and airspace so pilots stay ahead of the
                airplane while listening to ATC.
              </p>
            </Step>
            <Step>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                Phase 4 · Approach &amp; debrief
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Final approach cues and quick post-flight highlights so each lesson is captured
                and easy to replay later.
              </p>
            </Step>
          </Stepper>
        </div>
      </div>
    </section>
  );
}
