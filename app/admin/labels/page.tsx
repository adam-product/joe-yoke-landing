"use client";

export default function LabelsAdmin() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-4xl font-bold">Page Labels</h1>
        <p className="text-neutral-500 font-body mt-2">Update the text and headlines across your landing page.</p>
      </div>

      <div className="p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl space-y-6">
        <h2 className="font-heading text-xl font-bold">Hero Section</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Main Headline</label>
            <input type="text" defaultValue="Level Up Your Game" className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none text-neutral-900 dark:text-white font-body" />
          </div>
          
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Gradient Sub-Headline</label>
            <input type="text" defaultValue="Earn Rewards." className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none text-neutral-900 dark:text-white font-body" />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Description Paragraph</label>
            <textarea rows={3} defaultValue="The ultimate gamification platform. Dominate the leaderboards, connect with the community, and turn your killstreaks into real-world prizes." className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none text-neutral-900 dark:text-white font-body resize-none" />
          </div>
        </div>

        <button className="px-6 py-3 bg-secondary text-white font-mono font-bold text-sm uppercase rounded-xl hover:bg-secondary/90 transition-colors">Save Labels</button>
      </div>
    </div>
  );
}