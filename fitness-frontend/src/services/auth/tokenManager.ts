export const tokenManager = {
  getSessionToken(): string | null {
    return null;
  },
  clearSession(): void {
    if (typeof window !== "undefined") {
      document.cookie = "next-auth.session-token=; Max-Age=0; path=/";
      document.cookie = "__Secure-next-auth.session-token=; Max-Age=0; path=/";
    }
  },
};
