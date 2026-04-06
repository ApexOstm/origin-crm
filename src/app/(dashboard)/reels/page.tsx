"use client"

import { PlaySquare, Zap, Sparkles, Video } from "lucide-react"

export default function ReelsLabPage() {
  const frameworks = [
    { 
       name: "El Anti-Mentor", 
       hook: "¿Por qué facturas 50K pero no tienes vida?", 
       strategy: "Atacar el ego y la libertad del prospecto.",
       retention: "Comparativa visual de agenda vs facturación.",
       cta: "GRIETA"
    },
    { 
       name: "La Fuga Silenciosa", 
       hook: "Estás perdiendo 3 leads al día por esto...", 
       strategy: "Miedo a la pérdida de oportunidad.",
       retention: "Demo rápida de 5s del error común.",
       cta: "AUDIT"
    },
    { 
       name: "Prueba de Concepto", 
       hook: "He auditado 100 perfiles y este es el patrón.", 
       strategy: "Autoridad masiva por volumen.",
       retention: "Ráfaga de capturas de pantalla de resultados.",
       cta: "ORIGIN"
    }
  ]

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic">
          Reels <span className="text-emerald-500 not-italic uppercase">Lab</span>
        </h1>
        <p className="text-zinc-500 text-sm max-w-2xl font-medium tracking-wide">
           Framework Origin para contenido vertical: Ganchos de Autoridad y Retención Hiper-Segmentada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {frameworks.map((f, i) => (
           <div key={i} className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 hover:border-emerald-500/20 transition-all shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
                 <PlaySquare className="h-40 w-40" />
              </div>
              
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center gap-3 border-b border-zinc-900 pb-6">
                    <span className="text-[10px] font-black text-emerald-500 italic">#{i+1}</span>
                    <h2 className="text-lg font-black text-white uppercase tracking-tighter italic">{f.name}</h2>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Gancho (Hook)</p>
                       <p className="text-sm font-bold text-zinc-200 italic leading-snug">&quot;{f.hook}&quot;</p>
                    </div>
                    
                    <div className="space-y-2">
                       <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Retención</p>
                       <p className="text-[11px] text-zinc-500 italic font-medium">{f.retention}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                       <div className="flex items-center gap-2">
                          <Zap className="h-3 w-3 text-emerald-500" />
                          <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Palabra Clave: {f.cta}</span>
                       </div>
                       <button className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                          <PlusIcon className="h-4 w-4" />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* Editor Táctico */}
      <div className="bg-zinc-950 border border-emerald-500/10 rounded-[3rem] p-12 shadow-2xl">
         <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-900">
            <Video className="h-6 w-6 text-emerald-500" />
            <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.5em]">Script Builder v1.0</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Hook Dinámico</label>
                  <textarea rows={3} className="w-full bg-black/40 border border-zinc-900 rounded-2xl p-6 text-zinc-300 font-medium italic focus:outline-none focus:ring-1 focus:ring-emerald-500/50" placeholder="Escribe el gancho basado en la grieta..."></textarea>
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Desarrollo Origin</label>
                  <textarea rows={5} className="w-full bg-black/40 border border-zinc-900 rounded-2xl p-6 text-zinc-300 font-medium italic focus:outline-none focus:ring-1 focus:ring-emerald-500/50" placeholder="Explica la solución técnica..."></textarea>
               </div>
            </div>
            <div className="p-10 bg-black/50 border border-zinc-900 rounded-[2.5rem] border-dashed flex flex-col items-center justify-center text-center space-y-6">
               <Sparkles className="h-10 w-10 text-emerald-500/20" />
               <p className="text-xs text-zinc-600 font-medium italic">El cerebro estratégico inyectará automáticamente los CTA basados en tu oferta.</p>
            </div>
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
