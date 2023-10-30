import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useServiceStatusStore = create(
    devtools((set, get) => ({
        services: {},

        setServices: (fetchedData) => {
            set({ services: fetchedData });
        },

        addService: (newService) => {
            set((state) => ({ services: [...state.services, newService] }));
        },
    }))
);

export default useServiceStatusStore;
