"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

interface ViewCounterProps {
  slug: string;
  className?: string;
  trackView?: boolean;
  displayViews?: boolean;
}

export function ViewCounter({
  slug,
  className = "",
  trackView = false,
  displayViews = true,
}: ViewCounterProps) {
  const [isTracked, setIsTracked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track the page view using Vercel Analytics
    if (trackView && !isTracked) {
      track("Page View", {
        slug: slug,
        path: `/${slug}`,
        title: document.title || slug,
      });
      setIsTracked(true);
    }

    // Simulate a brief loading state for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug, trackView, isTracked]);

  if (!displayViews) {
    return null;
  }

  if (loading) {
    return <p className={className}>{"... views"}</p>;
  }

  return (
    <p className={className}>
      {"View tracked"}
    </p>
  );
}
