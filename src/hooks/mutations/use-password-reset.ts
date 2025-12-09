"use client";

/**
 * usePasswordReset Hook
 * Custom mutation hooks for password reset flow
 */

import { useState } from "react";
import { authService } from "@/lib/auth/auth-service";
import type {
    PasswordResetRequestData,
    PasswordResetConfirmData,
    MutationState,
    ApiError,
} from "@/lib/auth/types";

/**
 * Use Request Password Reset
 * Request password reset email
 */
export function useRequestPasswordReset() {
    const [state, setState] = useState<MutationState<void>>({
        data: null,
        error: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const mutate = async (data: PasswordResetRequestData): Promise<void> => {
        setState({
            data: null,
            error: null,
            isLoading: true,
            isSuccess: false,
            isError: false,
        });

        try {
            await authService.requestPasswordReset(data);
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
                message: apiError.message || "Password reset request failed",
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

/**
 * Use Confirm Password Reset
 * Confirm password reset with token
 */
export function useConfirmPasswordReset() {
    const [state, setState] = useState<MutationState<void>>({
        data: null,
        error: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const mutate = async (data: PasswordResetConfirmData): Promise<void> => {
        setState({
            data: null,
            error: null,
            isLoading: true,
            isSuccess: false,
            isError: false,
        });

        try {
            await authService.confirmPasswordReset(data);
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
                message: apiError.message || "Password reset confirmation failed",
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
