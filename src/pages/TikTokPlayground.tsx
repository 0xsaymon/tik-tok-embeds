import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/shared/ui-kit/components/ui/button';
import { Input } from '@/shared/ui-kit/components/ui/input';
import { Label } from '@/shared/ui-kit/components/ui/label';
import { Switch } from '@/shared/ui-kit/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui-kit/components/ui/tabs';
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
    const patterns = [
      /tiktok\.com\/@.+\/video\/(\d+)/,
      /tiktok\.com\/t\/(\d+)/,
      /vm\.tiktok\.com\/(\w+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        setConfig(prev => ({ ...prev, videoId: match[1] }));
        return;
      }
    }

    if (/^\d+$/.test(url)) {
      setConfig(prev => ({ ...prev, videoId: url }));
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

  return (
    <main className="h-[calc(100dvh-57px)] overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="flex h-full flex-col">
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

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 lg:grid-cols-3">
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

          <div className="min-h-0 space-y-6 overflow-auto lg:col-span-2">
            <Tabs defaultValue="oembed" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="oembed">oEmbed (Standard)</TabsTrigger>
                <TabsTrigger value="iframe">Direct Iframe</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>

              <TabsContent value="oembed" className="space-y-4">
                <Typography variant="h3" className="text-sm font-medium">
                  Standard TikTok oEmbed (blockquote + embed.js)
                </Typography>
                <div
                  className="bg-background flex justify-center overflow-hidden rounded-lg border p-4"
                  style={{ minHeight: config.height }}
                >
                  <blockquote
                    className="tiktok-embed"
                    cite={`https://www.tiktok.com/video/${config.videoId}`}
                    data-video-id={config.videoId}
                    style={{ maxWidth: config.width, minWidth: 325 }}
                  >
                    <section />
                  </blockquote>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="overflow-x-auto text-xs">
                    <code>{oEmbedHtml}</code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="iframe" className="space-y-4">
                <Typography variant="h3" className="text-sm font-medium">
                  Direct Iframe (with query params)
                </Typography>
                <div className="bg-background flex justify-center overflow-hidden rounded-lg border p-4">
                  <iframe
                    src={iframeUrl}
                    width={config.width}
                    height={config.height}
                    allow="fullscreen"
                    className="rounded-lg"
                    title="TikTok Video"
                  />
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="overflow-x-auto text-xs">
                    <code>{`<iframe
  src="${iframeUrl}"
  width="${config.width}"
  height="${config.height}"
  allow="fullscreen"
/>`}</code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="code">
                <Typography variant="h3" className="mb-4 text-sm font-medium">
                  Generated Configuration
                </Typography>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="overflow-x-auto text-xs">
                    <code>{JSON.stringify(config, null, 2)}</code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
