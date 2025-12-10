/**
 * Password Validation Utilities
 * Shared validation logic for password fields across signup and reset password
 */

/**
 * Password Requirements:
 * - At least 8 characters
 * - At least 1 uppercase letter (A-Z)
 * - At least 1 lowercase letter (a-z)
 * - At least 1 number (0-9)
 * - At least 1 special character (@$!%*?&)
 */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PASSWORD_REQUIREMENTS = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
    specialChars: "@$!%*?&",
};

export const PASSWORD_ERROR_MESSAGE = 
    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character (@$!%*?&).";

/**
 * Validate password against requirements
 * @param password - The password to validate
 * @returns Object with isValid flag and error message if invalid
 */
export function validatePassword(password: string): { 
    isValid: boolean; 
    error?: string;
} {
    if (!PASSWORD_REGEX.test(password)) {
        return {
            isValid: false,
            error: PASSWORD_ERROR_MESSAGE,
        };
    }
    
    return { isValid: true };
}

/**
 * Validate password confirmation
 * @param password - The original password
 * @param confirmPassword - The confirmation password
 * @returns Object with isValid flag and error message if invalid
 */
export function validatePasswordConfirmation(
    password: string,
    confirmPassword: string
): {
    isValid: boolean;
    error?: string;
} {
    if (password !== confirmPassword) {
        return {
            isValid: false,
            error: "Passwords do not match.",
        };
    }
    
    return { isValid: true };
}
