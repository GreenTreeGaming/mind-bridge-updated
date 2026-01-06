"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        fixed bottom-6 right-6 z-50
        h-14 w-14
        rounded-full
        flex items-center justify-center
        bg-card/80 backdrop-blur-md
        border border-border
        shadow-xl shadow-black/10
        hover:scale-105 active:scale-95
        transition-all
      "
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-amber-400" />
      ) : (
        <Moon className="h-6 w-6 text-emerald-600" />
      )}
    </button>
  );
}
