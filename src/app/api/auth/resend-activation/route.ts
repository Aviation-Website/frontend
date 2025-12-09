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

        await djangoAPI.account.resendActivation(email);

        return NextResponse.json(
            {
                message: "If an inactive account with this email exists, a new activation email has been sent.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Resend activation error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to resend activation email",
            },
            { status: 400 }
        );
    }
}
