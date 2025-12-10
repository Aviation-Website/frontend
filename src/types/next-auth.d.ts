import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    provider?: string;
    djangoAccessToken?: string;
    djangoRefreshToken?: string;
    djangoUserId?: number;
    isSuperuser?: boolean;
    isStaff?: boolean;
  }

  interface User extends DefaultUser {
    djangoAccessToken?: string;
    djangoRefreshToken?: string;
    djangoUserId?: number;
    isSuperuser?: boolean;
    isStaff?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    provider?: string;
    djangoAccessToken?: string;
    djangoRefreshToken?: string;
    djangoUserId?: number;
    isSuperuser?: boolean;
    isStaff?: boolean;
  }
}
