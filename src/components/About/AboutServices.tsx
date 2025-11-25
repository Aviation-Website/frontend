"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

type Service = {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  details: string;
};

const SERVICES: Service[] = [
  {
    tag: "Text-to-speech",
    title: "Lifelike text-to-speech",
    subtitle: "Turn any checklist or script into natural speech",
    description:
      "Generate clear cockpit calls, ATC readbacks, and training lines with voices tuned for aviation audio.",
    details:
      "Fine-tune pacing, pronunciation, and EQ so every checklist call, safety briefing, and ATIS-style readout sounds like it is coming from a real cockpit.",
  },
  {
    tag: "AI voice models",
    title: "AI model-driven voices",
    subtitle: "Powered by deep learning voice models",
    description:
      "Use AI models to design consistent captain, first officer, and ATC personas that stay on pitch and tone across every scenario.",
    details:
      "Lock in distinct captain, first officer, and controller voices that stay stable across flights, aircraft, and scenarios so your audio always feels like the same crew.",
  },
  {
    tag: "Pilot training",
    title: "Realistic pilot training audio",
    subtitle: "Train with authentic cockpit sounds",
    description:
      "Practice with real pilot voices, text-to-speech callouts, and layered cockpit ambience that mirrors actual flight operations.",
    details:
      "Combine authentic engine sounds, radio chatter, checklist readbacks, and procedural callouts so every training session feels like you're in the left seat during a real flight.",
  },
];

