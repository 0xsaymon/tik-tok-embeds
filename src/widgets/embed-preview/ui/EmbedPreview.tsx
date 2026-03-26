import { useEffect } from 'react';

import type { EmbedConfig, TabValue } from '@/shared/lib/tiktok';
import { reloadEmbedScript } from '@/shared/lib/tiktok';

interface EmbedPreviewProps {
  activeTab: TabValue;
  config: EmbedConfig;
  iframeUrl: string;
}

export default function EmbedPreview({ activeTab, config, iframeUrl }: EmbedPreviewProps) {
  useEffect(() => {
    if (activeTab === 'oembed') {
      const timer = setTimeout(reloadEmbedScript, 50);
      return () => clearTimeout(timer);
    }
  }, [activeTab, config.videoId]);

  if (activeTab === 'iframe') {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <iframe
          key={iframeUrl}
          src={iframeUrl}
          allow="fullscreen"
          className="rounded-lg"
          width={config.width}
          height={config.height}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          title="TikTok Video"
        />
      </div>
    );
  }

  return (
    <div key={config.videoId} className="flex justify-center">
      <blockquote
        className="tiktok-embed"
        cite={`https://www.tiktok.com/video/${config.videoId}`}
        data-video-id={config.videoId}
        style={{ maxWidth: config.oembedMaxWidth, minWidth: 325 }}
      >
        <section />
      </blockquote>
    </div>
  );
}
