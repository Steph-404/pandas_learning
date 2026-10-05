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

const VALID_SEQUENCES: GameSequence[] = [
  'CAR_ARRIVING', 'ALIGHTING', 'GREETING', 'TRANSITION_LAB', 'IN_LAB',
  'APPROACHING_SCREEN', 'QUESTION_ACTIVE', 'FAREWELL_TRANSIT', 'FAREWELL', 'COMPLETED',
];

/** Dev/testing: ?seq=IN_LAB&stage=12&question=1 jumps straight to any point. */
const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const seqParam = params?.get('seq') ?? '';
const initialSequence: GameSequence = (VALID_SEQUENCES as string[]).includes(seqParam)
  ? (seqParam as GameSequence)
  : 'CAR_ARRIVING';
const stageParam = Number(params?.get('stage') ?? '1');
const initialStage = Number.isFinite(stageParam) && stageParam >= 1 && stageParam <= 43 ? stageParam : 1;

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
  sequence: initialSequence,
  currentStageId: initialStage,
  score: 0,
  isDialogueActive: params?.get('dialogue') === '1',
  isQuestionActive: params?.get('question') === '1',
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
