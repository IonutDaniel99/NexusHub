import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IGlobalStore {
    current_slide: number;
    set_current_slide: (value: number) => void;
    increment_current_slide: () => void;
    decrement_current_slide: () => void;
    reset_slide: () => void;
    account_name: string | null;
    set_account_name: (value: string | null) => void;
    uuid_string: string;
    set_uuid_string: (value: string) => void;
    latitude: number;
    set_latitude: (value: number) => void;
    longitude: number;
    set_longitude: (value: number) => void;
    city_name: string;
    set_city_name: (value: string) => void;
    openweathermap_api: string;
    set_openweathermap_api: (value: string) => void;
}

const useGlobalStore = create<IGlobalStore>(
    devtools((set) => ({
        // Slides
        current_slide: 0,
        set_current_slide: (value) => set({ current_slide: value }),
        increment_current_slide: () => set((state) => ({ current_slide: state.current_slide + 1 })),
        decrement_current_slide: () => set((state) => ({ current_slide: state.current_slide - 1 })),
        reset_slide: () => set(() => ({ current_slide: 0 })),
        // Account Data
        account_name: null,
        set_account_name: (value) => set({ account_name: value }),
        uuid_string: "",
        set_uuid_string: (value) => set({ uuid_string: value }),
        // Account Config
        latitude: 0,
        set_latitude: (value) => set({ latitude: value }),
        longitude: 0,
        set_longitude: (value) => set({ longitude: value }),
        city_name: "",
        set_city_name: (value) => set({ city_name: value }),
        openweathermap_api: "",
        set_openweathermap_api: (value) => set({ openweathermap_api: value }),

    })) as (set: any) => IGlobalStore
);
export default useGlobalStore;
