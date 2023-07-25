import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useRegisterWizardStore = create(
  devtools((set, get) => ({
    current_slide: 0,
    set_current_slide: (value) => set({ current_slide: value }),
    increment_current_slide: () => set((state) => ({ current_slide: state.current_slide + 1 })),
    decrement_current_slide: () => set((state) => ({ current_slide: state.current_slide - 1 })),
    account_name: null,
    set_account_name: (value) => set({ account_name: value }),
    retrieve_all_data: () =>
      get((state) => {
        state.account_name, state.current_slide;
      }),
  }))
);

export default useRegisterWizardStore;
