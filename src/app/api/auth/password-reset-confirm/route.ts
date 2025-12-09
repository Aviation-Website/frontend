/**
 * Password Reset Confirm API Route
 * POST /api/auth/password-reset-confirm
 */

import { NextRequest, NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { uid, token, new_password, re_new_password } = body;

        // Validate input
        if (!uid || !token || !new_password || !re_new_password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        if (new_password !== re_new_password) {
            return NextResponse.json(
                { error: "Passwords do not match" },
                { status: 400 }
            );
        }

        // Call Django API
        await djangoAPI.auth.confirmPasswordReset({
            uid,
            token,
            new_password,
            re_new_password,
        });

        return NextResponse.json(
            {
                message: "Password reset successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Password reset confirm error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to reset password",
            },
            { status: 400 }
        );
    }
}
