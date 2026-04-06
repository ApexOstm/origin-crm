import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Competitor {
  id: string;
  username: string;
  followers: string;
  strategy: string;
  gap: string;
  lastAudit: string;
}

interface CompetitorStore {
  competitors: Competitor[];
  addCompetitor: (comp: Omit<Competitor, 'id'>) => void;
  deleteCompetitor: (id: string) => void;
  updateCompetitor: (id: string, updates: Partial<Competitor>) => void;
}

export const useCompetitorStore = create<CompetitorStore>()(
  persist(
    (set) => ({
      competitors: [
        { id: '1', username: 'competidor1', followers: '50K', strategy: 'Lanzamientos PLF', gap: 'Falta de personalización en DMs', lastAudit: '2026-03-28' },
        { id: '2', username: 'mentor_premium', followers: '120K', strategy: 'High Ticket Directo', gap: 'No tiene sistema de retención de VSL', lastAudit: '2026-04-01' }
      ],
      addCompetitor: (comp) => set((state) => ({
        competitors: [...state.competitors, { ...comp, id: Math.random().toString(36).substr(2, 9) }]
      })),
      deleteCompetitor: (id) => set((state) => ({
        competitors: state.competitors.filter((c) => c.id !== id)
      })),
      updateCompetitor: (id, updates) => set((state) => ({
        competitors: state.competitors.map((c) => c.id === id ? { ...c, ...updates } : c)
      })),
    }),
    { name: 'competitor-storage' }
  )
);
