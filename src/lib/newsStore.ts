import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NewsCategory = 'Lanzamientos' | 'IA Marketing' | 'Ecosistema IG/LI/YT' | 'Estrategia';

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  category: NewsCategory;
  summary: string;
  impact: 'Alto' | 'Medio' | 'Bajo';
}

interface NewsStore {
  news: NewsItem[];
  aiSummary: string;
  setNews: (news: NewsItem[]) => void;
  setAiSummary: (summary: string) => void;
}

export const useNewsStore = create<NewsStore>()(
  persist(
    (set) => ({
      news: [
        { 
          id: '1', 
          title: 'El fin del Webinar Genérico: Microsistemas de Confianza', 
          source: 'Origin Intelligence', 
          date: '2026-04-05', 
          category: 'Lanzamientos', 
          summary: 'La audiencia ya no asiste a clases en vivo de 2 horas. La tendencia es el "On-Demand de Alta Fidelidad" con filtros de IA previos.',
          impact: 'Alto'
        },
        { 
          id: '2', 
          title: 'LinkedIn Video: El nuevo YouTube de Prospección B2B', 
          source: 'TechCommerce Insider', 
          date: '2026-04-04', 
          category: 'Ecosistema IG/LI/YT', 
          summary: 'LinkedIn está priorizando el video vertical nativo por encima del texto. El "Loom-Style" es la clave de la autoridad ahora.',
          impact: 'Alto'
        },
        { 
          id: '3', 
          title: 'IA Generativa: De "Chatbots" a "Agentes de Grieta"', 
          source: 'AI Ethics & Marketing', 
          date: '2026-04-03', 
          category: 'IA Marketing', 
          summary: 'Las herramientas que solo redactan están muriendo. El mercado ahora paga por IAs que detectan ineficiencias de negocio (como VLAD).',
          impact: 'Medio'
        }
      ],
      aiSummary: 'El cerebro estratégico detecta un cambio hacia la "Autoridad Genuina". Menos filtros, más datos reales y una integración total entre lo que dices en IG y cómo cierras en LinkedIn.',
      setNews: (news) => set({ news }),
      setAiSummary: (aiSummary) => set({ aiSummary }),
    }),
    { name: 'news-storage' }
  )
);
