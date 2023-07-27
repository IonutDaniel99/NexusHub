import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useRegisterWizardStore = create(
    devtools((set, get) => ({
        // Slides
        current_slide: 0,
        set_current_slide: (value) => set({ current_slide: value }),
        increment_current_slide: () => set((state) => ({ current_slide: state.current_slide + 1 })),
        decrement_current_slide: () => set((state) => ({ current_slide: state.current_slide - 1 })),
        // Account Data
        account_name: null,
        latitude: 1,
        longitude: 2,
        set_account_name: (value) => set({ account_name: value }),

    }))
);

export default useRegisterWizardStore;
