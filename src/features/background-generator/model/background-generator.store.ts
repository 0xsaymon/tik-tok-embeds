import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type {
  Background,
  BackgroundGeneratorState,
  PromptHistoryEntry,
} from './background-generator.types';

const STORAGE_VER = 1;
const STORAGE_KEY = window.location.origin.concat(`:background-generator:v${STORAGE_VER}`);

const GENERATION_TICK_MS = 350;
const GENERATION_DURATION_MIN_MS = 2e3;
const GENERATION_DURATION_MAX_MS = 5e3;

const SAMPLE_PROMPTS = [
  'Animate glowing rays pulsating from behind the bottle, leaves gently swaying, and golden sparkles floating upward for a natural, radiant effect.',
  'Soft cinematic sunset glow behind the subject with subtle haze and warm highlights.',
  'Minimal bright studio backdrop with smooth gradients and premium fashion campaign lighting.',
  'Modern loft interior with natural daylight, soft shadows, and neutral tones.',
  'Lush green garden background with shallow depth of field and gentle bokeh.',
  'Outdoor tennis court at golden hour with clean lines and bright cinematic contrast.',
  'Architectural staircase interior with directional light and elegant editorial atmosphere.',
  'High-end product style background with soft spotlight and floating dust particles.',
  'Cozy coffee shop corner with warm bokeh lights and wooden textures in the background.',
  'Futuristic neon cityscape at night with deep purple and blue glowing reflections.',
];

const generationIntervals = new Map<string, ReturnType<typeof setInterval>>();

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hashFNV1a(input: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}

function promptHash(prompt: string) {
  return hashFNV1a(prompt.trim().toLowerCase());
}

function buildSeed(prompt: string, variation: number) {
  return `${promptHash(prompt)}-v${variation}`;
}

function computeHistoryFlags(promptHistory: PromptHistoryEntry[], historyIndex: number) {
  return {
    canUndo: historyIndex > 0,
    canRedo: historyIndex < promptHistory.length - 1,
  };
}

function computeIsGenerating(backgrounds: Background[]) {
  return backgrounds.some(background => background.status === 'generating');
}

function buildVariationMap(backgrounds: Background[]) {
  return backgrounds.reduce<Record<string, number>>((accumulator, background) => {
    const key = promptHash(background.prompt);
    const previous = accumulator[key] ?? 0;
    accumulator[key] = Math.max(previous, background.variation);
    return accumulator;
  }, {});
}

function createInitialBackgrounds() {
  const now = Date.now();

  const completed = (prompt: string, variation: number, isDefault: boolean, createdAt: number) => {
    const seed = buildSeed(prompt, variation);

    return {
      id: crypto.randomUUID(),
      prompt,
      seed,
      variation,
      isDefault,
      status: 'completed' as const,
      progress: 100,
      etaSeconds: 0,
      createdAt,
    };
  };

  return [
    completed(SAMPLE_PROMPTS[0], 1, true, now - 1000 * 60 * 18),
    completed(SAMPLE_PROMPTS[3], 1, false, now - 1000 * 60 * 16),
    completed(SAMPLE_PROMPTS[2], 1, false, now - 1000 * 60 * 14),
    completed(SAMPLE_PROMPTS[4], 1, false, now - 1000 * 60 * 12),
    completed(SAMPLE_PROMPTS[5], 1, false, now - 1000 * 60 * 10),
    completed(SAMPLE_PROMPTS[1], 1, false, now - 1000 * 60 * 8),
    completed(SAMPLE_PROMPTS[6], 1, false, now - 1000 * 60 * 6),
    completed(SAMPLE_PROMPTS[7], 1, false, now - 1000 * 60 * 4),
    completed(SAMPLE_PROMPTS[8], 1, false, now - 1000 * 60 * 2),
    completed(SAMPLE_PROMPTS[9], 1, false, now - 1000 * 60),
  ];
}

function createInitialState() {
  const prompt = SAMPLE_PROMPTS[0];
  const promptHistory = [{ text: prompt, timestamp: Date.now() }];
  const historyIndex = 0;
  const backgrounds = createInitialBackgrounds();
  const selectedBackgroundId = backgrounds.find(background => background.isDefault)?.id ?? null;

  return {
    prompt,
    promptHistory,
    historyIndex,
    ...computeHistoryFlags(promptHistory, historyIndex),
    backgrounds,
    selectedBackgroundId,
    isGenerating: false,
    promptVariationByHash: buildVariationMap(backgrounds),
  };
}

