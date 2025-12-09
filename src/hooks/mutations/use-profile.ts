"use client";

/**
 * useProfile Hook
 * Custom mutation hook for profile management
 */

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/lib/auth/auth-service";
import type {
    ProfileUpdateData,
    User,
    MutationState,
    ApiError,
} from "@/lib/auth/types";

/**
 * Use Profile Update
 * Handle profile updates with optimistic updates
 */
export function useProfileUpdate() {
    const { refreshUser } = useAuth();
    const [state, setState] = useState<MutationState<User>>({
        data: null,
        error: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const mutate = async (data: ProfileUpdateData): Promise<User> => {
        setState({
            data: null,
            error: null,
            isLoading: true,
            isSuccess: false,
            isError: false,
        });

        try {
            const result = await authService.updateProfile(data);

            // Refresh user in context
            await refreshUser();

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
                message: apiError.message || "Profile update failed",
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
