"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only run in the browser
    if (typeof window !== "undefined") {
      const initMsw = async () => {
        const { worker } = await import("../mocks/browser");
        // Start the worker and don't warn about unhandled requests (like next.js internal fetches)
        await worker.start({ onUnhandledRequest: 'bypass' });
        setIsReady(true);
      };
      
      initMsw();
    }
  }, []);

  // Wait for MSW to be ready before rendering the app, so initial fetches get intercepted
  if (!isReady) return null;

  return <>{children}</>;
}
