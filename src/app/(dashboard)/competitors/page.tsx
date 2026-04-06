"use client"

import { useState } from "react"
import { 
  Users, 
  Search, 
  Target, 
  Zap, 
  BarChart, 
  Activity, 
  TrendingUp, 
  Clock, 
  Grid, 
  CheckCircle, 
  Shield 
} from "lucide-react"

export default function CompetitorsPage() {
  const [url, setUrl] = useState("")

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto px-6">
      
      {/* Header Contextual */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
           <Users className="h-6 w-6 text-emerald-500" />
           <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white flex items-center gap-4">
              Competitor <span className="text-emerald-500 not-italic">Tracker</span>
           </h1>
        </div>
        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] ml-9">
           Pega el link de Instagram ➔ datos reales automáticos
        </p>
      </div>

      {/* Input de Buscador (Estilo Referencia) */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
         <div className="flex flex-col gap-8">
            <button className="flex items-center gap-3 px-6 py-2 bg-zinc-900 rounded-full border border-zinc-800 text-[9px] font-black text-zinc-500 uppercase tracking-widest self-start hover:text-white transition-all">
               <PlusIcon className="h-3 w-3" /> Añadir competidor
            </button>
            
            <div className="relative">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700">
                  <LinkIcon className="h-5 w-5" />
               </div>
               <input 
                 type="text" 
                 value={url}
                 onChange={(e) => setUrl(e.target.value)}
                 placeholder="https://www.instagram.com/competidor/..." 
                 className="w-full bg-black/50 border border-zinc-800 rounded-2xl pl-16 pr-8 py-5 text-zinc-100 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50 shadow-inner"
               />
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2 border-t border-zinc-900/50">
               <span className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em] italic">Se extraen automáticamente:</span>
               {[
                 { label: 'Seguidores', icon: Users },
                 { label: 'Engagement', icon: Activity },
                 { label: 'Mix de Contenido', icon: Grid },
                 { label: 'Mejores Horas', icon: Clock },
                 { label: 'Top Posts', icon: TrendingUp }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-2">
                    <item.icon className="h-3 w-3 text-emerald-500/30" />
                    <span className="text-[10px] text-zinc-500 font-medium italic">{item.label}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Empty State (Estilo Referencia) */}
      <div className="py-24 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-1000">
         <div className="bg-zinc-900/30 p-10 rounded-[3rem] border border-zinc-900 relative">
            <Target className="h-16 w-16 text-zinc-800" />
            <div className="absolute inset-0 bg-emerald-500/5 blur-[60px] rounded-full" />
         </div>
         <div className="space-y-2">
            <p className="text-sm font-black text-zinc-600 uppercase tracking-[0.3em]">
               Pega el link de un competidor arriba para empezar
            </p>
            <p className="text-[10px] text-zinc-800 font-mono italic">Esperando señal de origen...</p>
         </div>
      </div>

      {/* Inteligencia Visual (Oculto hasta búsqueda) */}
      {/* ... Futura implementación de tarjetas ... */}

    </div>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
    </svg>
  )
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}
