import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useDashboardPanelsStore = create(
    devtools((set, _get) => ({
        panels: {},

        setPanels: (panels: unknown) => {
            set({ panels: panels });
        },
    }))
);

export default useDashboardPanelsStore;
