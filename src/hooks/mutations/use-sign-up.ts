"use client";

/**
 * useSignUp Hook
 * Custom mutation hook for user registration
 */

import { useState } from "react";
import { authService } from "@/lib/auth/auth-service";
import type {
    SignUpData,
    SignUpResponse,
    MutationState,
    ApiError,
} from "@/lib/auth/types";

/**
 * Use Sign Up
 * Handle user registration
 */
export function useSignUp() {
    const [state, setState] = useState<MutationState<SignUpResponse>>({
        data: null,
        error: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const mutate = async (data: SignUpData): Promise<SignUpResponse> => {
        setState({
            data: null,
            error: null,
            isLoading: true,
            isSuccess: false,
            isError: false,
        });

        try {
            const result = await authService.signUp(data);
            setState({
                data: result,
                error: null,
                isLoading: false,
                isSuccess: true,
                isError: false,
            });
            return result;
        } catch (error) {
            const apiError = error as ApiError;
            const errorResponse = {
                message: apiError.message || "Sign up failed",
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
