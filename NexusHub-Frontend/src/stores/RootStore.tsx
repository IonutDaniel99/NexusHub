import { create } from 'zustand';

interface IRootStore {
  selected_user: string;
  set_selected_user: (value: string) => void;
}

const useRootStore = create<IRootStore>((set) => ({
  // Slides
  selected_user: '',
  set_selected_user: (value) => set({ selected_user: value }),
}));

export default useRootStore;
