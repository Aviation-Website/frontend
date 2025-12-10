"use client";

/**
 * useSignIn Hook
 * Custom mutation hook for user authentication
 */

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import type { SignInData, MutationState, ApiError } from "@/lib/auth/types";

/**
 * Use Sign In
 * Handle user authentication
 */
export function useSignIn() {
    const { signIn } = useAuth();
    const [state, setState] = useState<MutationState<void>>({
        data: null,
        error: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const mutate = async (data: SignInData): Promise<void> => {
        setState({
            data: null,
            error: null,
            isLoading: true,
            isSuccess: false,
            isError: false,
        });

        try {
            await signIn(data);
            setState({
                data: null,
                error: null,
                isLoading: false,
                isSuccess: true,
                isError: false,
            });
        } catch (error) {
            const apiError = error as any;
            const errorResponse = {
                message: apiError.message || "Sign in failed",
                errors: apiError.errors,
                status: apiError.status,
                code: apiError.code,
                email: apiError.email,
                retry_after: apiError.retry_after,
            };

            setState({
                data: null,
                error: errorResponse,
                isLoading: false,
                isSuccess: false,
                isError: true,
            });
            throw error;
        }
    };

    const reset = () => {
        setState({
            data: null,
            error: null,
            isLoading: false,
            isSuccess: false,
            isError: false,
        });
    };

    return { ...state, mutate, reset };
}
