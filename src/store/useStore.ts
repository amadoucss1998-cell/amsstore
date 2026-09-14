import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  completedLessons: string[];
  bookmarkedLessons: string[];
  markComplete: (id: string) => void;
  toggleBookmark: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      bookmarkedLessons: [],
      markComplete: (id) => {
        const { completedLessons } = get();
        if (!completedLessons.includes(id))
          set({ completedLessons: [...completedLessons, id] });
      },
      toggleBookmark: (id) => {
        const { bookmarkedLessons } = get();
        set({
          bookmarkedLessons: bookmarkedLessons.includes(id)
            ? bookmarkedLessons.filter((x) => x !== id)
            : [...bookmarkedLessons, id],
        });
      },
    }),
    { name: 'lifeos-store' }
  )
);
