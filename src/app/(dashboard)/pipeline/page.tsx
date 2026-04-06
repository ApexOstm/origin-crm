import { KanbanBoard } from "@/components/features/KanbanBoard";
import { LeadScriptPanel } from "@/components/features/LeadScriptPanel";

export default function PipelinePage() {
  return (
    <>
      <div className="space-y-6 flex flex-col h-full">
        <div className="flex flex-col gap-2 border-b border-zinc-900/50 pb-8">
          <h1 className="text-lg font-light tracking-[0.3em] uppercase text-zinc-300 flex items-center">
            Origin <span className="font-normal text-emerald-500/70 text-[10px] tracking-[0.2em] ml-4 border-l border-zinc-800 pl-4">Pipeline</span>
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-normal">
            Gestión inteligente del flujo comercial.
          </p>
        </div>
        
        <div className="flex-1 mt-4">
          <KanbanBoard />
        </div>
      </div>
      <LeadScriptPanel />
    </>
  );
}
