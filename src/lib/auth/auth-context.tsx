"use client";

/**
 * Authentication Context
 * Manages global authentication state
 * Integrates with both NextAuth (for OAuth) and Django (for email/password)
 */

import React, {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { authService } from "./auth-service";
import { dlog, derror, dwarn } from "@/lib/debug";
import type { User, SignInData, AuthContextState } from "./types";
import { ROUTES } from "@/lib/config";

/**
 * Create Auth Context
 */
export const AuthContext = createContext<AuthContextState | undefined>(
    undefined
);

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Auth Provider Component
 * Wraps the app to provide authentication state
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    /**
     * Refresh User
     * Fetch current user data from Django backend
     */
    const refreshUser = useCallback(async () => {
        try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
            return userData;
        } catch (error) {
            // Don't log error - it's expected when not authenticated
            setUser(null);
            throw error;
        }
    }, []);

    /**
     * Sign In (Django email/password authentication)
     * Authenticate user - cookies are set by Next.js API route
     */
    const signIn = useCallback(
        async (data: SignInData) => {
            try {
                // Sign in via Next.js API route
                // Cookies are set automatically server-side
                await authService.signIn(data);

                // Fetch user data — the refresh may sometimes return 401 briefly while cookies are being set.
                // Retry a few times with small backoff to avoid transient failures showing as signin errors.
                const maxAttempts = 3;
                const backoffMs = 300;
                let attempt = 0;
                let userData = null;
                while (attempt < maxAttempts) {
                    try {
                        userData = await refreshUser();
                        break; // success
                    } catch (error) {
                        attempt += 1;
                        if (attempt >= maxAttempts) {
                            dwarn("[AuthContext] Failed to refresh user after sign-in; proceeding without user data", error);
                            break;
                        }
                        // Wait before retrying
                        await new Promise((resolve) => setTimeout(resolve, backoffMs));
                    }
                }

                // Redirect to home page
                router.push(ROUTES.HOME);
            } catch (error) {
                derror("Sign in failed:", error);
                throw error;
            }
        },
        [refreshUser, router]
    );

    /**
     * Sign Out
     * Clear tokens and user data (both Django and NextAuth)
     * Properly clears all authentication state across the entire application
     */
    const signOut = useCallback(async () => {
        try {
            dlog("[AuthContext] Starting sign out process...");
            
            // Step 1: Clear Django tokens via Next.js API route
            dlog("[AuthContext] Step 1: Clearing Django cookies");
            try {
                await authService.signOut();
                dlog("[AuthContext] ✓ Django cookies cleared");
            } catch (error) {
                derror("[AuthContext] Failed to clear Django cookies:", error);
                // Continue with sign out even if this fails
            }
            
            // Step 2: Clear NextAuth session if it exists
            dlog("[AuthContext] Step 2: Signing out from NextAuth");
            if (session) {
                await nextAuthSignOut({ redirect: false });
                dlog("[AuthContext] ✓ NextAuth session cleared");
            } else {
                dlog("[AuthContext] No NextAuth session to clear");
            }
            
            // Step 3: Clear local user state
            dlog("[AuthContext] Step 3: Clearing local user state");
            setUser(null);
            dlog("[AuthContext] ✓ User state cleared");
            
            // Step 4: Redirect to login page
            dlog("[AuthContext] Step 4: Redirecting to login page");
            router.push(ROUTES.LOGIN);
            
            dlog("[AuthContext] ✓ Sign out complete");
        } catch (error) {
            derror("[AuthContext] Sign out error:", error);
            // Force redirect to login even if there were errors
            setUser(null);
            router.push(ROUTES.LOGIN);
            throw error;
        }
    }, [router, session]);

    /**
     * Initialize auth state on mount
     * Check both NextAuth session and Django authentication
     */
    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true);
            
            try {
                // If there's a NextAuth session (OAuth login)
                if (session?.user) {
                    dlog("[AuthContext] NextAuth session detected:", session.user.email);
                    
                    // Try to get full user data from Django
                    try {
                        const userData = await refreshUser();
                        dlog("[AuthContext] Django user data loaded:", userData.email);
                    } catch (error) {
                        dlog("[AuthContext] No Django user data, using session data");
                        // If Django doesn't have the user, create a minimal user object from session
                        const oauthUser: User = {
                            id: (session as any).djangoUserId || 0,
                            email: session.user.email || "",
                            username: session.user.name || "OAuth User",
                            first_name: session.user.name?.split(" ")[0] || "",
                            last_name: session.user.name?.split(" ").slice(1).join(" ") || "",
                            country: "",
                            date_joined: new Date().toISOString(),
                            is_active: true,
                            is_superuser: (session as any).isSuperuser || false,
                            is_staff: (session as any).isStaff || false,
                        };
                        setUser(oauthUser);
                    }
                } else {
                    dlog("[AuthContext] No NextAuth session, checking Django auth");
                    // Try Django authentication (email/password login)
                    try {
                        const userData = await refreshUser();
                        dlog("[AuthContext] Django authenticated:", userData.email);
                    } catch (error) {
                        dlog("[AuthContext] Not authenticated");
                    }
                }
            } catch (error) {
                derror("[AuthContext] Auth initialization error:", error);
                // Not authenticated or error occurred
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        // Only initialize when session status is determined
        if (sessionStatus !== "loading") {
            initializeAuth();
        }
    }, [session, sessionStatus, refreshUser]);

    const value: AuthContextState = {
        user,
        isAuthenticated: !!user,
        isLoading: isLoading || sessionStatus === "loading",
        signIn,
        signOut,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
