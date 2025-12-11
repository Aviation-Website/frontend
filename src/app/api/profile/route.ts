/**
 * User Profile API Route
 * GET /api/profile - Get current user profile
 * PATCH /api/profile - Update user profile
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { djangoAPI } from "@/services/django-api.service";
import { getAccessToken, refreshAccessToken } from "@/lib/auth/cookies";
import { dlog, derror } from "@/lib/debug";

export async function GET() {
    try {
        let accessToken = await getAccessToken();
        let authMethod = "cookie";

        // If no access token in cookies, check NextAuth session (OAuth users)
        if (!accessToken) {
            dlog("[Profile GET] No cookie token, checking NextAuth session");
            const session = await getServerSession(authOptions);
          
            if (session && (session as any)?.djangoAccessToken) {
                accessToken = (session as any).djangoAccessToken;
                authMethod = "nextauth-session";
            } else {
                dlog("[Profile GET] ✗ No NextAuth session token");
            }
        }

        // If still no access token, try to refresh
        if (!accessToken) {
            try {
                accessToken = await refreshAccessToken();
                if (accessToken) {
                    authMethod = "refreshed-cookie";
                    dlog("[Profile GET] ✓ Token refreshed successfully");
                }
            } catch (refreshError) {
                dlog("[Profile GET] ✗ Refresh token failed:", refreshError);
            }
        }

        if (!accessToken) {
           
            return NextResponse.json(
                { 
                    error: "Authentication required", 
                    details: "No access token found in cookies or session",
                    debug: {
                        hasCookie: false,
                        hasNextAuthSession: false,
                        refreshAttempted: true
                    }
                },
                { status: 401 }
            );
        }


        // Call Django API
        let user;
        try {
            user = await djangoAPI.profile.getCurrentUser(accessToken!);
        } catch (err) {
            derror('[Profile GET] Django API error, attempting refresh if possible:', err instanceof Error ? err.message : err);
            // Try refreshing access token
            const refreshed = await refreshAccessToken();
            if (refreshed && refreshed !== accessToken) {
                accessToken = refreshed;
                authMethod = 'refreshed-cookie';
                    dlog('[Profile GET] Retrying with refreshed access token');
                user = await djangoAPI.profile.getCurrentUser(accessToken!);
            } else {
                // If NextAuth session has djangoAccessToken, try that
                const session2 = await getServerSession(authOptions);
                if (session2 && (session2 as any)?.djangoAccessToken) {
                    accessToken = (session2 as any).djangoAccessToken;
                    authMethod = 'nextauth-session';
                    dlog('[Profile GET] Retrying with NextAuth djangoAccessToken');
                    user = await djangoAPI.profile.getCurrentUser(accessToken!);
                } else {
                    throw err;
                }
            }
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
    derror("[Profile GET] ✗ Error occurred:", error);
        
        // Check if it's an authentication error
        if (error instanceof Error && (error.message.includes("401") || error.message.includes("Authentication"))) {
            derror("[Profile GET] ✗ Authentication error from backend");
            return NextResponse.json(
                { error: "Authentication required", details: error.message },
                { status: 401 }
            );
        }
        
    derror("[Profile GET] ✗ General error:");
    derror(error);
        return NextResponse.json(
            {
                error: "Failed to get profile",
                details: error instanceof Error ? error.message : "Unknown error",
                type: error instanceof Error ? "Error" : typeof error
            },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {

        let accessToken = await getAccessToken();
        let authMethod = "cookie";

    dlog("[Profile PATCH] Token from cookie:", accessToken ? `${accessToken.substring(0, 20)}...` : "NULL");

        // If no access token in cookies, check NextAuth session
        if (!accessToken) {
            dlog("[Profile PATCH] No cookie token, checking NextAuth session");
            const session = await getServerSession(authOptions);
            if (session) {
             dlog("[Profile PATCH] Full session data:", JSON.stringify({
                    user: (session as any).user?.email,
                    hasDjangoAccessToken: !!(session as any)?.djangoAccessToken,
                    hasDjangoRefreshToken: !!(session as any)?.djangoRefreshToken,
                    djangoUserId: (session as any)?.djangoUserId,
                    isSuperuser: (session as any)?.isSuperuser,
                    isStaff: (session as any)?.isStaff,
                    provider: (session as any)?.provider,
                }));
            }
            if (session && (session as any)?.djangoAccessToken) {
                accessToken = (session as any).djangoAccessToken;
                authMethod = "nextauth-session";
                dlog("[Profile PATCH] ✓ Using NextAuth Django token:", `${accessToken!.substring(0, 20)}...`);
            } else {
                dlog("[Profile PATCH] ✗ No NextAuth session token");
            }
        } else {
            dlog("[Profile PATCH] ✓ Using cookie token");
        }

        // If still no access token, try to refresh
        if (!accessToken) {
            dlog("[Profile PATCH] No token found, attempting to refresh from refresh_token");
            try {
                accessToken = await refreshAccessToken();
                if (accessToken) {
                    authMethod = "refreshed-cookie";
                }
            } catch (refreshError) {
                dlog("[Profile PATCH] ✗ Refresh token failed:", refreshError);
            }
        }

        if (!accessToken) {
            derror("[Profile PATCH] ✗ CRITICAL: No access token available");
            return NextResponse.json(
                { 
                    error: "Authentication required", 
                    details: "No access token found in cookies or session",
                    debug: {
                        hasCookie: false,
                        hasNextAuthSession: false,
                        refreshAttempted: true
                    }
                },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { first_name, last_name, phone_number } = body;

    
        // Call Django API
        let user;
        try {
            user = await djangoAPI.profile.updateProfile(
                { first_name, last_name, phone_number },
                accessToken!
            );
        } catch (err) {
            const refreshed = await refreshAccessToken();
            if (refreshed && refreshed !== accessToken) {
                accessToken = refreshed;
                authMethod = 'refreshed-cookie';
                dlog('[Profile PATCH] Retrying with refreshed access token');
                user = await djangoAPI.profile.updateProfile(
                    { first_name, last_name, phone_number },
                    accessToken!
                );
            } else {
                const session2 = await getServerSession(authOptions);
                if (session2 && (session2 as any)?.djangoAccessToken) {
                    accessToken = (session2 as any).djangoAccessToken;
                    authMethod = 'nextauth-session';
                    dlog('[Profile PATCH] Retrying with NextAuth djangoAccessToken');
                    user = await djangoAPI.profile.updateProfile(
                        { first_name, last_name, phone_number },
                        accessToken!
                    );
                } else {
                    throw err;
                }
            }
        }

    dlog("[Profile PATCH] ✓ Success - profile updated for:", user.email);
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
    derror("[Profile PATCH] ✗ Error occurred:", error);
        
        if (error instanceof Error) {
            if (error.message.includes("401")) {
                derror("[Profile PATCH] ✗ 401 Unauthorized from backend");
                return NextResponse.json(
                    {
                        error: "Unauthorized",
                        details: "Your authentication token is invalid or expired. Please login again."
                    },
                    { status: 401 }
                );
            }
            
            derror("[Profile PATCH] ✗ Error details:", error.message);
            return NextResponse.json(
                {
                    error: "Failed to update profile",
                    details: error.message
                },
                { status: 400 }
            );
        }
        
        return NextResponse.json(
            {
                error: "Failed to update profile",
                details: "Unknown error occurred"
            },
            { status: 500 }
        );
    }
}
