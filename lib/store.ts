import { create } from 'zustand';

interface GameState {
  userBalance: number;
  totalPrizesWon: number;
  gamesPlayed: number;
  currentGame: 'chess' | 'poker' | null;
  setUserBalance: (balance: number) => void;
  addPrizeWin: (amount: number) => void;
  incrementGamesPlayed: () => void;
  setCurrentGame: (game: 'chess' | 'poker' | null) => void;
}

export const useGameStore = create<GameState>((set) => ({
  userBalance: 0,
  totalPrizesWon: 0,
  gamesPlayed: 0,
  currentGame: null,
  setUserBalance: (balance) => set({ userBalance: balance }),
  addPrizeWin: (amount) => set((state) => ({ 
    totalPrizesWon: state.totalPrizesWon + amount,
    userBalance: state.userBalance + amount
  })),
  incrementGamesPlayed: () => set((state) => ({ 
    gamesPlayed: state.gamesPlayed + 1 
  })),
  setCurrentGame: (game) => set({ currentGame: game }),
}));