"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrowserWarning() {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);

  useEffect(() => {
    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;
    const inAppPatterns = [
      "FBAN",
      "FBAV",
      "Instagram",
      "LinkedIn",
      "TikTok",
      "Twitter",
    ];
    const detected = inAppPatterns.some((pattern) =>
      userAgent.includes(pattern)
    );
    setIsInAppBrowser(detected);
  }, []);

  if (!isInAppBrowser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="max-w-sm rounded-lg border bg-white p-6 shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Google Login Not Supported Here
        </h2>
        <p className="mt-2 text-gray-600 text-sm">
          This page was opened inside an app (like LinkedIn or Instagram), which
          doesn’t support Google Login.
        </p>
        <p className="mt-2 text-gray-600 text-sm">
          Please open it in your browser to continue.
        </p>
        <Link
          href="https://invoice-app-pi-taupe.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 gap-2 inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white font-medium hover:bg-black/80 transition"
        >
          Open in Browser
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
