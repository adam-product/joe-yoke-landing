"use client";

import { useEffect, useRef, useState } from "react";
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


export function Header({ onStartProject }: { onStartProject: () => void }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const navCenterRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [gooStyle, setGooStyle] = useState({ x: 0, w: 82 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function syncNavVisibility() {
      setIsVisible(window.scrollY > 36);
    }
    syncNavVisibility();
    window.addEventListener("scroll", syncNavVisibility, { passive: true });
    return () => window.removeEventListener("scroll", syncNavVisibility);
  }, []);

  const moveTo = (index: number) => {
    const el = linkRefs.current[index];
    const center = navCenterRef.current;
    if (!el || !center) return;
    const centerRect = center.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setGooStyle({ x: rect.left - centerRect.left, w: rect.width });
    setActiveIndex(index);
  };

  // Hover preview: slides the goo pill to the hovered link without changing
  // which link is "active" — the active section is decided by scroll position
  // only, so the highlight always matches what's actually on screen.
  const moveGooOnly = (index: number) => {
    const el = linkRefs.current[index];
    const center = navCenterRef.current;
    if (!el || !center) return;
    const centerRect = center.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setGooStyle({ x: rect.left - centerRect.left, w: rect.width });
  };

  useEffect(() => {
    moveTo(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sectionIds = ["#portfolio", "#services", "#footer"];

    function syncActiveFromScroll() {
      const navHeight = 140;
      let idx = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.querySelector(sectionIds[i]);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= navHeight) {
          idx = i;
        }
      }
      moveTo(idx);
    }

    syncActiveFromScroll();
    window.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    window.addEventListener("resize", syncActiveFromScroll);
    return () => {
      window.removeEventListener("scroll", syncActiveFromScroll);
      window.removeEventListener("resize", syncActiveFromScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <>
      {/* 
        UPDATED: Swapped `<section>` for `<header>` and added z-[100], fixed positioning, 
        and strict backdrop blurs so content doesn't bleed through on scroll. 
      */}
      <header 
        id="header" 
        className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/80 dark:bg-[#0B192C]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 transition-all duration-300"
      >
        <svg width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <filter id="nav-gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -12"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
        <div className={`top-nav-wrap py-4 ${isVisible ? "is-visible" : ""}`}>
          <nav id="top-nav" className="top-nav">
            <a className="top-brand" href="#hero">
              Joe Yoke
            </a>
            <div
              ref={navCenterRef}
              className="top-nav-center"
              onMouseLeave={() => moveTo(activeIndex)}
            >
              <span
                className="nav-goo"
                style={{
                  transform: `translate3d(${gooStyle.x}px, -50%, 0)`,
                  width: `${Math.max(62, gooStyle.w)}px`,
                }}
              />
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  href={link.href}
                  className={`nav-link ${activeIndex === i ? "is-active" : ""}`}
                  onMouseEnter={() => moveGooOnly(i)}
                  onFocus={() => moveGooOnly(i)}
                >
                  {link.label}
                </a>
              ))}
              <a
                ref={(el) => {
                  linkRefs.current[NAV_LINKS.length] = el;
                }}
                href="#footer"
                className={`nav-cta ${
                  activeIndex === NAV_LINKS.length ? "is-active" : ""
                }`}
                onMouseEnter={() => moveGooOnly(NAV_LINKS.length)}
                onFocus={() => moveGooOnly(NAV_LINKS.length)}
              >
                Download App
              </a>
            </div>
            <button
              id="theme-toggle"
              className="theme-toggle rounded-theme-btn"
              type="button"
              aria-label="Toggle dark mode"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? <MoonStar /> : <Sun />}
              <span>{isDark ? "Dark" : "Light"}</span>
            </button>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="sm:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-foreground/14 text-foreground"
            >
              <Menu size={18} />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile / full menu overlay */}
      <section
        id="menu-overlay"
        className={`fixed inset-0 z-[200] bg-background flex-col ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6">
          <span className="text-foreground text-lg font-semibold tracking-wide">
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
            <X className="text-xl" size={22} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
          {MENU_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between border-b border-foreground/10 py-6 text-foreground hover:text-primary transition-colors"
            >
              <span className="text-3xl font-bold tracking-tight">
                {link.label}
              </span>
              <ArrowRight
                size={26}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </a>
          ))}
        </nav>

        <div className="px-8 py-6 flex items-center justify-between">
          <div className="flex gap-6">
            <a
              href="#"
              className="text-muted hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-muted hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-muted hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              LinkedIn
            </a>
          </div>
          <button
            type="button"
            className="bg-primary text-background font-semibold text-sm uppercase tracking-widest px-6 py-3 rounded-full rounded-theme-btn hover:opacity-90 transition-opacity"
            onClick={() => {
              setMenuOpen(false);
              onStartProject();
            }}
          >
            Start a Project
          </button>
        </div>
      </section>
    </>
  );
}