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
      <div className="text-center">
        <h1 
          className="passero-one-regular text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          style={{
            color: '#171717',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          MerchRadar
        </h1>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 
        className="passero-one-regular text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
        style={{
          color: isDarkMode ? '#ededed' : '#171717',
          textShadow: isDarkMode 
            ? '2px 2px 4px rgba(255,255,255,0.1)' 
            : '2px 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        MerchRadar
      </h1>
    </div>
  );
}
