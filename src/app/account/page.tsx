import { Navbar } from "@/components";
import { Account } from "@/components/Account/Account";
import { RequireAuth } from "@/components/Auth/RequireAuth";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account Settings | AirSpeak",
    description: "Manage your AirSpeak account settings and profile information.",
};

export default function AccountPage() {
    return (
        <RequireAuth>
            <Account />
        </RequireAuth>
    );
}
