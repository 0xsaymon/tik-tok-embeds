import { X } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useEmbedPlayground } from '@/features/embed-playground';
import type { TabValue } from '@/shared/lib/tiktok';
import { buildIframeUrl, TABS } from '@/shared/lib/tiktok';
import { Button } from '@/shared/ui-kit/components/ui/button';
import { Input } from '@/shared/ui-kit/components/ui/input';
import { Typography } from '@/shared/ui-kit/components/ui/typography';
import { EmbedConfigPanel } from '@/widgets/embed-config-panel';
import { EmbedPreview } from '@/widgets/embed-preview';

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
  const {
    config,
    updateConfig,
    url,
    setUrl,
    activeTab,
    setActiveTab,
    controlsOpen,
    setControlsOpen,
    handleUrlSubmit,
  } = useEmbedPlayground();

  const [searchParams, setSearchParams] = useSearchParams();

  // Sync ?tab= query param → store on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabValue | null;
    if (tabParam && (tabParam === 'iframe' || tabParam === 'oembed') && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync store → URL when tab changes
  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab);
    setSearchParams({ tab }, { replace: true });
  };

  const iframeUrl = useMemo(() => buildIframeUrl(config), [config]);

  return (
    <main className="flex h-[calc(100dvh-57px-4rem)] flex-col overflow-hidden md:mx-auto md:h-[calc(100dvh-57px)] md:w-full md:max-w-7xl md:px-6 md:py-6 lg:px-8">
      {/* ===== DESKTOP ===== */}
      <div className="hidden h-full flex-col md:flex">
        <Typography variant="h1" className="mb-2 text-2xl font-bold">
          Playground
        </Typography>
        <Typography variant="p" className="text-muted-foreground mb-6">
          Тестування конфігурацій TikTok embed та перевірка можливостей кастомізації.
        </Typography>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-8">
          <div className="min-h-0 space-y-4 overflow-auto rounded-lg border p-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="TikTok URL або Video ID"
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
              <Button size="sm" onClick={handleUrlSubmit}>
                Завантажити
              </Button>
            </div>
            <EmbedConfigPanel config={config} onConfigChange={updateConfig} activeTab={activeTab} />
          </div>

          <div className="col-span-2 flex min-h-0 flex-col">
            <TabButtons activeTab={activeTab} onTabChange={handleTabChange} className="shrink-0" />
            <div className="min-h-0 flex-1 pt-4">
              <EmbedPreview activeTab={activeTab} config={config} iframeUrl={iframeUrl} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="flex min-h-0 flex-1 flex-col md:hidden">
        <div className="min-h-0 flex-1 overflow-auto">
          <EmbedPreview activeTab={activeTab} config={config} iframeUrl={iframeUrl} />
        </div>

        <div className="bg-background shrink-0 border-t">
          <TabButtons activeTab={activeTab} onTabChange={handleTabChange} className="border-b" />

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
                Завантажити
              </Button>
            </div>

            <EmbedConfigPanel
              config={config}
              onConfigChange={updateConfig}
              activeTab={activeTab}
              compact
              controlsOpen={controlsOpen}
              onControlsToggle={() => setControlsOpen(!controlsOpen)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
