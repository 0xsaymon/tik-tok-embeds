export type PromptHistoryEntry = {
  text: string;
  timestamp: number;
};

export type Background = {
  id: string;
  prompt: string;
  seed: string;
  variation: number;
  isDefault: boolean;
  status: 'generating' | 'completed' | 'failed';
  progress: number;
  etaSeconds: number;
  createdAt: number;
};

export type BackgroundGeneratorState = {
  prompt: string;
  setPrompt: (text: string) => void;
  pushPromptToHistory: (text: string) => void;

  promptHistory: PromptHistoryEntry[];
  historyIndex: number;

  undo: () => string | null;
  redo: () => string | null;
  canUndo: boolean;
  canRedo: boolean;

  regeneratePrompt: (currentPrompt?: string) => string;

  backgrounds: Background[];
  selectedBackgroundId: string | null;
  selectBackground: (id: string) => void;
  setDefaultBackground: (id: string) => void;
  removeBackground: (id: string) => void;
  isGenerating: boolean;
  promptVariationByHash: Record<string, number>;

  generateBackground: (prompt?: string) => void;
  resetAll: () => void;
};
