"use client"

import { useUserStore } from "@/lib/userStore"
import { useState } from "react"
import { Save, User, Shield, Target, Zap, Sparkles, Layout } from "lucide-react"

export default function IdentityPage() {
  const { profile, setProfile } = useUserStore()
  const [formData, setFormData] = useState(profile)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setProfile(formData)
    setTimeout(() => {
      setIsSaving(false)
      alert('Identidad de Origen actualizada. El sistema ahora te conoce mejor.')
    }, 1000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-light tracking-[0.3em] uppercase text-zinc-300">
           Origin <span className="font-normal text-emerald-500/70 tracking-[0.2em] ml-2">Identity</span>
        </h1>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-light">Configuración del ADN Operativo y Marca Maestra</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
        <div className="space-y-10">
          {/* ADN Card */}
          <section className="bg-zinc-950/30 border border-zinc-900/50 rounded-[2rem] p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:scale-105 transition-transform duration-1000">
              <Shield className="h-40 w-40" />
            </div>
            
            <h3 className="text-[9px] font-medium text-emerald-500/70 uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
              <User className="h-3 w-3" /> Datos de Identidad
            </h3>

            <div className="space-y-8 relative z-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Tu Nombre</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ej: Lucía Olmos"
                    className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-emerald-500/50 transition-all font-medium text-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Marca / Logo</label>
                  <input 
                    type="text" 
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    placeholder="Ej: Origin"
                    className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-emerald-500/50 transition-all font-medium text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-medium text-zinc-500 uppercase tracking-[0.2em] pl-2">Sistema / Metodología</label>
                <input 
                  type="text" 
                  value={formData.system}
                  onChange={(e) => setFormData({...formData, system: e.target.value})}
                  placeholder="Ej: Sistema Operativo de Lanzamientos Origin"
                  className="w-full bg-black/20 border border-zinc-800/80 rounded-2xl px-6 py-4 text-zinc-200 focus:outline-none focus:border-emerald-500/30 transition-all font-light text-sm placeholder:text-zinc-700"
                />
              </div>
            </div>
          </section>

          {/* Oferta y Avatar */}
          <section className="bg-zinc-950/30 border border-zinc-900/50 rounded-[2rem] p-10 shadow-sm relative overflow-hidden group">
             <h3 className="text-[9px] font-medium text-amber-500/70 uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
              <Zap className="h-3 w-3" /> Corazón del Negocio
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Producto Estrella</label>
                <input 
                  type="text" 
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  placeholder="Ej: Mentoría High Ticket Origin"
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-emerald-500/50 transition-all font-medium text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">La Oferta Irresistible</label>
                <textarea 
                  value={formData.offer}
                  onChange={(e) => setFormData({...formData, offer: e.target.value})}
                  placeholder="Describe qué prometes y qué grieta solucionas..."
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-emerald-500/50 transition-all font-medium text-sm h-32 resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">Avatar / ICP (Perfil de Cliente Ideal)</label>
                <textarea 
                  value={formData.icp}
                  onChange={(e) => setFormData({...formData, icp: e.target.value})}
                  placeholder="Ej: Mentores de Facturación > 10K que son el cuello de botella de su negocio..."
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-emerald-500/50 transition-all font-medium text-sm h-24 resize-none"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-zinc-950/30 border border-zinc-900/50 rounded-[2rem] p-8 shadow-sm sticky top-8 text-center group">
             <div className="h-28 w-28 rounded-full bg-zinc-900 border border-zinc-800/80 mx-auto mb-6 flex items-center justify-center text-3xl font-light text-emerald-500 shadow-inner group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                {formData.avatar ? <img src={formData.avatar} className="w-full h-full object-cover" /> : formData.name?.charAt(0) || 'O'}
             </div>
             <h4 className="text-sm font-medium text-white tracking-widest uppercase mb-1">{formData.name || 'Identidad Pendiente'}</h4>
             <p className="text-[9px] text-zinc-500 uppercase font-light tracking-[0.3em] mb-8">{formData.brand || 'Marca Maestra'}</p>
             
             <div className="space-y-4 pt-8 border-t border-zinc-900/50">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-zinc-100 text-zinc-900 font-medium uppercase tracking-[0.2em] hover:bg-emerald-50 hover:text-emerald-800 transition-all active:scale-[0.98] disabled:opacity-50 text-[10px]"
                >
                  {isSaving ? 'Guardando...' : <><Save className="h-3 w-3" /> Guardar ADN</>}
                </button>
                <p className="text-[9px] text-zinc-600 font-light">Actualiza el comportamiento de VLAD</p>
             </div>
          </section>

          <section className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] opacity-50">
             <h5 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layout className="h-3 w-3" /> Estado del Sistema
             </h5>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-tighter italic">
                   <span>Conexión VLAD</span>
                   <span className="text-emerald-500">Activa</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-tighter italic">
                   <span>Contexto de Marca</span>
                   <span>Inyectado</span>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  )
}
