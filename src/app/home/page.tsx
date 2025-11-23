import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Home/Hero";
import { PilotPhrases } from "@/components/Home/PilotPhrases";
import { StepsSection } from "@/components/Home/StepsSection/StepsSection";
import { TrainingFeatures } from "@/components/Home/TrainingFeatures";
import { Footer } from "@/components/Footer/Footer";

export default function home() {
  return (
    <main className="smooth-scroll-wrapper">
        <Navbar />
        <Hero />
        <PilotPhrases />
        <StepsSection />
        <TrainingFeatures />
        <Footer />
    </main>
  );
}
