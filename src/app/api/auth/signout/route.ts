/**
 * Sign Out API Route
 * POST /api/auth/signout
 * 
 * Clears all authentication cookies and sessions.
 * This is called by the frontend before redirecting to login.
 */

import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth/cookies";
import { dlog, derror } from "@/lib/debug";
import { cookies } from "next/headers";

export async function POST() {
    try {
    dlog("[API/Auth/Signout] Starting sign out - clearing all cookies");
        
        // Clear Django authentication cookies
        await clearAuthCookies();
    dlog("[API/Auth/Signout] ✓ Django cookies cleared (access_token, refresh_token)");
        
        // Also explicitly clear any NextAuth related cookies
        const cookieStore = await cookies();
        
        // Clear NextAuth cookies
        const nextAuthCookiesToClear = [
            'next-auth.session-token',
            'next-auth.callback-url',
            'next-auth.csrf-token',
            '__Secure-next-auth.session-token',
            '__Secure-next-auth.callback-url',
            '__Secure-next-auth.csrf-token',
            '__Host-next-auth.csrf-token',
        ];
        
        for (const cookieName of nextAuthCookiesToClear) {
            cookieStore.set(cookieName, "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 0,
            });
        }
        
    dlog("[API/Auth/Signout] ✓ NextAuth cookies cleared");
        
        return NextResponse.json(
            {
                message: "Signed out successfully",
                details: "All authentication cookies cleared"
            },
            { status: 200 }
        );
    } catch (error) {
    derror("[API/Auth/Signout] Error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to sign out",
            },
            { status: 500 }
        );
    }
}
