import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useRegisterWizardStore = create(
    devtools((set, get) => ({
        // Slides
        current_slide: 0,
        set_current_slide: (value) => set({ current_slide: value }),
        increment_current_slide: () => set((state) => ({ current_slide: state.current_slide + 1 })),
        decrement_current_slide: () => set((state) => ({ current_slide: state.current_slide - 1 })),
        reset_slide: () => set(() => ({ current_slide: 0 })),
        // Account Data
        account_name: null,
        set_account_name: (value) => set({ account_name: value }),
        latitude: 0,
        set_latitude: (value) => set({ latitude: value }),
        longitude: 0,
        set_longitude: (value) => set({ longitude: value }),
        city_name: "",
        set_city_name: (value) => set({ city_name: value }),

    }))
);

export default useRegisterWizardStore;
