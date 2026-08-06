"use client";

import { useEffect } from "react";

export default function SpaThemeEnforcer() {
  useEffect(() => {
    // 1. Capture the exact theme state when we enter the Spa page
    const wasDark = document.documentElement.classList.contains("dark");
    const storedTheme = localStorage.getItem("theme");

    // 2. Force dark mode immediately
    document.documentElement.classList.add("dark");

    // 3. Restore the original theme when leaving the Spa page
    return () => {
      const originalTheme = storedTheme || (wasDark ? "dark" : "light");
      if (originalTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
  }, []);

  return null;
}
