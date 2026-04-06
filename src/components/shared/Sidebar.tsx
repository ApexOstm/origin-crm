"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUserStore } from "@/lib/userStore"
import { 
  LayoutDashboard, 
  Smartphone, 
  Shield,
  Target,
  Settings,
  User,
  Activity,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'Mi Espacio', href: '/settings', icon: User },
  { name: 'Prospección', href: '/instagram', icon: Smartphone },
  { name: 'Cierre (Pipeline)', href: '/pipeline', icon: Activity },
]

export function Sidebar() {
  const pathname = usePathname()
  const { profile } = useUserStore()

  return (
    <div className="flex flex-col w-72 bg-zinc-950/80 backdrop-blur-3xl border-r border-zinc-900/50 h-screen text-zinc-300">
      <div className="flex h-24 shrink-0 items-center px-10 text-white font-light tracking-[0.4em] uppercase text-sm">
        {profile.brand || 'ORIGIN'}
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8 scrollbar-hide">
        <div className="mb-10">
           <p className="text-[9px] font-medium text-zinc-600 uppercase tracking-[0.3em] mb-6 px-4">Operativa Maestra</p>
           <nav className="space-y-2">
             {navigation.map((item) => {
               const isActive = pathname === item.href
               return (
                 <Link
                   key={item.name}
                   href={item.href}
                   className={cn(
                     isActive
                       ? 'bg-zinc-900/50 text-emerald-500 border border-zinc-800/50'
                       : 'text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-200 border border-transparent',
                     'group flex items-center px-4 py-3 text-[11px] font-light uppercase tracking-[0.2em] rounded-2xl transition-all'
                   )}
                 >
                   <item.icon
                     className={cn(
                       isActive ? 'text-emerald-500/80' : 'text-zinc-600 group-hover:text-zinc-400',
                       'mr-4 flex-shrink-0 h-4 w-4 transition-colors'
                     )}
                     aria-hidden="true"
                   />
                   {item.name}
                 </Link>
               )
             })}
           </nav>
        </div>

        {/* Tactical Indicators */}
        <div className="px-8 mt-auto mb-10 space-y-6">
           <div className="flex items-center justify-between group">
              <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest">IA VLAD Engine</span>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
           </div>
           <div className="flex items-center justify-between">
              <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest">Protocolo 05/06 In-Out</span>
              <Zap className="h-3 w-3 text-amber-500/30" />
           </div>
        </div>
      </div>

      {/* Origin Pulse - Profile Footer */}
      <div className="p-6 border-t border-zinc-900/50 group">
         <Link href="/settings" className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-900/30 transition-all cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500/70 font-light text-sm">
               {profile.name ? profile.name.charAt(0).toUpperCase() : 'L'}
            </div>
            <div className="flex flex-col flex-1 truncate">
               <span className="text-[10px] font-medium text-zinc-300 uppercase tracking-widest truncate">
                  {profile.name || 'Lucía Olmos'}
               </span>
               <span className="text-[9px] text-zinc-600 font-light truncate">
                  {profile.product || 'Origin Matrix'}
               </span>
            </div>
            <Settings className="h-4 w-4 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
         </Link>
      </div>
    </div>
  )
}
