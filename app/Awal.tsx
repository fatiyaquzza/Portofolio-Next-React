"use client";

import DarkVeil from "./components/DarkVeil/DarkVeil";
import Lanyard from "./components/Lanyard/Lanyard";
import TextType from "./components/TextType/TextType";
import { ChevronDown, Download } from "lucide-react";
import { useEffect, useState } from "react";

export default function Awal() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#131320] md:h-screen"
      id="home"
    >
      <div className="absolute inset-0">
        <DarkVeil />
      </div>
      <div className="relative z-10 grid min-h-[100svh] grid-cols-1 grid-rows-[auto_46svh] items-center gap-y-4 bg-transparent px-5 pb-4 pt-28 sm:grid-rows-[auto_50svh] sm:gap-y-6 sm:px-8 md:h-full md:min-h-0 md:grid-cols-12 md:grid-rows-1 md:gap-y-0 md:px-0 md:py-0">
        <div className="relative order-2 h-full min-h-0 md:order-1 md:col-span-5 md:pr-10">
          <Lanyard position={[0, 0, 14]} gravity={[0, -90, 0]} />
        </div>
        <div className="relative order-1 flex min-h-0 items-center md:order-2 md:col-span-6 md:px-0">
          <div className="mx-auto w-full max-w-2xl md:mx-0">
            <div className="mb-3 flex items-center gap-2.5 sm:mb-4 md:mb-5">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8D78FF] opacity-50 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9B89FF] shadow-[0_0_12px_rgba(155,137,255,0.9)]" />
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A999FF] sm:text-xs">
                Available for freelance
              </p>
            </div>
            <h1 className="max-w-[680px] text-balance text-[clamp(2rem,8vw,2.75rem)] font-bold leading-tight text-white sm:text-5xl md:text-5xl">
              Hi, I am{" "}
              <span className="bg-gradient-to-r from-[#7257FF] via-[#8D78FF] to-[#D8D1FF] bg-clip-text text-transparent">
                Fatiya Quzza
              </span>
            </h1>
            <div className="mt-2 min-h-9 max-w-[620px] text-pretty text-lg font-semibold leading-tight text-[#8F8AA8] sm:mt-3 sm:min-h-10 sm:text-xl md:min-h-12 md:text-2xl">
              <TextType
                text={[
                  "Web Developer",
                  "Fullstack Developer",
                  "Mobile & Web Developer",
                ]}
                typingSpeed={60}
                pauseDuration={700}
                showCursor={true}
                cursorCharacter="|"
                textColors={["#8F8AA8"]}
              />
            </div>
            <p className="mt-4 max-w-[560px] text-pretty text-xs leading-5 text-[#B2ADBE] sm:text-sm sm:leading-7 md:mt-5">
              Architecting seamless digital experiences with a focus on clean
              code, user-friendly interfaces, and reliable functionality.
              Transforming ideas into elegant mobile and web solutions.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-7 md:mt-8">
              <a
                href="/Fatiya-Quzza-CV.pdf"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-[#7257FF]/20 px-5 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_36px_rgba(43,7,128,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#9B89FF]/45 hover:bg-[#7257FF]/30 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_16px_42px_rgba(114,87,255,0.25)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/30 active:translate-y-0 sm:px-6 sm:py-3"
              >
                <span
                  className="pointer-events-none absolute -right-7 -top-8 h-20 w-20 rounded-full bg-[#D8D1FF]/15 blur-2xl transition-colors duration-300 group-hover:bg-[#D8D1FF]/25"
                  aria-hidden="true"
                />
                <Download className="relative h-4 w-4" />
                <span className="relative">Download CV</span>
              </a>

              <div className="flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/fatiyaquzza/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#D8D5E1] backdrop-blur-lg transition duration-300 hover:-translate-y-0.5 hover:border-[#8D78FF]/40 hover:bg-[#7257FF]/15 hover:text-[#B7AAFF] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/25 active:translate-y-0"
              >
                <svg
                  role="img"
                  width="20"
                  className="fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Instagram</title>
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/fatiya-quzza-40310921a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#D8D5E1] backdrop-blur-lg transition duration-300 hover:-translate-y-0.5 hover:border-[#8D78FF]/40 hover:bg-[#7257FF]/15 hover:text-[#B7AAFF] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/25 active:translate-y-0"
              >
                <svg
                  role="img"
                  width="20"
                  className="fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>LinkedIn</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://github.com/fatiyaquzza"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#D8D5E1] backdrop-blur-lg transition duration-300 hover:-translate-y-0.5 hover:border-[#8D78FF]/40 hover:bg-[#7257FF]/15 hover:text-[#B7AAFF] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8D78FF]/25 active:translate-y-0"
              >
                <svg
                  role="img"
                  width="20"
                  className="fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#skills"
        aria-label="Scroll to skills section"
        className={`group absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-[#A9A4BC] transition-all duration-500 ease-out hover:text-white focus:outline-none focus-visible:text-white md:flex motion-reduce:duration-0 ${
          showScrollHint
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <span className="text-[10px] font-medium tracking-[0.12em]">
          Scroll to explore
        </span>
        <span className="h-4 w-px bg-current opacity-50 transition-all duration-300 group-hover:h-5" />
        <ChevronDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}
