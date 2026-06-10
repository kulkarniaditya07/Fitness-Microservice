import type { Metadata } from "next";
import { AppProviders } from "@/components/common/AppProviders";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Fitness Microservice Frontend",
  description: "Track activities and receive AI-powered health recommendations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className="min-h-screen bg-neutral text-dark antialiased"
        suppressHydrationWarning
      >
        <AppProviders>
          <ErrorBoundary>{children}</ErrorBoundary>
        </AppProviders>
      </body>
    </html>
  );
}
