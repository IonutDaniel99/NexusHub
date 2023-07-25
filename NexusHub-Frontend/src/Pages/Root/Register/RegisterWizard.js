import { create } from "zustand"

const useRegisterWizardStore = create((set) => ({
    current_slide: 0,
    set_current_slide: (value) => set({ current_slide: value }),
    account_name: null,
    set_account_name: (value) => set({ account_name: value }),
}))

export default useRegisterWizardStore
