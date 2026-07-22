"use client";
import { useState, useEffect } from "react";

// Define the game type
type Game = { id: number; title: string; genre: string; accent: string };

export default function GamesAdmin() {
  const [isAdding, setIsAdding] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  
  // Form states
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [accent, setAccent] = useState("text-primary");

  // Fetch games on load
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const res = await fetch("/api/games");
    if (res.ok) {
      const data = await res.json();
      setGames(data);
    }
  };

  // Handle form submission
  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, genre, accent }),
    });

    if (res.ok) {
      setTitle("");
      setGenre("");
      setAccent("text-primary");
      setIsAdding(false);
      fetchGames(); // Refresh the table
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-4xl font-bold">Games Hub</h1>
          <p className="text-neutral-500 font-body mt-2">Manage your featured games, genres, and thumbnail images.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-6 py-3 bg-primary text-[#0B192C] font-mono font-bold text-sm uppercase rounded-xl hover:bg-primary/90 transition-colors"
        >
          {isAdding ? "Cancel" : "+ Add New Game"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddGame} className="p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl space-y-4">
          <h2 className="font-heading text-xl font-bold">Create Entry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Game Title" className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none text-neutral-900 dark:text-white font-mono text-sm" />
            <input required value={genre} onChange={(e) => setGenre(e.target.value)} type="text" placeholder="Genre (e.g. FPS / Action)" className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none text-neutral-900 dark:text-white font-mono text-sm" />
            <select value={accent} onChange={(e) => setAccent(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none text-neutral-900 dark:text-white font-mono text-sm">
              <option value="text-primary">Neon Yellow (Primary)</option>
              <option value="text-secondary">Orange (Secondary)</option>
              <option value="text-tertiary">Cyan (Tertiary)</option>
            </select>
          </div>
          <button type="submit" className="px-6 py-3 bg-secondary text-white font-mono font-bold text-sm uppercase rounded-xl hover:bg-secondary/90 transition-colors w-full">Save Game to Database</button>
        </form>
      )}

      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/20 font-mono text-xs uppercase tracking-wider">
              <th className="p-4">Game Title</th>
              <th className="p-4">Genre</th>
              <th className="p-4">Accent</th>
            </tr>
          </thead>
          <tbody className="font-body text-sm">
            {games.map((game) => (
              <tr key={game.id} className="border-b border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold">{game.title}</td>
                <td className="p-4 opacity-70">{game.genre}</td>
                <td className={`p-4 font-bold ${game.accent}`}>{game.accent.replace('text-', '')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}