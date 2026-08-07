import { create } from 'zustand';
import { storage, storageKeys, getItem, setItem, removeItem } from '../storage';

export type UserRole = 'STUDENT' | 'FACULTY' | 'WARDEN' | 'PARENT' | 'ADMIN';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  department?: string;
  rollNumber?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateUser: (partialUser: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const initialToken = storage.getString(storageKeys.ACCESS_TOKEN) || null;
  const initialUser = getItem<User>(storageKeys.USER_DATA);

  return {
    user: initialUser,
    token: initialToken,
    isAuthenticated: !!initialToken && !!initialUser,
    isLoading: false,

    setAuth: (user, accessToken, refreshToken) => {
      storage.set(storageKeys.ACCESS_TOKEN, accessToken);
      storage.set(storageKeys.REFRESH_TOKEN, refreshToken);
      setItem(storageKeys.USER_DATA, user);

      set({
        user,
        token: accessToken,
        isAuthenticated: true,
        isLoading: false,
      });
    },

    logout: () => {
      removeItem(storageKeys.ACCESS_TOKEN);
      removeItem(storageKeys.REFRESH_TOKEN);
      removeItem(storageKeys.USER_DATA);

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    },

    updateUser: (partialUser) => {
      set((state) => {
        if (!state.user) return state;
        const updatedUser = { ...state.user, ...partialUser };
        setItem(storageKeys.USER_DATA, updatedUser);
        return { user: updatedUser };
      });
    },
  };
});
