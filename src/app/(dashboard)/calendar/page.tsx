"use client"

import { useState } from "react"
import { useContentStore, ContentItem, ContentStatus } from "@/lib/store"
import { 
  Check, 
  X, 
  Play, 
  FileText, 
  Sparkles as Star,
  Video as Youtube, 
  Camera as Instagram, 
  Briefcase as Linkedin,
  Clock,
  Layout,
  ChevronRight,
  ChevronDown,
  Target,
  Zap,
  BookOpen
} from "lucide-react"

export default function ContentCalendarPage() {
  const { items, updateStatus, deleteItem } = useContentStore()
  const [filter, setFilter] = useState<ContentStatus | 'All'>('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredItems = filter === 'All' ? items : items.filter(i => i.status === filter)

  const getFormatIcon = (format: string) => {
    switch(format) {
      case 'Reel': return <Instagram className="h-4 w-4 text-pink-500" />
      case 'YouTube Long': return <Youtube className="h-4 w-4 text-rose-500" />
      case 'LinkedIn Post': return <Linkedin className="h-4 w-4 text-blue-500" />
      default: return <FileText className="h-4 w-4 text-zinc-400" />
    }
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            Content <span className="text-emerald-500 not-italic uppercase">Studio</span>
          </h1>
          <p className="text-zinc-500 text-sm max-w-2xl font-medium tracking-wide">
             Incubadora estratégica de contenidos: De la Idea VLAD a la Publicación Real.
          </p>
        </div>
        <div className="flex bg-zinc-950 p-1 rounded-2xl border border-zinc-900 shadow-xl">
            {['All', 'Idea', 'Aprobado', 'Programado'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f as ContentStatus | 'All')}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${filter === f ? 'bg-white text-zinc-950 shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {f}
              </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* BANCO DE IDEAS / INCUBADORA */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5">
              <Layout className="h-40 w-40" />
           </div>
           
           <div className="flex items-center gap-4 mb-10 border-b border-zinc-900 pb-6 relative z-10">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <h2 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.5em]">Incubadora de Inteligencia</h2>
           </div>

           <div className="space-y-4 relative z-10">
              {filteredItems.length > 0 ? filteredItems.map((item) => (
                <div key={item.id} className={`flex flex-col bg-black/40 border border-zinc-900 rounded-[2rem] transition-all overflow-hidden ${expandedId === item.id ? 'border-emerald-500/50 ring-1 ring-emerald-500/10' : 'hover:border-zinc-700'}`}>
                   
                   {/* Main Row */}
                   <div className="flex items-center justify-between p-8 gap-6">
                      <div className="flex items-center gap-6 flex-1">
                         <div 
                           onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                           className="h-10 w-10 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-600 hover:text-white cursor-pointer transition-colors"
                         >
                            {expandedId === item.id ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                         </div>
                         <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                               {getFormatIcon(item.format)}
                               <h3 className="text-base font-black text-white uppercase italic tracking-tight">{item.title}</h3>
                            </div>
                            <p className="text-xs text-zinc-500 italic leading-relaxed">{item.description}</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {item.status === 'Idea' && (
                          <>
                            <button 
                              onClick={() => updateStatus(item.id, 'Aprobado')}
                              className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
                            >
                              <Check className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => deleteItem(item.id)}
                              className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        {item.status === 'Aprobado' && (
                           <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase italic tracking-widest bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                             <Check className="h-3 w-3" /> Validado para Prod
                           </span>
                        )}
                      </div>
                   </div>

                   {/* Expanded Strategy Area (NUEVO) */}
                   {expandedId === item.id && (
                     <div className="px-10 pb-10 pt-4 animate-in fade-in slide-in-from-top-6 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-zinc-950 border border-zinc-900 rounded-[2rem] shadow-inner relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-8 opacity-5">
                              <Star className="h-12 w-12 text-emerald-500" />
                           </div>
                           
                           <div className="space-y-4">
                              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                 <Target className="h-4 w-4 text-emerald-500" /> Objetivo
                              </div>
                              <p className="text-[13px] text-zinc-300 font-bold italic leading-relaxed uppercase tracking-tighter">
                                 {item.goal || "Sin definir - Analiza un lead para autogenerar."}
                              </p>
                           </div>

                           <div className="space-y-4">
                               <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                 <Zap className="h-4 w-4 text-amber-500" /> Gancho (Hook)
                              </div>
                              <p className="text-[13px] text-zinc-300 font-medium italic border-l-2 border-amber-500/20 pl-4 py-1 leading-relaxed">
                                 &quot;{item.hook || "Pendiente de redacción creativa."}&quot;
                              </p>
                           </div>

                           <div className="space-y-4">
                              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                 <BookOpen className="h-4 w-4 text-blue-500" /> Guión / Estructura
                              </div>
                              <div className="text-[11px] text-zinc-500 italic bg-black/30 p-4 rounded-xl border border-zinc-900 leading-relaxed whitespace-pre-wrap">
                                 {item.fullScript || "Define la estructura táctica en el IG Manager primero."}
                              </div>
                           </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end gap-3 uppercase tracking-widest font-black text-[9px]">
                           <span className="text-zinc-700 italic">ID ORIGIN: {item.leadId || 'GENERIC'}</span>
                        </div>
                     </div>
                   )}
                </div>
              )) : (
                <div className="py-32 text-center text-zinc-800 italic text-sm border-2 border-dashed border-zinc-900 rounded-[3rem]">
                   <p className="uppercase tracking-[0.4em] font-black text-zinc-800">No Ideas in Quarantine</p>
                </div>
              )}
           </div>
        </div>

        {/* FEED DE EJECUCIÓN (Lado / Stats rápidos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 flex items-center justify-between shadow-xl ring-1 ring-white/5">
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Publicado Total</span>
                 <span className="text-4xl font-black text-white italic">12</span>
              </div>
              <Play className="h-10 w-10 text-emerald-500/30 rotate-45" />
           </div>
           <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 flex items-center justify-between shadow-xl ring-1 ring-white/5">
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">En Incubadora</span>
                 <span className="text-4xl font-black text-white italic">{items.filter(i => i.status === 'Idea').length}</span>
              </div>
              <Clock className="h-10 w-10 text-amber-500/30" />
           </div>
        </div>
      </div>
    </div>
  )
}
