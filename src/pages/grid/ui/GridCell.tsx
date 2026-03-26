import { Settings, Trash2, X } from 'lucide-react';
import { useMemo } from 'react';

import type { GridVideo } from '@/features/embed-grid';
import { useEmbedGrid } from '@/features/embed-grid';
import type { EmbedConfig } from '@/shared/lib/tiktok';
import { buildIframeUrl } from '@/shared/lib/tiktok';
import { Switch } from '@/shared/ui-kit/components/ui/switch';

const TOGGLE_ITEMS: { label: string; key: keyof EmbedConfig }[] = [
  { label: 'Автовідтворення', key: 'autoplay' },
  { label: 'Без звуку', key: 'muted' },
  { label: 'Цикл', key: 'loop' },
  { label: 'Панель управління', key: 'controls' },
  { label: 'Інфо про музику', key: 'musicInfo' },
  { label: 'Опис', key: 'description' },
  { label: 'Рекомендовані', key: 'rel' },
  { label: 'Час', key: 'timestamp' },
];

interface GridCellProps {
  video: GridVideo;
  mergedConfig: EmbedConfig;
}

export default function GridCell({ video, mergedConfig }: GridCellProps) {
  const {
    settingsOpenId,
    setSettingsOpenId,
    updateVideoOverrides,
    clearVideoOverrides,
    removeVideo,
  } = useEmbedGrid();

  const iframeUrl = useMemo(() => buildIframeUrl(mergedConfig), [mergedConfig]);
  const isSettingsOpen = settingsOpenId === video.id;
  const hasOverrides = !!video.configOverrides && Object.keys(video.configOverrides).length > 0;

  return (
    <div className="group bg-card relative overflow-hidden rounded-xl border shadow-sm">
      <div className="aspect-[9/16] w-full">
        <iframe
          key={iframeUrl}
          src={iframeUrl}
          allow="fullscreen; autoplay"
          className="h-full w-full border-none"
          title={`TikTok ${video.videoId}`}
        />
      </div>

      {/* Action buttons — visible on hover (desktop) or always (mobile) */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        <button
          onClick={() => setSettingsOpenId(isSettingsOpen ? null : video.id)}
          className={`rounded-lg p-1.5 backdrop-blur transition-colors ${
            isSettingsOpen
              ? 'bg-primary text-primary-foreground'
              : 'bg-background/80 hover:bg-background'
          }`}
        >
          <Settings className="h-4 w-4" />
        </button>
        <button
          onClick={() => removeVideo(video.id)}
          className="bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-lg p-1.5 backdrop-blur transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {hasOverrides && !isSettingsOpen && (
        <div className="bg-primary absolute top-2 left-2 h-2 w-2 rounded-full" />
      )}

      {/* Per-video settings overlay */}
      {isSettingsOpen && (
        <div className="bg-background/95 absolute inset-x-0 bottom-0 border-t p-3 backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium">Налаштування відео</span>
            <div className="flex gap-1">
              {hasOverrides && (
                <button
                  onClick={() => clearVideoOverrides(video.id)}
                  className="text-muted-foreground hover:text-foreground text-xs underline"
                >
                  Скинути
                </button>
              )}
              <button
                onClick={() => setSettingsOpenId(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            {TOGGLE_ITEMS.map(item => (
              <label key={item.key} className="flex min-h-[28px] items-center gap-1.5">
                <Switch
                  size="sm"
                  checked={mergedConfig[item.key] as boolean}
                  onCheckedChange={checked =>
                    updateVideoOverrides(video.id, { [item.key]: checked })
                  }
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
