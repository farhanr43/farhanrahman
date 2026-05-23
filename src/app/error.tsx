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
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-cyan-500 text-zinc-950 rounded-lg font-medium hover:bg-cyan-400 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}