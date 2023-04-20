import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

const gameStore = create((set) => ({
  userDifficulty: 0,
  setDifficulty: (int) => set({ userDifficulty: int }),
  isFinished: false,
  setIsFinished: (bool) => set({ isFinished: bool }),
  cursorPosition: undefined,
  setCursorPosition: (obj) => set({ cursorPosition: obj }),
  puzzleProgress: [],
  setPuzzleProgress: (arr) => set({ puzzleProgress: arr }),
  puzzle: {},
  setPuzzle: (obj) => set({ puzzle: obj }),
  time: 0,
  setTime: (int) => set({ time: int }),
  running: true,
  setRunning: (bool) => set({ running: bool }),
  mouseDownInfo: {
    column: undefined,
    row: undefined,
    initialValue: undefined,
    button: undefined,
    isDragging: false,
  },
  setMouseDownInfo: (obj) => set({ mouseDownInfo: obj }),
  timerStatus: {
    reset: false,
    stopped: false,
    expired: false,
  },
  setTimerStatus: (obj) => set({ timerStatus: obj }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Game Store", gameStore);
}

export default gameStore;
