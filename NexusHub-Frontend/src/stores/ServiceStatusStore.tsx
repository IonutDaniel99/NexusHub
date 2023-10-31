import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useServiceStatusStore = create(
    devtools((set, get) => ({
        services: {},

        setServices: (fetchedData: unknown) => {
            set({ services: fetchedData });
        },

        addService: (newService: unknown) => {
            set((state: any) => ({ services: [...state.services, newService] }));
        },
    }))
);

export default useServiceStatusStore;
