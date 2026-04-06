import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LeadState = 
  | 'preparado' 
  | 'mensaje_enviado' 
  | 'en_espera' 
  | 'respondio' 
  | 'filtro' 
  | 'cualificado' 
  | 'apto_loom' 
  | 'loom_enviado' 
  | 'espera_loom' 
  | 'listo_llamada' 
  | 'calendly_enviado' 
  | 'agendada' 
  | 'realizada' 
  | 'cierre' 
  | 'seguimiento' 
  | 'no_apto' 
  | 'no_listo' 
  | 'ghosting'
  | 'cerrado';

export type Temperature = 'frio' | 'tibio' | 'caliente' | 'cierre';
export type EntryType = 'inbound' | 'outbound';

export interface Lead {
  id: string;
  username: string;
  followers: string;
  engagement?: string;
  totalScore: number;
  veredicto: 'Verde' | 'Amarillo' | 'Rojo' | 'Rojo (Forzado)';
  status: LeadState;
  temperature: Temperature;
  entryType: EntryType;
  scorecard?: Record<string, { score: number; nota: string }>;
  flags?: string[];
  anguloEntrada?: string;
  fortalezas?: string[];
  riesgos?: string[];
  rompePatron?: string;
  guionLoom?: string;
  notasLlamada?: string;
  // Inteligencia Competitiva
  competitors?: Array<{ username: string; advantage: string }>;
  // Campos de Cierre
  propuestaLink?: string;
  contratoFirmado?: boolean;
  pagoValidado?: boolean;
  montoCierre?: number;
  // Inteligencia Multiplataforma
  youtube?: string;
  linkedin?: string;
  ecosistema?: string;
  funnelSource?: string;
  winningPosts?: Array<{ title: string; metrics: string; why: string }>;
}

export type ContentFormat = 'Reel' | 'Post' | 'Carousel' | 'Story' | 'YouTube Long' | 'LinkedIn Post';
export type ContentStatus = 'Idea' | 'Aprobado' | 'Rechazado' | 'Programado' | 'Publicado';

export interface ContentItem {
  id: string;
  title: string;
  format: ContentFormat;
  status: ContentStatus;
  date?: string;
  leadId?: string; // Si la idea viene de un análisis de lead
  description?: string;
  goal?: string;
  hook?: string;
  fullScript?: string;
}

interface ContentStore {
  items: ContentItem[];
  addItem: (item: Omit<ContentItem, 'id'>) => void;
  updateStatus: (id: string, status: ContentStatus) => void;
  deleteItem: (id: string) => void;
}

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ 
        items: [...state.items, { ...item, id: Math.random().toString(36).substring(7) }] 
      })),
      updateStatus: (id, status) => set((state) => ({
        items: state.items.map((item) => item.id === id ? { ...item, status } : item)
      })),
      deleteItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),
    }),
    { name: 'origin-content-storage' }
  )
);

interface PipelineStore {
  leads: Lead[];
  selectedLeadId: string | null;
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'temperature'>) => void;
  updateLeadStatus: (id: string, newStatus: LeadState) => void;
  updateLeadScripts: (id: string, field: 'rompePatron'|'guionLoom'|'notasLlamada', value: string) => void;
  updateLeadClosing: (id: string, field: 'propuestaLink' | 'contratoFirmado' | 'pagoValidado' | 'montoCierre', value: string | number | boolean) => void;
  selectLead: (id: string | null) => void;
}

export const usePipelineStore = create<PipelineStore>()(
  persist(
    (set) => ({
      leads: [],
      selectedLeadId: null,
      selectLead: (id) => set({ selectedLeadId: id }),
      updateLeadScripts: (id, field, value) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id ? { ...lead, [field]: value } : lead
          ),
        })),
      addLead: (leadInfo) =>
        set((state) => ({
          leads: [
            ...state.leads,
            {
              ...leadInfo,
              id: Math.random().toString(36).substring(7),
              status: 'preparado',
              temperature: 'frio',
            },
          ],
        })),
      updateLeadStatus: (id, newStatus) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id ? { ...lead, status: newStatus } : lead
          ),
        })),
      updateLeadClosing: (id, field, value) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id ? { ...lead, [field]: value } : lead
          ),
        })),
    }),
    { name: 'origin-pipeline-storage' }
  )
);
