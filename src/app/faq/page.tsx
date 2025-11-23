import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import FaqContent from "@/components/Faq/FaqContent";

export default function FAQPage() {
  return (
    <main className="smooth-scroll-wrapper min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <svg
            className="absolute -left-24 top-10 h-52 w-52 text-sky-900/10"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <circle cx="100" cy="100" r="88" fill="currentColor" />
            <circle cx="100" cy="100" r="64" fill="currentColor" opacity="0.8" />
            <circle cx="100" cy="100" r="40" fill="currentColor" opacity="0.7" />
          </svg>
          <svg
            className="absolute right-[-80px] top-0 h-72 w-72 text-sky-900/10"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <circle cx="100" cy="100" r="88" fill="currentColor" />
            <circle cx="100" cy="100" r="64" fill="currentColor" opacity="0.8" />
            <circle cx="100" cy="100" r="40" fill="currentColor" opacity="0.7" />
          </svg>
          <svg
            className="absolute inset-x-12 top-40 h-40 w-full text-sky-900/10"
            viewBox="0 0 1200 200"
            aria-hidden="true"
          >
            <path
              d="M-40 60 C 260 20 620 100 1240 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M-20 120 C 260 160 660 100 1240 140"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.85"
            />
          </svg>
          <svg
            className="absolute -left-10 bottom-16 h-40 w-40 text-sky-900/10"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path
              d="M0 120 C 70 40 140 40 220 110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <svg
            className="absolute right-0 bottom-10 h-40 w-40 text-sky-900/10"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path
              d="M-20 80 C 40 20 120 40 220 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <FaqContent />
          <Footer />
        </div>
      </div>
    </main>
  );
}
