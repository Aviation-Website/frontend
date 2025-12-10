/**
 * Error Handling Utilities
 * Provides consistent error messages and logging throughout the application
 */

export interface AppError {
  message: string;
  status: number;
  details?: string;
  timestamp: string;
}

/**
 * Format error for display to user
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (typeof error === "object" && error !== null && "error" in error) {
    return String((error as any).error);
  }
  return "An unexpected error occurred";
}

/**
 * Log error with context
 */
export function logError(context: string, error: unknown, additionalInfo?: Record<string, any>) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] [${context}]`, error);
  if (additionalInfo) {
    console.error(`[${timestamp}] [${context}] Additional Info:`, additionalInfo);
  }
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
  message: string,
  status: number = 500,
  details?: string
): AppError {
  return {
    message,
    status,
    details,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Authentication error messages
 */
export const AUTH_ERRORS = {
  NO_TOKEN: "Authentication required. Please log in.",
  INVALID_TOKEN: "Your session has expired. Please log in again.",
  NO_PERMISSION: "You don't have permission to access this resource.",
  NOT_SUPERUSER: "Only administrators can access this feature.",
  LOGIN_REQUIRED: "Please log in to continue.",
};

/**
 * API error messages
 */
export const API_ERRORS = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Invalid data provided. Please check your input.",
};

/**
 * Check if error is authentication related
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes("401") ||
      message.includes("unauthorized") ||
      message.includes("authentication") ||
      message.includes("token")
    );
  }
  return false;
}

/**
 * Check if error is permission related
 */
export function isPermissionError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes("403") ||
      message.includes("forbidden") ||
      message.includes("permission")
    );
  }
  return false;
}

/**
 * Extract status code from error
 */
export function getErrorStatus(error: unknown): number {
  if (typeof error === "object" && error !== null && "status" in error) {
    return Number((error as any).status) || 500;
  }
  if (error instanceof Error) {
    if (error.message.includes("401")) return 401;
    if (error.message.includes("403")) return 403;
    if (error.message.includes("404")) return 404;
  }
  return 500;
}
