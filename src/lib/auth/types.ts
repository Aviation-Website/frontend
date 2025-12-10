/**
 * Authentication Type Definitions
 * TypeScript interfaces and types for authentication
 */

/**
 * User Interface
 * Represents an authenticated user
 */
export interface User {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    country: string;
    date_joined: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_staff?: boolean;
}

/**
 * Authentication Tokens
 */
export interface AuthTokens {
    access: string;
    refresh: string;
}

/**
 * Sign Up Data
 */
export interface SignUpData {
    email: string;
    username: string;
    password: string;
    re_password: string;
    first_name: string;
    last_name: string;
    country: string;
}

/**
 * Sign In Data
 */
export interface SignInData {
    email: string;
    password: string;
}

/**
 * Password Reset Request Data
 */
export interface PasswordResetRequestData {
    email: string;
}

/**
 * Password Reset Confirm Data
 */
export interface PasswordResetConfirmData {
    uid: string;
    token: string;
    new_password: string;
    re_new_password: string;
}

/**
 * Email Activation Data
 */
export interface EmailActivationData {
    uid: string;
    token: string;
}

/**
 * Profile Update Data
 */
export interface ProfileUpdateData {
    first_name?: string;
    last_name?: string;
    email?: string;
    country?: string;
}

/**
 * Password Change Data
 */
export interface PasswordChangeData {
    current_password: string;
    new_password: string;
    re_new_password: string;
}

/**
 * API Response Types
 */

/**
 * Success Response
 */
export interface ApiSuccessResponse<T> {
    data: T;
    message?: string;
}

/**
 * Error Response
 */
export interface ApiErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
    status?: number;
    code?: string;
    email?: string;
    retry_after?: number;
}

/**
 * Sign Up Response
 */
export interface SignUpResponse {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    country: string;
}

/**
 * Sign In Response
 */
export interface SignInResponse {
    access: string;
    refresh: string;
}

/**
 * Token Refresh Response
 */
export interface TokenRefreshResponse {
    access: string;
}

/**
 * Mutation State
 * Generic state for mutations
 */
export interface MutationState<T> {
    data: T | null;
    error: ApiErrorResponse | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

/**
 * Auth Context State
 */
export interface AuthContextState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (data: SignInData) => Promise<void>;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<User>;
}

/**
 * API Error
 * Custom error class for API errors
 */
export class ApiError extends Error {
    status: number;
    errors?: Record<string, string[]>;

    constructor(
        message: string,
        status: number,
        errors?: Record<string, string[]>
    ) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errors = errors;
    }
}
