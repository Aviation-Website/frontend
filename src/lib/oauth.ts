/**
 * OAuth2 configuration and utilities for Google and Discord.
 * Handles OAuth authorization URLs.
 * 
 * SECURITY NOTE: With secure httpOnly cookies implementation,
 * OAuth flow is now:
 * 1. Frontend redirects to OAuth provider (Google/Discord)
 * 2. Provider redirects to Django backend oauth_callback endpoint
 * 3. Django exchanges code for tokens, sets httpOnly cookies, redirects to /home
 * 4. Frontend receives authenticated cookies automatically
 * 
 * Tokens NEVER touch the client-side JavaScript.
 */

export const OAUTH_CONFIG = {
  google: {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    scope: "openid email profile",
    promptType: "select_account", // Allow user to choose which Google account to use
  },
  discord: {
    authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
    scope: "identify email",
  },
};

/**
 * Build OAuth authorization URL
 * Points directly to Django backend oauth_callback endpoint (secure - httpOnly cookies)
 */
export const buildOAuthUrl = (
  provider: "google" | "discord",
  clientId: string,
  backendUrl: string = "http://localhost:8000",
  frontendOrigin?: string
): string => {
  const config = OAUTH_CONFIG[provider];
  const url = new URL(config.authorizationEndpoint);

  url.searchParams.set("client_id", clientId);
  // Redirect to Django backend (not Next.js) - Django will set cookies and redirect to frontend
  url.searchParams.set("redirect_uri", `${backendUrl}/api/account/oauth/${provider}/callback/`);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", config.scope);

  if (provider === "google" && "promptType" in config) {
    url.searchParams.set("prompt", config.promptType);
  }

  // Optionally encode the frontend origin as the `state` so the backend can redirect back to the right frontend
  if (frontendOrigin) {
    try {
      const state = { next: frontendOrigin };
      const encoded = btoa(JSON.stringify(state));
      url.searchParams.set("state", encoded);
    } catch (err) {
      // ignore
    }
  }

  return url.toString();
};

// The OAuth flow uses backend-based callbacks; no client-side code exchange is performed.

