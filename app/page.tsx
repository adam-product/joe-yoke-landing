import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";

const FEATURED_GAMES = [
  { 
    title: "Neon Rush", 
    genre: "Racing & Speed", 
    accent: "text-primary",
    border: "hover:border-primary/50 dark:hover:border-primary/50",
    bgPattern: "bg-gradient-to-br from-primary/20 to-transparent"
  },
  { 
    title: "Shadow Arena", 
    genre: "PvP Strategy", 
    accent: "text-secondary",
    border: "hover:border-secondary/50 dark:hover:border-secondary/50",
    bgPattern: "bg-gradient-to-br from-secondary/20 to-transparent"
  },
  { 
    title: "Cyber Strike", 
    genre: "FPS / Action", 
    accent: "text-tertiary",
    border: "hover:border-tertiary/50 dark:hover:border-tertiary/50",
    bgPattern: "bg-gradient-to-br from-tertiary/20 to-transparent"
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-primary selection:text-[#0B192C]">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/20 dark:bg-tertiary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <Navbar />
      
      <main className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-8 mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Powered by Joe Yoke AI
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.1]">
            Play Games. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
              Earn Rewards.
            </span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-body">
            The ultimate gamification platform. Dominate the leaderboards, connect with the community, and turn your killstreaks into real-world prizes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <Link href="#games" className="w-full sm:w-auto px-8 py-4 bg-primary text-[#0B192C] font-bold font-mono text-sm uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] hover:-translate-y-1 transition-all text-center">
              Start Playing Free
            </Link>
            <Link href="#games" className="w-full sm:w-auto px-8 py-4 bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white font-bold font-mono text-sm uppercase tracking-wider rounded-xl hover:bg-black/5 dark:hover:bg-white/10 hover:-translate-y-1 transition-all backdrop-blur-md text-center">
              Explore our games
            </Link>
          </div>
        </section>

        {/* Bento Grid - Trending Games */}
        <section id="games" className="space-y-8">
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">Trending Now</h2>
            <Link href="#" className="font-mono text-sm font-semibold text-neutral-500 hover:text-primary transition-colors hidden sm:block">View All Directory →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_GAMES.map((game, i) => (
              <div key={i} className={`group relative flex flex-col justify-between p-6 h-80 rounded-3xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${game.border} overflow-hidden cursor-pointer`}>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${game.bgPattern}`} />
                
                <div className="relative z-10 flex justify-between items-start">
                  <span className={`font-mono text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/5 dark:bg-black/50 backdrop-blur-md ${game.accent}`}>
                    {game.genre}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-neutral-900 dark:text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="font-heading text-3xl font-bold mb-2 text-neutral-900 dark:text-white">{game.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 font-body">Immerse yourself in next-gen gameplay and climb the global ranks.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="relative overflow-hidden rounded-[2.5rem] bg-neutral-900 dark:bg-white/5 border border-black/10 dark:border-white/10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 text-white">
          <div className="absolute right-0 top-0 w-full md:w-1/2 h-full bg-gradient-to-l from-secondary/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left flex-1">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">Take Joe Yoke Anywhere</h2>
            <p className="max-w-md text-neutral-400 mb-8 font-body mx-auto md:mx-0">
              Keep your streaks alive. Download the mobile app to manage rewards, chat with your guild, and play on the go.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-black font-bold font-mono text-sm uppercase rounded-xl hover:bg-neutral-200 transition-colors shadow-lg">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/></svg>
                App Store
              </button>
              
              <button className="flex items-center justify-center gap-3 px-6 py-4 bg-secondary text-white font-bold font-mono text-sm uppercase rounded-xl hover:bg-secondary/90 transition-colors shadow-[0_0_20px_rgba(255,159,10,0.3)]">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M5.25 3.062c-.287.29-.447.747-.447 1.34v15.195c0 .593.16 1.05.448 1.34l.073.07 8.544-8.545v-.126L5.323 2.992l-.073.07zM17.67 15.483l-3.796-3.797v-.128l3.797-3.796.09.052 4.478 2.544c1.28.724 1.28 1.914 0 2.64l-4.478 2.543-.09.042zM13.25 11.056L5.87 3.677c.4-.422 1.066-.464 1.823-.035l8.775 4.986-3.218 3.218v-.79zM13.25 12.944l3.218 3.218-8.775 4.986c-.757.43-1.422.387-1.823-.035l7.38-7.37z"/></svg>
                Google Play
              </button>
            </div>
          </div>
          
          <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-[2rem] p-6 shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
             <Image src="/logo-nav.jpg" alt="Joe Yoke App" width={160} height={160} className="rounded-2xl shadow-inner" />
          </div>
        </section>
      </main>
    </div>
  );
}