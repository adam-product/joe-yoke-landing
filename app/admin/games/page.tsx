"use client";
import { useState } from "react";

export default function GamesAdmin() {
  const [isAdding, setIsAdding] = useState(false);

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
          + Add New Game
        </button>
      </div>

      {/* Add New Game Form (Hidden by default) */}
      {isAdding && (
        <div className="p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl space-y-4">
          <h2 className="font-heading text-xl font-bold">Create Entry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Game Title" className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none text-white font-mono text-sm" />
            <input type="text" placeholder="Genre (e.g. FPS / Action)" className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none text-white font-mono text-sm" />
            <input type="text" placeholder="Accent Color (e.g. text-primary)" className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none text-white font-mono text-sm" />
            
            {/* Image Upload Mockup */}
            <div className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 border-dashed flex items-center justify-center cursor-pointer hover:bg-black/10 transition-colors">
              <span className="font-mono text-sm opacity-50">Upload Thumbnail Image</span>
            </div>
          </div>
          <button className="px-6 py-3 bg-secondary text-white font-mono font-bold text-sm uppercase rounded-xl hover:bg-secondary/90 transition-colors w-full">Save Game to Database</button>
        </div>
      )}

      {/* Games List Table */}
      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/20 font-mono text-xs uppercase tracking-wider">
              <th className="p-4">Game Title</th>
              <th className="p-4">Genre</th>
              <th className="p-4">Accent</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="font-body text-sm">
            <tr className="border-b border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold">Neon Rush</td>
              <td className="p-4 opacity-70">Racing & Speed</td>
              <td className="p-4 text-primary">Primary</td>
              <td className="p-4 text-right space-x-4">
                <button className="text-secondary hover:underline font-mono">Edit</button>
                <button className="text-red-500 hover:underline font-mono">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}