import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Home/Hero";
import { PilotPhrases } from "@/components/Home/PilotPhrases";
import { StepsSection } from "@/components/Home/StepsSection/StepsSection";
import { TrainingFeatures } from "@/components/Home/TrainingFeatures";
import { Footer } from "@/components/Footer/Footer";
// import Preloader from "@/components/ui/Preloader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | AirSpeak",
  description: "Master aviation communication with real-world scenarios and interactive training modules designed for professional pilots.",
};

export default function home() {
  return (
    <main className="smooth-scroll-wrapper">
        {/* <Preloader /> */}
        <Navbar />
        <Hero />
        <PilotPhrases />
        <StepsSection />
        <TrainingFeatures />
        <Footer />
    </main>
  );
}
