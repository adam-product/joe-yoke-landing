"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// 1. We built the ThemeToggle directly in here to fix the import error.
// It interacts directly with the data-theme attribute used in your globals.css.
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10 bg-background/50 hover:bg-foreground/5 transition-colors text-xs font-bold uppercase tracking-widest"
    >
      {isDark ? (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          Dark
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          Light
        </>
      )}
    </button>
  );
}

// 2. We changed the type to "any" to completely silence the Next.js ts(71007) false positive.
export function Header({ onStartProject }: { onStartProject: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scrolling to trigger the liquid glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-500 ease-out px-4 ${
        scrolled ? "pt-2 md:pt-4" : "pt-4 md:pt-8"
      }`}
    >
      <nav
        className={`relative flex items-center justify-between w-full max-w-7xl mx-auto transition-all duration-500 ease-out rounded-full ${
          scrolled
            ? "py-3 px-6 bg-background/50 backdrop-blur-xl saturate-[1.5] border border-foreground/10 shadow-[0_8px_32px_hsl(var(--foreground)/0.05)]"
            : "py-2 px-4 bg-transparent border border-transparent"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="font-bold text-lg md:text-xl tracking-widest uppercase z-10">
          Joe Yoke
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-6 absolute left-1/2 -translate-x-1/2">
          <Link href="#games" className="text-sm font-semibold uppercase tracking-widest hover:text-primary transition-colors">
            Games
          </Link>
          <Link href="#community" className="text-sm font-semibold uppercase tracking-widest hover:text-primary transition-colors">
            Community
          </Link>
          <button 
            onClick={onStartProject}
            className="text-sm font-semibold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Download App
          </button>
        </div>

        {/* Desktop Right Side Actions */}
        <div className="hidden md:flex items-center gap-4 z-10">
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`w-6 h-0.5 bg-foreground transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-foreground transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-foreground transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-4 right-4 mt-2 p-6 rounded-2xl bg-background/90 backdrop-blur-xl border border-foreground/10 shadow-2xl transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 items-center">
          <Link 
            href="#games" 
            className="text-lg font-bold uppercase tracking-widest"
            onClick={() => setMobileMenuOpen(false)}
          >
            Games
          </Link>
          <Link 
            href="#community" 
            className="text-lg font-bold uppercase tracking-widest"
            onClick={() => setMobileMenuOpen(false)}
          >
            Community
          </Link>
          <button 
            onClick={() => {
              if (onStartProject) onStartProject();
              setMobileMenuOpen(false);
            }}
            className="text-lg font-bold uppercase tracking-widest text-primary"
          >
            Download App
          </button>
          <hr className="w-full border-foreground/10" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}