"use client"

import { useState } from "react"
import { Search, Loader2, CheckCircle, AlertTriangle, Target, Star as Sparkles, Activity, Video as Youtube, Briefcase as Linkedin, Map as Globe, Bolt as Zap, Save, Terminal, MessageCircle } from "lucide-react"
import { usePipelineStore, useContentStore } from "@/lib/store"
import { useUserStore } from "@/lib/userStore"

export default function InstagramManagerPage() {
  const [username, setUsername] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [entryType, setEntryType] = useState<'inbound' | 'outbound'>("outbound")
  const [result, setResult] = useState<null | Record<string, any>>(null)
  const [statusLog, setStatusLog] = useState<string[]>([])
  
  const addLead = usePipelineStore((state) => state.addLead)
  const addContentIdea = useContentStore((state) => state.addItem)
  const { profile } = useUserStore()

  const handleAnalizar = async () => {
    if (!username) return
    setIsAnalyzing(true)
    setResult(null)
    setStatusLog(["Iniciando conexión con IG...", "Buscando ecosistema digital..."])

    const logSteps = [
      "Extrayendo últimos posts para auditoría...",
      "Calculando score de 10 criterios Origin...",
      "Detectando grietas estructurales...",
      "Generando guión de Loom personalizado...",
      "Sintetizando Banco de Ideas..."
    ]

    let stepIdx = 0
    const logInterval = setInterval(() => {
      if (stepIdx < logSteps.length) {
        setStatusLog(prev => [...prev.slice(-3), logSteps[stepIdx]])
        stepIdx++
      }
    }, 2000)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username,
          userProfile: profile,
          entryType
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Error al analizar el perfil")
      }

      const data = await response.json()
      clearInterval(logInterval)
      setStatusLog(["¡Análisis VLAD 5.1 Completado!", "Datos estratégicos listos."])
      setTimeout(() => setStatusLog([]), 2000)
      setResult(data)
    } catch (error: any) {
      clearInterval(logInterval)
      setStatusLog(["ERROR: La auditoría ha fallado.", error.message])
      alert(error.message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-emerald-400"
    if (score >= 3) return "text-amber-400"
    return "text-rose-400"
  }

  const getPercentage = (count: number) => {
    return (count / 100) * 100
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-2 border-b border-zinc-900/50 pb-8">
        <h1 className="text-lg font-light tracking-[0.3em] uppercase text-zinc-300 flex items-center">
          Prospección <span className="font-normal text-emerald-500/70 text-[10px] tracking-[0.2em] ml-4 border-l border-zinc-800 pl-4">Intelligence Hub</span>
        </h1>
        <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-normal">
           Protocolo de Extracción VLAD 5.1 — Análisis de Inteligencia.
        </p>
      </div>
      
      {/* Buscador VLAD Premium */}
      <div className="bg-zinc-950/50 border border-zinc-900/50 rounded-[2rem] p-8 mb-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-105 transition-transform duration-1000">
          <Target className="h-40 w-40" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
             <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-[0.3em]">Ready for extraction</span>
          </div>
          
          <div className="flex gap-4 mb-6 max-w-md">
             <button 
               onClick={() => setEntryType('outbound')}
               className={`flex-1 py-3 px-6 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] border transition-all ${entryType === 'outbound' ? 'bg-zinc-100 text-zinc-900 border-transparent shadow-sm' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-700'}`}
             >
                Outbound
             </button>
             <button 
               onClick={() => setEntryType('inbound')}
               className={`flex-1 py-3 px-6 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] border transition-all ${entryType === 'inbound' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-700'}`}
             >
                Inbound
             </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enlace o usuario de Instagram..." 
                className="w-full bg-black/20 border border-zinc-800/80 rounded-full pl-14 pr-8 py-4 text-zinc-200 focus:outline-none focus:border-emerald-500/30 transition-all font-light text-sm placeholder:text-zinc-600"
                onKeyDown={(e) => e.key === 'Enter' && handleAnalizar()}
              />
            </div>
            <button 
               onClick={handleAnalizar}
               disabled={isAnalyzing || !username}
               className="flex items-center justify-center bg-zinc-100 text-zinc-900 px-10 py-4 rounded-full font-medium uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed md:w-auto w-full active:scale-[0.98]"
            >
              {isAnalyzing ? <Loader2 className="animate-spin h-4 w-4" /> : "Auditar"}
            </button>
          </div>

          {/* Tactical Log - Premium UI */}
          {isAnalyzing && (
            <div className="mt-8 bg-black/60 border border-zinc-900 rounded-3xl p-8 font-mono shadow-2xl animate-in zoom-in-95 duration-500">
               <div className="flex items-center gap-3 mb-6 border-b border-zinc-900 pb-4">
                  <Terminal className="h-4 w-4 text-emerald-500" />
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Origin Terminal v5.1 - Fast Extraction</span>
               </div>
               <div className="space-y-3">
                  {statusLog.map((log, i) => (
                    <div key={i} className="flex gap-4 items-center animate-in slide-in-from-left-4 duration-300">
                       <span className="text-emerald-500 font-bold lining-nums text-[10px]">[{i+1}]</span>
                       <p className="text-xs text-zinc-300 font-medium italic">{log}</p>
                    </div>
                  ))}
                  <div className="flex gap-4 items-center">
                     <div className="h-1 w-1 bg-emerald-500 animate-pulse rounded-full" />
                     <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest animate-pulse">Sincronizando Cerebro Origin...</p>
                  </div>
               </div>
            </div>
          )}

          <p className="text-[10px] text-zinc-600 mt-6 font-mono font-bold italic tracking-tighter">
             Se extraen automáticamente: seguidores, engagement, mix de contenido, funnel de entrada y ecosistema multiplataforma.
          </p>
        </div>
      </div>

      {/* RESULTADOS DEL ANÁLISIS STUDIO */}
      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 space-y-8">
          
          {/* ANALÍTICA CRUDA (ESTILO INFINITY DASHBOARD) */}
          <div className="bg-zinc-950/30 border border-zinc-900/50 rounded-[2rem] p-8 shadow-sm space-y-10 font-light">
             
             {/* Profile Row */}
             <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="h-20 w-20 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-xl font-light text-emerald-500 overflow-hidden shrink-0">
                  {result.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 text-center md:text-left">
                   <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                     <h3 className="text-xl font-medium text-white tracking-wide">@{result.username}</h3>
                     <CheckCircle className="text-blue-500 h-4 w-4 fill-blue-500/10" />
                     <span className="text-zinc-500 text-sm ml-1">{result.rawProfile?.fullName || 'Usuario'}</span>
                   </div>
                   <div className="flex items-center justify-center md:justify-start gap-6 text-[10px] font-medium text-zinc-400 uppercase tracking-widest mb-4">
                     <span><strong className="font-medium text-zinc-200">{result.rawProfile?.followersCount?.toLocaleString() || result.followers}</strong> seguidores</span>
                     <span><strong className="font-medium text-zinc-200">{result.rawProfile?.followsCount?.toLocaleString() || '---'}</strong> siguiendo</span>
                     <span><strong className="font-medium text-zinc-200">{result.rawProfile?.postsCount?.toLocaleString() || '---'}</strong> posts</span>
                   </div>
                   <p className="text-zinc-400 text-xs max-w-2xl leading-relaxed whitespace-pre-line border-l border-zinc-800/50 pl-4 py-1 italic opacity-80">
                     {result.rawProfile?.biography || 'Biografía no disponible...'}
                   </p>
                </div>
             </div>

             {/* Highlight Stats Row */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/20 rounded-2xl p-6 border border-zinc-800/50">
               <div className="flex flex-col items-center justify-center border-r border-zinc-800/30 last:border-0 relative">
                 <span className="text-lg text-emerald-400/80 font-medium lining-nums">{result.engagement}</span>
                 <span className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Engagement rate</span>
               </div>
               <div className="flex flex-col items-center justify-center border-r border-zinc-800/30 last:border-0 relative">
                 <span className="text-lg text-rose-400/80 font-medium lining-nums">
                    {(result.rawProfile?.latestPosts?.[0]?.likesCount ? `${(result.rawProfile.latestPosts.reduce((a: number, b: { likesCount: number }) => a + b.likesCount, 0) / result.rawProfile.latestPosts.length / 1000).toFixed(1)}K` : '---')}
                 </span>
                 <span className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Likes promedio</span>
               </div>
               <div className="flex flex-col items-center justify-center border-r border-zinc-800/30 last:border-0 relative">
                 <span className="text-lg text-blue-400/80 font-medium lining-nums">
                    {(result.rawProfile?.latestPosts?.[0]?.commentsCount ? Math.floor(result.rawProfile.latestPosts.reduce((a: number, b: { commentsCount: number }) => a + b.commentsCount, 0) / result.rawProfile.latestPosts.length) : '---')}
                 </span>
                 <span className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Comentarios prom.</span>
               </div>
               <div className="flex flex-col items-center justify-center relative">
                 <span className="text-lg text-zinc-300 font-medium lining-nums">{result.rawProfile?.latestPosts?.length || 0}</span>
                 <span className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Posts analizados</span>
               </div>
             </div>

             {/* Grid Top Posts */}
             {result.rawProfile?.latestPosts && result.rawProfile.latestPosts.length > 0 && (
               <div className="space-y-4">
                 <div className="flex items-center gap-2 mb-4">
                   <Sparkles className="h-3 w-3 text-emerald-500/50" />
                   <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">Actividad Reciente</span>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                   {result.rawProfile.latestPosts.slice(0, 5).map((post: { type?: string, caption?: string, likesCount: number, commentsCount: number }, i: number) => (
                     <div key={i} className="bg-black/30 border border-zinc-800/50 rounded-xl p-4 flex flex-col h-48 hover:border-zinc-700 transition-colors group">
                       <span className="text-[8px] text-emerald-500/70 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-flex self-start uppercase tracking-widest mb-auto">
                         {post.type || 'REEL'}
                       </span>
                       <div className="mt-auto space-y-3">
                         <p className="text-[10px] text-zinc-500 line-clamp-3 leading-snug font-light">{post.caption || '...'}</p>
                         <div className="flex items-center gap-3 text-[9px] text-zinc-400 lining-nums">
                           <span className="flex items-center gap-1"><span className="text-rose-500/50">❤</span> {(post.likesCount/1000).toFixed(1)}K</span>
                           <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3 text-blue-500/50" /> {post.commentsCount}</span>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>

          {/* TRANSICIÓN AL MOTOR VLAD */}
          <div className="relative flex items-center justify-center py-4">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-900"></div>
             </div>
             <div className="relative bg-black px-4 text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] flex items-center gap-2">
                <Target className="h-3 w-3" /> Motor VLAD (Veredicto Estratégico)
             </div>
          </div>

          {/* Veredicto y Score Rápido */}
          <div className="bg-zinc-950/30 border border-zinc-900/50 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-6 md:border-r border-zinc-800/50 md:pr-10">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Score VLAD</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-light text-white lining-nums">{result.totalScore}</span>
                    <span className="text-xs text-zinc-600">/50</span>
                  </div>
                </div>
             </div>
             <div className={`px-8 py-2 font-medium rounded-full text-[10px] tracking-[0.2em] border uppercase overflow-hidden ${result.veredicto === 'Verde' ? 'border-emerald-500/30 text-emerald-400' : result.veredicto === 'Amarillo' ? 'border-amber-500/30 text-amber-400' : 'border-rose-500/30 text-rose-400'}`}>
                 State: {result.veredicto}
             </div>
             <div className="flex flex-col items-center md:items-end">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest">Temperatura</span>
                <span className="text-sm font-medium text-zinc-300 uppercase">{result.temperature}</span>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-8">
               
               {/* Multiplataforma & Funnel */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 shadow-xl group">
                     <h4 className="text-[10px] font-black text-zinc-500 mb-8 uppercase tracking-[0.3em] flex items-center gap-2 border-b border-zinc-900 pb-4">
                        <Globe className="h-4 w-4 text-emerald-500" /> Ecosistema Activo
                     </h4>
                     <div className="space-y-6">
                        <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform">
                           <div className="flex items-center gap-3">
                              <Linkedin className="h-5 w-5 text-blue-500" />
                              <span className="text-xs font-bold text-zinc-300">LinkedIn</span>
                           </div>
                           <span className="text-[10px] text-zinc-500 font-mono italic">{result.linkedin || "No detectado"}</span>
                        </div>
                        <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform duration-500">
                           <div className="flex items-center gap-3">
                              <Youtube className="h-5 w-5 text-rose-500" />
                              <span className="text-xs font-bold text-zinc-300">YouTube</span>
                           </div>
                           <span className="text-[10px] text-zinc-500 font-mono italic">{result.youtube || "No detectado"}</span>
                        </div>
                        <div className="mt-8 p-4 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                           <p className="text-[11px] text-zinc-400 leading-relaxed italic">{result.ecosistema}</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 shadow-xl">
                     <h4 className="text-[10px] font-black text-zinc-500 mb-8 uppercase tracking-[0.3em] flex items-center gap-2 border-b border-zinc-900 pb-4">
                        <Zap className="h-4 w-4 text-amber-500" /> Funnel de Entrada
                     </h4>
                     <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                           <Target className="h-6 w-6" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Source principal</p>
                           <p className="text-lg font-black text-zinc-100">{result.funnelSource || "Analizando..."}</p>
                        </div>
                     </div>
                     <p className="text-[11px] text-zinc-500 leading-relaxed">
                        El prospecto parece captar principalmente vía {result.funnelSource || "canales directos"}. Esto define el tipo de mensaje inicial.
                     </p>
                  </div>
               </div>

               {/* Scorecard Detailed Studio */}
               <div className="bg-zinc-950/30 border border-zinc-900/50 rounded-[2rem] p-10">
                  <h4 className="text-[10px] font-medium text-emerald-500/70 mb-8 uppercase tracking-[0.3em] flex items-center gap-2 border-b border-zinc-800/50 pb-4 text-center justify-center">
                    <Activity className="h-3 w-3" /> Auditoría Estructural Origin
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {Object.entries(result.scorecard).map(([key, data]: [string, any], idx) => (
                      <div key={key} className="flex flex-col group py-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                             <span className="text-zinc-700 font-light tracking-tighter">0{idx+1}</span>
                             {key}
                          </span>
                          <span className={`text-sm font-medium lining-nums ${getScoreColor(data.score)}`}>{data.score}</span>
                        </div>
                        <div className="h-px w-full bg-zinc-900 mb-2 overflow-hidden relative">
                           <div className={`absolute top-0 left-0 h-full bg-current transition-all duration-1000 ${getScoreColor(data.score)}`} style={{ width: `${(data.score / 5) * 100}%`, opacity: 0.5 }} />
                        </div>
                        <p className="text-[10px] text-zinc-500 font-light leading-relaxed group-hover:text-zinc-400 transition-colors">
                          {data.nota}
                        </p>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Winning Content Analysis (NUEVO) */}
               <div className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-12 shadow-xl">
                  <h4 className="text-[10px] font-black text-zinc-500 mb-10 uppercase tracking-[0.4em] flex items-center gap-2 border-b border-zinc-900 pb-6">
                    <CheckCircle className="h-4 w-4 text-emerald-500" /> Winning Content Analysis
                  </h4>
                  <div className="space-y-8">
                     {result.winningPosts && result.winningPosts.map((post: { title: string, metrics: string, why: string }, i: number) => (
                        <div key={i} className="flex gap-6 p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all group">
                           <div className="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center text-emerald-500 shrink-0 font-black italic shadow-inner">
                              {i+1}
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                 <h5 className="text-sm font-black text-white uppercase tracking-tight line-clamp-1">{post.title}</h5>
                                 <span className="text-[9px] font-black text-zinc-500 uppercase font-mono">{post.metrics} engagement</span>
                              </div>
                              <p className="text-[11px] text-zinc-400 leading-relaxed italic border-l-2 border-emerald-500/30 pl-4 py-1">
                                 <span className="text-emerald-500/80 font-black uppercase text-[9px] mr-2">Origin Why:</span>
                                 {post.why}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Content Ideas Bank Implementation */}
               <div className="bg-zinc-950 border border-emerald-500/20 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Sparkles className="h-24 w-24 text-emerald-500" />
                  </div>
                  <h4 className="text-[10px] font-black text-emerald-500 mb-10 uppercase tracking-[0.4em] flex items-center gap-2 border-b border-emerald-500/10 pb-6">
                    <Sparkles className="h-4 w-4" /> Banco de Ideas Estratégicas (IA Suggest)
                  </h4>
                  
                  <div className="space-y-6">
                    {result.contentIdeas && result.contentIdeas.map((idea: { format: string, title: string, description: string, goal: string, hook: string, script: string }, i: number) => (
                      <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-black/40 border border-zinc-900 rounded-[2rem] hover:border-emerald-500/30 transition-all group">
                         <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                               <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                                  {idea.format}
                               </span>
                               <h5 className="text-sm font-black text-white uppercase tracking-tight">{idea.title}</h5>
                            </div>
                            <p className="text-xs text-zinc-500 italic leading-relaxed mb-3">{idea.description}</p>
                            <div className="flex gap-2 text-[9px] font-black text-zinc-600 uppercase italic">
                               <span className="border border-zinc-800 px-2 py-0.5 rounded">OBJ: {idea.goal}</span>
                               <span className="border border-zinc-800 px-2 py-0.5 rounded">CON GUIÓN DINÁMICO</span>
                            </div>
                         </div>
                         <button 
                           onClick={() => {
                             addContentIdea({
                               title: idea.title,
                               format: idea.format,
                               status: 'Idea',
                               description: idea.description,
                               leadId: result.username,
                               goal: idea.goal,
                               hook: idea.hook,
                               fullScript: idea.script
                             } as any);
                             alert('Idea enviada al Banco de Ideas para aprobación.');
                           }}
                           className="h-14 w-14 rounded-2xl bg-zinc-900 hover:bg-emerald-500 text-zinc-500 hover:text-zinc-950 flex items-center justify-center transition-all group-hover:scale-110 shadow-xl"
                         >
                           <Save className="h-6 w-6" />
                         </button>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Columna Lateral Premium */}
            <div className="space-y-8 animate-in slide-in-from-right duration-700 delay-300">
               
               {/* Grieta Structural */}
               <div className="p-10 bg-gradient-to-br from-zinc-900 to-black border-2 border-emerald-500/10 rounded-[2.5rem] shadow-2xl relative group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                     <Target className="h-20 w-20" />
                  </div>
                  <h4 className="text-[10px] font-black text-zinc-500 mb-6 uppercase tracking-[0.4em] flex items-center gap-2">
                     🎯 Grieta Detectada
                  </h4>
                  <p className="text-lg text-emerald-500 font-bold leading-relaxed italic border-l-2 border-emerald-500/50 pl-6 py-2">
                    &quot;{result.anguloEntrada}&quot;
                  </p>
               </div>

               {/* Alertas */}
               {result.flags && result.flags.length > 0 && (
                  <div className="bg-zinc-950 border border-rose-500/20 rounded-[2.5rem] p-10 shadow-2xl">
                     <h4 className="text-[10px] font-black text-rose-500 mb-8 uppercase tracking-[0.4em] flex items-center gap-2 border-b border-rose-500/10 pb-4">
                        <AlertTriangle className="h-4 w-4" /> Banderas Rojas
                     </h4>
                     <div className="space-y-4">
                        {result.flags.map((flag: string, i: number) => (
                           <div key={i} className="bg-rose-500/5 text-rose-300 text-xs p-5 rounded-2xl border border-rose-500/10 flex items-start gap-4 font-medium italic">
                              <span className="text-rose-500 font-black">!</span>
                              {flag}
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Acciones de Pipeline */}
               <div className="space-y-4">
                  <button 
                    onClick={() => {
                      addLead({
                        username: result.username,
                        followers: result.followers,
                        engagement: result.engagement,
                        totalScore: result.totalScore,
                        veredicto: result.veredicto,
                        scorecard: result.scorecard,
                        flags: result.flags,
                        anguloEntrada: result.anguloEntrada,
                        rompePatron: result.rompePatron,
                        guionLoom: result.guionLoom,
                        notasLlamada: result.notasLlamada,
                        youtube: result.youtube,
                        linkedin: result.linkedin,
                        ecosistema: result.ecosistema,
                        funnelSource: result.funnelSource,
                        entryType: entryType,
                        competitors: result.competitors
                      });
                      alert('¡Lead calificado y enviado a Pipeline!');
                    }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-zinc-100 text-zinc-900 hover:bg-emerald-50 hover:text-emerald-800 transition-all text-[10px] font-medium uppercase tracking-[0.2em] shadow-sm active:scale-[0.98]"
                  >
                    Mover al Pipeline ➔
                  </button>

                  <div className="p-10 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] mt-10 relative overflow-hidden group shadow-2xl">
                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-10 border-b border-zinc-900 pb-4 flex items-center gap-2 text-center justify-center">
                       {entryType === 'outbound' ? 'Protocolo Outbound (Manual 05)' : 'Protocolo Inbound (Manual 06)'}
                    </h4>
                    <div className="space-y-10 relative z-10">
                      {entryType === 'outbound' ? (
                        <>
                          <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-4">Checklist: Entrada Silenciosa</p>
                          {[
                            { step: 1, label: 'Follow Estratégico', desc: 'Seguir cuenta principal y secundaria.' },
                            { step: 2, label: 'Like con Criterio', desc: '3 likes en posts con mayor autoridad.' },
                            { step: 3, label: 'Interacción Story', desc: 'Responder a story activa sin vender.' },
                            { step: 4, label: 'Apertura (Sin Pitch)', desc: 'Enviar Rompe-Patrón para abrir respuesta.' },
                          ].map((s) => (
                            <div key={s.step} className="flex gap-6 group/step">
                               <div className="h-8 w-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-500 shrink-0 group-hover/step:text-emerald-500 transition-colors shadow-inner italic">
                                  {s.step}
                               </div>
                               <div className="flex flex-col">
                                <span className="text-xs font-black text-zinc-200 uppercase tracking-widest">{s.label}</span>
                                <span className="text-[11px] text-zinc-600 mt-1 leading-tight font-medium italic">{s.desc}</span>
                               </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-4">Filtro Conversacional Directo</p>
                          {[
                            { step: 1, label: 'Validación Interés', desc: 'Confirmar fuente del contacto (Contenido/Anuncio).' },
                            { step: 2, label: 'Diagnóstico Rápido', desc: 'Preguntas de "Grieta" para confirmar encaje.' },
                            { step: 3, label: 'Mover a Loom/Call', desc: 'Agendar si el caso es cualificado (Cerrar rápido).' },
                          ].map((s) => (
                            <div key={s.step} className="flex gap-6 group/step border-l-2 border-amber-500/10 pl-4 py-2">
                               <div className="h-8 w-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-black text-amber-500 shrink-0 group-hover/step:text-white transition-colors shadow-inner italic">
                                  {s.step}
                               </div>
                               <div className="flex flex-col">
                                <span className="text-xs font-black text-zinc-200 uppercase tracking-widest">{s.label}</span>
                                <span className="text-[11px] text-zinc-600 mt-1 leading-tight font-medium italic">{s.desc}</span>
                               </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
               </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
