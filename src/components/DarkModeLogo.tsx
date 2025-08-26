"use client";

import { useEffect, useState } from "react";

export default function DarkModeLogo() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for dark mode preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/merchradar2.svg"
        alt="MerchRadar Logo" 
        className="h-[120px] sm:h-[180px] lg:h-[220px] w-auto"
      />
    );
  }

  return (
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img 
      src={isDarkMode ? "/merchradar1.svg" : "/merchradar2.svg"}
      alt="MerchRadar Logo" 
      className="h-[120px] sm:h-[180px] lg:h-[220px] w-auto"
    />
  );
}
