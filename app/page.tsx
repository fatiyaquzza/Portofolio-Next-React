"use client";

import Awal from "./components/Pages/Awal";
import Cform from "./components/Pages/Cform";
import Contact from "./components/Pages/Contact";
import Experience from "./components/Pages/Experience";
import Last from "./components/Pages/Last";
import Project from "./components/Pages/Project";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="min-h-[200vh] overflow-x-hidden bg-[#131320] scroll-smooth ">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] w-full px-4">
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 px-8 py-3 rounded-full flex items-center justify-between max-w-screen-lg mx-auto">
          {/* Left: Logo */}
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

          {/* Right: Menu */}
          <div className="hidden md:flex gap-6 text-white text-sm font-medium">
            <a href="#home" className="hover:text-[#6184DC] transition">
              Home
            </a>
            <a href="#experience" className="hover:text-[#6184DC] transition">
              Experience
            </a>
            <a href="#Project" className="hover:text-[#6184DC] transition">
              Project
            </a>
            <a href="#contact" className="hover:text-[#6184DC] transition">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/5 backdrop-blur-lg border border-white/10 rounded-md mt-2 py-2 px-4 space-y-2 text-white text-sm font-medium">
            <a href="#home" className="block hover:text-[#6184DC] transition" onClick={toggleMenu}>
              Home
            </a>
            <a href="#experience" className="block hover:text-[#6184DC] transition" onClick={toggleMenu}>
              Experience
            </a>
            <a href="#Project" className="block hover:text-[#6184DC] transition" onClick={toggleMenu}>
              Project
            </a>
            <a href="#contact" className="block hover:text-[#6184DC] transition" onClick={toggleMenu}>
              Contact
            </a>
          </div>
        )}
      </div>

      <Awal />

      <Experience />

      <Project />

      <Contact />

      <Cform />
    </div>
  );
}
