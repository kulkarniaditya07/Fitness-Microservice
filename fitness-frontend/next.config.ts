import type { NextConfig } from "next";

const backendBaseUrl = process.env.API_BASE_URL ?? "http://localhost:8080";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "your-cdn.example.com" }],
  },
  rewrites: async () => [
    {
      source: "/api/users/:path*",
      destination: `${backendBaseUrl}/api/users/:path*`,
    },
    {
      source: "/api/activities/:path*",
      destination: `${backendBaseUrl}/api/activities/:path*`,
    },
    {
      source: "/api/recommendation/:path*",
      destination: `${backendBaseUrl}/api/recommendation/:path*`,
    },
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ],
};

export default nextConfig;
