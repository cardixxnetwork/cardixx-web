"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900">Something went wrong</h1>
      <p className="mt-4 text-gray-600">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700"
      >
        Try Again
      </button>
    </main>
  );
}
