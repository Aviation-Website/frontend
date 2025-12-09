/**
 * Server-Side API Client
 * Handles API requests from server components (SSR)
 */

import { cookies } from "next/headers";
import { API_BASE_URL, COOKIE_CONFIG } from "@/lib/config";
import { ApiError } from "@/lib/auth/types";

/**
 * Request options for server-side requests
 */
interface ServerRequestOptions extends RequestInit {
    includeAuth?: boolean;
}

/**
 * Server API Client
 * Use this for API calls in Server Components and Server Actions
 */
export async function serverApiClient<T = unknown>(
    endpoint: string,
    options: ServerRequestOptions = {}
): Promise<T> {
    const { includeAuth = true, ...fetchOptions } = options;

    // Prepare headers
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(fetchOptions.headers as Record<string, string>),
    };

    // Add authorization header if needed
    if (includeAuth) {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(COOKIE_CONFIG.ACCESS_TOKEN_NAME);

        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken.value}`;
        }
    }

    // Prepare URL
    const url = endpoint.startsWith("http")
        ? endpoint
        : `${API_BASE_URL}${endpoint}`;

    // Make request
    const response = await fetch(url, {
        ...fetchOptions,
        headers,
        // Don't include credentials on server-side
        cache: "no-store", // Disable caching for authenticated requests
    });

    // Parse response
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let data: unknown;
    if (isJson) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    // Handle errors
    if (!response.ok) {
        const errorMessage =
            typeof data === "object" && data !== null && "detail" in data
                ? (data as { detail: string }).detail
                : typeof data === "object" && data !== null && "message" in data
                    ? (data as { message: string }).message
                    : "An error occurred";

        const errors =
            typeof data === "object" && data !== null && "errors" in data
                ? (data as { errors: Record<string, string[]> }).errors
                : undefined;

        throw new ApiError(errorMessage, response.status, errors);
    }

    return data as T;
}

/**
 * GET request (Server-side)
 */
export async function serverGet<T = unknown>(
    endpoint: string,
    options?: ServerRequestOptions
): Promise<T> {
    return serverApiClient<T>(endpoint, {
        method: "GET",
        ...options,
    });
}

/**
 * POST request (Server-side)
 */
export async function serverPost<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: ServerRequestOptions
): Promise<T> {
    return serverApiClient<T>(endpoint, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
        ...options,
    });
}

/**
 * PUT request (Server-side)
 */
export async function serverPut<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: ServerRequestOptions
): Promise<T> {
    return serverApiClient<T>(endpoint, {
        method: "PUT",
        body: body ? JSON.stringify(body) : undefined,
        ...options,
    });
}

/**
 * PATCH request (Server-side)
 */
export async function serverPatch<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: ServerRequestOptions
): Promise<T> {
    return serverApiClient<T>(endpoint, {
        method: "PATCH",
        body: body ? JSON.stringify(body) : undefined,
        ...options,
    });
}

/**
 * DELETE request (Server-side)
 */
export async function serverDel<T = unknown>(
    endpoint: string,
    options?: ServerRequestOptions
): Promise<T> {
    return serverApiClient<T>(endpoint, {
        method: "DELETE",
        ...options,
    });
}
