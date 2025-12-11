/**
 * Client-Side API Client (Updated)
 * Simplified client that calls Next.js API routes
 * No more direct Django calls or manual token management from client
 */

/**
 * Request options
 */
interface RequestOptions extends RequestInit {
    // No need for includeAuth anymore, handled by Next.js API routes
}

/**
 * API Client
 * Base fetch wrapper for calling Next.js API routes
 */
export async function apiClient<T = unknown>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    // All endpoints are relative to the Next.js app
    const url = endpoint.startsWith("/api") 
        ? endpoint 
        : `/api${endpoint}`;

    // Prepare headers
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    // Make request - cookies are automatically sent
    const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include", // Important: includes cookies
    });

    // Parse response
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let data: unknown;
    
    // Handle empty responses (e.g., 204 No Content)
    if (response.status === 204 || response.headers.get("content-length") === "0") {
        data = null;
    } else if (isJson) {
        const text = await response.text();
        data = text ? JSON.parse(text) : null;
    } else {
        data = await response.text();
    }

    // Handle errors
    if (!response.ok) {
        const errorMessage =
            typeof data === "object" && data !== null && "error" in data
                ? (data as { error: string }).error
                : typeof data === "object" && data !== null && "message" in data
                    ? (data as { message: string }).message
                    : "An error occurred";

        const error = new Error(errorMessage) as any;
        
        // Preserve additional error details from response
        if (typeof data === "object" && data !== null) {
            error.code = (data as any).code;
            error.email = (data as any).email;
            error.retry_after = (data as any).retry_after;
            error.status = response.status;
            error.response = data;
        }

        throw error;
    }

    return data as T;
}

/**
 * GET request
 */
export async function get<T = unknown>(
    endpoint: string,
    options?: RequestOptions
): Promise<T> {
    return apiClient<T>(endpoint, {
        method: "GET",
        ...options,
    });
}

/**
 * POST request
 */
export async function post<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
): Promise<T> {
    return apiClient<T>(endpoint, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
        ...options,
    });
}

/**
 * PUT request
 */
export async function put<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
): Promise<T> {
    return apiClient<T>(endpoint, {
        method: "PUT",
        body: body ? JSON.stringify(body) : undefined,
        ...options,
    });
}

/**
 * PATCH request
 */
export async function patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
): Promise<T> {
    return apiClient<T>(endpoint, {
        method: "PATCH",
        body: body ? JSON.stringify(body) : undefined,
        ...options,
    });
}

/**
 * DELETE request
 */
export async function del<T = unknown>(
    endpoint: string,
    options?: RequestOptions
): Promise<T> {
    return apiClient<T>(endpoint, {
        method: "DELETE",
        ...options,
    });
}

/**
 * POST with FormData (for file uploads)
 */
export async function postFormData<T = unknown>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions
): Promise<T> {
    const url = endpoint.startsWith("/api") 
        ? endpoint 
        : `/api${endpoint}`;

    const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
        ...options,
        // Don't set Content-Type header - browser will set it with boundary
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let data: unknown;
    if (isJson) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if (!response.ok) {
        const errorMessage =
            typeof data === "object" && data !== null && "error" in data
                ? (data as { error: string }).error
                : typeof data === "object" && data !== null && "message" in data
                    ? (data as { message: string }).message
                    : "An error occurred";

        const error = new Error(errorMessage) as any;
        
        if (typeof data === "object" && data !== null) {
            error.status = response.status;
            error.response = data;
        }

        throw error;
    }

    return data as T;
}

/**
 * PATCH with FormData (for file uploads)
 */
export async function patchFormData<T = unknown>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions
): Promise<T> {
    const url = endpoint.startsWith("/api") 
        ? endpoint 
        : `/api${endpoint}`;

    const response = await fetch(url, {
        method: "PATCH",
        body: formData,
        credentials: "include",
        ...options,
        // Don't set Content-Type header - browser will set it with boundary
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let data: unknown;
    if (isJson) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if (!response.ok) {
        const errorMessage =
            typeof data === "object" && data !== null && "error" in data
                ? (data as { error: string }).error
                : typeof data === "object" && data !== null && "message" in data
                    ? (data as { message: string }).message
                    : "An error occurred";

        const error = new Error(errorMessage) as any;
        
        if (typeof data === "object" && data !== null) {
            error.status = response.status;
            error.response = data;
        }

        throw error;
    }

    return data as T;
}
