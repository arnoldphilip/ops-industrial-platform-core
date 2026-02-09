import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, FeatureFlags } from '../types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    setAuth: (user: User | null, token: string | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            token: null,
            setAuth: (user, token) => set({ user, token, isAuthenticated: !!user }),
            logout: () => set({ user: null, token: null, isAuthenticated: false }),
        }),
        { name: 'auth-storage' }
    )
);

interface UIState {
    theme: 'dark' | 'light';
    isSidebarOpen: boolean;
    toggleTheme: () => void;
    toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            theme: 'light',
            isSidebarOpen: true,
            toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        }),
        { name: 'ui-state' }
    )
);

interface ConfigState {
    flags: FeatureFlags;
    setFlags: (flags: FeatureFlags) => void;
}

export const useConfigStore = create<ConfigState>()((set) => ({
    flags: {
        enableAnalytics: true,
        enableExtraKpis: true,
        enableLiveChat: false,
        enableExport: true,
    },
    setFlags: (flags) => set({ flags }),
}));
