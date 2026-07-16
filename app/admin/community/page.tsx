"use client";

export default function CommunityAdmin() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-4xl font-bold">Community Settings</h1>
        <p className="text-neutral-500 font-body mt-2">Manage your guild links, Discord invites, and platform statistics.</p>
      </div>

      <div className="p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl space-y-6">
        <h2 className="font-heading text-xl font-bold">Social Links</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Discord Invite URL</label>
            <input type="text" placeholder="https://discord.gg/..." className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none text-neutral-900 dark:text-white font-mono text-sm" />
          </div>
          
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Twitter / X Profile</label>
            <input type="text" placeholder="https://x.com/..." className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none text-neutral-900 dark:text-white font-mono text-sm" />
          </div>
        </div>

        <button className="px-6 py-3 bg-primary text-[#0B192C] font-mono font-bold text-sm uppercase rounded-xl hover:bg-primary/90 transition-colors">Update Links</button>
      </div>
    </div>
  );
}