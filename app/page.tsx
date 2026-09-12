"use client";

import { useEffect, useState } from "react";
import AosInitializer from "./components/AosInitializer";
import Cform from "./Cform";
import Contact from "./Contact";
import Experience from "./Experience";
import HomeAboutTransition from "./HomeAboutTransition";
import Project from "./Project";
import TechStack from "./TechStack";
import ThemeToggle from "./components/ThemeToggle";

const navigation = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Project", "#project"],
  ["Contact", "#contact"],
] as const;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  const scrollTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-surface-section">
      <a href="#main-content" className="fixed left-4 top-3 z-[2000] -translate-y-20 rounded-lg bg-white px-4 py-2 font-semibold text-black transition focus:translate-y-0">
        Skip to content
      </a>
      <AosInitializer />
      <header className="fixed left-1/2 top-6 z-[999] w-full -translate-x-1/2 px-4">
        <nav aria-label="Primary navigation" className="theme-shadow mx-auto flex max-w-screen-lg items-center justify-between rounded-full border border-contrast/10 bg-surface-navbar/75 px-6 py-3 shadow-lg backdrop-blur-xl sm:px-8">
          <a href="#home" className="flex min-h-11 items-center gap-2 font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B89FF]">
            <svg aria-hidden="true" className="h-5 w-5 text-[#6184DC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>
            FATIYA.
          </a>

          <div className="hidden gap-4 text-sm font-medium text-foreground md:flex">
            {navigation.map(([label, href]) => <a key={href} href={href} className="rounded-sm transition hover:text-theme-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9B89FF]">{label}</a>)}
          </div>

          <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid min-h-11 min-w-11 place-items-center rounded-full text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B89FF] md:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          </div>
        </nav>

        {isMenuOpen && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="theme-shadow mx-auto mt-2 max-w-screen-lg space-y-1 rounded-2xl border border-contrast/10 bg-surface-navbar/95 p-3 text-sm font-medium text-foreground shadow-xl backdrop-blur-xl md:hidden">
            {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setIsMenuOpen(false)} className="block min-h-11 rounded-xl px-4 py-3 transition hover:bg-contrast/[0.06] hover:text-theme-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9B89FF]">{label}</a>)}
          </nav>
        )}
      </header>

      <main id="main-content">
        <HomeAboutTransition />
        <Experience />
        <TechStack />
        <Project />
        <Contact />
        <Cform />
      </main>

      {showTopButton && (
        <button type="button" onClick={scrollTop} className="theme-shadow fixed bottom-6 right-6 z-[1000] grid min-h-11 min-w-11 place-items-center rounded-full bg-[#6311E1] text-white shadow-lg transition hover:bg-[#7257FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B7AAFF] motion-reduce:animate-none text-white" aria-label="Scroll to top">
          <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
        </button>
      )}
    </div>
  );
}
