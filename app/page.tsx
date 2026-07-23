"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Sun } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("GAMES");

  const scrollToSection = (id: string, tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans antialiased relative selection:bg-[#c5ff00] selection:text-black">
      
      {/* 1. FLOATING HEADER PILL NAV */}
      <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto bg-white/90 backdrop-blur-md border border-zinc-200/80 rounded-full px-4 py-2.5 shadow-sm flex items-center justify-between w-full max-w-4xl text-xs font-bold uppercase tracking-wider">
          <div className="pl-3 font-extrabold text-sm tracking-tight flex items-center space-x-2">
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-[#c5ff00] rotate-45" />
            </div>
            <span>JOE YOKE</span>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 bg-zinc-100/80 rounded-full p-1 border border-zinc-200/50">
            {["GAMES", "COMMUNITY", "DOWNLOAD APP"].map((tab) => (
              <button
                key={tab}
                onClick={() => scrollToSection(tab.toLowerCase().split(' ')[0] + "-section", tab)}
                className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                  activeTab === tab ? "bg-[#c5ff00] text-black shadow-sm" : "text-zinc-600 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="flex items-center space-x-1 pr-3 text-zinc-500 hover:text-black transition-colors">
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LIGHT</span>
          </button>
        </nav>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 md:px-12 pt-32 pb-16 space-y-32 md:space-y-40">
        
        {/* 2. HERO SECTION */}
        <section id="games-section" className="flex flex-col lg:flex-row items-center justify-between pt-8 gap-12">
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="flex flex-col items-start w-full lg:w-[55%] space-y-8"
          >
            <h1 className="text-[4rem] sm:text-[5.5rem] lg:text-[6.5rem] font-extrabold tracking-tighter leading-[0.9] text-[#1A1A1A]">
              The games <br /> bring you in, but <br />
              <span className="text-[#c5ff00] bg-black/90 px-4 pb-2 pt-1 rounded-2xl inline-block mt-2">
                the friendships
              </span> <br />
              keep you here.
            </h1>

            <button className="group flex items-center space-x-4 pl-6 pr-2 py-2 border border-zinc-300 rounded-full bg-white hover:border-black transition-all shadow-sm">
              <span className="font-semibold text-sm">Play Games</span>
              <div className="flex items-center justify-center w-9 h-9 bg-[#c5ff00] rounded-full group-hover:bg-black group-hover:text-[#c5ff00] transition-colors duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-[45%] flex justify-center lg:justify-end relative"
          >
            <Image 
              src="/hero.png" 
              alt="Joe Yoke App Mockup" 
              width={500} height={700}
              className="object-contain drop-shadow-2xl hover:-translate-y-4 transition-transform duration-700" 
              priority
            />
          </motion.div>
        </section>

        {/* 3. ABOUT SECTION */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
          <p className="text-2xl sm:text-3xl md:text-4xl font-medium leading-snug tracking-tight text-zinc-600">
            We believe the best games are the ones played <span className="text-black font-bold">together</span>. Joe Yoke is a platform built for <span className="text-black font-bold">real connections</span> — where every match is a chance to meet someone new, sharpen your skills, and <span className="text-black font-bold">build a crew</span> you can count on.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Play", "With"].map(word => (
              <div key={word} className="px-8 py-3.5 bg-zinc-100 border border-zinc-200/80 rounded-full text-lg font-semibold shadow-inner">{word}</div>
            ))}
            <div className="flex items-center justify-center w-12 h-12 bg-[#c5ff00] rounded-full shadow-sm"><ArrowRight className="w-5 h-5 text-black" /></div>
            <div className="px-8 py-3.5 bg-zinc-100 border border-zinc-200/80 rounded-full text-lg font-semibold shadow-inner">Friends</div>
          </div>
        </motion.section>

        {/* 4. TRENDING GAMES */}
        <section className="space-y-10">
          <div className="flex justify-between items-end">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter">Trending Games</h2>
            <button className="text-sm font-semibold hover:underline decoration-2 underline-offset-4 flex items-center gap-2">View all <ArrowRight className="w-4 h-4"/></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { badge: "GAME — 2025", title: "Trivia Quest", desc: "Battle friends across 50+ categories. The quiz game that never gets old." },
              { badge: "GAME — 2024", title: "Word Blitz", desc: "Race the clock to chain words faster than anyone else in the lobby." },
              { badge: "PARTY — 2025", title: "Draw & Guess", desc: "Sketch wild scenes while your crew scrambles to figure out what you drew." },
              { badge: "STRATEGY — 2025", title: "Bluff Master", desc: "Outwit, outbluff, and outlast. The social deduction game for sharp minds." }
            ].map((game, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i} className="bg-[#0a0a0a] text-white rounded-3xl p-8 flex flex-col justify-between border border-zinc-800 shadow-xl group relative overflow-hidden min-h-[280px]">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase bg-zinc-900 px-3 py-1 rounded-full">{game.badge}</span>
                  <div className="w-10 h-10 rounded-full bg-zinc-800/80 flex items-center justify-center group-hover:bg-[#c5ff00] group-hover:text-black transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-3 mt-12">
                  <h3 className="text-3xl font-bold tracking-tight">{game.title}</h3>
                  <p className="text-sm text-zinc-400 max-w-md">{game.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center text-xs font-bold text-[#c5ff00] tracking-wider uppercase group-hover:translate-x-2 transition-transform">
                  VIEW DETAILS →
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. GAME CATEGORIES */}
        <section className="space-y-8">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">BROWSE BY</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter">Game Categories</h2>
          </div>

          <div className="flex flex-col border-t border-zinc-200">
            {[
              { num: "01", title: "Action & Arcade", tags: "Fast-paced / Combat / 3D" },
              { num: "02", title: "Puzzle & Brain", tags: "Logic / Wordplay / Strategy" },
              { num: "03", title: "Party & Social", tags: "Multiplayer / Trivia / Bluffing" },
              { num: "04", title: "Sports & Racing", tags: "Competitive / Real-time / Leaderboard" }
            ].map((cat, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group border-b border-zinc-200 hover:bg-[#c5ff00] transition-colors duration-300 cursor-pointer">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 gap-4">
                  <div className="flex items-center space-x-6 w-full sm:w-1/2">
                    <span className="text-sm font-extrabold text-zinc-400 group-hover:text-black/60">{cat.num}</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{cat.title}</h3>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-1/2">
                    <span className="text-sm font-medium text-zinc-500 group-hover:text-black/80">{cat.tags}</span>
                    <div className="w-10 h-10 rounded-full border border-zinc-300 group-hover:border-black group-hover:bg-black group-hover:text-[#c5ff00] flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. COMMUNITY SECTION */}
        <motion.section id="community-section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-[#0a0a0a] text-white rounded-[2.5rem] p-8 sm:p-14 space-y-16 shadow-2xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">OUR COMMUNITY</span>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter max-w-2xl leading-[1.1]">
                Numbers that <br/> speak for themselves.
              </h2>
            </div>
            <button className="flex items-center space-x-3 px-6 py-3 bg-[#c5ff00] text-black font-bold rounded-full hover:bg-white transition-colors">
              <span>Join Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-zinc-800 relative z-10">
            {[
              { val: "1M+", lbl: "Active Players" },
              { val: "4%", lbl: "Monthly Growth" },
              { val: "2M+", lbl: "Games Played" },
              { val: "4.8/5", lbl: "App Store Rating" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl sm:text-5xl font-black text-[#c5ff00] tracking-tighter">{stat.val}</div>
                <div className="text-sm font-medium text-zinc-400">{stat.lbl}</div>
              </div>
            ))}
          </div>
        </motion.section>

      </main>

      {/* 7. FOOTER */}
      <footer id="download-section" className="bg-[#0a0a0a] text-white rounded-t-[3rem] px-6 md:px-12 pt-20 pb-8 mt-20 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-16 border-b border-zinc-800">
            <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tighter max-w-xl leading-[0.9]">
              Ready to join the <br/> fun? <span className="text-zinc-500">Let's play.</span>
            </h2>
            <button className="flex items-center space-x-3 px-8 py-4 bg-[#c5ff00] text-black font-bold rounded-full hover:bg-white transition-colors">
              <span>Download App</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 pb-32 text-sm">
            <div className="space-y-4">
              <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest">PRODUCT</div>
              <ul className="space-y-3 text-zinc-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Games</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Leaderboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">App Store</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest">COMPANY</div>
              <ul className="space-y-3 text-zinc-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest">SUPPORT</div>
              <ul className="space-y-3 text-zinc-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest">SOCIAL</div>
              <ul className="space-y-3 text-zinc-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Twitter/X</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-zinc-600 font-medium pt-8 border-t border-zinc-900">
            <p>© 2026 Joe Yoke. All rights reserved.</p>
            <p className="flex items-center gap-2"><div className="w-2 h-2 bg-[#c5ff00] rounded-full"/> Play, Connect, Win.</p>
          </div>
        </div>

        <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 text-[12rem] sm:text-[18rem] md:text-[22rem] font-black text-zinc-900/50 select-none pointer-events-none whitespace-nowrap tracking-tighter">
          JOE YOKE
        </div>
      </footer>
    </div>
  );
}