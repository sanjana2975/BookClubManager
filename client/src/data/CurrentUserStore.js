import { create } from 'zustand'

export const currentUserStore = create((set) => ({
    userName: '',
    setUserName: (newName) => set({ userName: newName })
}));