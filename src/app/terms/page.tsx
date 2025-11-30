import type { Metadata } from "next";
import { Footer, Navbar } from "@/components";
import TermsContent from "@/components/Terms/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | AirSpeak",
  description:
    "Read the AirSpeak Terms of Service outlining your rights and responsibilities when using our aviation communication platform.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <TermsContent />
      <Footer />
    </>
  );
}
