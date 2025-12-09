"use client";

/**
 * Authentication Context
 * Manages global authentication state
 */

import React, {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authService } from "./auth-service";
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

    /**
     * Refresh User
     * Fetch current user data
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
     * Sign In
     * Authenticate user - cookies are set by Next.js API route
     */
    const signIn = useCallback(
        async (data: SignInData) => {
            try {
                // Sign in via Next.js API route
                // Cookies are set automatically server-side
                await authService.signIn(data);

                // Fetch user data
                await refreshUser();

                // Redirect to home page
                router.push(ROUTES.HOME);
            } catch (error) {
                console.error("Sign in failed:", error);
                throw error;
            }
        },
        [refreshUser, router]
    );

    /**
     * Sign Out
     * Clear tokens and user data
     */
    const signOut = useCallback(async () => {
        try {
            await authService.signOut();
            setUser(null);
            router.push(ROUTES.LOGIN);
        } catch (error) {
            console.error("Sign out failed:", error);
            throw error;
        }
    }, [router]);

    /**
     * Initialize auth state on mount
     * Fetch user data from server API route which checks httpOnly cookies
     */
    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true);
            
            // Try to fetch user data from server
            // Server will check httpOnly cookies and return user if authenticated
            try {
                await refreshUser();
            } catch (error) {
                // Not authenticated or error occurred
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

    const value: AuthContextState = {
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signOut,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
