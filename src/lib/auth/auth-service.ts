/**
 * Authentication Service (Updated)
 * Centralized API methods that call Next.js API routes
 * All authentication logic is handled server-side via API routes
 */

import { post, get, patch } from "@/lib/api/client-api";
import type {
    SignUpData,
    SignInData,
    SignUpResponse,
    SignInResponse,
    User,
    EmailActivationData,
    PasswordResetRequestData,
    PasswordResetConfirmData,
    ProfileUpdateData,
    PasswordChangeData,
    TokenRefreshResponse,
} from "./types";

/**
 * Authentication Service
 */
export const authService = {
    /**
     * Sign Up
     * Register a new user via Next.js API route
     */
    async signUp(data: SignUpData): Promise<SignUpResponse> {
        return post<SignUpResponse>("/auth/signup", data);
    },

    /**
     * Sign In
     * Authenticate user via Next.js API route
     * Cookies are set automatically by the API route
     */
    async signIn(data: SignInData): Promise<SignInResponse> {
        return post<SignInResponse>("/auth/signin", data);
    },

    /**
     * Sign Out
     * Clear authentication cookies via Next.js API route
     */
    async signOut(): Promise<void> {
        return post<void>("/auth/signout");
    },

    /**
     * Refresh Token
     * Get a new access token via Next.js API route
     */
    async refreshToken(): Promise<TokenRefreshResponse> {
        return post<TokenRefreshResponse>("/auth/refresh");
    },

    /**
     * Activate Email
     * Verify user's email address via Next.js API route
     */
    async activateEmail(data: EmailActivationData): Promise<void> {
        return post<void>("/auth/activate", data);
    },

    async resendActivationEmail(email: string): Promise<void> {
        return post<void>("/auth/resend-activation", { email });
    },

    /**
     * Request Password Reset
     * Send password reset email via Next.js API route
     */
    async requestPasswordReset(
        data: PasswordResetRequestData
    ): Promise<void> {
        return post<void>("/auth/password-reset", data);
    },

    /**
     * Confirm Password Reset
     * Reset password with token via Next.js API route
     */
    async confirmPasswordReset(
        data: PasswordResetConfirmData
    ): Promise<void> {
        return post<void>("/auth/password-reset-confirm", data);
    },

    /**
     * Get Current User
     * Get authenticated user's profile via Next.js API route
     */
    async getCurrentUser(): Promise<User> {
        return get<User>("/profile");
    },

    /**
     * Update Profile
     * Update authenticated user's profile via Next.js API route
     */
    async updateProfile(data: ProfileUpdateData): Promise<User> {
        return patch<User>("/profile", data);
    },
};
