import { NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";
import { getAccessToken, refreshAccessToken } from "@/lib/auth/cookies";

export async function GET() {
    try {
        let accessToken = await getAccessToken();

        if (!accessToken) {
            accessToken = await refreshAccessToken();
        }

        if (!accessToken) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const users = await djangoAPI.admin.listUsers(accessToken);

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Admin list users error:", error);
        
        // Check if it's an authentication error
        if (error instanceof Error && error.message.includes("401")) {
            return NextResponse.json(
                {
                    error: "Authentication required",
                },
                { status: 401 }
            );
        }
        
        // Check if it's a permission error
        if (error instanceof Error && error.message.includes("403")) {
            return NextResponse.json(
                {
                    error: "You do not have permission to access this resource",
                },
                { status: 403 }
            );
        }
        
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to load users",
            },
            { status: 500 }
        );
    }
}
