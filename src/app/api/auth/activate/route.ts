/**
 * Activate Account API Route
 * POST /api/auth/activate
 */

import { NextRequest, NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { uid, token } = body;

        // Validate input
        if (!uid || !token) {
            return NextResponse.json(
                { error: "UID and token are required" },
                { status: 400 }
            );
        }

        // Call Django API
        await djangoAPI.auth.activateAccount({ uid, token });

        return NextResponse.json(
            {
                message: "Account activated successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Account activation error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to activate account",
            },
            { status: 400 }
        );
    }
}
