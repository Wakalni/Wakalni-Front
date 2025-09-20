import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUser = create<UserState>((set) => ({
  user: {
    id: "1",
    name: "Ramzy",
    email: "ramzy@example.com",
    role: "user",
  },
  setUser: (user) => set({ user }),
}));
