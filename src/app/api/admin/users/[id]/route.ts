import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { djangoAPI } from "@/services/django-api.service";
import { getAccessToken, refreshAccessToken } from "@/lib/auth/cookies";
import { jwtVerify } from "jose";
import { dlog, derror } from "@/lib/debug";

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
            dlog(`[ADMIN PATCH] Received params:`, params);
            dlog(`[ADMIN PATCH] params.id type: ${typeof params.id}, value: "${params.id}"`);
        }
        
        const userId = parseInt(params.id, 10);
        
        if (DEBUG) {
            dlog(`[ADMIN PATCH] Parsed userId: ${userId}, isNaN: ${isNaN(userId)}`);
        }
        
        if (isNaN(userId)) {
            derror(`[ADMIN PATCH] BLOCKED: Invalid user ID - got "${params.id}", expected a number`);
            return NextResponse.json(
                { error: `Invalid user ID: "${params.id}" is not a valid number` },
                { status: 400 }
            );
        }

        let accessToken = await getAccessToken();
        let authMethod = "cookie";

        // If no access token in cookies, check NextAuth session (OAuth users)
        if (!accessToken) {
            const session = await getServerSession();
                if (session && (session as any)?.djangoAccessToken) {
                accessToken = (session as any).djangoAccessToken;
                authMethod = "nextauth-session";
                if (DEBUG) dlog("[ADMIN PATCH] Using NextAuth Django token");
            }
        } else {
            if (DEBUG) dlog("[ADMIN PATCH] Using cookie token");
        }

        // If still no access token, try to refresh
        if (!accessToken) {
            accessToken = await refreshAccessToken();
            if (accessToken) {
                authMethod = "refreshed-cookie";
                if (DEBUG) dlog("[ADMIN PATCH] Token refreshed from cookie");
            }
        }

        if (!accessToken) {
            derror(`[ADMIN PATCH] BLOCKED: No token available`);
            return NextResponse.json(
                { error: "Authentication required", details: "Please log in to access admin features" },
                { status: 401 }
            );
        }

        // Check if user is superuser
        const session = await getServerSession();
        let isSuperuser = (session as any)?.isSuperuser || false;

        // Fallback: if NextAuth session not present or not showing superuser, try JWT cookie
        if (!isSuperuser && accessToken) {
            try {
                const secret = new TextEncoder().encode(process.env.DJANGO_SECRET_KEY || 'django-insecure-change-this-in-production-asap-12345');
                const { payload } = await jwtVerify(accessToken, secret, { algorithms: ['HS256'] });
                isSuperuser = !!(payload as any).is_superuser;
                if (process.env.NEXT_PUBLIC_DEBUG === "true") dlog(`[ADMIN PATCH] Superuser from Django JWT: ${isSuperuser}`);
            } catch (err) {
                if (process.env.NEXT_PUBLIC_DEBUG === "true") derror(`[ADMIN PATCH] Failed to verify Django JWT for superuser check:`, err instanceof Error ? err.message : err);
            }
        }

        if (!isSuperuser) {
            derror("[ADMIN PATCH] User is not superuser");
            return NextResponse.json(
                { error: "Unauthorized", details: "Only superusers can modify users" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { is_active } = body as { is_active?: boolean };

        if (typeof is_active !== "boolean") {
            derror(`[ADMIN PATCH] BLOCKED: Invalid payload - is_active is ${typeof is_active}, expected boolean`);
            return NextResponse.json(
                { error: "Invalid payload: is_active must be a boolean" },
                { status: 400 }
            );
        }

            if (DEBUG) {
            dlog(`[ADMIN PATCH] Calling Django API with ${authMethod} - User ${userId}, is_active=${is_active}`);
        }

        // Attempt API call and retry on 401 with refresh token or NextAuth django token
        let user;
        try {
            user = await djangoAPI.admin.setUserActive(userId, is_active, accessToken!);
        } catch (err) {
            if (process.env.NEXT_PUBLIC_DEBUG === "true") derror('[ADMIN PATCH] Django API error, attempting refresh if possible:', err instanceof Error ? err.message : err);
            const refreshed = await refreshAccessToken();
            if (refreshed && refreshed !== accessToken) {
                accessToken = refreshed;
                authMethod = "refreshed-cookie";
                if (DEBUG) dlog('[ADMIN PATCH] Retrying Django API with refreshed access token');
                user = await djangoAPI.admin.setUserActive(userId, is_active, accessToken!);
            } else {
                const session2 = await getServerSession();
                if (session2 && (session2 as any)?.djangoAccessToken && (session2 as any).djangoAccessToken !== accessToken) {
                    accessToken = (session2 as any).djangoAccessToken;
                    authMethod = "nextauth-session";
                    if (DEBUG) dlog('[ADMIN PATCH] Retrying Django API with NextAuth djangoAccessToken');
                    user = await djangoAPI.admin.setUserActive(userId, is_active, accessToken!);
                } else {
                    throw err;
                }
            }
        }
        
        if (DEBUG) {
            dlog(`[ADMIN PATCH] Success! Updated user:`, user);
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        if (process.env.NEXT_PUBLIC_DEBUG === "true") {
            derror("[ADMIN PATCH] EXCEPTION CAUGHT:", error);
        }
        
        // Extract status code from error if available
        const status = (error as any)?.status || 500;
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        
        if (process.env.NEXT_PUBLIC_DEBUG === "true") {
            derror(`[ADMIN PATCH] ERROR DETAILS:`);
            derror(`  - Status Code: ${status}`);
            derror(`  - Error Message: ${errorMessage}`);
            derror(`  - Error Type: ${error instanceof Error ? "Error" : typeof error}`);
            derror(`  - Full Error:`, error);
        }
        
        // Provide more helpful error messages to frontend
        let userMessage = errorMessage;
        if (status === 403) {
            userMessage = `Permission Denied: ${errorMessage || "You do not have permission to perform this action"}`;
        } else if (status === 401) {
            userMessage = `Unauthorized: Your authentication token is invalid or expired`;
        } else if (status === 400) {
            userMessage = `Bad Request: ${errorMessage || "Invalid request"}`;
        } else if (status >= 500) {
            userMessage = `Server Error: ${errorMessage || "An unexpected error occurred"}`;
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
