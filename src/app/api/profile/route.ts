/**
 * User Profile API Route
 * GET /api/profile - Get current user profile
 * PATCH /api/profile - Update user profile
 */

import { NextRequest, NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";
import { getAccessToken, refreshAccessToken } from "@/lib/auth/cookies";

export async function GET() {
    try {
        let accessToken = await getAccessToken();

        // If no access token, try to refresh
        if (!accessToken) {
            accessToken = await refreshAccessToken();
        }

        if (!accessToken) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        // Call Django API
        const user = await djangoAPI.profile.getCurrentUser(accessToken);

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Get profile error:", error);
        
        // Check if it's an authentication error
        if (error instanceof Error && error.message.includes("401")) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to get profile",
            },
            { status: 401 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        let accessToken = await getAccessToken();

        // If no access token, try to refresh
        if (!accessToken) {
            accessToken = await refreshAccessToken();
        }

        if (!accessToken) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { first_name, last_name, country } = body;

        // Call Django API
        const user = await djangoAPI.profile.updateProfile(
            { first_name, last_name, country },
            accessToken
        );

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Update profile error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to update profile",
            },
            { status: 400 }
        );
    }
}
