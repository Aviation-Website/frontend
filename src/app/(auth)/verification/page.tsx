import { Suspense } from "react";
import type { Metadata } from "next";
import { Verification } from "@/components/Auth/Verification/Verification";

export const metadata: Metadata = {
  title: "Email Verification | AirSpeak",
  description: "Verify your email address to complete your AirSpeak registration.",
};

export default function VerificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Verification />
    </Suspense>
  );
}
