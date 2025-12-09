"use client";

import { useEffect } from "react";

/**
 * Discord OAuth Callback Page
 * 
 * IMPORTANT: This page is now ONLY used for Discord OAuth redirects.
 * Django backend (oauth_views.py) handles:
 * 1. Code exchange for tokens
 * 2. Token storage in httpOnly cookies
 * 3. Redirect to /home
 * 
 * This page is reached when Django redirects after setting cookies.
 * Just show a loading message while the redirect completes.
 */
export default function DiscordCallbackPage() {
  useEffect(() => {
    // Redirect to home - Django already set httpOnly cookies
    window.location.href = "/home";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
        <h1 className="text-xl font-semibold text-gray-700">
          Completing2 Discord Sign In...
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Please wait while we authenticate your account.
        </p>
      </div>
    </div>
  );
}
