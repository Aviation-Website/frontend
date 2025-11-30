import type { Metadata } from "next";
import { Footer, Navbar } from "@/components";
import PrivacyContent from "@/components/Privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | AirSpeak",
  description:
    "Learn how AirSpeak collects, uses, and protects your personal data across our aviation communication training experiences.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <PrivacyContent />
      <Footer />
    </>
  );
}
