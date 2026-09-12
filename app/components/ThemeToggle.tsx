"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <button type="button" onClick={() => setTheme(document.documentElement.classList.contains("light") ? "dark" : "light")}
      className="theme-toggle grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background/80 text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
      <Sun className="theme-dark-only h-5 w-5" aria-hidden="true" />
      <Moon className="theme-light-only h-5 w-5" aria-hidden="true" />
      <span className="sr-only theme-dark-only">Switch to light mode</span>
      <span className="sr-only theme-light-only">Switch to dark mode</span>
    </button>
  );
}
