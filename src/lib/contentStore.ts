import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ContentItem {
  id: string;
  title: string;
  type: 'post' | 'reels' | 'stories' | 'newsletter';
  date: string;
  status: 'idea' | 'planned' | 'draft' | 'published';
  anguloId?: string; // Vinculación opcional con ángulo de lead
}

interface ContentStore {
  items: ContentItem[];
  addItem: (item: Omit<ContentItem, 'id'>) => void;
  deleteItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<ContentItem>) => void;
}

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      items: [
        { id: '1', title: 'La grieta de los info-productores en 2026', type: 'reels', date: '2026-04-10', status: 'planned' },
        { id: '2', title: 'Por qué tu VSL no convierte', type: 'post', date: '2026-04-12', status: 'idea' }
      ],
      addItem: (item) => set((state) => ({
        items: [...state.items, { ...item, id: Math.random().toString(36).substr(2, 9) }]
      })),
      deleteItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id)
      })),
      updateItem: (id, updates) => set((state) => ({
        items: state.items.map((i) => i.id === id ? { ...i, ...updates } : i)
      })),
    }),
    { name: 'content-storage' }
  )
);
