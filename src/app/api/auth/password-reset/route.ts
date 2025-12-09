/**
 * Password Reset Request API Route
 * POST /api/auth/password-reset
 */

import { NextRequest, NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validate input
        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Call Django API
        await djangoAPI.auth.requestPasswordReset(email);

        return NextResponse.json(
            {
                message: "Password reset email sent successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Password reset request error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to request password reset",
            },
            { status: 400 }
        );
    }
}
