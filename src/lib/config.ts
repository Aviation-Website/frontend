/**
 * Application Configuration
 * Central configuration for API URLs, timeouts, and app settings
 */

/**
 * API Base URL
 * Default to localhost for development if not set
 */
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

/**
 * App URL
 * Used for redirects and canonical URLs
 */
export const APP_URL =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        SIGN_UP: "/auth/users/",
        SIGN_IN: "/auth/jwt/create/",
        REFRESH: "/auth/jwt/refresh/",
        VERIFY: "/auth/jwt/verify/",
        ACTIVATE: "/auth/users/activation/",
        PASSWORD_RESET: "/auth/users/reset_password/",
        PASSWORD_RESET_CONFIRM: "/auth/users/reset_password_confirm/",
        SET_PASSWORD: "/auth/users/set_password/",
    },
    // User Profile
    PROFILE: {
        ME: "/api/account/profile/",
    },
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
} as const;

/**
 * Token Configuration
 */
export const TOKEN_CONFIG = {
    ACCESS_TOKEN_EXPIRY: 15 * 60 * 1000, // 15 minutes in milliseconds
    REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    REFRESH_THRESHOLD: 5 * 60 * 1000, // Refresh token when 5 minutes remaining
} as const;

/**
 * Cookie Configuration
 */
export const COOKIE_CONFIG = {
    ACCESS_TOKEN_NAME: "access_token",
    REFRESH_TOKEN_NAME: "refresh_token",
    MAX_AGE: {
        ACCESS: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY / 1000, // in seconds
        REFRESH: TOKEN_CONFIG.REFRESH_TOKEN_EXPIRY / 1000, // in seconds
    },
    OPTIONS: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
    },
} as const;

/**
 * Route Paths
 */
export const ROUTES = {
    HOME: "/home",
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forget-password",
    RESET_PASSWORD: "/reset-password",
    VERIFICATION: "/verification",
    ACCOUNT: "/account",
} as const;

/**
 * Protected Routes
 * Routes that require authentication
 */
export const PROTECTED_ROUTES = [ROUTES.ACCOUNT] as const;

/**
 * Public Routes
 * Routes accessible without authentication
 */
export const PUBLIC_ROUTES = [
    ROUTES.HOME,
    ROUTES.LOGIN,
    ROUTES.SIGNUP,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
    ROUTES.VERIFICATION,
] as const;
