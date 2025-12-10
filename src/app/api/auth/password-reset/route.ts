/**
 * Password Reset Request API Route
 * POST /api/auth/password-reset
 */

import { NextRequest, NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";

export async function POST(request: NextRequest) {
    try {
        console.log("[Password Reset] Received request");
        const body = await request.json();
        const { email } = body;

        // Validate input
        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        console.log("[Password Reset] Requesting reset for:", email);

        // Call Django API (our custom endpoint)
        const response = await djangoAPI.account.requestPasswordReset(email);
        
        console.log("[Password Reset] Success");

        return NextResponse.json(
            {
                message: response.detail || "Password reset email sent successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[Password Reset] Error:", error);
        
        const errorObj = error as any;
        const errorMessage = error instanceof Error ? error.message : "Failed to request password reset";
        let errorCode = "RESET_FAILED";
        let statusCode = 400;
        let email = "";

        // Try to extract email from request body if available
        try {
            const body = await request.json();
            email = body.email || "";
        } catch {
            // Ignore JSON parse errors
        }

        // Check for specific error codes from backend
        if (errorObj?.code === "ACCOUNT_NOT_VERIFIED") {
            errorCode = "ACCOUNT_NOT_VERIFIED";
            statusCode = 403;
            email = errorObj.email || email;
        } else if (errorObj?.status === 403 || errorMessage.includes("not verified")) {
            errorCode = "ACCOUNT_NOT_VERIFIED";
            statusCode = 403;
        }

        return NextResponse.json(
            {
                error: errorMessage,
                code: errorCode,
                email: email || undefined,
            },
            { status: statusCode }
        );
    }
}
