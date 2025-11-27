"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};



// Flattened sections for the new layout, or we can keep them grouped.
// The reference image shows a split list. Let's combine them into two columns.
const FAQ_ITEMS: FaqItem[] = [
  {
    id: "what-is-airspeak",
    question: "What is AirSpeak?",
    answer:
      "AirSpeak combines AI voices, cockpit sound design, and text-to-speech tools to help pilots and training organizations build realistic radio calls, briefings, and cockpit flows for simulators and ground training.",
  },
  {
    id: "who-is-it-for",
    question: "Who is AirSpeak designed for?",
    answer:
      "AirSpeak is built for student pilots, rated pilots flying home simulators, flight schools, and training departments that want higher-quality audio for procedures, callouts, and scenario-based training.",
  },
  {
    id: "do-i-need-simulator",
    question: "Do I need a flight simulator to use it?",
    answer:
      "No. You can use AirSpeak on its own to generate scripts, checklists, and audio packs. If you already use a simulator like MSFS, X-Plane, or Prepar3D, you can drop the audio into your existing profiles.",
  },
  {
    id: "trial",
    question: "Is there a free trial or starter plan I can try first?",
    answer:
      "We are planning a starter tier with a limited number of voice generations, saved projects, and basic export options so you can try AirSpeak in your own simulator or training flow before moving to a full paid plan.",
  },
  {
    id: "supported-platforms",
    question: "Which platforms do you support?",
    answer:
      "The web app runs in any modern Chromium-based browser. Exported audio files can be used on Windows, macOS, and tablet devices that support standard WAV or MP3 playback.",
  },
  {
    id: "team-access",
    question: "Can my team use one workspace?",
    answer:
      "We are designing shared workspaces so instructors, curriculum designers, and check airmen can collaborate on the same playbooks, scenarios, and audio libraries.",
  },
  {
    id: "how-realistic",
    question: "How realistic are the voices sounds?",
    answer:
      "Voices are built from aviation-tuned AI models with radio-style EQ, while background layers include engine, cockpit, and ATC ambience so your training sessions sound like a real flight deck.",
  },
  {
    id: "upload-checklists",
    question: "Can I upload my scripts?",
    answer:
      "Yes. You can paste or upload your flows, callouts, and scripts, then assign them to captain, first officer, or ATC voices and export them as reusable audio packs.",
  },
  {
    id: "multi-crew",
    question: "Does AirSpeak support multi scenarios?",
    answer:
      "You can assign different AI personas to each seat, build challenge-and-response flows, and script abnormal checklists so both pilot roles are represented accurately.",
  },
  {
    id: "offline-use",
    question: "Can I use the audio offline?",
    answer:
      "Once you export the audio, it can be played offline inside your simulator, on tablets, or in briefing rooms. Generating new audio requires an internet connection.",
  },
];

type FaqItemProps = {
  item: FaqItem;
  index: number;
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
};



