import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import FaqContent from "@/components/Faq/FaqContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | AirSpeak",
  description: "Frequently asked questions about AirSpeak aviation communication training platform and services.",
};

export default function FAQPage() {
  return (
    <main className="smooth-scroll-wrapper min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="relative w-full overflow-hidden">
        <div className="relative z-10">
          <FaqContent />
          <Footer />
        </div>
      </div>
    </main>
  );
}
