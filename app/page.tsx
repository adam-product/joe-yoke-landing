import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";

const FEATURED_GAMES = [
  { title: "Neon Rush", genre: "Racing", color: "from-primary/20", border: "border-primary/50", accent: "text-primary" },
  { title: "Shadow Arena", genre: "PvP Strategy", color: "from-secondary/20", border: "border-secondary/50", accent: "text-secondary" },
  { title: "Cyber Strike", genre: "FPS", color: "from-tertiary/20", border: "border-tertiary/50", accent: "text-tertiary" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-background text-neutral-900 dark:text-white pt-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-5 py-32 text-center sm:px-8 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[150px] rounded-full pointer-events-none -z-10 hidden dark:block" />
        
        <h1 className="font-heading text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
          Play Games. <br />
          <span className="text-primary dark:drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">Earn Rewards.</span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-300 mb-10">
          The ultimate gamification platform. Dominate the leaderboards, connect with the community, and turn your killstreaks into real-world prizes.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#games" className="w-full sm:w-auto px-8 py-4 bg-primary text-background font-bold rounded-full text-lg dark:shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:scale-105 transition-transform">
            Start Playing Free
          </Link>
          <Link href="#community" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-black/20 dark:border-white/20 font-bold rounded-full text-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            Join the Guild
          </Link>
        </div>
      </section>

      {/* Featured Games Section */}
      <section id="games" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">Trending Now</h2>
          <Link href="#" className="text-tertiary hover:underline font-semibold">View All →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURED_GAMES.map((game, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl border bg-white dark:bg-transparent dark:bg-gradient-to-b ${game.color} to-transparent border-black/10 dark:${game.border} p-1 transition-transform hover:-translate-y-2 cursor-pointer group shadow-sm dark:shadow-none`}>
              <div className="h-48 w-full bg-neutral-200 dark:bg-black/40 rounded-xl mb-4 group-hover:bg-neutral-300 dark:group-hover:bg-black/20 transition-colors" />
              <div className="p-4">
                <span className={`font-mono text-xs uppercase tracking-widest ${game.accent}`}>{game.genre}</span>
                <h3 className="font-heading text-2xl font-bold mt-1">{game.title}</h3>
                <button className="mt-4 w-full py-2 bg-black/5 dark:bg-white/10 rounded-lg font-semibold hover:bg-black/10 dark:hover:bg-white/20 transition-colors">Play Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/20">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-4xl font-bold mb-4">Take Joe Yoke Anywhere</h2>
            <p className="max-w-md text-neutral-600 dark:text-neutral-400 mb-8">
              Keep your streaks alive. Download the mobile app to manage rewards, chat with your guild, and play on the go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">App Store</button>
              <button className="px-6 py-3 bg-secondary text-white font-bold rounded-full hover:bg-secondary/80 transition-colors dark:shadow-[0_0_15px_rgba(255,159,10,0.4)]">Google Play</button>
            </div>
          </div>
          <div className="w-64 h-64 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl flex items-center justify-center p-8 shadow-xl dark:shadow-2xl relative">
             <div className="absolute inset-0 bg-tertiary/20 blur-[80px] rounded-full pointer-events-none hidden dark:block" />
             <Image src="/logo-nav.jpg" alt="Joe Yoke App" width={150} height={150} className="animate-bounce rounded-2xl" />
          </div>
        </div>
      </section>
    </main>
  );
}