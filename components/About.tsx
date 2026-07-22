import { ScrollReveal } from "./ScrollReveal";

export function About() {
  return (
    <ScrollReveal 
      id="about" 
      // Enforced relative block layout to prevent text from overlapping the PillBand
      className="relative block w-full bg-background py-12 md:py-20 z-10"
    >
      <div className="w-full text-center px-4">
        <p className="text-[clamp(24px,4vw,36px)] leading-[1.3] md:leading-[1.2] font-semibold text-foreground max-w-4xl mx-auto">
          We are <span className="text-primary font-bold">Joe Yoke</span> — the ultimate
          social gaming app connecting you through{" "}
          <span className="text-neutral-400 font-bold">multiplayer hits and chat</span> so you
          can hang out, compete, and have fun with friends anywhere.
        </p>
      </div>
    </ScrollReveal>
  );
}