"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
    question: "Can my whole training team use one workspace?",
    answer:
      "We are designing shared workspaces so instructors, curriculum designers, and check airmen can collaborate on the same playbooks, scenarios, and audio libraries.",
  },
  {
    id: "how-realistic",
    question: "How realistic are the voices and cockpit sounds?",
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
    question: "Does AirSpeak support multi-crew scenarios?",
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
  isOpen: boolean;
  onToggle: () => void;
};



function FaqAccordionItem({ item, index, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-start gap-5 px-5 py-5 text-left transition-colors hover:bg-slate-50"
        aria-expanded={isOpen}
      >
        {/* Number Badge */}
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${isOpen
            ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
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
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="pt-3 pr-4 text-[15px] leading-relaxed text-slate-600">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
}

export default function FaqContent() {
  const [openId, setOpenId] = useState<string | null>("what-is-airspeak");

  // Split items into two columns
  const midPoint = Math.ceil(FAQ_ITEMS.length / 2);
  const leftItems = FAQ_ITEMS.slice(0, midPoint);
  const rightItems = FAQ_ITEMS.slice(midPoint);

  return (
    <section className="relative w-full overflow-hidden bg-white py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,55,148,0.08),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.03),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="absolute -left-28 top-2 h-52 w-52 text-[#103794]"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="88" fill="currentColor" opacity="0.62" />
          <circle cx="100" cy="100" r="64" fill="currentColor" opacity="0.68" />
          <circle cx="100" cy="100" r="40" fill="currentColor" opacity="0.66" />
        </svg>
        <svg
          className="absolute right-[-60px] top-6 h-52 w-52 text-[#103794]"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="88" fill="currentColor" opacity="0.62" />
          <circle cx="100" cy="100" r="64" fill="currentColor" opacity="0.68" />
          <circle cx="100" cy="100" r="40" fill="currentColor" opacity="0.66" />
        </svg>
        <svg
          className="absolute left-10 top-40 h-4 w-4 text-[#103794]"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="6" fill="currentColor" opacity="0.9" />
        </svg>
        <svg
          className="absolute right-24 top-44 h-5 w-5 text-[#103794]"
          viewBox="0 0 40 40"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="7" fill="currentColor" opacity="0.86" />
        </svg>
        <svg
          className="absolute left-0 top-32 h-40 w-[42%] text-[#103794] opacity-[0.22]"
          viewBox="0 0 400 160"
          aria-hidden="true"
        >
          <path
            d="M-20 115 C 70 80 170 70 295 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="5 7"
          />
          <path
            d="M-35 145 C 55 105 175 95 305 82"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.9"
          />
        </svg>
        <svg
          className="absolute right-0 top-32 h-40 w-[42%] text-[#103794] opacity-[0.22]"
          viewBox="0 0 400 160"
          aria-hidden="true"
        >
          <path
            d="M420 115 C 330 80 230 70 105 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="5 7"
          />
          <path
            d="M435 145 C 345 105 225 95 95 82"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.9"
          />
        </svg>
        <svg
          className="absolute -left-24 bottom-10 h-52 w-52 text-[#103794]"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="88" fill="currentColor" opacity="0.62" />
          <circle cx="100" cy="100" r="64" fill="currentColor" opacity="0.68" />
          <circle cx="100" cy="100" r="40" fill="currentColor" opacity="0.66" />
        </svg>
        <svg
          className="absolute right-[-46px] bottom-6 h-52 w-52 text-[#103794] min-[300px]:max-[550px]:hidden"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="88" fill="currentColor" opacity="0.62" />
          <circle cx="100" cy="100" r="64" fill="currentColor" opacity="0.68" />
          <circle cx="100" cy="100" r="40" fill="currentColor" opacity="0.66" />
        </svg>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            AirSpeak FAQs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Common questions about our aviation audio platform.
          </p>
        </div>

        {/* Central Illustration Area */}

        {/* FAQ Columns */}
        <div className="mt-10 flex items-stretch justify-center gap-4 lg:gap-8">
          <div className="hidden md:flex w-16 lg:w-24 xl:w-32 items-center justify-center">
            <img
              src="/Faq/chatbot-holding-magnifying-glass-ai-assistant-for-intelligent-search.png"
              alt="AI assistant searching FAQs"
              className="h-40 w-auto object-contain drop-shadow-xl lg:h-56"
            />
          </div>

          <div className="relative flex-1 min-w-0 rounded-3xl overflow-hidden border border-slate-200">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 560"
                preserveAspectRatio="none"
                className="h-full w-full"
                aria-hidden="true"
              >
                <rect width="1440" height="560" x="0" y="0" fill="#1e3266" />
                <path
                  d="M1464 560L0 560 L0 340.71Q38.95 307.66, 72 346.61Q120.81 275.42, 192 324.23Q206.04 266.27, 264 280.32Q330.37 226.69, 384 293.06Q441.69 278.75, 456 336.44Q511.55 319.99, 528 375.54Q534.69 310.23, 600 316.92Q617.59 262.51, 672 280.11Q743.29 231.4, 792 302.69Q863.64 254.34, 912 325.98Q931.1 273.08, 984 292.18Q1067.25 255.43, 1104 338.68Q1174.79 289.47, 1224 360.26Q1244.59 260.85, 1344 281.43Q1412.37 229.8, 1464 298.17z"
                  fill="rgba(4, 35, 95, 1)"
                />
                <path
                  d="M1560 560L0 560 L0 378.56Q28.02 334.58, 72 362.6Q123.31 341.91, 144 393.22Q197.09 326.31, 264 379.4Q344.48 339.88, 384 420.36Q410.38 326.74, 504 353.11Q548.24 325.35, 576 369.58Q639.32 360.9, 648 424.23Q648.33 352.56, 720 352.88Q788.83 349.71, 792 418.54Q836.47 343.01, 912 387.48Q959 314.48, 1032 361.47Q1114.77 324.24, 1152 407Q1176.99 360, 1224 384.99Q1265.33 354.31, 1296 395.64Q1318.59 346.23, 1368 368.81Q1422.63 351.44, 1440 406.06Q1494.5 340.56, 1560 395.06z"
                  fill="#25467d"
                />
                <path
                  d="M1464 560L0 560 L0 503.57Q32.75 464.32, 72 497.08Q69.6 422.68, 144 420.28Q227.33 383.61, 264 466.93Q315.38 446.31, 336 497.69Q345.12 434.81, 408 443.92Q433.31 397.24, 480 422.55Q566.32 388.87, 600 475.19Q642.51 397.71, 720 440.22Q764.83 413.05, 792 457.87Q881.48 427.35, 912 516.82Q952.74 437.56, 1032 478.3Q1055.13 429.43, 1104 452.55Q1183.98 412.53, 1224 492.51Q1255.57 404.08, 1344 435.65Q1412.42 384.07, 1464 452.49z"
                  fill="#356cb1"
                />
                <path
                  d="M1464 560L0 560 L0 532.08Q33.15 493.23, 72 526.38Q99.4 481.78, 144 509.19Q196.62 489.81, 216 542.43Q295.16 501.59, 336 580.74Q345.1 517.84, 408 526.93Q481.59 480.51, 528 554.1Q594.19 500.29, 648 566.47Q669.86 468.33, 768 490.19Q835.83 438.01, 888 505.84Q980.43 478.27, 1008 570.71Q1050.02 540.73, 1080 582.75Q1103.74 486.49, 1200 510.23Q1268.11 458.34, 1320 526.44Q1367.76 502.2, 1392 549.96Q1439.13 525.1, 1464 572.23z"
                  fill="rgba(255, 255, 255, 1)"
                />
              </svg>
            </div>

            <div className="relative grid items-start gap-12 px-4 py-10 lg:grid-cols-2 lg:gap-20 lg:px-10">
              {/* Left Column */}
              <div className="flex">
                <div className="relative flex-1 overflow-hidden rounded-2xl bg-white/95 shadow-sm">
                  {leftItems.map((item, idx) => (
                    <FaqAccordionItem
                      key={item.id}
                      item={item}
                      index={idx}
                      isOpen={openId === item.id}
                      onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex">
                <div className="relative flex-1 overflow-hidden rounded-2xl bg-white/95 shadow-sm">
                  {rightItems.map((item, idx) => (
                    <FaqAccordionItem
                      key={item.id}
                      item={item}
                      index={midPoint + idx}
                      isOpen={openId === item.id}
                      onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex w-16 lg:w-24 xl:w-32 items-center justify-center">
            <img
              src="/Faq/chatbot-holding-magnifying-glass-ai-assistant-for-intelligent-search.png"
              alt="AI assistant searching FAQs"
              className="h-40 w-auto object-contain drop-shadow-xl lg:h-56 transform -scale-x-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
