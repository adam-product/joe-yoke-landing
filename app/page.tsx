"use client";

import { useState } from "react";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { RequestModal } from "@/components/RequestModal";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { PillBand } from "@/components/PillBand";
import { GamesGrid } from "@/components/GamesGrid";
import { CategoryList } from "@/components/CategoryList";
import { StatsSection } from "@/components/StatsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <Loader />
      <Header onStartProject={() => setModalOpen(true)} />
      <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
      
      <main className="relative flex flex-col w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 lg:pt-40 gap-20 md:gap-28 pb-16">
        <Hero />
        <About />
        <PillBand />
        <GamesGrid />
        <CategoryList />
        <StatsSection />
      </main>
      
      <Footer onDownloadClick={() => setModalOpen(true)} />
    </div>
  );
}