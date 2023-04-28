import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { calculateStartTime } from "@/helpers/timerHelpers";
import { resetPuzzleProgress } from "@/helpers/puzzleHelpers";

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

  isExpired: false,
  setIsExpired: (bool) => set({ isExpired: bool }),

  reverseCount: false,
  setReverseCount: (bool) => set({ reverseCount: bool }),

  showRestartModal: false,
  setShowRestartModal: (bool) => set({ showRestartModal: bool }),

  handleReset: (puzzleObj) =>
    set((state) => ({
      isFinished: false,
      isExpired: false,
      running: true,
      puzzle: puzzleObj || state.puzzle,
      reverseCount: state.userDifficulty > 0,
      time: calculateStartTime(
        state.userDifficulty > 0,
        puzzleObj
          ? puzzleObj.timeLimit || puzzleObj.size
          : state.puzzle.timeLimit || state.puzzle.size
      ),
      puzzleProgress: resetPuzzleProgress(
        puzzleObj ? puzzleObj.solution : state.puzzle.solution
      ),
    })),

  showDifficultyChangeModal: false,
  setShowDifficultyChangeModal: (bool) =>
    set({ showDifficultyChangeModal: bool }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Game Store", gameStore);
}

export default gameStore;
