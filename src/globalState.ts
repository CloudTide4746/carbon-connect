/** @format */

import { create } from "zustand";

interface GlobalState {
  isRuzhuOpen: boolean;
  setIsRuzhuOpen: (isRuzhuOpen: boolean) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  isRuzhuOpen: false,
  setIsRuzhuOpen: (isRuzhuOpen: boolean) => set({ isRuzhuOpen }),
}));

export default useGlobalStore;
