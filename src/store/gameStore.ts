import { create } from 'zustand';

export type GameSequence =
  | 'CAR_ARRIVING'
  | 'ALIGHTING'
  | 'GREETING'
  | 'TRANSITION_LAB'
  | 'IN_LAB'
  | 'APPROACHING_SCREEN'
  | 'QUESTION_ACTIVE'
  | 'FAREWELL_TRANSIT'
  | 'FAREWELL'
  | 'COMPLETED';

interface GameState {
  sequence: GameSequence;
  currentStageId: number;
  score: number;
  isDialogueActive: boolean;
  isQuestionActive: boolean;
  selectedAnswer: string | null;
  feedback: string | null;
  briefingActive: boolean;
  briefingPage: number;
  carProgress: number;
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
  sequence: 'CAR_ARRIVING',
  currentStageId: 1,
  score: 0,
  isDialogueActive: false,
  isQuestionActive: false,
  selectedAnswer: null,
  feedback: null,
  briefingActive: false,
  briefingPage: 1,
  carProgress: 0,

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
    feedback: null,
  })),
}));
