/**
 * Password Reset Confirm API Route
 * POST /api/auth/password-reset-confirm
 */

import { NextRequest, NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";
import { validatePassword } from "@/lib/utils/password-validation";

export async function POST(request: NextRequest) {
    try {
        console.log("[Password Reset Confirm] Received request");
        const body = await request.json();
        const { uid, token, new_password, re_new_password } = body;

        // Validate input
        if (!uid || !token || !new_password || !re_new_password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Validate password strength
        const passwordCheck = validatePassword(new_password);
        if (!passwordCheck.isValid) {
            return NextResponse.json(
                { error: passwordCheck.error },
                { status: 400 }
            );
        }

        if (new_password !== re_new_password) {
            return NextResponse.json(
                { error: "Passwords do not match" },
                { status: 400 }
            );
        }

        console.log("[Password Reset Confirm] Calling Django API");

        // Call Django API
        await djangoAPI.auth.confirmPasswordReset({
            uid,
            token,
            new_password,
            re_new_password,
        });

        console.log("[Password Reset Confirm] Success");

        return NextResponse.json(
            {
                message: "Password reset successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[Password Reset Confirm] Error:", error);
        
        const errorMessage = error instanceof Error ? error.message : "Failed to reset password";
        
        return NextResponse.json(
            {
                error: errorMessage,
            },
            { status: 400 }
        );
    }
}
