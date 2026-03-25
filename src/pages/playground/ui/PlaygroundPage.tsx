import type { TabValue } from '@/features/embed-playground';
import { EmbedConfigPanel, EmbedPreview, TABS, useEmbedConfig } from '@/features/embed-playground';
import { Button } from '@/shared/ui-kit/components/ui/button';
import { Input } from '@/shared/ui-kit/components/ui/input';
import { Switch } from '@/shared/ui-kit/components/ui/switch';
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
  const {
    config,
    updateConfig,
    url,
    setUrl,
    activeTab,
    setActiveTab,
    iframeUrl,
    oEmbedHtml,
    handleUrlSubmit,
  } = useEmbedConfig();

  return (
    <main className="flex h-[calc(100dvh-57px-4rem)] flex-col overflow-hidden md:h-[calc(100dvh-57px)] md:p-6 lg:p-8">
      {/* ===== DESKTOP ===== */}
      <div className="hidden h-full flex-col md:flex">
        <Typography variant="h1" className="mb-2 text-2xl font-bold">
          Playground
        </Typography>
        <Typography variant="p" className="text-muted-foreground mb-6">
          Test different embed configurations and verify customization capabilities.
        </Typography>

        <div className="mb-8 flex gap-2">
          <Input
            placeholder="Paste TikTok URL (e.g., https://www.tiktok.com/@username/video/1234567890)"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleUrlSubmit()}
            className="flex-1"
          />
          <Button onClick={handleUrlSubmit}>Load Video</Button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-8">
          <div className="min-h-0 space-y-6 overflow-auto rounded-lg border p-6">
            <Typography variant="h2" className="text-lg font-semibold">
              Configuration
            </Typography>
            <EmbedConfigPanel config={config} onConfigChange={updateConfig} />
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
              <Input
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleUrlSubmit()}
                className="h-8 flex-1 text-xs"
                placeholder="Video ID or URL"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleUrlSubmit}
                className="h-8 px-3 text-xs"
              >
                Load
              </Button>
            </div>

            <div className="text-muted-foreground flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5">
                <Switch
                  size="sm"
                  checked={config.hideCaption}
                  onCheckedChange={checked => updateConfig({ hideCaption: checked })}
                />
                Caption
              </label>
              <label className="flex items-center gap-1.5">
                <Switch
                  size="sm"
                  checked={config.hideMusic}
                  onCheckedChange={checked => updateConfig({ hideMusic: checked })}
                />
                Music
              </label>
              <label className="flex items-center gap-1.5">
                <Switch
                  size="sm"
                  checked={config.controls}
                  onCheckedChange={checked => updateConfig({ controls: checked })}
                />
                Controls
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
