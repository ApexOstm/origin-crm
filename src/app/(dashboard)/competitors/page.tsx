"use client"

import { useState } from "react"
import { 
  Users, 
  Zap, 
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

      {/* Inteligencia Visual de Competidores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {[
           { 
             name: 'Elite Scaler', 
             username: '@elitescaler_ig', 
             followers: '45.2K', 
             engagement: '4.8%', 
             status: 'High Threat',
             advantage: 'Cualificación Origin más granular en fase 2.',
             color: 'text-amber-400'
           },
           { 
             name: 'Master Launch', 
             username: '@masterlaunch_ok', 
             followers: '128K', 
             engagement: '1.2%', 
             status: 'Scale Potential',
             advantage: 'Humanización de marca y respuesta en < 5 min.',
             color: 'text-emerald-400'
           },
           { 
             name: 'Conversion Pro', 
             username: '@conversionpro_dm', 
             followers: '12.5K', 
             engagement: '12.4%', 
             status: 'Viral Rival',
             advantage: 'Estructura de Reels con Hook VLAD 7.0.',
             color: 'text-rose-400'
           }
         ].map((rival, i) => (
           <div key={i} className="bg-zinc-950/50 border border-zinc-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group hover:border-zinc-700 transition-all">
              <div className="flex justify-between items-start mb-8">
                 <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:text-emerald-500 transition-colors">
                    <Shield className="h-6 w-6" />
                 </div>
                 <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-current/10 ${rival.color} bg-current/5 animate-pulse`}>
                    {rival.status}
                 </span>
              </div>
              
              <div className="space-y-1 mb-10">
                 <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">{rival.name}</h3>
                 <p className="text-xs text-zinc-500 font-mono italic">{rival.username}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-black/40 p-4 rounded-2xl border border-zinc-900 shadow-inner">
                    <span className="text-[9px] text-zinc-600 uppercase font-black tracking-widest block mb-1">Followers</span>
                    <span className="text-lg font-black text-zinc-100 italic">{rival.followers}</span>
                 </div>
                 <div className="bg-black/40 p-4 rounded-2xl border border-zinc-900 shadow-inner">
                    <span className="text-[9px] text-zinc-600 uppercase font-black tracking-widest block mb-1">Engagement</span>
                    <span className="text-lg font-black text-emerald-500 italic">{rival.engagement}</span>
                 </div>
              </div>

              <div className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-900 relative">
                 <Zap className="absolute -left-2 -top-2 h-6 w-6 text-emerald-500/20" />
                 <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2 italic">Diferencial Origin:</p>
                 <p className="text-[11px] text-zinc-300 leading-relaxed font-medium italic">
                    &quot;{rival.advantage}&quot;
                 </p>
              </div>
           </div>
         ))}
      </div>

      {/* Matriz de Comparación Estratégica */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
            <Activity className="h-40 w-40" />
         </div>
         <h4 className="text-[10px] font-black text-zinc-500 mb-10 uppercase tracking-[0.4em] flex items-center gap-2 border-b border-zinc-900 pb-6">
            <Activity className="h-4 w-4 text-emerald-500" /> Comparison Matrix (Origin vs. Rivals)
         </h4>
         <div className="space-y-6">
            {[
              { label: 'Velocidad de Respuesta', origin: 'Instantáneo (< 10m)', rivals: 'Promedio 4h - 12h' },
              { label: 'Cualificación Táctica', origin: 'Análisis VLAD AI', rivals: 'Manual / Intuitivo' },
              { label: 'Calidad de Lead', origin: 'Alta (ICP Validado)', rivals: 'Mix (Sin filtro)' },
              { label: 'Sistema de Cierre', origin: 'Protocolo 7 Etapas', rivals: 'Directo a Call' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-6 bg-zinc-900/20 border border-zinc-900 rounded-[2rem] hover:bg-zinc-900/40 transition-all">
                 <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{row.label}</span>
                 <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-emerald-500 uppercase italic">Origin / {row.origin}</span>
                    <CheckCircle className="h-3 w-3 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                 </div>
                 <span className="text-xs font-medium text-zinc-500 italic uppercase">Vs. {row.rivals}</span>
              </div>
            ))}
         </div>
      </div>
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
