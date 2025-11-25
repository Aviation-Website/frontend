import { ContactHero, Footer, Navbar } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | AirSpeak",
  description: "Get in touch with the AirSpeak team. We're here to help with your aviation communication training needs.",
};

export default function ContactUsPage() {
  return <main className="smooth-scroll-wrapper">
    <Navbar />
    <ContactHero />
    <Footer />
  </main>;
}
