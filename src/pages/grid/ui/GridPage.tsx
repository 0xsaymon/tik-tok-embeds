import { ChevronDown, X } from 'lucide-react';
import { useMemo } from 'react';

import { useEmbedGrid } from '@/features/embed-grid';
import type { EmbedConfig } from '@/shared/lib/tiktok';
import { Button } from '@/shared/ui-kit/components/ui/button';
import { Switch } from '@/shared/ui-kit/components/ui/switch';
import { Typography } from '@/shared/ui-kit/components/ui/typography';

import GridCell from './GridCell';

const TOGGLE_ITEMS: { label: string; key: keyof EmbedConfig }[] = [
  { label: 'Autoplay', key: 'autoplay' },
  { label: 'Muted', key: 'muted' },
  { label: 'Loop', key: 'loop' },
  { label: 'Controls', key: 'controls' },
  { label: 'Progress Bar', key: 'progressBar' },
  { label: 'Play Button', key: 'playButton' },
  { label: 'Volume', key: 'volumeControl' },
  { label: 'Fullscreen', key: 'fullscreenButton' },
  { label: 'Music Info', key: 'musicInfo' },
  { label: 'Description', key: 'description' },
  { label: 'Related', key: 'rel' },
  { label: 'Timestamp', key: 'timestamp' },
];

export default function GridPage() {
  const {
    videos,
    globalConfig,
    urlInput,
    globalSettingsOpen,
    setUrlInput,
    applyUrls,
    updateGlobalConfig,
    setGlobalSettingsOpen,
  } = useEmbedGrid();

  const mergedConfigs = useMemo(
    () =>
      videos.map(v => ({
        video: v,
        config: {
          videoId: v.videoId,
          width: 325,
          height: 700,
          ...globalConfig,
          ...v.configOverrides,
        } as EmbedConfig,
      })),
    [videos, globalConfig],
  );

  const activeCount = TOGGLE_ITEMS.filter(
    i => globalConfig[i.key as keyof typeof globalConfig] as boolean,
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Typography variant="h1" className="mb-2 text-2xl font-bold">
        Сітка
      </Typography>
      <Typography variant="p" className="text-muted-foreground mb-6">
        Вставте TikTok URL через пробіл або новий рядок для перегляду кількох відео одночасно.
      </Typography>

      {/* URL input */}
      <div className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <textarea
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                applyUrls();
              }
            }}
            placeholder="https://tiktok.com/@user/video/123 https://tiktok.com/@user/video/456"
            className="border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex min-h-[40px] w-full resize-none rounded-md border px-3 py-2 text-sm shadow-xs focus-visible:ring-[3px] focus-visible:outline-none"
            rows={1}
          />
          {urlInput && (
            <button
              onClick={() => setUrlInput('')}
              className="text-muted-foreground hover:text-foreground absolute top-2.5 right-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button onClick={applyUrls} className="shrink-0">
          Додати
        </Button>
      </div>

      {/* Global config */}
      <div className="mb-6 rounded-lg border p-3">
        <button
          onClick={() => setGlobalSettingsOpen(!globalSettingsOpen)}
          className="text-muted-foreground flex w-full items-center justify-between text-sm"
        >
          <span>
            Глобальні параметри ({activeCount}/{TOGGLE_ITEMS.length} увімкнено)
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${globalSettingsOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {globalSettingsOpen && (
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-3 lg:grid-cols-4">
            {TOGGLE_ITEMS.map(item => (
              <label key={item.key} className="flex min-h-[32px] items-center gap-2">
                <Switch
                  checked={globalConfig[item.key as keyof typeof globalConfig] as boolean}
                  onCheckedChange={checked => updateGlobalConfig({ [item.key]: checked })}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      {videos.length === 0 ? (
        <div className="text-muted-foreground flex h-64 items-center justify-center rounded-xl border border-dashed text-sm">
          Вставте TikTok URL вище та натисніть &quot;Застосувати&quot;
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mergedConfigs.map(({ video, config }) => (
            <GridCell key={video.id} video={video} mergedConfig={config} />
          ))}
        </div>
      )}
    </div>
  );
}
