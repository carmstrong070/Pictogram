import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

const gameStore = create((set) => ({
  userDifficulty: 0,
  setDifficulty: (int) => set(() => ({ userDifficulty: int })),
  isFinished: false,
  setIsFinished: (bool) => set(() => ({ isFinished: bool })),
  cursorPosition: undefined,
  setCursorPosition: (obj) => set(() => ({ cursorPosition: obj })),
  puzzleProgress: [],
  setPuzzleProgress: (arr) => set(() => ({ puzzleProgress: arr })),
  puzzle: {},
  setPuzzle: (obj) => set(() => ({ puzzle: obj })),
  time: 8000,
  setTime: (int) => set(() => ({ time: int })),
  running: true,
  setRunning: (bool) => set(() => ({ running: bool })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Game Store", gameStore);
}

export default gameStore;
