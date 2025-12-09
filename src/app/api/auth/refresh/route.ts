/**
 * Refresh Token API Route
 * POST /api/auth/refresh
 */

import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/auth/cookies";

export async function POST() {
    try {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
            return NextResponse.json(
                { error: "Failed to refresh token" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                message: "Token refreshed successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Token refresh error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to refresh token",
            },
            { status: 401 }
        );
    }
}
