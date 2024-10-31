import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError";
    user: DefaultSession["user"];
    access_token?: string;  
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    error?: "RefreshTokenError";
  }
}
