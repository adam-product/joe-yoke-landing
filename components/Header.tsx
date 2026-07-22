"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, MoonStar, X, Menu, ArrowRight } from "./icons";

const NAV_LINKS = [
  { href: "#portfolio", label: "Games" },
  { href: "#services", label: "Community" },
];

const MENU_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#stats", label: "Stats" },
  { href: "#footer", label: "Contact" },
];

export function Header({ onStartProject }: { onStartProject?: () => void }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none">
        <div
          className={`w-full max-w-5xl transition-all duration-500 ease-out pointer-events-auto rounded-full ${
            isScrolled
              ? "bg-background/40 dark:bg-background/60 backdrop-blur-2xl saturate-150 border border-foreground/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-2.5 px-6"
              : "bg-background/20 backdrop-blur-md border border-foreground/5 py-3.5 px-6"
          }`}
        >
          <nav className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <a href="#hero" className="font-bold text-sm md:text-base tracking-widest uppercase text-foreground">
              Joe Yoke
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden sm:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#footer"
                className="text-xs font-semibold uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors"
              >
                Download App
              </a>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Toggle dark mode"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-foreground/15 bg-background/50 text-xs font-bold uppercase tracking-widest hover:bg-foreground/5 transition-all"
              >
                {isDark ? <MoonStar /> : <Sun />}
                <span className="hidden xs:inline">{isDark ? "Dark" : "Light"}</span>
              </button>

              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="sm:hidden inline-flex items-center justify-center h-8 w-8 rounded-full border border-foreground/15 text-foreground"
              >
                <Menu size={16} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <section
        id="menu-overlay"
        className={`fixed inset-0 z-[200] bg-background flex-col ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6">
          <span className="text-foreground text-lg font-semibold tracking-wide uppercase">
            Joe Yoke
          </span>
          <button
            type="button"
            aria-label="Close menu"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-sm font-medium uppercase tracking-widest">
              Close
            </span>
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
          {MENU_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between border-b border-foreground/10 py-5 text-foreground hover:text-primary transition-colors"
            >
              <span className="text-2xl font-bold tracking-tight">
                {link.label}
              </span>
              <ArrowRight size={22} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </nav>
      </section>
    </>
  );
}