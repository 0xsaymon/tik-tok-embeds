import { X } from 'lucide-react';
import { useMemo } from 'react';

import type { TabValue } from '@/features/embed-playground';
import {
  buildIframeUrl,
  buildOEmbedHtml,
  EmbedConfigPanel,
  EmbedPreview,
  TABS,
  useEmbedPlayground,
} from '@/features/embed-playground';
import { Button } from '@/shared/ui-kit/components/ui/button';
import { Input } from '@/shared/ui-kit/components/ui/input';
import { Typography } from '@/shared/ui-kit/components/ui/typography';

function TabButtons({
  activeTab,
  onTabChange,
  className,
}: {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
  className?: string;
}) {
  return (
    <div className={`flex ${className ?? ''}`}>
      {TABS.map(tab => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`flex-1 py-2 text-xs font-medium transition-colors ${
            activeTab === tab.value
              ? 'border-primary text-foreground border-b-2'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default function PlaygroundPage() {
  const { config, updateConfig, url, setUrl, activeTab, setActiveTab, handleUrlSubmit } =
    useEmbedPlayground();

  const iframeUrl = useMemo(() => buildIframeUrl(config), [config]);
  const oEmbedHtml = useMemo(() => buildOEmbedHtml(config), [config]);

  return (
    <main className="flex h-[calc(100dvh-57px-4rem)] flex-col overflow-hidden md:h-[calc(100dvh-57px)] md:p-6 lg:p-8">
      {/* ===== DESKTOP ===== */}
      <div className="hidden h-full flex-col md:flex">
        <Typography variant="h1" className="mb-2 text-2xl font-bold">
          Playground
        </Typography>
        <Typography variant="p" className="text-muted-foreground mb-6">
          Тестування конфігурацій TikTok embed та перевірка можливостей кастомізації.
        </Typography>

        <div className="mb-8 flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Вставте TikTok URL (наприклад, https://www.tiktok.com/@username/video/1234567890)"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleUrlSubmit()}
              className={url ? 'pr-8' : ''}
            />
            {url && (
              <button
                onClick={() => setUrl('')}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button onClick={handleUrlSubmit}>Завантажити</Button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-8">
          <div className="min-h-0 space-y-6 overflow-auto rounded-lg border p-6">
            <Typography variant="h2" className="text-lg font-semibold">
              Конфігурація
            </Typography>
            <EmbedConfigPanel config={config} onConfigChange={updateConfig} activeTab={activeTab} />
          </div>

          <div className="col-span-2 flex min-h-0 flex-col gap-4 overflow-auto">
            <TabButtons activeTab={activeTab} onTabChange={setActiveTab} />
            <EmbedPreview
              activeTab={activeTab}
              config={config}
              iframeUrl={iframeUrl}
              oEmbedHtml={oEmbedHtml}
            />
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="flex min-h-0 flex-1 flex-col md:hidden">
        <div className="min-h-0 flex-1 overflow-auto">
          <EmbedPreview
            activeTab={activeTab}
            config={config}
            iframeUrl={iframeUrl}
            oEmbedHtml={oEmbedHtml}
          />
        </div>

        <div className="bg-background shrink-0 border-t">
          <TabButtons activeTab={activeTab} onTabChange={setActiveTab} className="border-b" />

          <div className="space-y-2 px-3 py-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleUrlSubmit()}
                  className={`h-8 text-xs ${url ? 'pr-7' : ''}`}
                  placeholder="Video ID або URL"
                />
                {url && (
                  <button
                    onClick={() => setUrl('')}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1.5 -translate-y-1/2"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleUrlSubmit}
                className="h-8 px-3 text-xs"
              >
                Load
              </Button>
            </div>

            <EmbedConfigPanel
              config={config}
              onConfigChange={updateConfig}
              activeTab={activeTab}
              compact
            />
          </div>
        </div>
      </div>
    </main>
  );
}
