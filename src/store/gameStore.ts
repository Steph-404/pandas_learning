import { create } from 'zustand';

type GameSequence = 'ARRIVING' | 'GREETING' | 'TRANSITION_LAB' | 'IN_LAB' | 'COMPLETED';

interface GameState {
  sequence: GameSequence;
  currentStageId: number;
  score: number;
  isDialogueActive: boolean;
  isQuestionActive: boolean;
  selectedAnswer: string | null;
  feedback: string | null;
  setSequence: (seq: GameSequence) => void;
  setStage: (stageId: number) => void;
  incrementScore: () => void;
  setDialogueActive: (active: boolean) => void;
  setQuestionActive: (active: boolean) => void;
  setSelectedAnswer: (answer: string | null) => void;
  setFeedback: (feedback: string | null) => void;
  nextStage: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  sequence: 'ARRIVING',
  currentStageId: 1,
  score: 0,
  isDialogueActive: false,
  isQuestionActive: false,
  selectedAnswer: null,
  feedback: null,
  
  setSequence: (seq) => set({ sequence: seq }),
  setStage: (stageId) => set({ currentStageId: stageId }),
  incrementScore: () => set((state) => ({ score: state.score + 100 })),
  setDialogueActive: (active) => set({ isDialogueActive: active }),
  setQuestionActive: (active) => set({ isQuestionActive: active }),
  setSelectedAnswer: (answer) => set({ selectedAnswer: answer }),
  setFeedback: (feedback) => set({ feedback: feedback }),
  
  nextStage: () => set((state) => ({ 
    currentStageId: state.currentStageId + 1,
    isDialogueActive: true,
    isQuestionActive: false,
    selectedAnswer: null,
    feedback: null
  }))
}));
