import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { StepsSection } from "@/components/StepsSection/StepsSection";
import { Footer } from "@/components/Footer/Footer";

export default function home() {
  return (
    <main className="smooth-scroll-wrapper">
        <Navbar />
        <Hero />
        <StepsSection />
        <Footer />
    </main>
  );
}
