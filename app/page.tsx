import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";

const FEATURED_GAMES = [
  { 
    title: "Neon Rush", 
    genre: "Racing & Speed", 
    color: "from-primary/20", 
    border: "dark:border-primary/40 border-neutral-200", 
    accent: "text-neutral-600 dark:text-primary",
    bgPattern: "bg-gradient-to-br from-[#CCFF00]/40 to-neutral-900"
  },
  { 
    title: "Shadow Arena", 
    genre: "PvP Strategy", 
    color: "from-secondary/20", 
    border: "dark:border-secondary/40 border-neutral-200", 
    accent: "text-neutral-600 dark:text-secondary",
    bgPattern: "bg-gradient-to-br from-[#FF9F0A]/40 to-neutral-900"
  },
  { 
    title: "Cyber Strike", 
    genre: "FPS / Action", 
    color: "from-tertiary/20", 
    border: "dark:border-tertiary/40 border-neutral-200", 
    accent: "text-neutral-600 dark:text-tertiary",
    bgPattern: "bg-gradient-to-br from-[#00F0FF]/40 to-neutral-900"
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-background text-neutral-900 dark:text-white transition-colors duration-200 pt-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-5 py-32 text-center sm:px-8 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/10 dark:bg-primary/20 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <h1 className="font-heading text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 text-neutral-900 dark:text-white">
          Play Games. <br />
          <span className="text-neutral-900 dark:text-primary dark:drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">Earn Rewards.</span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-300 mb-10">
          The ultimate gamification platform. Dominate the leaderboards, connect with the community, and turn your killstreaks into real-world prizes.
        </p>
        
        {/* Issue #4 Fixed: Centered layout with adjusted button label */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link href="#games" className="w-full sm:w-auto px-8 py-4 bg-primary text-[#0B192C] font-bold rounded-full text-lg shadow-md transition-transform hover:scale-105 text-center">
            Start Playing Free
          </Link>
          <Link href="#games" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-transparent border border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white font-bold rounded-full text-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-center">
            Explore our games
          </Link>
        </div>
      </section>

      {/* Featured Games Section */}
      <section id="games" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">Trending Now</h2>
          <Link href="#" className="text-neutral-600 dark:text-tertiary hover:underline font-semibold">View All →</Link>
        </div>

        {/* Issue #5 Fixed: Premium Custom Styled Thumbnail Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURED_GAMES.map((game, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl border bg-white dark:bg-neutral-900/40 p-3 transition-transform hover:-translate-y-2 cursor-pointer group shadow-sm ${game.border}`}>
              <div className={`h-48 w-full rounded-xl mb-4 relative overflow-hidden flex items-center justify-center ${game.bgPattern}`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <span className="text-4xl filter drop-shadow-md">🎮</span>
              </div>
              <div className="px-2 pb-2">
                <span className={`font-mono text-xs uppercase tracking-widest font-bold ${game.accent}`}>{game.genre}</span>
                <h3 className="font-heading text-2xl font-bold mt-1 text-neutral-900 dark:text-white">{game.title}</h3>
                <button className="mt-4 w-full py-2.5 bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white rounded-lg font-semibold hover:bg-neutral-200 dark:hover:bg-white/20 transition-colors">Play Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="border-t border-neutral-200 dark:border-white/10 bg-neutral-100/50 dark:bg-black/20 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Take Joe Yoke Anywhere</h2>
            <p className="max-w-md text-neutral-600 dark:text-neutral-400 mb-8">
              Keep your streaks alive. Download the mobile app to manage rewards, chat with your guild, and play on the go.
            </p>
            
            {/* Issue #6 Fixed: Accurate Button Brand Layout with Inline SVG Icons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="flex items-center justify-center gap-3 px-6 py-3 bg-neutral-900 text-white dark:bg-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity shadow-sm">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
                </svg>
                <span>App Store</span>
              </button>
              
              <button className="flex items-center justify-center gap-3 px-6 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 transition-colors shadow-lg shadow-orange-500/20">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M5.25 3.062c-.287.29-.447.747-.447 1.34v15.195c0 .593.16 1.05.448 1.34l.073.07 8.544-8.545v-.126L5.323 2.992l-.073.07zM17.67 15.483l-3.796-3.797v-.128l3.797-3.796.09.052 4.478 2.544c1.28.724 1.28 1.914 0 2.64l-4.478 2.543-.09.042zM13.25 11.056L5.87 3.677c.4-.422 1.066-.464 1.823-.035l8.775 4.986-3.218 3.218v-.79zM13.25 12.944l3.218 3.218-8.775 4.986c-.757.43-1.422.387-1.823-.035l7.38-7.37z"/>
                </svg>
                <span>Google Play</span>
              </button>
            </div>
          </div>
          
          <div className="w-64 h-64 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-3xl flex items-center justify-center p-8 shadow-xl relative">
             <div className="absolute inset-0 bg-tertiary/10 dark:bg-tertiary/20 blur-[80px] rounded-full pointer-events-none" />
             <Image src="/logo-nav.jpg" alt="Joe Yoke App" width={150} height={150} className="animate-bounce rounded-3xl" />
          </div>
        </div>
      </section>
    </main>
  );
}