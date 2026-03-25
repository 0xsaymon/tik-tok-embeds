import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { parseTikTokUrl } from '../lib/parse-tiktok-url';
import { DEFAULT_VIDEO_ID } from './constants';
import type { EmbedConfig, TabValue } from './types';

interface EmbedPlaygroundState {
  config: EmbedConfig;
  url: string;
  activeTab: TabValue;
  updateConfig: (partial: Partial<EmbedConfig>) => void;
  setUrl: (url: string) => void;
  setActiveTab: (tab: TabValue) => void;
  handleUrlSubmit: () => void;
}

export const useEmbedPlayground = create<EmbedPlaygroundState>()(
  persist(
    (set, get) => ({
      config: {
        videoId: DEFAULT_VIDEO_ID,
        width: 325,
        height: 700,
        autoplay: false,
        muted: false,
        loop: false,
        musicInfo: true,
        description: true,
        rel: true,
        controls: true,
        progressBar: true,
        playButton: true,
        volumeControl: true,
        fullscreenButton: true,
        timestamp: true,
      },
      url: '',
      activeTab: 'oembed' as TabValue,

      updateConfig: partial => set(state => ({ config: { ...state.config, ...partial } })),
      setUrl: url => set({ url }),
      setActiveTab: activeTab => set({ activeTab }),
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
      }),
    },
  ),
);
