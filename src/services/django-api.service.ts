/**
 * Django API Service
 * Direct communication with Django backend
 * This should ONLY be used by Next.js API routes, not by client components
 */

const DJANGO_API_URL = process.env.DJANGO_API_URL || "http://localhost:8000";
import { dlog, derror } from "@/lib/debug";

interface DjangoRequestOptions extends RequestInit {
    token?: string;
}

/**
 * Django API Client
 * Makes direct requests to Django backend with proper token handling
 */
class DjangoAPIService {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    /**
     * Make request to Django API
     */
    private async request<T>(
        endpoint: string,
        options: DjangoRequestOptions = {}
    ): Promise<T> {
        const { token, ...fetchOptions } = options;

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(fetchOptions.headers as Record<string, string>),
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const url = `${this.baseURL}${endpoint}`;
        const method = fetchOptions.method || "GET";
        
        const DEBUG = process.env.NEXT_PUBLIC_DEBUG === "true";
        if (DEBUG) {
            dlog(`[Django API] ${method} ${endpoint}`);
            dlog(`[Django API] Full URL: ${url}`);
            dlog(`[Django API] Authorization Header: ${token ? `Bearer ${token.substring(0, 20)}...` : "MISSING"}`);
            dlog(`[Django API] Headers:`, Object.keys(headers));
        }

        const response = await fetch(url, {
            ...fetchOptions,
            headers,
        });

        if (DEBUG) {
            dlog(`[Django API] Response Status: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        const isJson = contentType?.includes("application/json");

        let data: unknown;
        if (isJson) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (DEBUG) {
            dlog(`[Django API] Response Content-Type: ${contentType}`);
            dlog(`[Django API] Response Body:`, data);
        }

        if (!response.ok) {
            const errorMessage =
                typeof data === "object" && data !== null && "detail" in data
                    ? (data as { detail: string }).detail
                    : typeof data === "object" && data !== null && "message" in data
                        ? (data as { message: string }).message
                        : typeof data === "string"
                        ? data
                        : JSON.stringify(data);

            if (DEBUG) {
                derror(`[Django API] ERROR ${response.status}:`);
                derror(`  - Message: ${errorMessage}`);
                derror(`  - Full Response:`, data);
            }

            const error = new Error(errorMessage);
            (error as any).status = response.status;
            (error as any).responseData = data;
            throw error;
        }

        return data as T;
    }

    /**
     * Authentication Endpoints
     */
    auth = {
        /**
         * Register new user
         */
        signUp: (data: {
            email: string;
            username: string;
            password: string;
            re_password: string;
            first_name?: string;
            last_name?: string;
            phone_number?: string;
        }) => {
            return this.request<{
                id: number;
                email: string;
                username: string;
                first_name: string;
                last_name: string;
                phone_number: string;
            }>(
                "/auth/users/",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
        },

        /**
         * Login user and get JWT tokens
         */
        signIn: (data: { email: string; password: string }) => {
            return this.request<{ access: string; refresh: string }>(
                "/auth/jwt/create/",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
        },

        /**
         * Refresh access token
         */
        refreshToken: (refreshToken: string) => {
            return this.request<{ access: string }>(
                "/auth/jwt/refresh/",
                {
                    method: "POST",
                    body: JSON.stringify({ refresh: refreshToken }),
                }
            );
        },

        /**
         * Verify token validity
         */
        verifyToken: (token: string) => {
            return this.request<void>("/auth/jwt/verify/", {
                method: "POST",
                body: JSON.stringify({ token }),
            });
        },

        /**
         * Activate user account
         */
        activateAccount: (data: { uid: string; token: string }) => {
            return this.request<void>("/auth/users/activation/", {
                method: "POST",
                body: JSON.stringify(data),
            });
        },

        /**
         * Request password reset
         */
        requestPasswordReset: (email: string) => {
            return this.request<void>("/auth/users/reset_password/", {
                method: "POST",
                body: JSON.stringify({ email }),
            });
        },

        /**
         * Confirm password reset
         */
        confirmPasswordReset: (data: {
            uid: string;
            token: string;
            new_password: string;
            re_new_password: string;
        }) => {
            return this.request<void>(
                "/auth/users/reset_password_confirm/",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
        },

        /**
         * Change password (authenticated)
         */
        changePassword: (
            data: {
                current_password: string;
                new_password: string;
                re_new_password: string;
            },
            token: string
        ) => {
            return this.request<void>("/auth/users/set_password/", {
                method: "POST",
                body: JSON.stringify(data),
                token,
            });
        },
    };

    /**
     * User Profile Endpoints
     */
    profile = {
        /**
         * Get current user profile
         */
        getCurrentUser: (token: string) => {
            return this.request<{
                id: string;
                email: string;
                first_name?: string;
                last_name?: string;
            }>(
                "/api/account/profile/",
                {
                    method: "GET",
                    token,
                }
            );
        },

        /**
         * Update user profile
         */
        updateProfile: (
            data: { first_name?: string; last_name?: string; phone_number?: string },
            token: string
        ) => {
            return this.request<{
                id: string;
                email: string;
                first_name?: string;
                last_name?: string;
                phone_number?: string;
            }>(
                "/api/account/profile/",
                {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    token,
                }
            );
        },
    };

    /**
     * Account Endpoints
     */
    account = {
        /**
         * Check activation status
         */
        checkActivationStatus: (data: { email: string; password: string }) => {
            return this.request<{
                exists: boolean;
                is_active: boolean;
                password_valid: boolean;
            }>(
                "/auth/users/check-activation/",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
        },

        /**
         * Custom Login
         * Checks user status (exists, verified, password valid) before signing in
         * Returns detailed error codes if anything fails
         */
        customLogin: (data: { email: string; password: string }) => {
            return this.request<{
                detail: string;
                user: any;
            }>(
                "/api/account/login/",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
        },

        /**
         * Resend Activation Email
         * Send activation email again if the account exists but is not active
         */
        resendActivation: (email: string) => {
            return this.request<{ detail: string }>(
                "/api/account/resend-activation/",
                {
                    method: "POST",
                    body: JSON.stringify({ email }),
                }
            );
        },
        
        /**
         * Request password reset
         * Send password reset email (checks if account is verified)
         */
        requestPasswordReset: (email: string) => {
            return this.request<{ detail: string }>(
                "/api/account/password-reset/",
                {
                    method: "POST",
                    body: JSON.stringify({ email }),
                }
            );
        },
    };

    /**
     * Admin Endpoints
     */
    admin = {
        /**
         * List all users
         */
        listUsers: (token: string) => {
            return this.request<Array<{
                id: number;
                email: string;
                username: string;
                first_name: string;
                last_name: string;
                phone_number: string;
                is_active: boolean;
                is_superuser: boolean;
                date_joined: string;
            }>>(
                "/api/account/admin/users/",
                {
                    method: "GET",
                    token,
                }
            );
        },

        /**
         * Update user
         */
        setUserActive: (id: number, is_active: boolean, token: string) => {
            return this.request<{
                id: number;
                email: string;
                username: string;
                is_active: boolean;
                is_superuser: boolean;
            }>(
                `/api/account/admin/users/${id}/`,
                {
                    method: "PATCH",
                    body: JSON.stringify({ is_active }),
                    token,
                }
            );
        },
    };
}

// Export singleton instance
export const djangoAPI = new DjangoAPIService(DJANGO_API_URL);
