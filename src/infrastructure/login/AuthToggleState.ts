import { create } from 'zustand';
import type { User } from '../../domain/user/user.types';

type AuthState = {
    isLoggedIn: boolean;
    isRoleUser: string;
    user: User | null;
    setIsLoggedIn: (value: boolean) => void;
    setIsRoleUser: (role: string) => void;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    isRoleUser: "",
    user: null,
    setIsLoggedIn: (value) => set({ isLoggedIn: value }),
    setIsRoleUser: (role) => set({ isRoleUser: role }),
    setUser: (user) => set({ user: user }),

    logout: () => set({ isLoggedIn: false, isRoleUser: "", user: null }),
}));