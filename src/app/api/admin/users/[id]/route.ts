import { NextRequest, NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";
import { getAccessToken, refreshAccessToken } from "@/lib/auth/cookies";

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export async function PATCH(request: NextRequest, { params: paramsPromise }: RouteParams) {
    try {
        // Await the params Promise in Next.js 15+
        const params = await paramsPromise;
        
        const DEBUG = process.env.NEXT_PUBLIC_DEBUG === "true";
        if (DEBUG) {
            console.log(`[ADMIN PATCH] Received params:`, params);
            console.log(`[ADMIN PATCH] params.id type: ${typeof params.id}, value: "${params.id}"`);
        }
        
        const userId = parseInt(params.id, 10);
        
        if (DEBUG) {
            console.log(`[ADMIN PATCH] Parsed userId: ${userId}, isNaN: ${isNaN(userId)}`);
        }
        
        if (isNaN(userId)) {
            console.error(`[ADMIN PATCH] BLOCKED: Invalid user ID - got "${params.id}", expected a number`);
            return NextResponse.json(
                { error: `Invalid user ID: "${params.id}" is not a valid number` },
                { status: 400 }
            );
        }

        let accessToken = await getAccessToken();
        if (DEBUG) {
            console.log(`[ADMIN PATCH] Step 1: Initial token check - ${accessToken ? "Found" : "Not found"}`);
        }

        if (!accessToken) {
            if (DEBUG) {
                console.log(`[ADMIN PATCH] Step 2: Attempting to refresh token`);
            }
            accessToken = await refreshAccessToken();
            if (DEBUG) {
                console.log(`[ADMIN PATCH] Step 2: After refresh - ${accessToken ? "Success" : "Failed"}`);
            }
        }

        if (!accessToken) {
            console.error(`[ADMIN PATCH] BLOCKED: No token available after refresh`);
            return NextResponse.json(
                { error: "Authentication required: No valid token found" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { is_active } = body as { is_active?: boolean };

        if (typeof is_active !== "boolean") {
            console.error(`[ADMIN PATCH] BLOCKED: Invalid payload - is_active is ${typeof is_active}, expected boolean`);
            return NextResponse.json(
                { error: "Invalid payload: is_active must be a boolean" },
                { status: 400 }
            );
        }

        if (DEBUG) {
            console.log(`[ADMIN PATCH] Step 3: Calling Django API - User ${userId}, is_active=${is_active}`);
            console.log(`[ADMIN PATCH] Step 3: Token first 30 chars: ${accessToken.substring(0, 30)}...`);
            console.log(`[ADMIN PATCH] Step 3: Token type check: ${typeof accessToken}`);
        }

        const user = await djangoAPI.admin.setUserActive(userId, is_active, accessToken);
        
        if (DEBUG) {
            console.log(`[ADMIN PATCH] Step 4: Success! Updated user:`, user);
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        if (process.env.NEXT_PUBLIC_DEBUG === "true") {
            console.error("[ADMIN PATCH] EXCEPTION CAUGHT:", error);
        }
        
        // Extract status code from error if available
        const status = (error as any)?.status || 500;
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        
        if (process.env.NEXT_PUBLIC_DEBUG === "true") {
            console.error(`[ADMIN PATCH] ERROR DETAILS:`);
            console.error(`  - Status Code: ${status}`);
            console.error(`  - Error Message: ${errorMessage}`);
            console.error(`  - Error Type: ${error instanceof Error ? "Error" : typeof error}`);
            console.error(`  - Full Error:`, error);
        }
        
        // Provide more helpful error messages to frontend
        let userMessage = errorMessage;
        if (status === 403) {
            userMessage = `Permission Denied (403): ${errorMessage || "You do not have permission to perform this action"}`;
        } else if (status === 401) {
            userMessage = `Unauthorized (401): Your authentication token is invalid or expired`;
        } else if (status === 400) {
            userMessage = `Bad Request (400): ${errorMessage || "Invalid request"}`;
        } else if (status >= 500) {
            userMessage = `Server Error (${status}): ${errorMessage || "An unexpected error occurred"}`;
        }
        
        return NextResponse.json(
            {
                error: userMessage,
                details: {
                    status,
                    originalMessage: errorMessage,
                    timestamp: new Date().toISOString(),
                }
            },
            { status }
        );
    }
}
