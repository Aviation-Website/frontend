import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { Footer } from "@/components/Footer/Footer";

export default function home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
