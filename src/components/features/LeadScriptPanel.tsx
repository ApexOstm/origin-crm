"use client";

import { usePipelineStore, LeadState, Temperature, EntryType } from "@/lib/store";
import { X, PlayCircle, PhoneCall, MessageCircle, Copy, Target, AlertTriangle, CheckCircle2, ShieldCheck, CreditCard, FileText, Layout, Thermometer, Zap, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function LeadScriptPanel() {
  const { leads, selectedLeadId, selectLead, updateLeadScripts, updateLeadClosing, updateLeadStatus } = usePipelineStore();
  const selectedLead = leads.find((l) => l.id === selectedLeadId);
  const [activeTab, setActiveTab] = useState<'inteligencia' | 'workflow' | 'cierre'>('inteligencia');

  if (!selectedLead) return null;

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-emerald-400";
    if (score >= 3) return "text-amber-400";
    return "text-rose-400";
  };

  const getStatusLabel = (status: LeadState) => {
    const labels: Record<LeadState, string> = {
        preparado: 'Preparado',
        mensaje_enviado: 'Mensaje Enviado',
        en_espera: 'En Espera',
        respondio: 'Respondió',
        filtro: 'Filtro Conversacional',
        cualificado: 'Cualificado',
        apto_loom: 'Apto para Loom',
        loom_enviado: 'Loom Enviado',
        espera_loom: 'Espera de Loom',
        listo_llamada: 'Listo para Llamada',
        calendly_enviado: 'Calendly Enviado',
        agendada: 'Llamada Agendada',
        realizada: 'Llamada Realizada',
        cierre: 'Fase de Cierre',
        seguimiento: 'Seguimiento',
        no_apto: 'No Apto',
        no_listo: 'No Listo Aún',
        ghosting: 'Ghosting',
        cerrado: 'Venta Cerrada'
    };
    return labels[status] || status;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 z-40 backdrop-blur-md transition-opacity duration-500" onClick={() => selectLead(null)} />
      
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-zinc-950 border-l border-zinc-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Header Superior */}
        <div className="px-8 py-6 border-b border-zinc-900 bg-black/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Target className="h-24 w-24" />
          </div>
          
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full animate-pulse ${selectedLead.veredicto === 'Verde' ? 'bg-emerald-500' : selectedLead.veredicto === 'Amarillo' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                <h2 className="text-xl font-medium text-white tracking-tighter uppercase ">@{selectedLead.username}</h2>
              </div>
              
              <div className="flex gap-3">
                <span className="text-[9px] font-medium px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full uppercase tracking-widest text-zinc-400">
                   {getStatusLabel(selectedLead.status)}
                </span>
                <span className={cn(
                  "text-[9px] font-medium px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5",
                  selectedLead.temperature === 'caliente' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                  selectedLead.temperature === 'tibio' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                  'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                )}>
                  <Thermometer className="h-3 w-3" /> {selectedLead.temperature}
                </span>
                <span className={cn(
                  "text-[9px] font-medium px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5",
                  selectedLead.entryType === 'inbound' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                )}>
                  <Zap className="h-3 w-3" /> {selectedLead.entryType}
                </span>
              </div>
            </div>
            <button onClick={() => selectLead(null)} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-full transition-all">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex gap-8 mt-10 border-b border-zinc-900/50">
             <button 
               onClick={() => setActiveTab('inteligencia')}
               className={`pb-4 text-[11px] font-medium uppercase tracking-widest transition-all relative ${activeTab === 'inteligencia' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
             >
               Inteligencia VLAD
               {activeTab === 'inteligencia' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500" />}
             </button>
             <button 
               onClick={() => setActiveTab('workflow')}
               className={`pb-4 text-[11px] font-medium uppercase tracking-widest transition-all relative ${activeTab === 'workflow' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
             >
               Workflow & Scripts
               {activeTab === 'workflow' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500" />}
             </button>
             <button 
               onClick={() => setActiveTab('cierre')}
               className={`pb-4 text-[11px] font-medium uppercase tracking-widest transition-all relative ${activeTab === 'cierre' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
             >
               Fase 1: Cierre
               {activeTab === 'cierre' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500" />}
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar pb-32">
          
          {activeTab === 'inteligencia' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <section className="bg-zinc-900/30 p-8 rounded-[2rem] border border-zinc-800/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                     <Target className="h-20 w-20" />
                  </div>
                  <h4 className="text-xs font-medium text-zinc-400 mb-3 flex items-center gap-2 tracking-[0.2em] uppercase">
                     🎯 Grieta Estratégica Dominante
                  </h4>
                  <p className="text-lg text-emerald-500 font-bold leading-relaxed italic border-l-2 border-emerald-500/50 pl-6 py-2">
                    "{selectedLead.anguloEntrada || 'Análisis no disponible'}"
                  </p>
               </section>

               {/* Competencia Directa - Premium v7.0 */}
               <section className="bg-zinc-950/50 border border-zinc-900 rounded-[2rem] p-8 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                     <Users className="h-40 w-40" />
                  </div>
                  <h4 className="text-[10px] font-medium text-zinc-500 mb-8 uppercase tracking-[0.4em] flex items-center gap-2 border-b border-zinc-900 pb-4">
                    <Users className="h-4 w-4 text-emerald-500" /> Nodos Competitivos Identificados
                  </h4>
                  <div className="space-y-4 relative z-10">
                    {selectedLead.competitors && selectedLead.competitors.length > 0 ? (
                      selectedLead.competitors.map((comp, i) => (
                        <div key={i} className="flex flex-col p-6 bg-black/40 border border-zinc-800 rounded-[1.5rem] group/comp hover:border-emerald-500/30 transition-all shadow-inner">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center text-[10px] font-medium text-zinc-600 uppercase border border-zinc-800 shadow-xl">
                                {i+1}
                              </div>
                              <span className="text-sm font-light text-zinc-200 tracking-wider">@{comp.username.replace('@', '')}</span>
                            </div>
                            <span className="text-[8px] font-medium px-2 py-1 bg-zinc-900 rounded-lg text-emerald-500/70 uppercase tracking-widest border border-emerald-500/10">ORIGIN ADVANTAGE</span>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed italic pl-11 border-l border-zinc-800 ml-4 py-1 group-hover/comp:border-emerald-500/50 transition-colors">
                            {comp.advantage}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center border border-zinc-800/50 rounded-2xl bg-zinc-900/20">
                         <p className="text-xs text-zinc-500 font-light italic">Esperando evaluación competitiva de VLAD...</p>
                      </div>
                    )}
                  </div>
               </section>

               <section>
                  <h4 className="text-[10px] font-medium text-zinc-500 mb-6 uppercase tracking-widest flex items-center gap-2">
                    <Layout className="h-4 w-4 text-emerald-400" /> Auditoría Técnica
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                    {selectedLead.scorecard && Object.entries(selectedLead.scorecard).map(([key, data]: [string, any]) => (
                      <div key={key} className="flex flex-col group">
                        <div className="flex justify-between items-center mb-1 border-b border-zinc-900 pb-1">
                          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">
                            {key.toUpperCase()}
                          </span>
                          <span className={`text-[10px] font-medium ${getScoreColor(data.score)}`}>{data.score}</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 italic leading-tight">{data.nota}</p>
                      </div>
                    ))}
                  </div>
               </section>

               {selectedLead.flags && selectedLead.flags.length > 0 && (
                <section>
                  <h4 className="flex items-center gap-2 text-[10px] font-medium text-rose-500 uppercase tracking-widest mb-4">
                    <AlertTriangle className="h-4 w-4 text-rose-500" /> Alertas Críticas
                  </h4>
                  <div className="space-y-2">
                    {selectedLead.flags.map((flag, i) => (
                      <div key={i} className="text-[10px] text-rose-400 bg-rose-500/5 p-4 border border-rose-500/10 rounded-2xl italic">
                        {flag}
                      </div>
                    ))}
                  </div>
                </section>
               )}
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-emerald-500" /> Rompe-Patrón Estratégico (DM)
                      </h4>
                      <button onClick={() => navigator.clipboard.writeText(selectedLead.rompePatron || '')} className="text-zinc-600 hover:text-white transition-colors"><Copy className="h-4 w-4" /></button>
                    </div>
                    <textarea 
                      className="w-full bg-black/40 border border-zinc-800 rounded-[1.5rem] p-6 text-[13px] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 h-32 font-mono leading-relaxed"
                      value={selectedLead.rompePatron || ''}
                      onChange={(e) => updateLeadScripts(selectedLead.id, 'rompePatron', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <PlayCircle className="h-4 w-4 text-fuchsia-500" /> Guion Maestro del Loom
                    </h4>
                    <textarea 
                      className="w-full bg-black/40 border border-zinc-800 rounded-[1.5rem] p-6 text-[13px] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50 h-40 font-mono leading-relaxed"
                      value={selectedLead.guionLoom || ''}
                      onChange={(e) => updateLeadScripts(selectedLead.id, 'guionLoom', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      <PhoneCall className="h-4 w-4 text-blue-500" /> Notas de Diagnóstico (Llamada)
                    </h4>
                    <textarea 
                      className="w-full bg-black/40 border border-zinc-800 rounded-[1.5rem] p-6 text-[13px] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 h-48 font-mono leading-relaxed"
                      value={selectedLead.notasLlamada || ''}
                      onChange={(e) => updateLeadScripts(selectedLead.id, 'notasLlamada', e.target.value)}
                    />
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'cierre' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest flex items-center gap-2 border-b border-zinc-900 pb-4">
                      <FileText className="h-4 w-4 text-emerald-500" /> Activos de Cierre
                    </h4>
                    <div className="flex gap-4">
                      <input 
                        type="text"
                        className="flex-1 bg-black/40 border border-zinc-800 rounded-2xl p-4 text-xs text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Link de Propuesta / Factura"
                        value={selectedLead.propuestaLink || ''}
                        onChange={(e) => updateLeadClosing(selectedLead.id, 'propuestaLink', e.target.value)}
                      />
                      <button className="bg-zinc-900 px-6 rounded-2xl text-[10px] font-medium uppercase text-zinc-400 hover:text-white transition-colors">Copiar</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => updateLeadClosing(selectedLead.id, 'contratoFirmado', !selectedLead.contratoFirmado)}
                      className={`flex items-center justify-center gap-3 p-8 rounded-[2rem] border-2 transition-all ${selectedLead.contratoFirmado ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-zinc-900/50 border-zinc-800 text-zinc-600'}`}
                    >
                      <ShieldCheck className="h-6 w-6" />
                      <div className="flex flex-col items-start">
                        <span className="text-[9px] uppercase font-medium tracking-widest">Contrato</span>
                        <span className="text-xs font-bold">{selectedLead.contratoFirmado ? 'Firmado' : 'Pendiente'}</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => updateLeadClosing(selectedLead.id, 'pagoValidado', !selectedLead.pagoValidado)}
                      className={`flex items-center justify-center gap-3 p-8 rounded-[2rem] border-2 transition-all ${selectedLead.pagoValidado ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-zinc-900/50 border-zinc-800 text-zinc-600'}`}
                    >
                      <CreditCard className="h-6 w-6" />
                      <div className="flex flex-col items-start">
                        <span className="text-[9px] uppercase font-medium tracking-widest">Pago</span>
                        <span className="text-xs font-bold">{selectedLead.pagoValidado ? 'Recibido' : 'Pendiente'}</span>
                      </div>
                    </button>
                  </div>

                  <div className="space-y-4 pt-10 border-t border-zinc-900 text-center">
                    <p className="text-[10px] text-zinc-600 uppercase font-medium tracking-[0.3em]">Cierre Final de Operación</p>
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-xl font-medium text-white ">€</span>
                        <input 
                          type="number"
                          className="bg-transparent border-none text-4xl font-medium text-white w-56 focus:outline-none text-center italic"
                          placeholder="0.00"
                          value={selectedLead.montoCierre || ''}
                          onChange={(e) => updateLeadClosing(selectedLead.id, 'montoCierre', parseFloat(e.target.value))}
                        />
                    </div>
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* Footer: Cambio de Estado Manual Detallado */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-zinc-950 border-t border-zinc-900 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
           <div className="flex items-center justify-between gap-6">
              <div className="flex flex-col">
                 <span className="text-[9px] font-medium text-zinc-600 uppercase tracking-widest">Siguiente Paso</span>
                 <select 
                   className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer hover:text-emerald-500"
                   value={selectedLead.status}
                   onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadState)}
                 >
                    <optgroup label="1. ENTRADA" className="bg-zinc-950">
                      <option value="preparado">Preparado</option>
                      <option value="mensaje_enviado">Mensaje Enviado</option>
                      <option value="en_espera">En Espera</option>
                    </optgroup>
                    <optgroup label="2. FILTRO" className="bg-zinc-950">
                      <option value="respondio">Respondió</option>
                      <option value="filtro">Filtro Conversacional</option>
                      <option value="cualificado">Cualificado</option>
                    </optgroup>
                    <optgroup label="3. LOOM" className="bg-zinc-950">
                      <option value="apto_loom">Apto para Loom</option>
                      <option value="loom_enviado">Loom Enviado</option>
                      <option value="espera_loom">Espera de Loom</option>
                    </optgroup>
                    <optgroup label="4. LLAMADA" className="bg-zinc-950">
                      <option value="listo_llamada">Listo para Llamada</option>
                      <option value="calendly_enviado">Calendly Enviado</option>
                      <option value="agendada">Llamada Agendada</option>
                      <option value="realizada">Llamada Realizada</option>
                    </optgroup>
                    <optgroup label="5. CIERRE" className="bg-zinc-950">
                      <option value="cierre">Fase de Cierre</option>
                      <option value="seguimiento">Seguimiento</option>
                      <option value="cerrado">Venta Cerrada</option>
                    </optgroup>
                    <optgroup label="X. DESCARTE" className="bg-zinc-950">
                      <option value="no_apto">No Apto</option>
                      <option value="no_listo">No Listo Aún</option>
                      <option value="ghosting">Ghosting</option>
                    </optgroup>
                 </select>
              </div>
              
              <div className="flex gap-4">
                 {selectedLead.status === 'realizada' && (
                    <button 
                      onClick={() => updateLeadStatus(selectedLead.id, 'cierre')}
                      className="px-8 py-3 bg-emerald-500 text-zinc-950 rounded-2xl font-medium uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-500/20"
                    >
                      Move to Cierre ➔
                    </button>
                 )}
                 {selectedLead.pagoValidado && selectedLead.status === 'cierre' && (
                    <button 
                      onClick={() => {
                        updateLeadStatus(selectedLead.id, 'cerrado');
                      }}
                      className="group/btn relative px-10 py-4 bg-white text-zinc-950 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                      <span className="relative z-10 flex items-center gap-3">
                         Finalizar Operación <CheckCircle2 className="h-4 w-4" />
                      </span>
                    </button>
                 )}
              </div>
           </div>
        </div>
      </div>
    </>
  );
}