function FaqAccordionItem({ item, index, isOpen, onToggle, isMobile }: FaqItemProps) {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-start gap-5 px-5 py-5 text-left transition-colors hover:bg-slate-50 cursor-pointer"
        aria-expanded={isOpen}
      >
        {/* Number Badge */}
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${isOpen
            ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
            : "bg-sky-100 text-sky-700 group-hover:bg-sky-200"
            }`}
        >
          {index + 1}
        </span>

        <div className="flex-1 pt-1">
          <h3
            className={`text-[17px] font-medium leading-snug transition-colors duration-200 ${isOpen ? "text-sky-600" : "text-slate-700 group-hover:text-sky-600"
              }`}
          >
            {item.question}
          </h3>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={isMobile ? { duration: 0.2, ease: "easeOut" } : { duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="pt-3 pr-4 text-[15px] leading-relaxed text-slate-600">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="ml-3 mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-sky-500">
          <svg
            className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? "-rotate-90" : "rotate-0"}`}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 6L8 10l4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default function FaqContent() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      const width = window.innerWidth;
      setIsMobileWidth(width >= 300 && width <= 700);
    };

    updateIsMobile();

    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Split items into two columns
  const midPoint = Math.ceil(FAQ_ITEMS.length / 2);
  const leftItems = FAQ_ITEMS.slice(0, midPoint);
  const rightItems = FAQ_ITEMS.slice(midPoint);

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,55,148,0.08),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.03),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0">
        {/* Chatbot mascots outside the cloud container (small screens + very wide 2xl and up) */}
        <div className="absolute -bottom-4 left-4 sm:left-10 xl:left-6 xl:bottom-6 2xl:-bottom-6 2xl:left-10 block lg:hidden 2xl:block">
          <Image
            src="/Faq/chatbot.png"
            alt="AI assistant searching FAQs"
            className="h-40 w-auto object-contain drop-shadow-2xl sm:h-48 lg:h-60"
            width={240}
            height={240}
          />
        </div>
        <div className="absolute -top-1 right-4 sm:right-10 xl:right-6 xl:top-4 2xl:-top-4 2xl:right-10 block lg:hidden 2xl:block">
          <Image
            src="/Faq/chatbot.png"
            alt="AI assistant searching FAQs"
            className="h-40 w-auto object-contain drop-shadow-2xl sm:h-48 lg:h-60 transform -scale-x-100"
            width={240}
            height={240}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4">
        {/* Header */}
        <div className="mb-2 pb-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-sky-900 sm:text-4xl">
            AirSpeak FAQs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Common questions about our aviation audio platform.
          </p>
        </div>

        {/* FAQ Columns */}
        <div className="w-full">
          <div className="mx-auto flex max-w-[1400px] items-stretch justify-center lg:justify-between gap-4 lg:gap-8">
            <div className="relative flex-1 min-w-0 rounded-3xl overflow-hidden border border-slate-200 min-h-[520px] sm:min-h-[560px] lg:min-h-[680px]">
              <div className="pointer-events-none absolute inset-0 -z-10">
                <Image
                  src="/Faq/Cloudy.svg"
                  alt=""
                  className="h-full w-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="relative flex h-full items-center justify-center px-4 py-10 lg:px-10">
                {/* Chatbot mascots inside the cloud container on lg/xl screens (approx 1050-1536px) */}
                <div className="pointer-events-none absolute inset-0 hidden lg:block 2xl:hidden">
                  <div className="absolute -bottom-6 left-4 sm:-bottom-8 sm:left-8">
                    <Image
                      src="/Faq/chatbot.png"
                      alt="AI assistant searching FAQs"
                      className="h-40 w-auto object-contain drop-shadow-2xl sm:h-48 lg:h-56"
                      width={240}
                      height={240}
                    />
                  </div>
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-8">
                    <Image
                      src="/Faq/chatbot.png"
                      alt="AI assistant searching FAQs"
                      className="h-40 w-auto object-contain drop-shadow-2xl sm:h-48 lg:h-56 transform -scale-x-100"
                      width={240}
                      height={240}
                    />
                  </div>
                </div>

                <div className="grid w-full max-w-6xl items-start gap-8 lg:grid-cols-2 lg:gap-10">
                  {/* Left Column */}
                  <div className="flex-1">
                    <div className="relative flex-1 overflow-hidden rounded-2xl bg-white/95 shadow-sm">
                      {leftItems.map((item, idx) => (
                        <FaqAccordionItem
                          key={item.id}
                          item={item}
                          index={idx}
                          isMobile={isMobileWidth}
                          isOpen={openId === item.id}
                          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex-1">
                    <div className="relative flex-1 overflow-hidden rounded-2xl bg-white/95 shadow-sm">
                      {rightItems.map((item, idx) => (
                        <FaqAccordionItem
                          key={item.id}
                          item={item}
                          index={midPoint + idx}
                          isMobile={isMobileWidth}
                          isOpen={openId === item.id}
                          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
