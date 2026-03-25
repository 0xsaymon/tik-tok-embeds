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

const DEFAULT_URLS = [
  'https://www.tiktok.com/@queefquack123/video/7543789467740458271',
  'https://www.tiktok.com/@marykatenoashley/video/7541605713617882399',
  'https://www.tiktok.com/@dudevaeh/video/7573311210620259615',
  'https://www.tiktok.com/@samhooper_/video/7581608398815284498',
  'https://www.tiktok.com/@camimiminini/video/7579295333071473927',
  'https://www.tiktok.com/@71cent/video/7573904830461234487',
  'https://www.tiktok.com/@spaghetillie/video/7583832764869397782',
  'https://www.tiktok.com/@suprfrikncoolswagunicorn/video/7582012756581305608',
];

function videosFromUrls(urls: string[]): GridVideo[] {
  let id = 0;
  return urls
    .map(url => {
      const videoId = parseTikTokUrl(url);
      return videoId ? { id: String(++id), videoId, url } : null;
    })
    .filter(Boolean) as GridVideo[];
}

let nextId = 100;

export const useEmbedGrid = create<EmbedGridState>()(
  persist(
    (set, get) => ({
      videos: videosFromUrls(DEFAULT_URLS),
      globalConfig: DEFAULT_IFRAME_CONFIG,
      urlInput: DEFAULT_URLS.join('\n'),
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
