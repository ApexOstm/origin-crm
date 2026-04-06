"use client"

import { usePipelineStore } from "@/lib/store"
import { BarChart3, Users, Target, Activity, TrendingUp, PieChart, ArrowUpRight, Sparkles } from "lucide-react"

export default function AnalyticsPage() {
  const leads = usePipelineStore((state) => state.leads)

  const totalLeads = leads.length
  const avgScore = totalLeads > 0 
    ? (leads.reduce((acc, l) => acc + l.totalScore, 0) / totalLeads).toFixed(1)
    : 0

  const statusCounts = {
    preparado: leads.filter(l => l.status === 'preparado').length,
    silencioso: leads.filter(l => ['en_espera', 'ghosting'].includes(l.status)).length,
    contactado: leads.filter(l => l.status === 'mensaje_enviado').length,
    loom: leads.filter(l => ['apto_loom', 'loom_enviado', 'espera_loom'].includes(l.status)).length,
    llamada: leads.filter(l => ['listo_llamada', 'calendly_enviado', 'agendada', 'realizada'].includes(l.status)).length,
    propuesta: leads.filter(l => ['cierre', 'seguimiento'].includes(l.status)).length,
    cerrado: leads.filter(l => l.status === 'cerrado').length,
  }

  const veredictoCounts = {
    verde: leads.filter(l => l.veredicto === 'Verde').length,
    amarillo: leads.filter(l => l.veredicto === 'Amarillo').length,
    rojo: leads.filter(l => l.veredicto?.startsWith('Rojo')).length,
  }

  const getPercentage = (count: number) => {
    return totalLeads > 0 ? (count / totalLeads) * 100 : 0
  }

  const totalRevenue = leads.reduce((acc, l) => acc + (l.montoCierre || 0), 0)

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Analytics <span className="text-emerald-500 text-lg not-italic">Health Dashboard</span></h1>
          <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-full shadow-inner">
             Sincronizado vía PipelineStore
          </div>
        </div>
        <p className="text-zinc-400 text-sm max-w-2xl">
           Métricas de rendimiento comercial basadas en el workflow de 7 etapas de Origin. Auditoría de volumen, calidad y conversión.
        </p>
      </div>

      {/* Tarjetas Principales Premium */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
             <Users className="h-20 w-20" />
          </div>
          <div className="flex items-center gap-3 text-zinc-500 mb-4">
            <Users className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Prospectos</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-black text-white lining-nums">{totalLeads}</p>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> Total</span>
          </div>
          <p className="text-[10px] text-zinc-600 mt-2 font-medium uppercase tracking-tighter">Entradas netas en base de datos</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
             <Target className="h-20 w-20" />
          </div>
          <div className="flex items-center gap-3 text-zinc-500 mb-4">
            <Target className="h-4 w-4 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Calidad VLAD</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-black text-white lining-nums">{avgScore}</p>
            <span className="text-zinc-600 text-sm font-bold">/50</span>
          </div>
          <p className="text-[10px] text-zinc-600 mt-2 font-medium uppercase tracking-tighter">Promedio de encaje metodológico</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:-rotate-12 transition-transform duration-700">
             <TrendingUp className="h-20 w-20" />
          </div>
          <div className="flex items-center gap-3 text-zinc-500 mb-4">
            <PieChart className="h-4 w-4 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Conversión</span>
          </div>
          <p className="text-5xl font-black text-white lining-nums">
            {totalLeads > 0 ? ((statusCounts.propuesta / totalLeads) * 100).toFixed(0) : 0}<span className="text-xl ml-1 text-zinc-700">%</span>
          </p>
          <p className="text-[10px] text-zinc-600 mt-2 font-medium uppercase tracking-tighter">Leads que llegan a fase de propuesta</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-125 transition-transform duration-1000">
             <Activity className="h-24 w-24 text-emerald-500" />
          </div>
          <div className="flex items-center gap-3 text-emerald-500 mb-4">
            <TrendingUp className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Revenue Cerrado</span>
          </div>
          <p className="text-4xl font-black text-white lining-nums">
            €{totalRevenue.toLocaleString()}
          </p>
          <p className="text-[10px] text-emerald-500/50 mt-2 font-black uppercase tracking-widest animate-pulse">Operación Activa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 mt-4">
        {/* Embudo de Ventas (Funnel) */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <h3 className="text-xs font-black text-zinc-400 mb-10 border-b border-zinc-900 pb-4 uppercase tracking-[0.3em] flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-emerald-500" /> Pipeline Funnel (7 Estadios)
          </h3>
          <div className="space-y-6">
            {[
              { id: 'preparado', label: '1. Preparado', count: statusCounts.preparado },
              { id: 'silencioso', label: '2. Silencioso', count: statusCounts.silencioso },
              { id: 'contactado', label: '3. Contactado', count: statusCounts.contactado },
              { id: 'loom', label: '5. Loom', count: statusCounts.loom },
              { id: 'llamada', label: '6. Llamada', count: statusCounts.llamada },
              { id: 'propuesta', label: '7. Propuesta', count: statusCounts.propuesta },
              { id: 'cerrado', label: '8. Cerrado', count: statusCounts.cerrado },
            ].map((stage, idx) => (
              <div key={stage.id} className="group">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                     <span className="text-[11px] font-black text-zinc-600 w-4">{idx + 1}</span>
                     <span className="text-xs font-black text-zinc-300 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">{stage.label}</span>
                  </div>
                  <span className="text-[11px] font-bold text-zinc-500 font-mono italic">{stage.count} leads</span>
                </div>
                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden shadow-inner border border-zinc-800/10">
                  <div 
                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-1000 ease-out" 
                    style={{ width: `${getPercentage(stage.count)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución por Veredicto */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-10 shadow-2xl flex flex-col">
          <h3 className="text-xs font-black text-zinc-400 mb-10 border-b border-zinc-900 pb-4 uppercase tracking-[0.3em] flex items-center gap-2">
            <Activity className="h-4 w-4 text-amber-500" /> Calidad de Captación (VLAD)
          </h3>
          <div className="flex-1 flex flex-col justify-around">
            <div className="flex gap-10 items-end h-56 px-4">
              <div className="flex-1 flex flex-col items-center gap-4 group">
                <div 
                   className="w-full bg-emerald-500/10 border-2 border-emerald-500/20 rounded-2xl transition-all duration-1000 shadow-[0_0_20px_rgba(16,185,129,0.05)] group-hover:border-emerald-500/50" 
                   style={{ height: `${getPercentage(veredictoCounts.verde)}%` }}
                ></div>
                <span className="text-[10px] text-emerald-500 font-black tracking-widest uppercase">Verde</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-4 group">
                <div 
                   className="w-full bg-amber-500/10 border-2 border-amber-500/20 rounded-2xl transition-all duration-1000 shadow-[0_0_20px_rgba(245,158,11,0.05)] group-hover:border-amber-500/50" 
                   style={{ height: `${getPercentage(veredictoCounts.amarillo)}%` }}
                ></div>
                <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase">Amarillo</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-4 group">
                <div 
                   className="w-full bg-rose-500/10 border-2 border-rose-500/20 rounded-2xl transition-all duration-1000 shadow-[0_0_20px_rgba(244,63,94,0.05)] group-hover:border-rose-500/50" 
                   style={{ height: `${getPercentage(veredictoCounts.rojo)}%` }}
                ></div>
                <span className="text-[10px] text-rose-500 font-black tracking-widest uppercase">Rojo</span>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-zinc-900/30 rounded-3xl border border-zinc-800 text-center relative overflow-hidden group">
               <Sparkles className="absolute -left-2 -top-2 h-8 w-8 text-emerald-500 opacity-10 group-hover:opacity-20 transition-opacity" />
               <p className="text-[11px] text-zinc-400 italic leading-relaxed font-medium">
                 &quot;El balance actual sugiere que el {getPercentage(veredictoCounts.verde).toFixed(0)}% de tu prospección es de alta calidad. Enfócate en convertir estos activos primero.&quot;
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
