import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useRootStore = create(
  devtools((set, get) => ({
    // Slides
    selected_user: "",
    set_selected_user: (value) => set({ selected_user: value }),
  }))
);

export default useRootStore;
