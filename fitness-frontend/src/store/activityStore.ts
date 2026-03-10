import { create } from "zustand";

interface ActivityStore {
  selectedActivityId: string | null;
  setSelectedActivityId: (id: string | null) => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  selectedActivityId: null,
  setSelectedActivityId: (id) => set({ selectedActivityId: id }),
}));
