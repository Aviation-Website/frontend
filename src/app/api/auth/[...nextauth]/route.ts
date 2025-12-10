import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { dlog, derror } from "@/lib/debug";

interface DjangoUser {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_superuser?: boolean;
  is_staff?: boolean;
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Sync OAuth user with Django backend
        if (!user.email) {
          derror("[NextAuth] No email provided by OAuth provider");
          return false;
        }

        const djangoAPIUrl = process.env.DJANGO_API_URL || "http://localhost:8000";
        
  dlog("[NextAuth] Syncing user with Django:", user.email);
        
        // Try to get or create user in Django
        const createUserResponse = await fetch(
          `${djangoAPIUrl}/api/oauth/sync-user/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              username: user.email.split("@")[0], // Use email prefix as username
              first_name: user.name?.split(" ")[0] || "",
              last_name: user.name?.split(" ").slice(1).join(" ") || "",
              provider: account?.provider || "oauth",
            }),
          }
        );

        if (!createUserResponse.ok) {
          const errorText = await createUserResponse.text();
          derror("[NextAuth] Failed to sync user with Django:", createUserResponse.status, errorText);
          return false;
        }

        const djangoUser: DjangoUser & { access_token: string; refresh_token: string } = await createUserResponse.json();
        
  dlog("[NextAuth] Django user synced successfully:", djangoUser.email);
        
        // Store JWT tokens from Django
        (user as any).djangoAccessToken = djangoUser.access_token;
        (user as any).djangoRefreshToken = djangoUser.refresh_token;
        (user as any).djangoUserId = djangoUser.id;
        (user as any).isSuperuser = djangoUser.is_superuser || false;
        (user as any).isStaff = djangoUser.is_staff || false;
        
        return true;
      } catch (error) {
  derror("[NextAuth] OAuth sign-in callback error:", error);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      // Add additional info to token
        if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        dlog("[NextAuth JWT] Account present, provider:", account.provider);
      }
      
      // Add Django tokens if available (from signIn callback)
  if (user) {
  dlog("[NextAuth JWT] User object present, checking for djangoAccessToken");
  dlog("[NextAuth JWT] User has djangoAccessToken:", !!(user as any)?.djangoAccessToken);
        if ((user as any)?.djangoAccessToken) {
          token.djangoAccessToken = (user as any).djangoAccessToken;
          token.djangoRefreshToken = (user as any).djangoRefreshToken;
          token.djangoUserId = (user as any).djangoUserId;
          token.isSuperuser = (user as any).isSuperuser;
          token.isStaff = (user as any).isStaff;
          dlog("[NextAuth JWT] ✓ Django tokens added to JWT token");
        } else {
        dlog("[NextAuth JWT] ✗ User object has no djangoAccessToken");
      }
      } else {
        dlog("[NextAuth JWT] No user object, checking existing token");
        dlog("[NextAuth JWT] Existing token has djangoAccessToken:", !!token.djangoAccessToken);
      }
      
      return token;
    },
    async session({ session, token }) {
      // Add custom fields to session
  (session as any).accessToken = token.accessToken;
  (session as any).provider = token.provider;
      
  dlog("[NextAuth Session] Building session for user:", session.user?.email);
  dlog("[NextAuth Session] Token has djangoAccessToken:", !!token.djangoAccessToken);
      
      // Add Django tokens to session
      if (token.djangoAccessToken) {
        (session as any).djangoAccessToken = token.djangoAccessToken;
        (session as any).djangoRefreshToken = token.djangoRefreshToken;
        (session as any).djangoUserId = token.djangoUserId;
        (session as any).isSuperuser = token.isSuperuser;
        (session as any).isStaff = token.isStaff;
  dlog("[NextAuth Session] ✓ Django tokens added to session");
      } else {
  dlog("[NextAuth Session] ✗ No djangoAccessToken in token, session will be missing Django JWT");
      }
      
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Only enable NextAuth debug when explicitly turned on by an env var.
  // In the previous behavior, `debug` would always be enabled in development
  // — which prints warnings in the console such as `[next-auth][warn][DEBUG_ENABLED]`.
  // We now read `NEXTAUTH_DEBUG` so logs are opt-in and can be silenced in dev.
  debug: process.env.NEXTAUTH_DEBUG === "true",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
