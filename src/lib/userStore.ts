import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  name: string;
  brand: string;
  system: string;
  product: string;
  offer: string;
  icp: string;
  avatar?: string;
  isConfigured: boolean;
}

interface UserStore {
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;
  resetProfile: () => void;
}

const initialProfile: UserProfile = {
  name: '',
  brand: '',
  system: '',
  product: '',
  offer: '',
  icp: '',
  avatar: '',
  isConfigured: false,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: initialProfile,
      setProfile: (newProfile) =>
        set((state) => ({
          profile: { ...state.profile, ...newProfile, isConfigured: true },
        })),
      resetProfile: () => set({ profile: initialProfile }),
    }),
    { name: 'origin-user-storage' }
  )
);
