import { create } from "zustand";

const gameStore = create((set, get) => ({
  userDifficulty: 0,
  setDifficulty: (num) => set(() => ({ userDifficulty: num })),
}));

export default gameStore;
