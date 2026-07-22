import { ScrollReveal } from "./ScrollReveal";

export function About() {
  return (
    <ScrollReveal id="about" className="bg-background py-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[32px] leading-[1.1] font-semibold text-foreground">
            We are <span className="text-primary">Joe Yoke</span> — the ultimate
            social gaming app connecting you through{" "}
            <span className="text-muted">multiplayer hits and chat</span> so you
            can hang out, compete, and have fun with friends anywhere.
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
