import type { Metadata } from "next";
import { ActivateAccount } from "@/components/Auth/ActivateAccount/ActivateAccount";

export const metadata: Metadata = {
    title: "Activate Account | AirSpeak",
    description: "Activate your AirSpeak account to start training.",
};

export default async function ActivatePage({
    params,
}: {
    params: Promise<{ uid: string; token: string }>;
}) {
    const { uid, token } = await params;
    return <ActivateAccount uid={uid} token={token} />;
}
