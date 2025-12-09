import type { Metadata } from "next";
import { ResetPassword } from "@/components/Auth/ResetPassword/ResetPassword";

export const metadata: Metadata = {
    title: "Reset Password | AirSpeak",
    description: "Reset your AirSpeak account password.",
};

export default async function ResetPasswordConfirmPage({
    params,
}: {
    params: Promise<{ uid: string; token: string }>;
}) {
    const { uid, token } = await params;
    return <ResetPassword uid={uid} token={token} />;
}
