"use client";

/**
 * useEmailVerification Hook
 * Custom mutation hook for email verification
 */

import { useState, useCallback } from "react";
import { authService } from "@/lib/auth/auth-service";
import type {
    EmailActivationData,
    MutationState,
    ApiError,
} from "@/lib/auth/types";

/**
 * Use Email Verification
 * Handle email activation
 */
export function useEmailVerification() {
    const [state, setState] = useState<MutationState<void>>({
        data: null,
        error: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const mutate = useCallback(async (data: EmailActivationData): Promise<void> => {
        setState({
            data: null,
            error: null,
            isLoading: true,
            isSuccess: false,
            isError: false,
        });

        try {
            await authService.activateEmail(data);
            setState({
                data: null,
                error: null,
                isLoading: false,
                isSuccess: true,
                isError: false,
            });
        } catch (error) {
            const apiError = error as ApiError;
            const errorResponse = {
                message: apiError.message || "Email verification failed",
                errors: apiError.errors,
                status: apiError.status,
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
    }, []);

    const reset = useCallback(() => {
        setState({
            data: null,
            error: null,
            isLoading: false,
            isSuccess: false,
            isError: false,
        });
    }, []);

    return { ...state, mutate, reset };
}

