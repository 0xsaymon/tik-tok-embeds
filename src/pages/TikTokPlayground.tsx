import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/shared/ui-kit/components/ui/button';
import { Input } from '@/shared/ui-kit/components/ui/input';
import { Label } from '@/shared/ui-kit/components/ui/label';
import { Switch } from '@/shared/ui-kit/components/ui/switch';
import { Typography } from '@/shared/ui-kit/components/ui/typography';

interface EmbedConfig {
  videoId: string;
  width: number;
  height: number;
  hideAuthor: boolean;
  hideCaption: boolean;
  hideMusic: boolean;
  autoplay: boolean;
  controls: boolean;
}

const DEFAULT_VIDEO_ID = '7613863332826729761';

type TabValue = 'oembed' | 'iframe' | 'code';

const TABS: { value: TabValue; label: string }[] = [
  { value: 'oembed', label: 'oEmbed' },
  { value: 'iframe', label: 'Iframe' },
  { value: 'code', label: 'Code' },
];

export default function TikTokPlayground() {
  const [config, setConfig] = useState<EmbedConfig>({
    videoId: DEFAULT_VIDEO_ID,
    width: 325,
    height: 700,
    hideAuthor: false,
    hideCaption: false,
    hideMusic: false,
    autoplay: false,
    controls: true,
  });

  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState<TabValue>('oembed');

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="tiktok.com/embed.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const iframeUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (config.hideMusic) params.set('music_info', '0');
    if (config.hideCaption) params.set('description', '0');
    if (config.controls) params.set('controls', '1');
    return `https://www.tiktok.com/player/v1/${config.videoId}?${params.toString()}`;
  }, [config]);

  const handleUrlSubmit = () => {
    const input = url || config.videoId;
    const patterns = [
      /tiktok\.com\/@.+\/video\/(\d+)/,
      /tiktok\.com\/t\/(\d+)/,
      /vm\.tiktok\.com\/(\w+)/,
    ];
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) {
        setConfig(prev => ({ ...prev, videoId: match[1] }));
        return;
      }
    }
    if (/^\d+$/.test(input)) {
      setConfig(prev => ({ ...prev, videoId: input }));
    }
  };

  const oEmbedHtml = `<blockquote
  class="tiktok-embed"
  cite="https://www.tiktok.com/@user/video/${config.videoId}"
  data-video-id="${config.videoId}"
  style="max-width: ${config.width}px; min-width: 325px;"
>
  <section></section>
</blockquote>
<script async src="https://www.tiktok.com/embed.js"></script>`;

  const renderPreview = () => {
    if (activeTab === 'oembed') {
      return (
        <div className="flex justify-center">
          <blockquote
            className="tiktok-embed"
            cite={`https://www.tiktok.com/video/${config.videoId}`}
            data-video-id={config.videoId}
            style={{ maxWidth: config.width, minWidth: 325 }}
          >
            <section />
          </blockquote>
        </div>
      );
    }
    if (activeTab === 'iframe') {
      return (
        <div className="flex justify-center">
          <iframe
            src={iframeUrl}
            width={config.width}
            height={config.height}
            allow="fullscreen"
            className="rounded-lg"
            title="TikTok Video"
          />
        </div>
      );
    }
    return (
      <div className="space-y-4 p-4">
        <div className="bg-muted rounded-lg p-4">
          <Typography variant="small" className="text-muted-foreground mb-2 block">
            oEmbed HTML
          </Typography>
          <pre className="overflow-x-auto text-xs">
            <code>{oEmbedHtml}</code>
          </pre>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <Typography variant="small" className="text-muted-foreground mb-2 block">
            Iframe
          </Typography>
          <pre className="overflow-x-auto text-xs">
            <code>{`<iframe\n  src="${iframeUrl}"\n  width="${config.width}"\n  height="${config.height}"\n  allow="fullscreen"\n/>`}</code>
          </pre>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <Typography variant="small" className="text-muted-foreground mb-2 block">
            Config JSON
          </Typography>
          <pre className="overflow-x-auto text-xs">
            <code>{JSON.stringify(config, null, 2)}</code>
          </pre>
        </div>
      </div>
    );
  };

  const tabButtons = (className?: string) => (
    <div className={`flex ${className ?? ''}`}>
      {TABS.map(tab => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
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
          {/* Config panel */}
          <div className="min-h-0 space-y-6 overflow-auto rounded-lg border p-6">
            <Typography variant="h2" className="text-lg font-semibold">
              Configuration
            </Typography>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Video ID</Label>
                <Input
                  value={config.videoId}
                  onChange={e => setConfig(prev => ({ ...prev, videoId: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Width (px)</Label>
                  <Input
                    type="number"
                    value={config.width}
                    onChange={e =>
                      setConfig(prev => ({ ...prev, width: parseInt(e.target.value) }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Height (px)</Label>
                  <Input
                    type="number"
                    value={config.height}
                    onChange={e =>
                      setConfig(prev => ({ ...prev, height: parseInt(e.target.value) }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hide-author">Hide Author</Label>
                  <Switch
                    id="hide-author"
                    checked={config.hideAuthor}
                    onCheckedChange={checked =>
                      setConfig(prev => ({ ...prev, hideAuthor: checked }))
                    }
                  />
                </div>
                <Typography variant="small" className="text-muted-foreground text-xs">
                  Note: Not officially supported via embed.js. May require iframe approach.
                </Typography>
                <div className="flex items-center justify-between">
                  <Label htmlFor="hide-caption">Hide Caption</Label>
                  <Switch
                    id="hide-caption"
                    checked={config.hideCaption}
                    onCheckedChange={checked =>
                      setConfig(prev => ({ ...prev, hideCaption: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="hide-music">Hide Music Info</Label>
                  <Switch
                    id="hide-music"
                    checked={config.hideMusic}
                    onCheckedChange={checked =>
                      setConfig(prev => ({ ...prev, hideMusic: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="controls">Show Controls</Label>
                  <Switch
                    id="controls"
                    checked={config.controls}
                    onCheckedChange={checked => setConfig(prev => ({ ...prev, controls: checked }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="col-span-2 flex min-h-0 flex-col gap-4 overflow-auto">
            {tabButtons()}
            {renderPreview()}
          </div>
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="flex min-h-0 flex-1 flex-col md:hidden">
        {/* Preview — fills available space */}
        <div className="min-h-0 flex-1 overflow-auto">{renderPreview()}</div>

        {/* Bottom controls */}
        <div className="bg-background shrink-0 border-t">
          {tabButtons('border-b')}

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
                  onCheckedChange={checked =>
                    setConfig(prev => ({ ...prev, hideCaption: checked }))
                  }
                />
                Caption
              </label>
              <label className="flex items-center gap-1.5">
                <Switch
                  size="sm"
                  checked={config.hideMusic}
                  onCheckedChange={checked => setConfig(prev => ({ ...prev, hideMusic: checked }))}
                />
                Music
              </label>
              <label className="flex items-center gap-1.5">
                <Switch
                  size="sm"
                  checked={config.controls}
                  onCheckedChange={checked => setConfig(prev => ({ ...prev, controls: checked }))}
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
