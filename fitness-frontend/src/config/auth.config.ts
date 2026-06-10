import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { z } from "zod";
import { UserRole } from "@/types/models";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        try {
          const response = await axios.post(
            `${process.env.API_BASE_URL}${
              process.env.NEXT_PUBLIC_USER_API ?? "/api/users"
            }/login`,
            parsed.data,
            {
              headers: { "Content-Type": "application/json" },
              timeout: 30000,
            },
          );

          const user = response.data?.data ?? response.data;
          if (!user?.id || !user?.email) return null;

          return {
            id: Number(user.id),
            email: user.email,
            name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
            userRole: user.userRole ?? UserRole.USER,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id);
        token.userRole = user.userRole;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = Number(token.id ?? 0);
        session.user.userRole = token.userRole ?? UserRole.USER;
      }
      return session;
    },
  },
};
