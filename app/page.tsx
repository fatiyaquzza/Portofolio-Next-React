"use client";

import Awal from "./components/Pages/Awal";
import Contact from "./components/Pages/Contact";
import Last from "./components/Pages/Last";
import Project from "./components/Pages/Project";


export default function Home() {
  return (
    <div className="min-h-[200vh] overflow-x-hidden bg-[#131320] scroll-smooth ">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] w-full px-4">
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 px-8 py-3 rounded-full flex items-center justify-between max-w-screen-lg mx-auto">
          {/* Left: Logo /} */}
          <span className="text-white font-semibold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#6184DC]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6l4 2"
              />
            </svg>
            FATIYA.
          </span>

          {/* {/ Right: Menu */}
          <div className="flex gap-6 text-white text-sm font-medium">
            <a href="#home" className="hover:text-[#6184DC] transition">
              Home
            </a>
            <a href="#Project" className="hover:text-[#6184DC] transition">
              Project
            </a>
            <a href="#contact" className="hover:text-[#6184DC] transition">
              Contact
            </a>
          </div>
        </div>
      </div>

      <Awal />

      <Project />

      <Contact />

    </div>
  );
}
