"use client";

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { usePipelineStore, LeadState, Lead } from '@/lib/store';
import { cn } from '@/lib/utils';

const COLUMNS = [
  { id: 'entrada', title: '1. Entrada', states: ['preparado', 'mensaje_enviado', 'en_espera'] },
  { id: 'filtro', title: '2. Filtro', states: ['respondio', 'filtro', 'cualificado'] },
  { id: 'loom', title: '3. Loom', states: ['apto_loom', 'loom_enviado', 'espera_loom'] },
  { id: 'llamada', title: '4. Llamada', states: ['listo_llamada', 'calendly_enviado', 'agendada', 'realizada'] },
  { id: 'cierre', title: '5. Cierre', states: ['cierre', 'seguimiento'] },
  { id: 'ventas', title: '✓ Ventas Cerradas', states: ['cerrado'] },
  { id: 'descarte', title: 'X. Descarte', states: ['no_apto', 'no_listo', 'ghosting'] }
];

export function KanbanBoard() {
  const { leads, updateLeadStatus, selectLead } = usePipelineStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Standard Next.js hydration fix for DragDropContext
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Al mover a una columna, asignamos el primer estado de esa fase por defecto
    const targetColumn = COLUMNS.find(c => c.id === destination.droppableId);
    if (targetColumn) {
      updateLeadStatus(draggableId, targetColumn.states[0] as LeadState);
    }
  };

  if (!mounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-10 h-[calc(100vh-250px)] custom-scrollbar">
        {COLUMNS.map((column) => (
          <div key={column.id} className="flex flex-col bg-zinc-950/30 border border-zinc-900/50 rounded-3xl min-w-[320px] max-w-[320px] shadow-sm">
            <div className="p-6 border-b border-zinc-900/50 flex justify-between items-center bg-black/10 rounded-t-3xl">
              <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-[0.3em]">{column.title}</h3>
              <span className="text-[9px] font-medium bg-zinc-900/50 border border-zinc-800/80 px-3 py-1 rounded-full text-zinc-400">
                {leads.filter(l => column.states.includes(l.status)).length}
              </span>
            </div>
            
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 p-4 space-y-4 overflow-y-auto transition-all duration-300 ${
                    snapshot.isDraggingOver ? 'bg-emerald-500/5' : ''
                  }`}
                >
                  {leads
                    .filter((lead) => column.states.includes(lead.status))
                    .map((lead, index) => (
                      <Draggable key={lead.id} draggableId={lead.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => selectLead(lead.id)}
                            className={`bg-zinc-900/40 p-5 rounded-2xl border transition-all group flex flex-col gap-4 cursor-pointer hover:bg-zinc-900/60 active:scale-[0.98] ${
                              snapshot.isDragging ? 'border-emerald-500/50 shadow-xl bg-zinc-900/80 z-50' : 'border-zinc-800/30 hover:border-zinc-700/50'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex flex-col">
                                <span className="font-medium text-white text-sm tracking-wide group-hover:text-emerald-400 transition-colors">@{lead.username}</span>
                                <span className="text-[9px] text-zinc-500 font-medium uppercase tracking-[0.2em] mt-1">
                                  {lead.status.replace('_', ' ')}
                                </span>
                              </div>
                              <div className={cn(
                                "h-2 w-2 rounded-full",
                                lead.temperature === 'caliente' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' :
                                lead.temperature === 'tibio' ? 'bg-amber-500' :
                                lead.temperature === 'frio' ? 'bg-blue-500' : 'bg-emerald-500'
                              )} />
                            </div>

                            <div className="flex items-center justify-between gap-2 mt-2">
                                <div className="flex gap-2">
                                  <span className={`px-2 py-0.5 rounded-sm text-[8px] font-medium uppercase tracking-widest border ${
                                    lead.entryType === 'inbound' ? 'bg-amber-500/5 text-amber-500/80 border-amber-500/20' : 'bg-transparent text-zinc-500 border-zinc-800'
                                  }`}>
                                    {lead.entryType}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-sm text-[8px] font-medium uppercase tracking-widest border ${
                                    lead.veredicto === 'Verde' ? 'bg-emerald-500/5 text-emerald-500/80 border-emerald-500/20' : 'bg-transparent text-zinc-600 border-zinc-800/50'
                                  }`}>
                                    Score: {lead.totalScore}
                                  </span>
                                </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
