/**
 * Sign In API Route
 * POST /api/auth/signin
 */

import { NextRequest, NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";
import { setAuthCookies } from "@/lib/auth/cookies";
import { dlog, derror } from "@/lib/debug";

export async function POST(request: NextRequest) {
    try {
    dlog("[SignIn API] Received sign-in request");
        const body = await request.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // First, call custom login endpoint to check user status
    dlog("[SignIn API] Calling custom login endpoint for:", email);
        let loginResponse;
        try {
            loginResponse = await djangoAPI.account.customLogin({ email, password });
            dlog("[SignIn API] Custom login check passed:", loginResponse);
        } catch (error: any) {
            // Custom login endpoint returned an error with detailed info
            derror("[SignIn API] Custom login check failed:", error);
            
            const errorData = error.responseData || {};
            const errorCode = errorData.code || "SIGNIN_FAILED";
            const errorEmail = errorData.email || email;
            const errorDetail = errorData.detail || error.message || "Sign in failed";

            // Return detailed error response
            return NextResponse.json(
                {
                    error: errorDetail,
                    code: errorCode,
                    email: errorEmail,
                },
                { status: error.status || 401 }
            );
        }

        // Login check passed, now attempt to get JWT tokens
    dlog("[SignIn API] Attempting Django JWT sign-in for:", email);
        const tokens = await djangoAPI.auth.signIn({ email, password });
    dlog("[SignIn API] Received tokens (access & refresh):", !!tokens?.access, !!tokens?.refresh);

        // Set httpOnly cookies
        await setAuthCookies(tokens.access, tokens.refresh);

        return NextResponse.json(
            {
                message: "Signed in successfully",
            },
            { status: 200 }
        );
    } catch (error) {
    derror("Sign in error:", error);
        
        const errorMessage = error instanceof Error ? error.message : "Failed to sign in";
        let errorCode = "SIGNIN_FAILED";
        let statusCode = 401;

        // Determine error code based on error message or status
        const errorObj = error as any;
        if (errorObj?.status === 429) {
            errorCode = "RATE_LIMITED";
            statusCode = 429;
        } else if (errorMessage.includes("credentials") || errorMessage.includes("invalid")) {
            errorCode = "INVALID_CREDENTIALS";
        }

        return NextResponse.json(
            {
                error: errorMessage,
                code: errorCode,
            },
            { status: statusCode }
        );
    }
}
