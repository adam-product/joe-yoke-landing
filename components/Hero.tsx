import Image from "next/image";
import { ArrowRight } from "./icons";

const HEADLINE = [
  { text: "The games", accent: false },
  { text: "bring you in, but", accent: false },
  { text: "the friendships", accent: true },
  { text: "keep you here.", accent: false },
];

export function Hero() {
  // UPDATED: Removed 'min-h-screen' and 'justify-end'. 
  // Added 'min-h-[70vh]' and 'justify-center' to let it size naturally and prevent overlap.
  return (
    <section
      id="hero"
      className="relative w-full min-h-[70vh] flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span
          className="text-foreground/[0.04] font-bold leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(80px, 18vw, 220px)", letterSpacing: "-0.04em" }}
        >
          Joe Yoke
        </span>
      </div>

      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-background" />
        <canvas
          id="hero-canvas"
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        />
      </div>

      <div className="hero-floating-icons" aria-hidden="true">
        <Image
          src="https://c.animaapp.com/mrunjrpflmlC0l/img/uploaded-asset-1784664263909-0.png"
          alt=""
          width={430}
          height={430}
          className="hero-icon hero-icon-float"
        />
      </div>

      <div className="relative z-10 w-full px-6 py-12 flex flex-col gap-8">
        <div className="hero-headline flex flex-col gap-0">
          {HEADLINE.map((line) => (
            <div className="hero-headline-line" key={line.text}>
              <h1
                className={`hero-headline-text font-bold ${
                  line.accent ? "text-primary" : "text-foreground"
                }`}
                style={{ fontSize: "clamp(36px, 8vw, 96px)" }}
              >
                {line.text}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <a href="#portfolio" className="engage-card">
            <div className="engage-card-copy">
              <span className="engage-card-title">Play Games</span>
            </div>
            <span className="engage-card-arrow" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/20 z-10" />
    </section>
  );
}