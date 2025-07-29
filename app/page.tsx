"use client";
import Lanyard from "./components/Lanyard/Lanyard";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./components/ui/resizeable-navbar";
import { useState } from "react";

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
      <div className="mt-4 border-1 border-[#ffffff5c] mx-16 py-2">
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              <NavbarButton variant="primary">Hire for work</NavbarButton>
            </div>
          </NavBody>

          {/* Mobile Navigation */}
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
      </div>
      <div className="mx-auto h-screen bg-[#131320]">
        <div className="grid grid-cols-12 bg-[#131320]">
          <div className="col-span-4">
            <Lanyard position={[0, 0, 14]} gravity={[0, -90, 0]} />
          </div>
          <div className="col-span-6"></div>
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