export default function AboutServices() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modalKey, setModalKey] = useState(0);

  const activeService = activeIndex !== null ? SERVICES[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-18 text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,45,75,0.10),transparent_60%),radial-gradient(circle_at_bottom,rgba(0,45,75,0.06),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0">

        <svg
          className="absolute -left-32 top-4 h-56 w-56 text-[#002d4b]"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="88" fill="currentColor" opacity="0.62" />
          <circle cx="100" cy="100" r="64" fill="currentColor" opacity="0.68" />
          <circle cx="100" cy="100" r="40" fill="currentColor" opacity="0.66" />
        </svg>
        <svg
          className="absolute right-[-60px] top-4 h-56 w-56 text-[#002d4b]"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="88" fill="currentColor" opacity="0.62" />
          <circle cx="100" cy="100" r="64" fill="currentColor" opacity="0.68" />
          <circle cx="100" cy="100" r="40" fill="currentColor" opacity="0.66" />
        </svg>
        <svg
          className="absolute right-8 top-32 h-5 w-5 text-[#002d4b]"
          viewBox="0 0 40 40"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="7" fill="currentColor" opacity="0.86" />
        </svg>
        <svg
          className="absolute right-24 top-40 h-3 w-3 text-[#002d4b]"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="6" fill="currentColor" opacity="0.86" />
        </svg>
        <svg
          className="absolute left-0 top-28 h-40 w-[42%] text-[#002d4b] opacity-[0.25]"
          viewBox="0 0 400 160"
          aria-hidden="true"
        >
          <path
            d="M0 120 C 80 90 180 70 320 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M-10 145 C 90 115 190 95 330 85"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.95"
          />
        </svg>
        <svg
          className="absolute right-0 top-28 h-40 w-[42%] text-[#002d4b] opacity-[0.25]"
          viewBox="0 0 400 160"
          aria-hidden="true"
        >
          <path
            d="M400 120 C 320 90 220 70 80 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M410 145 C 310 115 210 95 70 85"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.95"
          />
        </svg>

      </div>
      <div className="relative z-10 mx-auto max-w-[1380px] px-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-blye-950/80 bg-[#002d4b] px-6 py-2.5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
            What we offer
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            One service, three ways to sound real
          </h2>
        </div>

        <div className="mt-6 flex justify-center">
          <Image
            src="/About/Lifelike text-to-speech - visual selection.svg"
            alt="Lifelike text-to-speech visualization"
            className="w-full max-w-2xl"
            width={800}
            height={400}
          />
        </div>

        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3">
          {SERVICES.map((service, index) => {
            const titleSpeed = 14;
            const subtitleSpeed = 12;
            const descriptionSpeed = 10;

            const titleDuration = service.title.length * titleSpeed;
            const subtitleDuration = service.subtitle.length * subtitleSpeed;

            return (
              <article
                key={service.title}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveIndex(index);
                  setModalKey((prev) => prev + 1);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex(index);
                    setModalKey((prev) => prev + 1);
                  }
                }}
                className="relative cursor-pointer overflow-hidden rounded-4xl border border-blue-500/40 bg-[#002d4b] px-7 py-8 text-slate-50 shadow-[0_8px_60px_rgba(15,23,42,0.9)] backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_80px_rgba(15,23,42,1)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-80">
                  <div className="absolute -left-16 -top-20 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.16),transparent_60%)] blur-sm" />
                  <div className="absolute right-[-40px] top-1/3 h-52 w-52 rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.4),transparent_65%)] blur-sm" />
                  <div className="absolute inset-x-8 top-10 h-px bg-linear-to-r from-transparent via-violet-400/70 to-transparent opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/70 via-transparent" />
                  <span className="absolute left-10 top-16 h-1 w-1 rounded-full bg-violet-300 shadow-[0_0_18px_rgba(196,181,253,0.9)]" />
                  <span className="absolute right-16 top-8 h-1 w-1 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.9)]" />
                  <span className="absolute right-10 bottom-16 h-1 w-1 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.9)]" />
                </div>

                <div className="relative">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300/80">
                    {service.tag}
                  </p>
                  <TypewriterText
                    as="h3"
                    className="mt-3 text-xl font-semibold leading-snug"
                    text={service.title}
                    speed={titleSpeed}
                    restartKey={0}
                    delay={0}
                    showCursor={false}
                  />
                  <TypewriterText
                    className="mt-2 text-sm font-medium text-sky-100/80"
                    text={service.subtitle}
                    speed={subtitleSpeed}
                    restartKey={1}
                    delay={titleDuration + 140}
                    showCursor={false}
                  />
                  <TypewriterText
                    className="mt-3 text-sm leading-relaxed text-slate-200/80"
                    text={service.description}
                    speed={descriptionSpeed}
                    restartKey={2}
                    delay={titleDuration + subtitleDuration + 260}
                    showCursor
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {activeService && (
          <ServiceModal
            key={modalKey}
            service={activeService}
            onClose={() => setActiveIndex(null)}
            restartKey={modalKey}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

type ModalProps = {
  service: Service;
  onClose: () => void;
  restartKey: number;
};

function ServiceModal({ service, onClose, restartKey }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm px-4"
      onClick={handleBackdropClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-xl overflow-hidden rounded-4xl border border-blue-500/40 bg-[#002d4b] px-7 py-8 text-slate-50 shadow-[0_8px_60px_rgba(15,23,42,0.9)] backdrop-blur-md"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute -left-16 -top-20 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.16),transparent_60%)] blur-sm" />
          <div className="absolute right-[-40px] top-1/3 h-52 w-52 rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.4),transparent_65%)] blur-sm" />
          <div className="absolute inset-x-8 top-10 h-px bg-linear-to-r from-transparent via-violet-400/70 to-transparent opacity-80" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/70 via-transparent" />
          <span className="absolute left-10 top-16 h-1 w-1 rounded-full bg-violet-300 shadow-[0_0_18px_rgba(196,181,253,0.9)]" />
          <span className="absolute right-16 top-8 h-1 w-1 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.9)]" />
          <span className="absolute right-10 bottom-16 h-1 w-1 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.9)]" />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-white"
          aria-label="Close"
        >
          <span className="text-lg leading-none">×</span>
        </button>

        <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300/80">
          {service.tag}
        </p>
        {(() => {
          const titleSpeed = 22;
          const subtitleSpeed = 20;
          const descriptionSpeed = 18;
          const detailsSpeed = 18;

          const titleDuration = service.title.length * titleSpeed;
          const subtitleDuration = service.subtitle.length * subtitleSpeed;
          const descriptionDuration = service.description.length * descriptionSpeed;

          return (
            <>
              <TypewriterText
                as="h3"
                className="mt-3 text-2xl font-semibold leading-snug"
                text={service.title}
                speed={titleSpeed}
                restartKey={restartKey}
                delay={0}
                showCursor={false}
              />
              <TypewriterText
                className="mt-2 text-sm font-medium text-sky-100/80"
                text={service.subtitle}
                speed={subtitleSpeed}
                restartKey={restartKey + 1}
                delay={titleDuration + 220}
                showCursor={false}
              />
              <TypewriterText
                className="mt-4 text-sm leading-relaxed text-slate-200/90"
                text={service.description}
                speed={descriptionSpeed}
                restartKey={restartKey + 2}
                delay={titleDuration + subtitleDuration + 420}
                showCursor
              />
              <TypewriterText
                className="mt-3 text-sm leading-relaxed text-slate-200/90"
                text={service.details}
                speed={detailsSpeed}
                restartKey={restartKey + 3}
                delay={titleDuration + subtitleDuration + descriptionDuration + 620}
                showCursor={false}
              />
            </>
          );
        })()}
      </motion.div>
    </motion.div>
  );
}

type TypewriterElement = "p" | "h2" | "h3" | "span" | "div";

type TypewriterTextProps = {
  text: string;
  speed?: number;
  restartKey?: number;
  as?: TypewriterElement;
  className?: string;
  showCursor?: boolean;
  delay?: number;
};

function TypewriterText({
  text,
  speed = 22,
  restartKey = 0,
  as: Component = "p",
  className = "",
  showCursor = true,
  delay = 0,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    if (!text) {
      return;
    }

    let intervalId: number | undefined;
    let timeoutId: number | undefined;

    const start = () => {
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (intervalId !== undefined) {
            window.clearInterval(intervalId);
          }
        }
      }, speed);
    };

    if (delay > 0) {
      timeoutId = window.setTimeout(start, delay);
    } else {
      start();
    }

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, speed, restartKey, delay]);

  const isComplete = displayed.length === text.length;

  return (
    <Component className={className}>
      {displayed}
      {showCursor && (
        <span
          className={`ml-1 inline-block h-[1em] w-px translate-y-px bg-sky-300 ${isComplete ? "opacity-40" : "animate-pulse"}`}
        />
      )}
    </Component>
  );
}
