"use client";

/**
 * useAuth Hook
 * Custom hook to access authentication context
 */

import { useContext } from "react";
import { AuthContext } from "@/lib/auth/auth-context";
import type { AuthContextState } from "@/lib/auth/types";

/**
 * Use Auth
 * Access authentication state and methods
 */
export function useAuth(): AuthContextState {
    const context = useContext(AuthContext);

    // Fallback for components rendered outside of an AuthProvider (e.g. public pages)
    // This avoids runtime errors while still providing sensible defaults.
    if (context === undefined) {
        return {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            signIn: async () => {
                throw new Error("AuthProvider is not available in this part of the app.");
            },
            signOut: async () => {
                // no-op when AuthProvider is not present
            },
            refreshUser: async () => {
                throw new Error("AuthProvider is not available in this part of the app.");
            },
        };
    }

    return context;
}
