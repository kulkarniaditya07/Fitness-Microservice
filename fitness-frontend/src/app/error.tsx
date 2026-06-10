"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-bold text-danger">Something went wrong</h1>
          <p className="mt-3 text-sm text-slate-600">
            An unexpected error occurred while loading this page.
          </p>
          <button type="button" onClick={reset} className="btn btn-primary mt-6">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
