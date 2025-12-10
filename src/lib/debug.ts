// Make debug strictly opt-in via NEXT_PUBLIC_DEBUG. This avoids noisy dev-only
// logs being emitted by default while still allowing a developer to turn them on.
export const DEBUG = process.env.NEXT_PUBLIC_DEBUG === "true";

export function dlog(...args: unknown[]) {
    if (DEBUG) {
        console.log(...args);
    }
}

// Gate error logging behind the same flag to allow turning off all console
// output in development when desired. If you want errors to always print
// (recommended for production), set NEXT_PUBLIC_DEBUG=true or modify this
// behavior to always log errors.
export function derror(...args: unknown[]) {
    if (DEBUG) {
        console.error(...args);
    }
}

export function dwarn(...args: unknown[]) {
    if (DEBUG) {
        console.warn(...args);
    }
}
