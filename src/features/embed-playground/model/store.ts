import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { EmbedConfig, TabValue } from '@/shared/lib/tiktok';
import { DEFAULT_IFRAME_CONFIG, parseTikTokUrl } from '@/shared/lib/tiktok';

const DEFAULT_VIDEO_ID = '7598731566696729870';

export interface EmbedPlaygroundState {
  config: EmbedConfig;
  url: string;
  activeTab: TabValue;
  controlsOpen: boolean;
  updateConfig: (partial: Partial<EmbedConfig>) => void;
  setUrl: (url: string) => void;
  setActiveTab: (tab: TabValue) => void;
  setControlsOpen: (open: boolean) => void;
  handleUrlSubmit: () => void;
}

export const useEmbedPlayground = create<EmbedPlaygroundState>()(
  persist(
    (set, get) => ({
      config: {
        videoId: DEFAULT_VIDEO_ID,
        width: 325,
        height: 700,
        ...DEFAULT_IFRAME_CONFIG,
      },
      url: '',
      activeTab: 'iframe' as TabValue,
      controlsOpen: true,

      updateConfig: partial => set(state => ({ config: { ...state.config, ...partial } })),
      setUrl: url => set({ url }),
      setActiveTab: activeTab => set({ activeTab }),
      setControlsOpen: controlsOpen => set({ controlsOpen }),
      handleUrlSubmit: () => {
        const { url, config } = get();
        const input = url || config.videoId;
        const videoId = parseTikTokUrl(input);
        if (videoId) {
          set(state => ({ config: { ...state.config, videoId } }));
        }
      },
    }),
    {
      name: 'embed-playground',
      partialize: state => ({
        config: state.config,
        activeTab: state.activeTab,
        url: state.url,
        controlsOpen: state.controlsOpen,
      }),
    },
  ),
);
