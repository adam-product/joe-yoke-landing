import Image from "next/image";
import { ArrowRight } from "./icons";

const HEADLINE = [
  { text: "The games", accent: false },
  { text: "bring you in, but", accent: false },
  { text: "the friendships", accent: true },
  { text: "keep you here.", accent: false },
];

export function Hero() {
  return (
    <section id="hero" className="relative w-full flex flex-col justify-center min-h-[70vh] mt-[130px]">
      <div className="hero-floating-icons" aria-hidden="true">
        <Image
          src="https://c.animaapp.com/mrunjrpflmlC0l/img/uploaded-asset-1784664263909-0.png"
          alt="3D Floating Pyramid"
          width={480}
          height={480}
          className="hero-icon-float"
          priority
        />
      </div>

      <div className="relative z-10 w-full flex flex-col gap-8 md:w-[70%]">
        <div className="flex flex-col gap-0">
          {HEADLINE.map((line) => (
            <h1
              key={line.text}
              className={`font-extrabold tracking-tighter leading-[1.02] ${
                line.accent ? "text-primary" : "text-foreground"
              }`}
              style={{ fontSize: "clamp(42px, 7.5vw, 110px)" }}
            >
              {line.text}
            </h1>
          ))}
        </div>

        <div className="mt-4">
          <a href="#portfolio" className="engage-card">
            <span className="engage-card-title">Play Games</span>
            <span className="engage-card-arrow" aria-hidden="true">
              <ArrowRight size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}