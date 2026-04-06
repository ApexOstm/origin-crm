"use client"

import { useState } from "react"
import { Link as Link2, Copy, Trash2, Zap, Target, BarChart, CheckCircle, Smartphone, Globe, Video as Youtube, Briefcase as Linkedin } from "lucide-react"

export default function UtmStudioPage() {
  const [baseUrl, setBaseUrl] = useState("")
  const [source, setSource] = useState("")
  const [medium, setMedium] = useState("social")
  const [campaign, setCampaign] = useState("")
  const [term, setTerm] = useState("")
  const [content, setContent] = useState("")
  const [copied, setCopied] = useState(false)

  const generateUtm = () => {
    if (!baseUrl) return ""
    let url = baseUrl
    if (!url.includes("?")) url += "?"
    else if (!url.endsWith("&") && !url.endsWith("?")) url += "&"

    const params = new URLSearchParams()
    if (source) params.append("utm_source", source)
    if (medium) params.append("utm_medium", medium)
    if (campaign) params.append("utm_campaign", campaign)
    if (term) params.append("utm_term", term)
    if (content) params.append("utm_content", content)

    return url + params.toString()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateUtm())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const presets = [
    { name: "IG Bio", source: "instagram", medium: "bio" },
    { name: "YT Description", source: "youtube", medium: "video_desc" },
    { name: "LI Post", source: "linkedin", medium: "native_post" }
  ]

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic">
          UTM <span className="text-emerald-500 not-italic uppercase">Studio</span>
        </h1>
        <p className="text-zinc-500 text-sm max-w-2xl font-medium tracking-wide">
           Control de Trazabilidad: Genera enlaces etiquetados para monitorizar el flujo de tus lanzamientos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
         
         {/* Builder Form */}
         <div className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-12 shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
               <Link2 className="h-40 w-40 text-emerald-500" />
            </div>

            <div className="space-y-6 relative z-10">
               <div className="flex items-center gap-3 border-b border-zinc-900 pb-6 mb-4">
                  <Globe className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Base Landing Page</h3>
               </div>
               <input 
                 type="text" 
                 value={baseUrl}
                 onChange={(e) => setBaseUrl(e.target.value)}
                 placeholder="https://tu-oferta.com/vsl..."
                 className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-200 font-medium italic focus:outline-none focus:ring-1 focus:ring-emerald-500/50 shadow-inner"
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-4">UTM Source</label>
                  <input 
                    type="text" 
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="instagram, youtube, etc."
                    className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-300 italic text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-4">UTM Medium</label>
                  <input 
                    type="text" 
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    placeholder="bio, post, cpc"
                    className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-300 italic text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-4">UTM Campaign</label>
                  <input 
                    type="text" 
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    placeholder="abril_2026_launch"
                    className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-300 italic text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  />
               </div>
               <div className="space-y-3 flex items-end">
                  <div className="w-full space-y-2">
                     <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest italic ml-4">Origin Presets</p>
                     <div className="flex gap-2">
                        {presets.map(p => (
                          <button 
                            key={p.name}
                            onClick={() => { setSource(p.source); setMedium(p.medium); }}
                            className="bg-zinc-900 px-3 py-2 rounded-xl text-[9px] font-black text-zinc-500 uppercase border border-zinc-800 hover:text-emerald-500 hover:border-emerald-500/30 transition-all"
                          >
                             {p.name}
                          </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-10 border-t border-zinc-900 relative z-10">
               <div className="p-8 bg-black/60 border border-zinc-900 rounded-[2.5rem] shadow-inner space-y-6">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Generated Traceable Link</p>
                  <div className="flex gap-4 items-center">
                     <div className="flex-1 bg-zinc-950/50 border border-zinc-900 p-6 rounded-2xl text-zinc-400 font-mono text-[11px] truncate italic">
                        {baseUrl ? generateUtm() : "Define una URL base para empezar..."}
                     </div>
                     <button 
                       onClick={handleCopy}
                       disabled={!baseUrl}
                       className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-95 ${copied ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-zinc-900 text-zinc-400 hover:bg-white hover:text-zinc-950'}`}
                     >
                        {copied ? <CheckCircle className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Strategic Context */}
         <div className="space-y-10 animate-in slide-in-from-right duration-1000">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-[3.5rem] p-12 shadow-2xl relative group">
               <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                  <Target className="h-24 w-24 text-emerald-500" />
               </div>
               <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-8 border-b border-zinc-800 pb-4">
                  Origin <span className="text-emerald-500">Traceability</span>
               </h3>
               <p className="text-sm font-medium text-zinc-400 italic leading-relaxed mb-8">
                  &quot;Si no puedes medirlo, no puedes escalarlo&quot;. Usa UTMs diferentes para cada ángulo de &quot;Grieta&quot; detectado.
               </p>
               <div className="space-y-6">
                  <div className="flex items-center gap-4 group/tip">
                     <BarChart className="h-4 w-4 text-emerald-500 shrink-0" />
                     <p className="text-[11px] text-zinc-500 uppercase font-black tracking-widest group-hover/tip:text-white transition-colors">Split Test por Fuente</p>
                  </div>
                  <div className="flex items-center gap-4 group/tip">
                     <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                     <p className="text-[11px] text-zinc-500 uppercase font-black tracking-widest group-hover/tip:text-white transition-colors">Control de ROI Real</p>
                  </div>
               </div>
            </div>

            <div className="p-12 bg-zinc-950/20 border-2 border-zinc-900 border-dashed rounded-[3.5rem] text-center space-y-6 group hover:bg-zinc-950/40 transition-colors">
               <div className="flex justify-center gap-4 opacity-30 group-hover:opacity-100 transition-opacity">
                  <Smartphone className="h-5 w-5 text-emerald-500" />
                  <Youtube className="h-5 w-5 text-rose-500" />
                  <Linkedin className="h-5 w-5 text-blue-500" />
               </div>
               <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] leading-relaxed italic">
                  Origin Intelligence v5.0 Active
               </p>
            </div>
         </div>

      </div>
    </div>
  )
}
