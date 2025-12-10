import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { djangoAPI } from "@/services/django-api.service";
import { getAccessToken, refreshAccessToken } from "@/lib/auth/cookies";
import { jwtVerify } from "jose";
import { dlog, derror } from "@/lib/debug";

export async function GET() {
    try {
        let accessToken = await getAccessToken();
        let authMethod = "cookie";

        // If no access token in cookies, check NextAuth session (OAuth users)
        if (!accessToken) {
            const session = await getServerSession(authOptions);
            if (session && (session as any)?.djangoAccessToken) {
                accessToken = (session as any).djangoAccessToken;
                authMethod = "nextauth-session";
                dlog("[Admin GET] Using NextAuth Django token");
            }
        } else {
            dlog("[Admin GET] Using cookie token");
        }

        // If still no access token, try to refresh
        if (!accessToken) {
            accessToken = await refreshAccessToken();
            if (accessToken) {
                authMethod = "refreshed-cookie";
                dlog("[Admin GET] Token refreshed from cookie");
            }
        }

        if (!accessToken) {
        derror("[Admin GET] No access token available");
            return NextResponse.json(
                { error: "Authentication required", details: "Please log in to access admin features" },
                { status: 401 }
            );
        }

        // Check if user is superuser (this will be validated by Django too)
        const session = await getServerSession(authOptions);
        let isSuperuser = (session as any)?.isSuperuser || false;

        // Fallback: if session doesn't indicate superuser, try verifying JWT cookie
        if (!isSuperuser && accessToken) {
            try {
                const secret = new TextEncoder().encode(process.env.DJANGO_SECRET_KEY || 'django-insecure-change-this-in-production-asap-12345');
                const { payload } = await jwtVerify(accessToken, secret, { algorithms: ['HS256'] });
                isSuperuser = !!(payload as any).is_superuser;
                dlog(`[Admin GET] Superuser from Django JWT: ${isSuperuser}`);
            } catch (err) {
                derror(`[Admin GET] Failed to verify Django JWT for superuser check:`, err instanceof Error ? err.message : err);
                // Do not return here; we will treat as not superuser below
            }
        }

        if (!isSuperuser) {
            derror("[Admin GET] User is not superuser");
            return NextResponse.json(
                { error: "Unauthorized", details: "Only superusers can access admin features" },
                { status: 403 }
            );
        }

    dlog(`[Admin GET] Calling Django API with ${authMethod}`);

        // Try calling the Django API. If token is invalid (401), attempt to refresh token and retry.
        let users;
        try {
            users = await djangoAPI.admin.listUsers(accessToken!);
        } catch (err) {
            derror("[Admin GET] Django API returned error, attempting refresh if possible:", err instanceof Error ? err.message : err);
            // If we have a refresh token cookie, try to refresh
            const refreshed = await refreshAccessToken();
            if (refreshed && refreshed !== accessToken) {
                accessToken = refreshed;
                authMethod = "refreshed-cookie";
                dlog('[Admin GET] Retrying Django API with refreshed access token');
                users = await djangoAPI.admin.listUsers(accessToken!);
            } else {
                // As a last resort, if we have NextAuth session Django token, try that
                const session2 = await getServerSession(authOptions);
                if (session2 && (session2 as any)?.djangoAccessToken && (session2 as any).djangoAccessToken !== accessToken) {
                    accessToken = (session2 as any).djangoAccessToken;
                    authMethod = "nextauth-session";
                    dlog('[Admin GET] Retrying Django API with NextAuth djangoAccessToken');
                    users = await djangoAPI.admin.listUsers(accessToken!);
                } else {
                    throw err;
                }
            }
        }

    dlog("[Admin GET] Success: Retrieved user list");
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
    derror("[Admin GET] Error:", error);
        
        // Check if it's an authentication error
        if (error instanceof Error && error.message.includes("401")) {
            return NextResponse.json(
                { error: "Authentication required", details: error.message },
                { status: 401 }
            );
        }
        
        // Check if it's a permission error
        if (error instanceof Error && error.message.includes("403")) {
            return NextResponse.json(
                { error: "Unauthorized", details: "You do not have permission to access this resource" },
                { status: 403 }
            );
        }
        
        return NextResponse.json(
            {
                error: "Failed to load users",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}
