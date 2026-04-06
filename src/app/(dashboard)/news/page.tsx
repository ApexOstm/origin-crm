"use client"

import { useNewsStore } from "@/lib/newsStore"
import { Newspaper, Sparkles, BookOpen, TrendingUp, Radio, Cpu, Rocket, Globe, Zap } from "lucide-react"

export default function NewsPage() {
  const { news, aiSummary } = useNewsStore()

  const categories = {
    'Lanzamientos': "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    'IA Marketing': "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    'Ecosistema IG/LI/YT': "text-blue-400 bg-blue-500/10 border-blue-500/20",
    'Estrategia': "text-amber-400 bg-amber-500/10 border-amber-500/20",
  }

  const getIcon = (category: string) => {
    switch(category) {
      case 'Lanzamientos': return <Rocket className="h-4 w-4" />;
      case 'IA Marketing': return <Cpu className="h-4 w-4" />;
      case 'Ecosistema IG/LI/YT': return <Globe className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            Strategic <span className="text-emerald-500 not-italic uppercase">Brain</span>
          </h1>
          <p className="text-zinc-500 text-sm max-w-2xl font-medium tracking-wide">
             Consolidación selectiva de inteligencia: Lanzamientos, IA y Ecosistemas Digitales.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-950 border border-emerald-500/20 px-8 py-4 rounded-[2rem] shadow-2xl group transition-all hover:bg-emerald-500/5">
          <div className="relative">
             <Radio className="h-5 w-5 text-emerald-500 animate-pulse" />
             <div className="absolute inset-0 bg-emerald-500/30 blur-lg animate-pulse" />
          </div>
          <div className="flex flex-col">
             <span className="text-[10px] font-black text-emerald-500 tracking-[0.3em] uppercase">Intelligence Sync</span>
             <span className="text-[9px] text-zinc-500 font-mono italic">Abril 2026 Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        
        {/* Main Intelligence Feed */}
        <div className="space-y-12">
          <div className="flex items-center gap-4 border-b border-zinc-900 pb-6">
             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
             <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">Sector Briefing</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {news.map(item => (
              <div key={item.id} className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 hover:border-emerald-500/30 transition-all shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.07] transition-all group-hover:scale-125">
                   {getIcon(item.category)}
                </div>

                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-black px-4 py-1 rounded-[1rem] border uppercase tracking-widest flex items-center gap-2 ${categories[item.category as keyof typeof categories] || categories.Estrategia}`}>
                      {getIcon(item.category)} {item.category}
                    </span>
                    {item.impact === 'Alto' && (
                       <span className="bg-rose-500/10 text-rose-500 text-[9px] font-black px-3 py-1 rounded-full border border-rose-500/20 uppercase tracking-widest animate-pulse">Impact: High</span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-600 font-mono italic tracking-tight">{item.date}</span>
                </div>

                <h3 className="text-2xl font-black text-zinc-100 group-hover:text-emerald-400 transition-colors cursor-pointer mb-6 uppercase tracking-tighter leading-none italic">
                  {item.title}
                </h3>
                
                <div className="p-6 bg-black/40 border border-zinc-900/50 rounded-2xl mb-8 group-hover:border-emerald-500/10 transition-all">
                  <p className="text-sm text-zinc-400 leading-relaxed italic">"{item.summary}"</p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-900">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-zinc-800" />
                    <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{item.source}</span>
                  </div>
                  <button className="text-[9px] font-black text-emerald-500 uppercase tracking-widest hover:text-white transition-colors">Extrapolar a Origin ➔</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Brain (Lateral) */}
        <div className="space-y-10">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
            <div className="absolute -top-10 -right-10 bg-emerald-500/10 w-40 h-40 rounded-full blur-[80px]" />
            
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-800">
              <div className="p-3 bg-emerald-500/10 rounded-2xl shadow-inner">
                <Sparkles className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Cerebro <span className="text-emerald-500 not-italic">Sync</span></h2>
                 <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Sintesis IA Origin</span>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="p-6 bg-black/50 border border-zinc-800 rounded-2xl shadow-inner group transition-all hover:border-emerald-500/30">
                <p className="text-[13px] text-zinc-300 leading-relaxed italic font-medium">
                  {aiSummary}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] flex items-center gap-3">
                   <Zap className="h-3 w-3 text-amber-500" /> Táctica Semanal
                </p>
                <div className="space-y-5">
                  <div className="flex gap-4 p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 hover:bg-zinc-800/20 transition-all">
                    <BookOpen className="h-4 w-4 text-emerald-500 shrink-0" />
                    <div className="flex flex-col gap-1">
                       <p className="text-[11px] text-zinc-300 font-black uppercase tracking-tight">Estrategia Q2</p>
                       <p className="text-[10px] text-zinc-500 italic">Menos volumen, más profundidad en el "Angle Detection".</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 hover:bg-zinc-800/20 transition-all">
                    <BookOpen className="h-4 w-4 text-emerald-500 shrink-0" />
                    <div className="flex flex-col gap-1">
                       <p className="text-[11px] text-zinc-300 font-black uppercase tracking-tight">Acción Inmediata</p>
                       <p className="text-[10px] text-zinc-500 italic">Inyecta la "Grieta B2B de LinkedIn" en tus Looms de hoy.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-12 bg-white text-zinc-950 font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-emerald-500 transition-all active:scale-95 shadow-xl">
               Actualizar Inteligencia ➔
            </button>
          </div>

          <div className="p-10 bg-zinc-950/20 border border-zinc-900 rounded-[3rem] text-center border-dashed group hover:bg-zinc-950/50 transition-all">
             <p className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.5em] mb-2">Próximo Vínculo Neuronal</p>
             <p className="text-xl text-emerald-500/30 font-mono italic">08h 22m 14s</p>
          </div>
        </div>
      </div>
    </div>
  )
}
