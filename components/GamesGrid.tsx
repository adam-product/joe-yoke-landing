import { ScrollReveal } from "./ScrollReveal";
import { ArrowUpRight, ArrowRight } from "./icons";

const GAMES = [
  {
    tag: "Game — 2025",
    title: "Trivia Quest",
    description:
      "A competitive trivia game with real-time leaderboards and daily challenges.",
  },
  {
    tag: "Game — 2024",
    title: "Word Blitz",
    description:
      "Fast-paced word puzzle game with multiplayer modes and achievement systems.",
  },
  {
    tag: "Platform — 2023",
    title: "Reward Hub",
    description:
      "Gamification platform with points, badges, and reward redemption for brands.",
  },
  {
    tag: "Game — 2023",
    title: "Spin & Win",
    description:
      "Luck-based spin wheel game with customizable prizes and engagement analytics.",
  },
];

export function GamesGrid() {
  return (
    <ScrollReveal id="portfolio" className="bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-muted text-sm font-medium uppercase tracking-widest mb-2">
            Our Games
          </p>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Trending
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GAMES.map((game) => (
            <article
              key={game.title}
              className="bg-[#0a0a0a] rounded-[24px] p-6 flex flex-col justify-between min-h-[270px] border border-white/10 text-white"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="text-white/45 text-xs font-medium uppercase tracking-widest">
                  {game.tag}
                </span>
                <a
                  href="#"
                  aria-label={`View ${game.title} details`}
                  className="h-10 w-10 rounded-full bg-white/10 border border-white/10 inline-flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="space-y-4">
                <h3 className="text-white text-3xl font-bold leading-tight">
                  {game.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-[40ch]">
                  {game.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider"
                >
                  View Details <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
