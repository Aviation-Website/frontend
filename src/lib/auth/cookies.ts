/**
 * Cookie Utilities
 * Server-side cookie management with httpOnly, secure flags
 */

import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const COOKIE_OPTIONS: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
};

// IMPORTANT: These must match the backend token lifetimes in Django settings!
// Backend: ACCESS_TOKEN_LIFETIME = 60 minutes, REFRESH_TOKEN_LIFETIME = 7 days
const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 60 minutes (matches Django settings)
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days (matches Django settings)

/**
 * Set authentication tokens in httpOnly cookies
 */
export async function setAuthCookies(
    accessToken: string,
    refreshToken: string
) {
    const cookieStore = await cookies();

    cookieStore.set("access_token", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    cookieStore.set("refresh_token", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: REFRESH_TOKEN_MAX_AGE,
    });
}

/**
 * Get access token from cookie
 */
export async function getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token");
    return accessToken?.value || null;
}

/**
 * Get refresh token from cookie
 */
export async function getRefreshToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token");
    return refreshToken?.value || null;
}

/**
 * Clear authentication cookies
 */
export async function clearAuthCookies() {
    const cookieStore = await cookies();

    cookieStore.set("access_token", "", {
        ...COOKIE_OPTIONS,
        maxAge: 0,
    });

    cookieStore.set("refresh_token", "", {
        ...COOKIE_OPTIONS,
        maxAge: 0,
    });
}

/**
 * Refresh access token using refresh token
 * Returns new access token or null if refresh failed
 */
export async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        return null;
    }

    try {
        const response = await fetch(
            `${process.env.DJANGO_API_URL || "http://localhost:8000"}/auth/jwt/refresh/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
            }
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        
        // Update access token cookie
        const cookieStore = await cookies();
        cookieStore.set("access_token", data.access, {
            ...COOKIE_OPTIONS,
            maxAge: ACCESS_TOKEN_MAX_AGE,
        });

        return data.access;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        return null;
    }
}
