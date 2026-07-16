import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-background text-neutral-900 dark:text-white flex selection:bg-primary selection:text-background">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#112240] border-r border-black/10 dark:border-white/10 flex flex-col fixed h-full z-20">
        <div className="h-20 flex items-center px-6 border-b border-black/10 dark:border-white/10">
          <span className="font-heading text-xl font-bold text-primary">Joe Yoke Admin</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 font-mono text-sm">
          <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Dashboard</Link>
          <Link href="/admin/labels" className="block px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Page Labels</Link>
          <Link href="/admin/games" className="block px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Games Hub</Link>
          <Link href="/admin/community" className="block px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Community Settings</Link>
          <Link href="/admin/download" className="block px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">App Links & Assets</Link>
        </nav>
        
        <div className="p-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono opacity-50">v1.0-admin</span>
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 md:p-12">
        {children}
      </main>
    </div>
  );
}