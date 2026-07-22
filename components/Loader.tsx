"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function pad(n: number) {
  return String(Math.floor(n)).padStart(3, "0");
}

export function Loader() {
  const [count, setCount] = useState("000");
  const [logoVisible, setLogoVisible] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setLogoVisible(true);
    const duration = 2200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOut(progress);
      setCount(pad(eased * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount("100");
        setTimeout(() => {
          setSlideUp(true);
          setTimeout(() => setHidden(true), 900);
        }, 300);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (hidden) return null;

  return (
    <section
      id="loader"
      className={`fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden ${
        slideUp ? "slide-up" : ""
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <div
          id="loader-logo"
          className={`w-[49.8%] max-w-[255px] ${logoVisible ? "visible" : ""}`}
        >
          <Image
            src="https://c.animaapp.com/mrunjrpflmlC0l/img/joe-yoke-logo.png"
            alt="Joe Yoke logo"
            width={255}
            height={255}
            className="w-full h-auto"
            priority
          />
        </div>
        <div id="loader-counter" className="text-foreground font-bold">
          {count}
        </div>
      </div>
    </section>
  );
}
