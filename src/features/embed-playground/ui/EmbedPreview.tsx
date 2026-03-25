import { Typography } from '@/shared/ui-kit/components/ui/typography';

import type { EmbedConfig, TabValue } from '../model/types';

interface EmbedPreviewProps {
  activeTab: TabValue;
  config: EmbedConfig;
  iframeUrl: string;
  oEmbedHtml: string;
}

export default function EmbedPreview({
  activeTab,
  config,
  iframeUrl,
  oEmbedHtml,
}: EmbedPreviewProps) {
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
}
