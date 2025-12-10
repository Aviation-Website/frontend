import { NextRequest, NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const response = await djangoAPI.account.resendActivation(email);

        return NextResponse.json(
            {
                message: response.detail || "Activation email has been sent. Please check your inbox.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Resend activation error:", error);
        
        const errorMessage = error instanceof Error ? error.message : "Failed to resend activation email";
        let statusCode = 400;
        let errorCode = "RESEND_FAILED";
        
        // Check for rate limiting
        if (errorMessage.includes("429") || errorMessage.includes("rate")) {
            statusCode = 429;
            errorCode = "RATE_LIMITED";
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
