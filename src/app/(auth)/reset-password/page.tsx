import { Suspense } from "react";
import type { Metadata } from "next";
import { ResetPassword } from "@/components/Auth/ResetPassword/ResetPassword";

export const metadata: Metadata = {
    title: "Reset Password | AirSpeak",
    description: "Reset your AirSpeak account password.",
};

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ResetPassword />
        </Suspense>
    );
}
