"use client";
import Lanyard from "./components/Lanyard/Lanyard";
// import {
//   Navbar,
//   NavBody,
//   NavItems,
//   MobileNav,
//   NavbarLogo,
//   NavbarButton,
//   MobileNavHeader,
//   MobileNavToggle,
//   MobileNavMenu,
// } from "./components/ui/resizeable-navbar";
import { useState } from "react";
import DarkVeil from "./components/DarkVeil/DarkVeil";

export default function Home() {
  const navItems = [
    {
      name: "Home",
      link: "#Home",
    },
    {
      name: "About",
      link: "#About",
    },
    {
      name: "Projects",
      link: "#Projects",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-[200vh] overflow-x-hidden bg-[#131320] scroll-smooth">
      {/* <div className="mt-4 border-1 border-[#ffffff5c] mx-16 py-2">
        <Navbar>
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              <NavbarButton variant="primary">Hire for work</NavbarButton>
            </div>
          </NavBody>

          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
              <div className="flex w-full flex-col gap-4">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Book a call
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div> */}

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
            <a href="#About" className="hover:text-[#6184DC] transition">
              About
            </a>
            <a href="#project" className="hover:text-[#6184DC] transition">
              Project
            </a>
            <a href="#contact" className="hover:text-[#6184DC] transition">
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto h-screen bg-[#131320] " id="home">
        <div className="grid grid-cols-12 bg-[#131320]">
          <DarkVeil />
          <div className="col-span-5">
            <Lanyard position={[0, 0, 14]} gravity={[0, -90, 0]} />
          </div>
          <div className="col-span-4 flex justify-center items-center">
            <h1 className="text-semibold text-white mx-auto text-5xl">
              Hi, i am Fatiya Quzza
            </h1>
          </div>
        </div>
      </div>

      <div id="About" className="mx-auto h-screen bg-blue-300">
        <div className="grid grid-cols-12 ">
          <div className="col-span-6">
            <Lanyard position={[0, 0, 17]} gravity={[0, -80, 0]} />
          </div>
          <div className="col-span-6"></div>
        </div>
      </div>
    </div>
  );
}
