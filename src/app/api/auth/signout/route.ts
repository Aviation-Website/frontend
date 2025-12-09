/**
 * Sign Out API Route
 * POST /api/auth/signout
 */

import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth/cookies";

export async function POST() {
    try {
        // Clear authentication cookies
        await clearAuthCookies();

        return NextResponse.json(
            {
                message: "Signed out successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Sign out error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to sign out",
            },
            { status: 500 }
        );
    }
}
