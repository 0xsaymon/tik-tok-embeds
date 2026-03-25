import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { EmbedConfig } from '@/shared/lib/tiktok';
import { DEFAULT_IFRAME_CONFIG, parseTikTokUrl } from '@/shared/lib/tiktok';

import type { GridVideo } from './types';

type IframeConfig = Omit<EmbedConfig, 'videoId' | 'width' | 'height'>;

interface EmbedGridState {
  videos: GridVideo[];
  globalConfig: IframeConfig;
  urlInput: string;
  settingsOpenId: string | null;
  globalSettingsOpen: boolean;

  setUrlInput: (v: string) => void;
  applyUrls: () => void;
  removeVideo: (id: string) => void;
  updateVideoOverrides: (id: string, overrides: Partial<IframeConfig>) => void;
  clearVideoOverrides: (id: string) => void;
  updateGlobalConfig: (partial: Partial<IframeConfig>) => void;
  setSettingsOpenId: (id: string | null) => void;
  setGlobalSettingsOpen: (open: boolean) => void;
}

let nextId = 1;

export const useEmbedGrid = create<EmbedGridState>()(
  persist(
    (set, get) => ({
      videos: [],
      globalConfig: DEFAULT_IFRAME_CONFIG,
      urlInput: '',
      settingsOpenId: null,
      globalSettingsOpen: false,

      setUrlInput: urlInput => set({ urlInput }),

      applyUrls: () => {
        const { urlInput } = get();
        const urls = urlInput
          .trim()
          .split(/[\s\n]+/)
          .filter(Boolean);
        const newVideos: GridVideo[] = [];
        for (const url of urls) {
          const videoId = parseTikTokUrl(url);
          if (videoId) {
            newVideos.push({ id: String(nextId++), videoId, url });
          }
        }
        if (newVideos.length > 0) {
          set(state => ({ videos: [...state.videos, ...newVideos] }));
        }
      },

      removeVideo: id => set(state => ({ videos: state.videos.filter(v => v.id !== id) })),

      updateVideoOverrides: (id, overrides) =>
        set(state => ({
          videos: state.videos.map(v =>
            v.id === id ? { ...v, configOverrides: { ...v.configOverrides, ...overrides } } : v,
          ),
        })),

      clearVideoOverrides: id =>
        set(state => ({
          videos: state.videos.map(v => (v.id === id ? { ...v, configOverrides: undefined } : v)),
        })),

      updateGlobalConfig: partial =>
        set(state => ({ globalConfig: { ...state.globalConfig, ...partial } })),

      setSettingsOpenId: settingsOpenId => set({ settingsOpenId }),
      setGlobalSettingsOpen: globalSettingsOpen => set({ globalSettingsOpen }),
    }),
    {
      name: 'embed-grid',
      partialize: state => ({
        videos: state.videos,
        globalConfig: state.globalConfig,
        urlInput: state.urlInput,
      }),
    },
  ),
);
