import type { DefaultSession, DefaultUser } from "next-auth";
import type { UserRole } from "@/types/models";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      userRole: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: number;
    userRole: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: number;
    userRole?: UserRole;
  }
}
