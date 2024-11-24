import { create } from 'zustand';
import clubsData from './BookClubs';

const useBookClubStore = create((set) => ({
  clubs: clubsData,
  addClub: (newClub) => set((state) => ({
    clubs: [...state.clubs, newClub]
  }))
}));

export default useBookClubStore;