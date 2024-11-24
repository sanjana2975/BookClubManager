import { create } from 'zustand'


export const currentUserStore = create((set) => ({
    userName: '',
    // The setUserName function should accept the new value as a parameter
    setUserName: (newName) => set({ userName: newName })
}));