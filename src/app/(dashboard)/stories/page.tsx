"use client"

import { History, Target, Zap, Clock, Sparkles, MessageSquare, BookOpen, Smile } from "lucide-react"

export default function StoriesLabPage() {
  const sequences = [
    { 
       name: "El Caballo de Troya", 
       type: "Venta Educativa", 
       steps: ["Hook emocional", "La Gran Mentira del sector", "La Revelación Técnica", "CTA de Aplicación"],
       focus: "Autoridad"
    },
    { 
       name: "El Día del Juicio", 
       type: "Urgencia Real", 
       steps: ["Contador real", "Testimonio relámpago", "Respuesta a objeción #1", "Enlace directo"],
       focus: "Conversión"
    },
    { 
       name: "Detrás de las Cámaras (Raw)", 
       type: "Conexión / Confianza", 
       steps: ["Setup de trabajo", "Un valor personal", "Encuesta de 'Grieta'", "Invitación a DM"],
       focus: "Comunidad"
    }
  ]

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic">
          Stories <span className="text-emerald-500 not-italic uppercase">Lab</span>
        </h1>
        <p className="text-zinc-500 text-sm max-w-2xl font-medium tracking-wide">
           Optimización de narrativa efímera: Secuencias de impacto para transformar visualizaciones en conversaciones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {sequences.map((s, i) => (
           <div key={i} className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 hover:border-emerald-500/20 transition-all shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
                 <History className="h-40 w-40" />
              </div>
              
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center gap-3 border-b border-zinc-900 pb-6 uppercase tracking-widest text-[10px] font-black text-emerald-500">
                    <span className="bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">{s.focus}</span>
                 </div>
                 
                 <div className="space-y-6">
                    <h2 className="text-xl font-black text-white uppercase italic leading-none">{s.name}</h2>
                    <div className="space-y-4">
                       {s.steps.map((step, idx) => (
                         <div key={idx} className="flex items-center gap-4 group/step">
                            <div className="h-6 w-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[9px] font-black text-zinc-600 group-hover/step:text-emerald-500 group-hover/step:border-emerald-500/30 transition-all italic">
                               S{idx+1}
                            </div>
                            <p className="text-[11px] text-zinc-400 font-medium italic group-hover/step:text-zinc-200 transition-colors">{step}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* Origin Logic for Engagement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="bg-zinc-950 border border-zinc-900 rounded-[3.5rem] p-12 shadow-inner group">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-900">
               <Smile className="h-6 w-6 text-amber-500" />
               <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.5em]">Engagement Master</h3>
            </div>
            <p className="text-[13px] text-zinc-400 leading-relaxed italic mb-8">
               No uses encuestas por usar. Cada interacción debe validar una hipótesis sobre el lead. 
               <span className="text-emerald-500 font-bold px-1">Tip Origin:</span> Si votan "No", escríbeles igual; han interactuado con tu autoridad.
            </p>
            <div className="p-8 bg-zinc-900/40 rounded-[2.5rem] border border-zinc-900 shadow-inner italic text-xs text-zinc-600">
               "Usa el Sticker de Reacción para medir temperatura, el de Encuesta para segmentar intereses."
            </div>
         </div>

         <div className="bg-zinc-950 border border-zinc-900 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 p-10 opacity-[0.02]">
               <Sparkles className="h-32 w-32 text-emerald-500" />
            </div>
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-900">
               <Clock className="h-6 w-6 text-emerald-500" />
               <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.5em]">Retención (Watch-time)</h3>
            </div>
            <ul className="space-y-6">
               {[
                 "Subtítulos dinámicos en la primera historia.",
                 "Menos de 15 palabras por slide.",
                 "Zoom-in táctico en la revelación.",
                 "Cambio de escenario entre historias."
               ].map((tip, i) => (
                 <li key={i} className="flex gap-4 group">
                    <div className="h-1 w-1 bg-emerald-500 rounded-full mt-1.5 opacity-30 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[11px] text-zinc-500 font-black uppercase tracking-widest">{tip}</p>
                 </li>
               ))}
            </ul>
         </div>
      </div>
    </div>
  )
}