export const useBackgroundGeneratorStore = create<BackgroundGeneratorState>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      setPrompt: text => {
        set({ prompt: text });
      },

      pushPromptToHistory: text => {
        const normalized = text.trim();
        if (!normalized) {
          return;
        }

        set(state => {
          const current = state.promptHistory[state.historyIndex]?.text;
          if (current === normalized) {
            return {
              ...state,
              prompt: normalized,
            };
          }

          const baseHistory = state.promptHistory.slice(0, state.historyIndex + 1);
          const nextHistory = [...baseHistory, { text: normalized, timestamp: Date.now() }];
          const nextIndex = nextHistory.length - 1;

          return {
            ...state,
            prompt: normalized,
            promptHistory: nextHistory,
            historyIndex: nextIndex,
            ...computeHistoryFlags(nextHistory, nextIndex),
          };
        });
      },

      undo: () => {
        const state = get();
        if (state.historyIndex <= 0) {
          return null;
        }

        const nextIndex = state.historyIndex - 1;
        const nextPrompt = state.promptHistory[nextIndex]?.text ?? null;
        if (!nextPrompt) {
          return null;
        }

        set(currentState => ({
          ...currentState,
          prompt: nextPrompt,
          historyIndex: nextIndex,
          ...computeHistoryFlags(currentState.promptHistory, nextIndex),
        }));

        return nextPrompt;
      },

      redo: () => {
        const state = get();
        if (state.historyIndex >= state.promptHistory.length - 1) {
          return null;
        }

        const nextIndex = state.historyIndex + 1;
        const nextPrompt = state.promptHistory[nextIndex]?.text ?? null;
        if (!nextPrompt) {
          return null;
        }

        set(currentState => ({
          ...currentState,
          prompt: nextPrompt,
          historyIndex: nextIndex,
          ...computeHistoryFlags(currentState.promptHistory, nextIndex),
        }));

        return nextPrompt;
      },

      regeneratePrompt: currentPrompt => {
        const current = (currentPrompt ?? get().prompt).trim();
        const pool = SAMPLE_PROMPTS.filter(prompt => prompt !== current);
        const fallback = SAMPLE_PROMPTS[0];
        const regenerated = pool[randomInt(0, Math.max(0, pool.length - 1))] ?? fallback;

        get().pushPromptToHistory(regenerated);
        return regenerated;
      },

      generateBackground: prompt => {
        const state = get();
        if (state.isGenerating) {
          return;
        }

        const sourcePrompt = (prompt ?? state.prompt).trim();
        if (!sourcePrompt) {
          return;
        }

        if (sourcePrompt !== state.prompt.trim()) {
          get().pushPromptToHistory(sourcePrompt);
        }

        const key = promptHash(sourcePrompt);
        const variation = (get().promptVariationByHash[key] ?? 0) + 1;
        const seed = buildSeed(sourcePrompt, variation);
        const generationId = crypto.randomUUID();
        const startedAt = Date.now();
        const duration = randomInt(GENERATION_DURATION_MIN_MS, GENERATION_DURATION_MAX_MS);

        const generatingBackground: Background = {
          id: generationId,
          prompt: sourcePrompt,
          seed,
          variation,
          isDefault: false,
          status: 'generating',
          progress: 1,
          etaSeconds: Math.ceil(duration / 1000),
          createdAt: startedAt,
        };

        set(currentState => ({
          ...currentState,
          prompt: sourcePrompt,
          backgrounds: [generatingBackground, ...currentState.backgrounds],
          isGenerating: true,
          selectedBackgroundId: currentState.selectedBackgroundId ?? generationId,
          promptVariationByHash: {
            ...currentState.promptVariationByHash,
            [key]: variation,
          },
        }));

        const interval = setInterval(() => {
          const elapsed = Date.now() - startedAt;
          const ratio = Math.min(1, elapsed / duration);
          const done = ratio >= 1;
          const progress = done ? 100 : Math.max(1, Math.min(99, Math.round(ratio * 100)));
          const etaSeconds = done ? 0 : Math.max(1, Math.ceil((duration - elapsed) / 1000));

          set(currentState => {
            const backgrounds = currentState.backgrounds.map(background => {
              if (background.id !== generationId) {
                return background;
              }

              if (done) {
                return {
                  ...background,
                  status: 'completed' as const,
                  progress: 100,
                  etaSeconds: 0,
                };
              }

              return {
                ...background,
                progress,
                etaSeconds,
              };
            });

            return {
              ...currentState,
              backgrounds,
              isGenerating: computeIsGenerating(backgrounds),
            };
          });

          if (done) {
            clearInterval(interval);
            generationIntervals.delete(generationId);
          }
        }, GENERATION_TICK_MS);

        generationIntervals.set(generationId, interval);
      },

      selectBackground: id => {
        set({ selectedBackgroundId: id });
      },

      setDefaultBackground: id => {
        set(state => ({
          ...state,
          backgrounds: state.backgrounds.map(background => ({
            ...background,
            isDefault: background.id === id,
          })),
        }));
      },

      removeBackground: id => {
        const interval = generationIntervals.get(id);
        if (interval) {
          clearInterval(interval);
          generationIntervals.delete(id);
        }

        set(state => {
          const backgrounds = state.backgrounds.filter(background => background.id !== id);
          const hasDefault = backgrounds.some(background => background.isDefault);
          const normalized =
            hasDefault || backgrounds.length === 0
              ? backgrounds
              : backgrounds.map((background, index) => ({
                  ...background,
                  isDefault: index === 0,
                }));

          const selectedBackgroundId =
            state.selectedBackgroundId === id
              ? (normalized.find(background => background.isDefault)?.id ??
                normalized[0]?.id ??
                null)
              : state.selectedBackgroundId;

          return {
            ...state,
            backgrounds: normalized,
            selectedBackgroundId,
            isGenerating: computeIsGenerating(normalized),
          };
        });
      },

      resetAll: () => {
        generationIntervals.forEach(clearInterval);
        generationIntervals.clear();
        set(createInitialState());
      },
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VER,
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        prompt: state.prompt,
        promptHistory: state.promptHistory,
        historyIndex: state.historyIndex,
        canUndo: state.canUndo,
        canRedo: state.canRedo,
        backgrounds: state.backgrounds.filter(background => background.status !== 'generating'),
        selectedBackgroundId: state.selectedBackgroundId,
        promptVariationByHash: state.promptVariationByHash,
      }),
      onRehydrateStorage: () => state => {
        if (!state) return;

        const backgrounds =
          state.backgrounds.length > 0 ? state.backgrounds : createInitialBackgrounds();

        const normalizedBackgrounds = backgrounds.map(background => {
          const variation = background.variation ?? 1;
          const seed = background.seed ?? buildSeed(background.prompt, variation);

          return {
            ...background,
            variation,
            seed,
            etaSeconds: background.etaSeconds ?? 0,
            status: background.status === 'generating' ? ('failed' as const) : background.status,
            progress: background.status === 'completed' ? 100 : background.progress,
          };
        });

        const hasSelected = state.selectedBackgroundId
          ? normalizedBackgrounds.some(background => background.id === state.selectedBackgroundId)
          : false;

        const selectedBackgroundId = hasSelected
          ? state.selectedBackgroundId
          : (normalizedBackgrounds.find(background => background.isDefault)?.id ??
            normalizedBackgrounds[0]?.id ??
            null);

        const historyIndex = Math.min(
          Math.max(state.historyIndex, 0),
          Math.max(state.promptHistory.length - 1, 0),
        );

        const prompt = state.prompt || state.promptHistory[historyIndex]?.text || SAMPLE_PROMPTS[0];

        Object.assign(state, {
          prompt,
          promptHistory:
            state.promptHistory.length > 0
              ? state.promptHistory
              : [{ text: prompt, timestamp: Date.now() }],
          historyIndex,
          ...computeHistoryFlags(state.promptHistory, historyIndex),
          backgrounds: normalizedBackgrounds,
          selectedBackgroundId,
          isGenerating: false,
          promptVariationByHash:
            Object.keys(state.promptVariationByHash).length > 0
              ? state.promptVariationByHash
              : buildVariationMap(normalizedBackgrounds),
        });
      },
    },
  ),
);
