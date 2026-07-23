"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, MoonStar, X, Menu, ArrowRight } from "./icons";

const NAV_LINKS = [
  { href: "#games", label: "Games" },
  { href: "#community", label: "Community" },
];

export function Header({ onStartProject }: { onStartProject?: () => void }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [goo, setGoo] = useState({ left: 0, width: 0, opacity: 0 });
  const itemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => movePill(0), 100);
  }, []);

  const movePill = (index: number) => {
    const el = itemRefs.current[index];
    const nav = navRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setGoo({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
  };

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[100] w-full pt-4 md:pt-6 px-6 md:px-12 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* 1. BRAND (Left) */}
          <div className="w-32 flex-shrink-0">
            <a href="#hero" className="font-extrabold text-sm md:text-base uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity">
              Joe Yoke
            </a>
          </div>

          {/* 2. NAVIGATION PILL (Center) */}
          <nav 
            ref={navRef}
            className="hidden md:flex relative items-center bg-background/60 backdrop-blur-xl border border-foreground/10 rounded-full p-1.5 shadow-sm"
            onMouseLeave={() => movePill(activeIndex)}
          >
            {/* Sliding Green Highlight */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[calc(100%-12px)] rounded-full bg-primary transition-all duration-300 ease-out z-0"
              style={{
                left: `${goo.left}px`,
                width: `${goo.width}px`,
                opacity: goo.opacity,
              }}
            />

            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                ref={(el) => { itemRefs.current[i] = el; }}
                href={link.href}
                onClick={() => { setActiveIndex(i); movePill(i); }}
                onMouseEnter={() => movePill(i)}
                className={`relative z-10 px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                  activeIndex === i ? "text-primary-foreground" : "text-foreground hover:text-foreground/70"
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              ref={(el) => { itemRefs.current[NAV_LINKS.length] = el; }}
              onClick={() => {
                setActiveIndex(NAV_LINKS.length);
                movePill(NAV_LINKS.length);
                if (onStartProject) onStartProject();
              }}
              onMouseEnter={() => movePill(NAV_LINKS.length)}
              className={`relative z-10 px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                activeIndex === NAV_LINKS.length ? "text-primary-foreground" : "text-foreground hover:text-foreground/70"
              }`}
            >
              Download App
            </button>
          </nav>

          {/* 3. THEME TOGGLE (Right) */}
          <div className="w-32 flex-shrink-0 flex justify-end items-center gap-3">
            <button
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-background/60 backdrop-blur-xl border border-foreground/10 text-foreground hover:bg-foreground/5 transition-all text-[10px] font-extrabold uppercase tracking-widest shadow-sm"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? <MoonStar size={14} /> : <Sun size={14} />}
              <span>{isDark ? "Dark" : "Light"}</span>
            </button>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-background/60 backdrop-blur-xl border border-foreground/10 text-foreground"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      <section
        className={`fixed inset-0 z-[200] bg-background flex-col transition-opacity duration-300 ${
          menuOpen ? "flex opacity-100" : "hidden opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="text-foreground text-lg font-bold tracking-widest uppercase">Joe Yoke</span>
          <button onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-foreground">
            <span className="text-xs font-bold uppercase tracking-widest">Close</span>
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="group flex items-center justify-between border-b border-foreground/10 py-5 text-foreground">
              <span className="text-3xl font-bold tracking-tight">{link.label}</span>
              <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </nav>
      </section>
    </>
  );
}