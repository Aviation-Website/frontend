/**
 * Sign In API Route
 * POST /api/auth/signin
 */

import { NextRequest, NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";
import { setAuthCookies } from "@/lib/auth/cookies";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check activation status (optional - only if endpoint exists)
        try {
            const activationStatus = await djangoAPI.account.checkActivationStatus({
                email,
                password,
            });

            if (
                activationStatus.exists &&
                !activationStatus.is_active &&
                activationStatus.password_valid
            ) {
                return NextResponse.json(
                    {
                        error:
                            "Your account exists but is not verified. Please check your email for the activation link or resend it.",
                        code: "ACCOUNT_NOT_VERIFIED",
                    },
                    { status: 403 }
                );
            }
        } catch (error) {
            // Activation check endpoint might not exist - continue with signin
            if (process.env.NEXT_PUBLIC_DEBUG === "true") {
                console.log("Activation check not available, continuing with signin");
            }
        }

        // Sign in user
        const tokens = await djangoAPI.auth.signIn({ email, password });

        // Set httpOnly cookies
        await setAuthCookies(tokens.access, tokens.refresh);

        return NextResponse.json(
            {
                message: "Signed in successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Sign in error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to sign in",
            },
            { status: 401 }
        );
    }
}
